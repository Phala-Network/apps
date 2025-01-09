import khalaClaimerAbi from '@/assets/khala_claimer_abi'
import {
  khalaAssetsApi,
  khalaClaimerAddress,
  useClaimStatus,
  useKhalaAssetsQuery,
} from '@/hooks/khalaAssets'
import {walletDialogOpenAtom} from '@/store/ui'
import {CheckCircleOutline, ContentCopy} from '@mui/icons-material'
import {LoadingButton} from '@mui/lab'
import {
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {toCurrency, trimAddress, validateAddress} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import {decodeAddress} from '@polkadot/keyring'
import Identicon from '@polkadot/react-identicon'
import type {Signer} from '@polkadot/types/types'
import {stringToHex, u8aToHex} from '@polkadot/util'
import {ConnectKitButton} from 'connectkit'
import Decimal from 'decimal.js'
import {useAtom, useSetAtom} from 'jotai'
import NextLink from 'next/link'
import {useSnackbar} from 'notistack'
import {useEffect, useMemo, useState} from 'react'
import type {Hex} from 'viem'
import {mainnet, sepolia} from 'viem/chains'
import {useAccount, useWaitForTransactionReceipt, useWriteContract} from 'wagmi'
import Property from './Property'
import SwitchChainButton from './SwitchChainButton'

const targetChain = process.env.VERCEL_ENV === 'production' ? mainnet : sepolia

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
      <Stack
        component="form"
        display="flex"
        maxWidth={600}
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
        <Button type="submit" sx={{width: 120}}>
          Check
        </Button>
      </Stack>
    </>
  )
}

const ClaimKhalaAssets = () => {
  const {enqueueSnackbar} = useSnackbar()
  const setWalletDialogOpen = useSetAtom(walletDialogOpenAtom)
  const [loading, setLoading] = useState(false)
  const [checkAddress, setCheckAddress] = useState<string | undefined>(
    undefined,
  )
  const [selected, setSelected] = useState(false)
  const [accepted, setAccepted] = useState(false)
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
  const {claimed, logs} = useClaimStatus(h160Address)
  const tx = useMemo(() => {
    if (
      ethChain?.blockExplorers?.default == null ||
      logs?.[0]?.transactionHash == null
    ) {
      return undefined
    }

    const txHash = logs[0].transactionHash
    return {
      url: `https://${ethChain.blockExplorers.default.url}/tx/${txHash}`,
      hash: txHash,
      trimmedHash: trimAddress(txHash, 6, 6),
    }
  }, [ethChain, logs])
  const total = useMemo(() => {
    return data && Decimal.add(data.free, data.staked)
  }, [data])

  const {data: hash, writeContract} = useWriteContract()
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
  } = useWaitForTransactionReceipt({hash})

  useEffect(() => {
    if (isConfirmed) {
      setLoading(false)
      enqueueSnackbar('Claimed successfully', {variant: 'success'})
    }
  }, [isConfirmed, enqueueSnackbar])

  useEffect(() => {
    if (isError) {
      setLoading(false)
      enqueueSnackbar('Failed to claim', {variant: 'error'})
    }
  }, [isError, enqueueSnackbar])

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
    setLoading(true)
    let polkadotSignature: Hex
    try {
      const {signature} = await signRaw({
        address: polkadotAccount.address,
        data: stringToHex(`Khala Asset Receiver: ${receiver}`),
        type: 'bytes',
      })
      polkadotSignature = signature
    } catch (e) {
      setLoading(false)
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
        address: khalaClaimerAddress,
        functionName: 'claim',
        args: [h160, BigInt(free), BigInt(staked), receiver, signature],
      })
    } catch (e) {
      setLoading(false)
      return enqueueSnackbar('Failed to claim', {variant: 'error'})
    }
  }

  const onSwitchAccount = () => {
    if (polkadotAccount == null) {
      setCheckAddress(undefined)
    } else {
      setWalletDialogOpen(true)
    }
  }

  if (address == null) {
    return (
      <Box>
        <Stack alignItems="center" gap={2} py={6}>
          <Typography variant="body1">Connect wallet to claim</Typography>
          <Button
            onClick={() => {
              setWalletDialogOpen(true)
            }}
          >
            Connect wallet
          </Button>
        </Stack>

        <Divider flexItem />

        <Stack alignItems="center" py={4} gap={2}>
          <Typography variant="body1">Check your Khala account</Typography>
          <CheckKhalaAssets onCheck={setCheckAddress} />
        </Stack>
      </Box>
    )
  }

  return (
    <>
      <Stack alignItems="center" gap={1}>
        <Typography variant="h6">Total PHA Claimable</Typography>
        {total == null ? (
          <Skeleton width={150} height={36} />
        ) : (
          <Typography variant="num1">{toCurrency(total)}</Typography>
        )}
      </Stack>
      <Paper sx={{p: 2, bgcolor: 'transparent', mt: 2}}>
        <Stack gap={1}>
          <Property label="Free" size="small" fullWidth>
            {data ? (
              toCurrency(data.free)
            ) : (
              <Skeleton width={100} height={24} />
            )}
          </Property>
          <Property label="Staked" size="small" fullWidth>
            {data ? (
              toCurrency(data.staked)
            ) : (
              <Skeleton width={100} height={24} />
            )}
          </Property>
        </Stack>
      </Paper>

      <Box display="flex" alignItems="center" gap={2} height={52} px={2} my={2}>
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
                <Typography variant="h5" mt={4}>
                  Claimed successfully
                </Typography>
                <Typography variant="body2" mt={1}>
                  Staked PHA can be found on{' '}
                  <Link href="/staking" component={NextLink}>
                    staking page
                  </Link>
                </Typography>
                {tx != null && (
                  <Typography variant="body2" mt={1}>
                    Claim tx:{' '}
                    <Link href={tx.url} target="_blank">
                      {tx.trimmedHash}
                    </Link>
                  </Typography>
                )}
              </Stack>
            ) : (
              <>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle1">Ethereum wallet</Typography>
                  <ConnectKitButton />
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                  <SwitchChainButton>
                    <LoadingButton
                      disabled={!ethAddress}
                      fullWidth
                      type="submit"
                      loading={loading}
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
