import {useEthersContract} from '@/hooks/useEthersContract'
import {useSwitchNetwork} from '@/hooks/useSwitchNetwork'
import {ethersContractAllowanceFetcher} from '@/lib/ethersFetcher'
import {assetAtom, bridgeErrorMessageAtom, fromChainAtom} from '@/store/bridge'
import {evmAccountAtom, isNetworkWrongAtom} from '@/store/ethers'
import {LoadingButton} from '@mui/lab'
import {Button, Stack} from '@mui/material'
import {useAtom} from 'jotai'
import {useSnackbar} from 'notistack'
import {FC, useState} from 'react'
import useSWR from 'swr'

const EvmAction: FC<{onConfirm: () => void}> = ({onConfirm}) => {
  const [approveLoading, setApproveLoading] = useState(false)
  const {enqueueSnackbar} = useSnackbar()
  const [fromChain] = useAtom(fromChainAtom)
  const [asset] = useAtom(assetAtom)
  const ethersAssetContract = useEthersContract('assetContract')
  const [evmAccount] = useAtom(evmAccountAtom)
  const [isNetworkWrong] = useAtom(isNetworkWrongAtom)
  const [bridgeErrorMessage] = useAtom(bridgeErrorMessageAtom)
  const switchNetwork = useSwitchNetwork()
  const decimals = asset.decimals[fromChain.id] || asset.decimals.default
  const spender =
    fromChain.kind === 'evm'
      ? asset.assetContract?.[fromChain.evmChainId].spender
      : undefined
  const {data: approved} = useSWR(
    ethersAssetContract && evmAccount && spender
      ? [ethersAssetContract, evmAccount, spender]
      : null,
    ethersContractAllowanceFetcher,
    {refreshInterval: (latestData) => (latestData ? 0 : 3000)}
  )
  const noApprovalRequired = !spender

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
      {!noApprovalRequired && (
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
        disabled={
          (!approved && !noApprovalRequired) || Boolean(bridgeErrorMessage)
        }
        onClick={onConfirm}
      >
        {(approved || noApprovalRequired) && bridgeErrorMessage
          ? bridgeErrorMessage
          : 'Transfer'}
      </Button>
    </Stack>
  )
}

export default EvmAction
