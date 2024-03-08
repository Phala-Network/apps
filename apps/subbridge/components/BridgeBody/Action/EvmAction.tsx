import type {EvmChain} from '@/config/chain'
import {useCurrentEthersAssetContract} from '@/hooks/useEthersContract'
import {useSwitchNetwork} from '@/hooks/useSwitchNetwork'
import {ethersContractAllowanceFetcher} from '@/lib/ethersFetcher'
import {
  amountAtom,
  bridgeErrorMessageAtom,
  bridgeInfoAtom,
  decimalsAtom,
  fromChainAtom,
} from '@/store/bridge'
import {evmAccountAtom, isNetworkWrongAtom} from '@/store/ethers'
import {LoadingButton} from '@mui/lab'
import {Button, Stack} from '@mui/material'
import Decimal from 'decimal.js'
import {useAtom, useAtomValue} from 'jotai'
import {useSnackbar} from 'notistack'
import {type FC, useEffect, useState} from 'react'
import useSWR from 'swr'

const EvmAction: FC<{onConfirm: () => void}> = ({onConfirm}) => {
  const [approveLoading, setApproveLoading] = useState(false)
  const {enqueueSnackbar} = useSnackbar()
  const [fromChain] = useAtom(fromChainAtom)
  const [amount] = useAtom(amountAtom)
  const ethersAssetContract = useCurrentEthersAssetContract()
  const [evmAccount] = useAtom(evmAccountAtom)
  const [isNetworkWrong] = useAtom(isNetworkWrongAtom)
  const [bridgeErrorMessage] = useAtom(bridgeErrorMessageAtom)
  const {kind: bridgeKind} = useAtomValue(bridgeInfoAtom)
  const switchNetwork = useSwitchNetwork()
  const decimals = useAtomValue(decimalsAtom)
  const needApproval = bridgeKind === 'evmSygma'
  let spender: string | undefined
  if (bridgeKind === 'evmSygma') {
    spender = (fromChain as EvmChain).sygmaHandler
  }
  const {data: allowance} = useSWR(
    needApproval &&
      ethersAssetContract != null &&
      evmAccount != null &&
      spender != null && [ethersAssetContract, evmAccount, spender],
    ethersContractAllowanceFetcher,
    {
      refreshInterval: (latestData) =>
        amount.length > 0 &&
        latestData != null &&
        latestData.gte(new Decimal(amount).times(Decimal.pow(10, decimals)))
          ? 0
          : 3000,
    },
  )
  const allowanceString = allowance?.toString()

  const approved =
    amount.length > 0 &&
    allowance != null &&
    allowance.gte(new Decimal(amount).times(Decimal.pow(10, decimals)))

  useEffect(() => {
    if (allowanceString != null) {
      setApproveLoading(false)
    }
  }, [allowanceString])

  const handleApprove = async (): Promise<void> => {
    if (ethersAssetContract != null && spender != null) {
      setApproveLoading(true)
      try {
        const tx = await ethersAssetContract.approve(
          spender,
          new Decimal(amount)
            .toDP(0, Decimal.ROUND_UP)
            .times(Decimal.pow(10, decimals))
            .toHex(),
        )
        await tx.wait()
        setApproveLoading(false)
      } catch (err) {
        if (err instanceof Error) {
          enqueueSnackbar(err.message, {variant: 'error'})
        }
        setApproveLoading(false)
        throw err
      }
    }
  }

  if (isNetworkWrong) {
    return (
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          void switchNetwork()
        }}
        fullWidth
      >
        Switch Network
      </Button>
    )
  }

  return (
    <Stack
      direction={{xs: 'column', sm: 'row'}}
      spacing={2}
      sx={{
        mx: 'auto',
      }}
    >
      {needApproval && bridgeErrorMessage == null && (
        <LoadingButton
          loading={!approved && approveLoading}
          size="large"
          sx={{flex: 1}}
          disabled={
            amount.length === 0 || approved || ethersAssetContract == null
          }
          onClick={() => {
            void handleApprove()
          }}
        >
          {approved ? 'Approved' : 'Approve'}
        </LoadingButton>
      )}
      <Button
        size="large"
        sx={{flex: 1}}
        variant="contained"
        disabled={(!approved && needApproval) || bridgeErrorMessage != null}
        onClick={onConfirm}
      >
        {bridgeErrorMessage ?? 'Transfer'}
      </Button>
    </Stack>
  )
}

export default EvmAction
