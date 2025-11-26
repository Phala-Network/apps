'use client'

import {CheckCircleOutline, ContentCopy} from '@mui/icons-material'
import {
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
import phaIcon from '@phala/ui/icons/asset/pha.png'
import vphaIcon from '@phala/ui/icons/asset/vpha.png'
import {decodeAddress} from '@polkadot/keyring'
import Identicon from '@polkadot/react-identicon'
import type {Signer} from '@polkadot/types/types'
import {stringToHex, u8aToHex} from '@polkadot/util'
import {useAppKitAccount} from '@reown/appkit/react'
import Decimal from 'decimal.js'
import {useAtom, useSetAtom} from 'jotai'
import Image from 'next/image'
import {useSnackbar} from 'notistack'
import {useEffect, useMemo, useState} from 'react'
import type {Hex} from 'viem'
import {useWaitForTransactionReceipt, useWriteContract} from 'wagmi'

import khalaClaimerAbi from '@/assets/khala_claimer_abi'
import phalaClaimerAbi from '@/assets/phala_claimer_abi'
import AppKitButton from '@/components/app-kit-button'
import ChainBadge from '@/components/chain-badge'
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
    const freeAmount = new Decimal(log.free).div(1e18)
    // staked is in vPHA units
    const stakedVPHA = new Decimal(log.staked).div(1e18)

    // Convert vPHA to PHA based on chain
    let stakedPHA: Decimal
    if (chain === 'phala') {
      // For Phala, use fixed snapshot rate
      stakedPHA = stakedVPHA.mul(PHALA_SHARE_PRICE)
    } else {
      // For Khala, vPHA price is 1:1 (no conversion needed)
      stakedPHA = stakedVPHA
    }

    const totalAmount = freeAmount.add(stakedPHA)

    return {
      url: `${explorerUrl}/tx/${txHash}`,
      hash: txHash,
      trimmedHash: trimAddress(txHash),
      receiver: log.receiver,
      l1Receiver: 'l1Receiver' in log ? log.l1Receiver : undefined,
      timestamp: log.timestamp_,
      free: freeAmount,
      stakedVPHA, // Original vPHA amount
      stakedPHA, // Converted PHA amount
      total: totalAmount,
    }
  }, [log, chain, sharePrice])

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
    // For Khala, vPHA price is 1:1, use current share price minus 1 for rewards
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
      <Paper sx={{p: 3, bgcolor: 'transparent', mt: 3}}>
        <Stack gap={1.5}>
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
                  ({toCurrency(data.staked)} vPHA on Phala Mainnet)
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

      <Box display="flex" alignItems="center" gap={2} height={52} px={2} my={4}>
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
              {trimAddress(address)}
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
          <Divider sx={{my: 1}} />

          <Stack gap={4} mt={4}>
            {claimed ? (
              <Stack gap={3}>
                {/* Header */}
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <CheckCircleOutline
                    sx={{width: 24, height: 24}}
                    color="success"
                  />
                  <Typography variant="h6" fontWeight="medium">
                    Claimed
                  </Typography>
                  {logData && (
                    <Stack sx={{ml: 'auto'}} alignItems="flex-end">
                      <Link href={logData.url} target="_blank">
                        <Typography variant="body2">
                          {logData.trimmedHash}
                        </Typography>
                      </Link>
                      {logData.timestamp && (
                        <Typography variant="caption" color="text.secondary">
                          {new Date(
                            Number.parseInt(logData.timestamp) * 1000,
                          ).toLocaleString()}
                        </Typography>
                      )}
                    </Stack>
                  )}
                </Stack>

                {/* Claim Details */}
                {logData ? (
                  <Stack gap={2}>
                    {chain === 'phala' ? (
                      <>
                        {/* Free PHA to Ethereum */}
                        {logData.free.gt(0) && (
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Stack direction="row" alignItems="center" gap={1}>
                              <Image
                                src={phaIcon}
                                alt="PHA"
                                width={20}
                                height={20}
                              />
                              <Typography variant="body2">
                                {toCurrency(logData.free)} PHA
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                →
                              </Typography>
                              <Link
                                href={`${explorerUrl}/address/${logData.l1Receiver}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Typography variant="body2">
                                  {trimAddress(logData.l1Receiver ?? '')}
                                </Typography>
                              </Link>
                            </Stack>
                            <ChainBadge chain="ethereum" />
                          </Stack>
                        )}

                        {/* Staked vPHA to Phala Mainnet */}
                        {logData.stakedVPHA.gt(0) && (
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Stack direction="row" alignItems="center" gap={1}>
                              <Image
                                src={vphaIcon}
                                alt="vPHA"
                                width={20}
                                height={20}
                              />
                              <Typography variant="body2">
                                {toCurrency(logData.stakedVPHA)} vPHA
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                →
                              </Typography>
                              <Link
                                href={`https://explorer.phala.network/address/${logData.receiver}?tab=tokens`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Typography variant="body2">
                                  {trimAddress(logData.receiver)}
                                </Typography>
                              </Link>
                            </Stack>
                            <ChainBadge chain="phala" />
                          </Stack>
                        )}
                      </>
                    ) : (
                      <>
                        {/* Khala: Free PHA to Ethereum */}
                        {logData.free.gt(0) && (
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Stack direction="row" alignItems="center" gap={1}>
                              <Image
                                src={phaIcon}
                                alt="PHA"
                                width={20}
                                height={20}
                              />
                              <Typography variant="body2">
                                {toCurrency(logData.free)} PHA
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                →
                              </Typography>
                              <Link
                                href={`${explorerUrl}/address/${logData.receiver}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Typography variant="body2">
                                  {trimAddress(logData.receiver)}
                                </Typography>
                              </Link>
                            </Stack>
                            <ChainBadge chain="ethereum" />
                          </Stack>
                        )}

                        {/* Khala: Staked vPHA to Ethereum */}
                        {logData.stakedVPHA.gt(0) && (
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Stack direction="row" alignItems="center" gap={1}>
                              <Image
                                src={vphaIcon}
                                alt="vPHA"
                                width={20}
                                height={20}
                              />
                              <Typography variant="body2">
                                {toCurrency(logData.stakedVPHA)} vPHA
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                →
                              </Typography>
                              <Link
                                href={`${explorerUrl}/address/${logData.receiver}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Typography variant="body2">
                                  {trimAddress(logData.receiver)}
                                </Typography>
                              </Link>
                            </Stack>
                            <ChainBadge chain="ethereum" />
                          </Stack>
                        )}
                      </>
                    )}
                  </Stack>
                ) : (
                  <Skeleton
                    variant="rectangular"
                    height={60}
                    sx={{borderRadius: 1}}
                  />
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
