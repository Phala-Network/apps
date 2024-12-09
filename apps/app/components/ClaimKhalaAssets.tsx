import khalaClaimerAbi from '@/assets/khala_claimer_abi'
import {khalaClaimerAddress, useClaimStatus} from '@/hooks/claimKhalaAssets'
import {walletDialogOpenAtom} from '@/store/ui'
import {ContentCopy} from '@mui/icons-material'
import {LoadingButton} from '@mui/lab'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {toCurrency, trimAddress} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import phaIcon from '@phala/ui/icons/asset/pha.png'
import {decodeAddress} from '@polkadot/keyring'
import Identicon from '@polkadot/react-identicon'
import type {Signer} from '@polkadot/types/types'
import {stringToHex, u8aToHex} from '@polkadot/util'
import {useQuery} from '@tanstack/react-query'
import {ConnectKitButton} from 'connectkit'
import {useAtom} from 'jotai'
import Image from 'next/image'
import {useSnackbar} from 'notistack'
import {useMemo, useState} from 'react'
import {type Hex, formatUnits, isAddress} from 'viem'
import {useAccount, useWaitForTransactionReceipt, useWriteContract} from 'wagmi'
import wretch from 'wretch'
import Property from './Property'

const api = wretch('http://localhost:4004')

const ClaimKhalaAssets = () => {
  const [, setWalletDialogOpen] = useAtom(walletDialogOpenAtom)
  const {enqueueSnackbar} = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [customReceiver, setCustomReceiver] = useState('')
  const [useCustomReceiver, setUseCustomReceiver] = useState(false)
  const account = useAccount()
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const {data} = useQuery({
    queryKey: ['claim-khala-assets', 'balance', polkadotAccount?.address],
    queryFn: () =>
      api
        .get(`/balance/${polkadotAccount?.address}`)
        .json<{free: string; staked: string}>(),
    enabled: polkadotAccount != null,
  })
  const h160Address = useMemo(() => {
    if (polkadotAccount == null) {
      return undefined
    }
    const publicKey = decodeAddress(polkadotAccount.address)
    const h160 = u8aToHex(publicKey).slice(0, 42) as Hex
    return h160
  }, [polkadotAccount])
  const {claimed, logs} = useClaimStatus(h160Address)
  const total = useMemo(() => {
    return data && BigInt(data.free) + BigInt(data.staked)
  }, [data])

  const receiver = useMemo(() => {
    if (useCustomReceiver) {
      return customReceiver
    }
    return account.address
  }, [useCustomReceiver, customReceiver, account.address])

  const {data: hash, writeContract} = useWriteContract()
  const {isLoading: isConfirming, isSuccess: isConfirmed} =
    useWaitForTransactionReceipt({hash})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!receiver || !isAddress(receiver)) {
      setLoading(false)
      return enqueueSnackbar('Invalid receiver address', {variant: 'error'})
    }
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
      const {h160, free, staked, signature} = await api
        .url('/verify')
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
      setLoading(false)
      enqueueSnackbar('Claimed successfully', {variant: 'success'})
    } catch (e) {
      setLoading(false)
      return enqueueSnackbar('Failed to claim', {variant: 'error'})
    }
  }

  if (polkadotAccount == null) {
    return (
      <Stack alignItems="center" justifyContent="center">
        <Button
          onClick={() => {
            setWalletDialogOpen(true)
          }}
        >
          Connect Wallet
        </Button>
      </Stack>
    )
  }

  return (
    <>
      <Paper sx={{background: 'transparent', p: 2}}>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          flexDirection={{xs: 'column', md: 'row'}}
        >
          <Box display="flex" flex={1} alignItems="center" gap={2}>
            <Identicon
              value={polkadotAccount.address}
              theme="polkadot"
              size={36}
            />
            <Stack>
              <Typography
                variant="subtitle1"
                component="div"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                minWidth={0}
              >
                {polkadotAccount.name}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                sx={{cursor: 'pointer'}}
                onClick={() => {
                  navigator.clipboard.writeText(polkadotAccount.address)
                  enqueueSnackbar('Copied to clipboard')
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {trimAddress(polkadotAccount.address, 6, 6)}
                </Typography>
                <ContentCopy sx={{ml: 1, width: 16}} color="disabled" />
              </Stack>
            </Stack>
            <Button
              variant="text"
              sx={{ml: 'auto'}}
              size="small"
              onClick={() => {
                setWalletDialogOpen(true)
              }}
            >
              Switch account
            </Button>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{display: {xs: 'none', md: 'block'}}}
          />
          <Divider
            orientation="horizontal"
            flexItem
            sx={{display: {xs: 'block', md: 'none'}}}
          />
          <Box
            flex={1}
            display="flex"
            gap={2}
            alignItems="center"
            flexWrap="wrap"
          >
            <Image src={phaIcon} width={36} height={36} alt="PHA" />

            <Property label="Khala PHA" flex={1}>
              {total != null ? (
                toCurrency(formatUnits(total, 12))
              ) : (
                <Skeleton width={100} height={24} />
              )}
            </Property>
            <Box flex={1}>
              <Property label="Free" size="small" fullWidth>
                {data ? (
                  toCurrency(formatUnits(BigInt(data.free), 12))
                ) : (
                  <Skeleton width={100} height={24} />
                )}
              </Property>
              <Property label="Staked" size="small" fullWidth>
                {data ? (
                  toCurrency(formatUnits(BigInt(data.staked), 12))
                ) : (
                  <Skeleton width={100} height={24} />
                )}
              </Property>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Paper sx={{background: 'transparent', p: 2, mt: 2}}>
        <Box display="flex" flexDirection={{xs: 'column', md: 'row'}} gap={4}>
          <Box flex={1}>
            <Typography variant="body1">Some docs</Typography>
          </Box>
          <Box flex={1} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Claim</Typography>
            <Typography variant="body1">
              Claimed: {claimed ? 'Yes' : 'No'}
            </Typography>
            <Typography variant="body1" sx={{wordBreak: 'break-all'}}>
              Tx: {logs?.[0]?.transactionHash}
            </Typography>

            <ConnectKitButton showBalance />
            <FormControlLabel
              control={
                <Checkbox
                  checked={useCustomReceiver}
                  onChange={(e) => setUseCustomReceiver(e.target.checked)}
                />
              }
              label="Use custom receiver"
            />
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                placeholder="0x..."
                disabled={loading || !useCustomReceiver}
                value={useCustomReceiver ? customReceiver : account.address}
                fullWidth
                size="small"
                onChange={(e) => {
                  setCustomReceiver(e.target.value)
                }}
              />

              <LoadingButton
                fullWidth
                sx={{mt: 2}}
                type="submit"
                loading={loading}
                variant="contained"
              >
                Claim
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  )
}

export default ClaimKhalaAssets
