import {useCurrentEthersAssetContract} from '@/hooks/useEthersContract'
import {useSwitchNetwork} from '@/hooks/useSwitchNetwork'
import {ethersContractAllowanceFetcher} from '@/lib/ethersFetcher'
import {ChainType} from '@/lib/fetchConfig'
import {
  errorMessageAtom,
  fromAmountAtom,
  fromAssetAtom,
  fromChainAtom,
} from '@/store/core'
import {evmAccountAtom, isNetworkWrongAtom} from '@/store/ethers'
import {LoadingButton} from '@mui/lab'
import {Button, Stack} from '@mui/material'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useSnackbar} from 'notistack'
import {useEffect, useState, type FC} from 'react'
import useSWR from 'swr'

const EvmAction: FC<{onConfirm: () => void; loading: boolean}> = ({
  onConfirm,
  loading,
}) => {
  const [approveLoading, setApproveLoading] = useState(false)
  const {enqueueSnackbar} = useSnackbar()
  const [fromChain] = useAtom(fromChainAtom)
  const [fromAsset] = useAtom(fromAssetAtom)
  const [fromAmount] = useAtom(fromAmountAtom)
  const ethersAssetContract = useCurrentEthersAssetContract()
  const [evmAccount] = useAtom(evmAccountAtom)
  const [isNetworkWrong] = useAtom(isNetworkWrongAtom)
  const [errorMessage] = useAtom(errorMessageAtom)
  const switchNetwork = useSwitchNetwork()
  const needApproval =
    fromChain.chainType === ChainType.EVM &&
    fromChain.nativeAsset !== fromAsset.id
  const spender = fromChain.handlerContract

  const {data: allowance} = useSWR(
    needApproval &&
      ethersAssetContract != null &&
      evmAccount != null &&
      spender != null && [ethersAssetContract, evmAccount, spender],
    ethersContractAllowanceFetcher,
    {
      refreshInterval: (latestData) =>
        fromAmount.length > 0 &&
        latestData != null &&
        latestData.gte(
          new Decimal(fromAmount).times(Decimal.pow(10, fromAsset.decimals)),
        )
          ? 0
          : 3000,
    },
  )
  const allowanceString = allowance?.toString()

  useEffect(() => {
    if (allowanceString != null) {
      setApproveLoading(false)
    }
  }, [allowanceString])

  const approved =
    fromAmount.length > 0 &&
    allowance != null &&
    allowance.gte(
      new Decimal(fromAmount).times(Decimal.pow(10, fromAsset.decimals)),
    )

  const handleApprove = async (amount: string): Promise<void> => {
    if (ethersAssetContract != null && spender != null) {
      setApproveLoading(true)
      try {
        const {ethers} = await import('ethers')
        const tx = await ethersAssetContract.approve(
          spender,
          ethers.parseUnits(amount, fromAsset.decimals),
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
      {needApproval && (
        <LoadingButton
          loading={!approved && approveLoading}
          size="large"
          sx={{flex: 1}}
          disabled={
            fromAmount.length === 0 || approved || ethersAssetContract == null
          }
          onClick={() => {
            void handleApprove(fromAmount)
          }}
        >
          {approved ? 'Approved' : 'Approve'}
        </LoadingButton>
      )}
      <LoadingButton
        loading={loading}
        size="large"
        sx={{flex: 1}}
        variant="contained"
        disabled={(!approved && needApproval) || errorMessage != null}
        onClick={onConfirm}
      >
        {(approved || !needApproval) && errorMessage != null
          ? errorMessage
          : 'Deposit'}
      </LoadingButton>
    </Stack>
  )
}

export default EvmAction
