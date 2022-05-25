import {useEthersAssetContract} from '@/hooks/useEthersContract'
import {useSwitchNetwork} from '@/hooks/useSwitchNetwork'
import {ethersContractAllowanceFetcher} from '@/lib/ethersFetcher'
import {
  bridgeErrorMessageAtom,
  bridgeInfoAtom,
  decimalsAtom,
  fromChainAtom,
} from '@/store/bridge'
import {evmAccountAtom, isNetworkWrongAtom} from '@/store/ethers'
import {LoadingButton} from '@mui/lab'
import {Button, Stack} from '@mui/material'
import {useAtom, useAtomValue} from 'jotai'
import {useSnackbar} from 'notistack'
import {FC, useState} from 'react'
import useSWR from 'swr'

const EvmAction: FC<{onConfirm: () => void}> = ({onConfirm}) => {
  const [approveLoading, setApproveLoading] = useState(false)
  const {enqueueSnackbar} = useSnackbar()
  const [fromChain] = useAtom(fromChainAtom)
  const ethersAssetContract = useEthersAssetContract()
  const [evmAccount] = useAtom(evmAccountAtom)
  const [isNetworkWrong] = useAtom(isNetworkWrongAtom)
  const [bridgeErrorMessage] = useAtom(bridgeErrorMessageAtom)
  const {kind: bridgeKind} = useAtomValue(bridgeInfoAtom)
  const switchNetwork = useSwitchNetwork()
  const decimals = useAtomValue(decimalsAtom)
  const needApproval = bridgeKind === 'evmChainBridge'
  const spender =
    fromChain.kind === 'evm'
      ? fromChain.chainBridgeContract?.spender
      : undefined
  const {data: approved} = useSWR(
    needApproval && ethersAssetContract && evmAccount && spender
      ? [ethersAssetContract, evmAccount, spender]
      : null,
    ethersContractAllowanceFetcher,
    {refreshInterval: (latestData) => (latestData ? 0 : 3000)}
  )

  const handleApprove = async () => {
    if (ethersAssetContract && spender) {
      setApproveLoading(true)
      try {
        const {ethers} = await import('ethers')
        await ethersAssetContract.approve(
          spender,
          ethers.utils.parseUnits('1000000000', decimals)
        )
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
        onClick={() => switchNetwork()}
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
          loading={(!approved && approveLoading) || approved === undefined}
          size="large"
          sx={{flex: 1}}
          disabled={
            approved === undefined ||
            approved ||
            !ethersAssetContract ||
            !spender
          }
          onClick={handleApprove}
        >
          {approved ? 'Approved' : 'Approve'}
        </LoadingButton>
      )}
      <Button
        size="large"
        sx={{flex: 1}}
        variant="contained"
        disabled={(!approved && needApproval) || Boolean(bridgeErrorMessage)}
        onClick={onConfirm}
      >
        {(approved || !needApproval) && bridgeErrorMessage
          ? bridgeErrorMessage
          : 'Transfer'}
      </Button>
    </Stack>
  )
}

export default EvmAction
