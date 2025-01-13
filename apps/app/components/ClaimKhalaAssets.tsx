import khalaClaimerAbi from '@/assets/khala_claimer_abi'
import Property from '@/components/Property'
import SwitchChainButton from '@/components/SwitchChainButton'
import {KHALA_CLAIMER_CONTRACT_ADDRESS} from '@/config'
import {
  khalaAssetsApi,
  useClaimStatus,
  useKhalaAssetsQuery,
} from '@/hooks/khalaAssets'
import {useSharePrice} from '@/hooks/staking'
import {useAutoSwitchChain} from '@/hooks/useAutoSwitchChain'
import {walletDialogOpenAtom} from '@/store/ui'
import {CheckCircleOutline, ContentCopy} from '@mui/icons-material'
import {LoadingButton} from '@mui/lab'
import {
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material'
import {toCurrency, trimAddress, validateAddress} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import {decodeAddress} from '@polkadot/keyring'
import Identicon from '@polkadot/react-identicon'
import type {Signer} from '@polkadot/types/types'
import {stringToHex, u8aToHex} from '@polkadot/util'
import {ConnectButton} from '@rainbow-me/rainbowkit'
import Decimal from 'decimal.js'
import {useAtom, useSetAtom} from 'jotai'
import NextLink from 'next/link'
import {useSnackbar} from 'notistack'
import {useEffect, useMemo, useState} from 'react'
import type {Hex} from 'viem'
import {useAccount, useWaitForTransactionReceipt, useWriteContract} from 'wagmi'

const Steps = () => {
  return (
    <Stepper alternativeLabel>
      <Step active>
        <StepLabel>Sign with Khala account</StepLabel>
      </Step>
      <Step active>
        <StepLabel>Connect Ethereum wallet</StepLabel>
      </Step>
      <Step active>
        <StepLabel>Claim PHA on Ethereum</StepLabel>
      </Step>
    </Stepper>
  )
}

export const CheckKhalaAssets = ({
  onCheck,
}: {
  onCheck: (address: string) => void
}) => {
  const {enqueueSnackbar} = useSnackbar()
  const [checkAddressInput, setCheckAddressInput] = useState('')

  const handleCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateAddress(checkAddressInput)) {
      onCheck(checkAddressInput)
    } else {
      enqueueSnackbar('Invalid Khala address', {variant: 'error'})
    }
  }
  return (
    <>
      <Box
        component="form"
        display="flex"
        width="100%"
        alignItems="center"
        gap={2}
        onSubmit={handleCheck}
      >
        <TextField
          placeholder="Khala account"
          value={checkAddressInput}
          fullWidth
          size="small"
          onChange={(e) => {
            setCheckAddressInput(e.target.value)
          }}
        />
        <Button type="submit" sx={{width: 120, height: 40}}>
          Check
        </Button>
      </Box>
    </>
  )
}

const ClaimKhalaAssets = () => {
  const {enqueueSnackbar} = useSnackbar()
  const setWalletDialogOpen = useSetAtom(walletDialogOpenAtom)
  const [isSigning, setIsSigning] = useState(false)
  const [checkAddress, setCheckAddress] = useState<string | undefined>(
    undefined,
  )
  useAutoSwitchChain()
  const sharePrice = useSharePrice()
  const {address: ethAddress, chain: ethChain} = useAccount()
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const address = checkAddress ?? polkadotAccount?.address
  const {data} = useKhalaAssetsQuery(address)
  const h160Address = useMemo(() => {
    if (address == null) {
      return undefined
    }
    const publicKey = decodeAddress(address)
    const h160 = u8aToHex(publicKey).slice(0, 42) as Hex
    return h160
  }, [address])
  const {claimed, log, refetch} = useClaimStatus(h160Address)
  const tx = useMemo(() => {
    if (ethChain?.blockExplorers?.default == null || log == null) {
      return undefined
    }

    const txHash = log.transactionHash
    return {
      url: `${ethChain.blockExplorers.default.url}/tx/${txHash}`,
      hash: txHash,
      trimmedHash: trimAddress(txHash, 6, 6),
    }
  }, [ethChain, log])

  const {data: hash, writeContract, isPending, reset} = useWriteContract()
  const claimResult = useWaitForTransactionReceipt({hash})

  const isLoading = isPending || claimResult.isLoading || isSigning

  const isClaimable = useMemo(() => {
    if (data == null) {
      return false
    }
    return new Decimal(data.free).add(data.staked).gt(0)
  }, [data])

  useEffect(() => {
    if (claimResult.data?.status === 'success') {
      enqueueSnackbar('Claimed successfully', {variant: 'success'})
      reset()
      refetch()
    }
  }, [claimResult.data?.status, enqueueSnackbar, reset, refetch])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!ethAddress) {
      return
    }
    const receiver = ethAddress
    const {signRaw} = polkadotAccount?.signer as Signer
    if (signRaw == null || polkadotAccount == null || h160Address == null) {
      return
    }
    let polkadotSignature: Hex
    try {
      setIsSigning(true)
      const {signature} = await signRaw({
        address: polkadotAccount.address,
        data: stringToHex(`Khala Asset Receiver: ${receiver}`),
        type: 'bytes',
      })
      polkadotSignature = signature
    } catch (e) {
      setIsSigning(false)
      return
    }

    try {
      const {h160, free, staked, signature} = await khalaAssetsApi
        .url('/claim')
        .post({
          address: polkadotAccount.address,
          signature: polkadotSignature,
          receiver,
        })
        .json<{h160: Hex; free: string; staked: string; signature: Hex}>()

      writeContract({
        abi: khalaClaimerAbi,
        address: KHALA_CLAIMER_CONTRACT_ADDRESS,
        functionName: 'claim',
        args: [h160, BigInt(free), BigInt(staked), receiver, signature],
      })
    } catch (e) {
      return enqueueSnackbar('Failed to claim', {variant: 'error'})
    } finally {
      setIsSigning(false)
    }
  }

  const onSwitchAccount = () => {
    if (polkadotAccount == null) {
      setCheckAddress(undefined)
    } else {
      setWalletDialogOpen(true)
    }
  }

  const rewards = useMemo(() => {
    if (sharePrice == null || data?.staked == null) {
      return
    }
    return new Decimal(sharePrice.toString())
      .div(1e18)
      .minus(1)
      .mul(data.staked)
  }, [sharePrice, data?.staked])

  const total = useMemo(() => {
    if (data == null || rewards == null) {
      return
    }
    return Decimal.add(data.free, data.staked).add(rewards)
  }, [data, rewards])

  if (address == null) {
    return (
      <Box>
        <Stack alignItems="center" gap={2} pt={6} pb={8}>
          <Typography variant="body1">Connect wallet to claim</Typography>
          <Button
            variant="contained"
            onClick={() => {
              setWalletDialogOpen(true)
            }}
          >
            Connect wallet
          </Button>
        </Stack>

        <Divider flexItem />

        <Stack alignItems="center" pt={4} pb={2} gap={2}>
          <Typography variant="body1">Check your Khala account</Typography>
          <CheckKhalaAssets onCheck={setCheckAddress} />
        </Stack>
      </Box>
    )
  }

  return (
    <>
      <Property
        label="Total PHA Claimable"
        size="large"
        center
        fullWidth
        wrapDecimal
      >
        {total == null ? '-' : toCurrency(total)}
      </Property>
      <Paper sx={{p: 2, bgcolor: 'transparent', mt: 2}}>
        <Stack gap={1}>
          <Property label="Free" size="small" fullWidth wrapDecimal>
            {data
              ? toCurrency(new Decimal(data.free).minus(data.pwRefund))
              : '-'}
          </Property>
          <Property label="Delegation" size="small" fullWidth wrapDecimal>
            {data ? toCurrency(data.staked) : '-'}
          </Property>
          <Property label="Staking Rewards" size="small" fullWidth wrapDecimal>
            {rewards ? toCurrency(rewards) : '-'}
          </Property>
          <Property
            label="Phala World NFT Refund"
            size="small"
            fullWidth
            wrapDecimal
          >
            {data ? toCurrency(data.pwRefund) : '-'}
          </Property>
        </Stack>
      </Paper>

      <Box display="flex" alignItems="center" gap={2} height={52} px={2} my={3}>
        <Identicon value={address} theme="polkadot" size={30} />
        <Stack>
          <Typography
            variant="subtitle1"
            component="div"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            minWidth={0}
          >
            {polkadotAccount?.name ?? 'Khala account'}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            sx={{cursor: 'pointer'}}
            onClick={() => {
              navigator.clipboard.writeText(address)
              enqueueSnackbar('Copied to clipboard')
            }}
          >
            <Typography
              variant="subtitle2"
              color="text.secondary"
              component="div"
            >
              {trimAddress(address, 6, 6)}
            </Typography>
            <ContentCopy sx={{ml: 1, width: 16}} color="disabled" />
          </Stack>
        </Stack>
        <Button
          variant="text"
          sx={{ml: 'auto'}}
          size="small"
          onClick={onSwitchAccount}
        >
          Switch account
        </Button>
      </Box>

      {polkadotAccount != null && (
        <>
          <Divider sx={{my: 2}} />

          <Stack gap={4} mt={4}>
            {claimed ? (
              <Stack alignItems="center" height="100%" justifyContent="center">
                <CheckCircleOutline
                  sx={{width: 48, height: 48}}
                  color="success"
                />
                <Typography variant="h5" mt={3}>
                  Claimed Successfully
                </Typography>
                <Typography variant="body2" mt={1} color="text.secondary">
                  Staked PHA and rewards are available on the staking page
                </Typography>
                <Typography variant="body2" mt={1}>
                  Tx:{' '}
                  <Link href={tx ? tx.url : ''} target="_blank">
                    {tx ? tx.trimmedHash : ''}
                  </Link>
                </Typography>
                <Button
                  variant="contained"
                  sx={{mt: 3}}
                  LinkComponent={NextLink}
                  href="/staking"
                >
                  Go to Staking
                </Button>
              </Stack>
            ) : (
              <>
                <Steps />
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle1">Ethereum wallet</Typography>
                  <ConnectButton showBalance={false} />
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                  <SwitchChainButton>
                    <LoadingButton
                      variant="contained"
                      disabled={!ethAddress || !isClaimable}
                      fullWidth
                      type="submit"
                      loading={isLoading}
                    >
                      Claim
                    </LoadingButton>
                  </SwitchChainButton>
                </Box>
              </>
            )}
          </Stack>
        </>
      )}
    </>
  )
}

export default ClaimKhalaAssets
