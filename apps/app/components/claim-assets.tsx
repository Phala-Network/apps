'use client'

import {CheckCircleOutline, ContentCopy} from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Skeleton,
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
import {useAppKitAccount} from '@reown/appkit/react'
import Decimal from 'decimal.js'
import {useAtom, useSetAtom} from 'jotai'
import NextLink from 'next/link'
import {useSnackbar} from 'notistack'
import {useEffect, useMemo, useState} from 'react'
import type {Hex} from 'viem'
import {useWaitForTransactionReceipt, useWriteContract} from 'wagmi'

import khalaClaimerAbi from '@/assets/khala_claimer_abi'
import phalaClaimerAbi from '@/assets/phala_claimer_abi'
import AppKitButton from '@/components/app-kit-button'
import Property from '@/components/property'
import SwitchChainButton from '@/components/switch-chain-button'
import {
  explorerUrl,
  KHALA_CLAIMER_CONTRACT_ADDRESS,
  PHALA_CLAIMER_CONTRACT_ADDRESS,
} from '@/config'
import {
  type ChainType,
  khalaAssetsApi,
  phalaAssetsApi,
  useAssetsQuery,
  useClaimStatus,
} from '@/hooks/khala-assets'
import {useSharePrice} from '@/hooks/staking'
import {useAutoSwitchChain} from '@/hooks/use-auto-switch-chain'
import {toAddress} from '@/lib/wagmi'
import {walletDialogOpenAtom} from '@/store/ui'

const Steps = () => {
  return (
    <Stepper alternativeLabel>
      <Step active>
        <StepLabel>Sign with account</StepLabel>
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

export const CheckAssets = ({
  onCheck,
  chain,
}: {
  onCheck: (address: string) => void
  chain: ChainType
}) => {
  const {enqueueSnackbar} = useSnackbar()
  const [checkAddressInput, setCheckAddressInput] = useState('')
  const chainLabel = chain.charAt(0).toUpperCase() + chain.slice(1)

  const handleCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateAddress(checkAddressInput)) {
      onCheck(checkAddressInput)
    } else {
      enqueueSnackbar(`Invalid ${chainLabel} address`, {variant: 'error'})
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
          placeholder={`${chainLabel} account`}
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

// Phala staking rewards exchange rate (vPHA to PHA)
// This rate is fixed at the snapshot when Phala chain stopped
const PHALA_SHARE_PRICE = new Decimal('42148385.793480375048').div(
  '35407137.584585511432035582',
)

const ClaimAssets = ({chain}: {chain: ChainType}) => {
  const {enqueueSnackbar} = useSnackbar()
  const setWalletDialogOpen = useSetAtom(walletDialogOpenAtom)
  const [isSigning, setIsSigning] = useState(false)
  const [checkAddress, setCheckAddress] = useState<string | undefined>(
    undefined,
  )
  useAutoSwitchChain()
  const sharePrice = useSharePrice()
  const {address: rawEthAddress} = useAppKitAccount()
  const ethAddress = toAddress(rawEthAddress)
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const address = checkAddress ?? polkadotAccount?.address
  const {data} = useAssetsQuery(address, chain)
  const h160Address = useMemo(() => {
    if (address == null) {
      return undefined
    }
    const publicKey = decodeAddress(address)
    const h160 = u8aToHex(publicKey).slice(0, 42) as Hex
    return h160
  }, [address])
  const {claimed, log, refetch} = useClaimStatus(h160Address, chain)
  const logData = useMemo(() => {
    if (log == null) {
      return undefined
    }

    const txHash = log.transactionHash_
    return {
      url: `${explorerUrl}/tx/${txHash}`,
      hash: txHash,
      trimmedHash: trimAddress(txHash, 6, 6),
      receiver: log.receiver,
      l1Receiver: 'l1Receiver' in log ? log.l1Receiver : undefined,
      timestamp: log.timestamp_,
    }
  }, [log])

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
        data: stringToHex(
          `${chain.charAt(0).toUpperCase() + chain.slice(1)} Asset Receiver: ${receiver}`,
        ),
        type: 'bytes',
      })
      polkadotSignature = signature
    } catch (e) {
      setIsSigning(false)
      return
    }

    try {
      const api = chain === 'khala' ? khalaAssetsApi : phalaAssetsApi
      const {h160, free, staked, signature} = await api
        .url('/claim')
        .post({
          address: polkadotAccount.address,
          signature: polkadotSignature,
          receiver,
        })
        .json<{h160: Hex; free: string; staked: string; signature: Hex}>()

      const contractAddress =
        chain === 'khala'
          ? KHALA_CLAIMER_CONTRACT_ADDRESS
          : PHALA_CLAIMER_CONTRACT_ADDRESS

      const contractAbi = chain === 'khala' ? khalaClaimerAbi : phalaClaimerAbi

      writeContract({
        abi: contractAbi,
        address: contractAddress,
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

  // Convert vPHA delegation to real PHA for Phala chain
  const delegationInPHA = useMemo(() => {
    if (chain !== 'phala' || data?.staked == null) {
      return undefined
    }
    return new Decimal(data.staked).mul(PHALA_SHARE_PRICE)
  }, [chain, data?.staked])

  const rewards = useMemo(() => {
    if (data?.staked == null) {
      return
    }
    if (chain === 'phala') {
      // For Phala, use current share price minus snapshot share price
      if (sharePrice == null) {
        return
      }
      const currentRate = new Decimal(sharePrice.toString()).div(1e18)
      const reward = currentRate.minus(PHALA_SHARE_PRICE).mul(data.staked)
      // Ensure rewards are non-negative (handle rounding errors)
      return Decimal.max(0, reward)
    }
    // For Khala, use current share price minus 1
    if (sharePrice == null) {
      return
    }
    const reward = new Decimal(sharePrice.toString())
      .div(1e18)
      .minus(1)
      .mul(data.staked)
    // Ensure rewards are non-negative (handle rounding errors)
    return Decimal.max(0, reward)
  }, [sharePrice, data?.staked, chain])

  const total = useMemo(() => {
    if (data == null || rewards == null) {
      return
    }
    // For Phala, use converted delegation amount; for Khala, use staked amount as is
    const stakedAmount = delegationInPHA ?? data.staked
    return Decimal.add(data.free, stakedAmount).add(rewards)
  }, [data, rewards, delegationInPHA])

  const chainLabel = chain.charAt(0).toUpperCase() + chain.slice(1)

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
          <Typography variant="body1">
            Check your {chainLabel} account
          </Typography>
          <CheckAssets onCheck={setCheckAddress} chain={chain} />
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
            {data ? toCurrency(data.free) : '-'}
          </Property>
          <Property label="Delegation" size="small" fullWidth wrapDecimal>
            {delegationInPHA && data ? (
              <Stack component="span" gap={0.5} alignItems="flex-end">
                <Box component="span">{toCurrency(delegationInPHA)}</Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  component="span"
                >
                  ({toCurrency(data.staked)} vPHA)
                </Typography>
              </Stack>
            ) : data ? (
              toCurrency(data.staked)
            ) : (
              '-'
            )}
          </Property>
          <Property label="Staking Rewards" size="small" fullWidth wrapDecimal>
            {rewards ? toCurrency(rewards) : '-'}
          </Property>
        </Stack>
      </Paper>

      {chain === 'phala' && (
        <Alert severity="info" sx={{mt: 2}}>
          <Typography variant="body2">
            <strong>Notice:</strong> Staked PHA will be claimed to{' '}
            <Link
              href="https://explorer.phala.network/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Phala L2
            </Link>
          </Typography>
        </Alert>
      )}

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
            {polkadotAccount?.name ?? `${chainLabel} account`}
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
                {chain === 'phala' ? (
                  <Typography variant="body2" mt={1} color="text.secondary">
                    View your assets on{' '}
                    <Link
                      href={`${explorerUrl}/address/${logData?.l1Receiver || ethAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ethereum
                    </Link>
                    {' and '}
                    <Link
                      href={`https://explorer.phala.network/address/${logData?.receiver || ethAddress}?tab=tokens`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Phala L2
                    </Link>
                  </Typography>
                ) : (
                  <Typography variant="body2" mt={1} color="text.secondary">
                    Staked PHA and rewards are available on the staking page
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  mt={1}
                  display="flex"
                  gap={1}
                  alignItems="center"
                >
                  Tx:{' '}
                  {logData ? (
                    <Link href={logData.url} target="_blank">
                      {logData.trimmedHash}
                    </Link>
                  ) : (
                    <Skeleton width={100} height={20} />
                  )}
                </Typography>
                {chain === 'phala' && logData?.l1Receiver && (
                  <Typography
                    variant="body2"
                    mt={1}
                    display="flex"
                    gap={1}
                    alignItems="center"
                  >
                    Ethereum Receiver:{' '}
                    <Link
                      href={`${explorerUrl}/address/${logData.l1Receiver}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {trimAddress(logData.l1Receiver, 6, 6)}
                    </Link>
                  </Typography>
                )}
                {logData?.receiver && (
                  <Typography
                    variant="body2"
                    mt={1}
                    display="flex"
                    gap={1}
                    alignItems="center"
                  >
                    {chain === 'phala' ? 'Phala L2 Receiver' : 'Receiver'}:{' '}
                    <Link
                      href={
                        chain === 'phala'
                          ? `https://explorer.phala.network/address/${logData.receiver}?tab=tokens`
                          : `${explorerUrl}/address/${logData.receiver}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {trimAddress(logData.receiver, 6, 6)}
                    </Link>
                  </Typography>
                )}
                {logData?.timestamp && (
                  <Typography
                    variant="body2"
                    mt={1}
                    display="flex"
                    gap={1}
                    alignItems="center"
                  >
                    Time:{' '}
                    {new Date(
                      Number.parseInt(logData.timestamp) * 1000,
                    ).toLocaleString()}
                  </Typography>
                )}
                {chain === 'khala' && (
                  <Button
                    variant="contained"
                    sx={{mt: 3}}
                    LinkComponent={NextLink}
                    href="/staking"
                  >
                    Go to Staking
                  </Button>
                )}
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
                  <AppKitButton />
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                  <SwitchChainButton>
                    <Button
                      variant="contained"
                      disabled={!ethAddress || !isClaimable}
                      fullWidth
                      type="submit"
                      loading={isLoading}
                    >
                      Claim
                    </Button>
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

export default ClaimAssets
