import {useCurrentEthersAssetContract} from '@/hooks/useEthersContract'
import {useSwitchNetwork} from '@/hooks/useSwitchNetwork'
import {ethersContractAllowanceFetcher} from '@/lib/ethersFetcher'
import {
  bridgeErrorMessageAtom,
  bridgeInfoAtom,
  decimalsAtom,
  fromChainAtom,
  toChainAtom,
} from '@/store/bridge'
import {evmAccountAtom, isNetworkWrongAtom} from '@/store/ethers'
import {LoadingButton} from '@mui/lab'
import {Button, Stack} from '@mui/material'
import {useAtom, useAtomValue} from 'jotai'
import {useSnackbar} from 'notistack'
import {useState, type FC} from 'react'
import useSWR from 'swr'

const EvmAction: FC<{onConfirm: () => void}> = ({onConfirm}) => {
  const [approveLoading, setApproveLoading] = useState(false)
  const {enqueueSnackbar} = useSnackbar()
  const [fromChain] = useAtom(fromChainAtom)
  const [toChain] = useAtom(toChainAtom)
  const ethersAssetContract = useCurrentEthersAssetContract()
  const [evmAccount] = useAtom(evmAccountAtom)
  const [isNetworkWrong] = useAtom(isNetworkWrongAtom)
  const [bridgeErrorMessage] = useAtom(bridgeErrorMessageAtom)
  const {kind: bridgeKind} = useAtomValue(bridgeInfoAtom)
  const switchNetwork = useSwitchNetwork()
  const decimals = useAtomValue(decimalsAtom)
  const needApproval = bridgeKind === 'evmChainBridge'
  let spender: string | undefined
  if (fromChain.kind === 'evm' && fromChain.chainBridgeContract != null) {
    spender =
      fromChain.chainBridgeContract.spender[toChain.id] ??
      fromChain.chainBridgeContract.spender.default
  }

  const {data: approved} = useSWR(
    needApproval &&
      ethersAssetContract != null &&
      evmAccount != null &&
      spender != null && [ethersAssetContract, evmAccount, spender],
    ethersContractAllowanceFetcher,
    {refreshInterval: (latestData) => (latestData === true ? 0 : 3000)}
  )

  const handleApprove = async (): Promise<void> => {
    if (ethersAssetContract != null && spender != null) {
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
          loading={(approved === false && approveLoading) || approved == null}
          size="large"
          sx={{flex: 1}}
          disabled={
            approved === undefined ||
            approved ||
            ethersAssetContract == null ||
            spender == null
          }
          onClick={() => {
            void handleApprove()
          }}
        >
          {approved === true ? 'Approved' : 'Approve'}
        </LoadingButton>
      )}
      <Button
        size="large"
        sx={{flex: 1}}
        variant="contained"
        disabled={
          (approved !== true && needApproval) || bridgeErrorMessage != null
        }
        onClick={onConfirm}
      >
        {(approved === true || !needApproval) && bridgeErrorMessage != null
          ? bridgeErrorMessage
          : 'Transfer'}
      </Button>
    </Stack>
  )
}

export default EvmAction
