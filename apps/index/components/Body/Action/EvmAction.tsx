import {useCurrentEthersAssetContract} from '@/hooks/useEthersContract'
import {useEthersBrowserProvider} from '@/hooks/useEthersProvider'
import {useSwitchNetwork} from '@/hooks/useSwitchNetwork'
import {
  chainInstanceAtom,
  errorMessageAtom,
  fromAmountAtom,
  fromAssetAtom,
  fromChainAtom,
} from '@/store/core'
import {evmAccountAtom, isNetworkWrongAtom} from '@/store/ethers'
import {LoadingButton} from '@mui/lab'
import {Button, Stack} from '@mui/material'
import {type EvmChain} from '@phala/index'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useSnackbar} from 'notistack'
import {useState, type FC} from 'react'
import useSWRImmutable from 'swr/immutable'

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
  const [chainInstance] = useAtom(chainInstanceAtom)
  const browserProvider = useEthersBrowserProvider()
  const needApproval =
    fromChain?.chainType === 'Evm' &&
    fromChain?.nativeAsset !== fromAsset?.location

  const {
    data: approvalTx,
    error,
    isLoading,
  } = useSWRImmutable(
    [chainInstance, fromAsset, fromAmount, evmAccount],
    async ([chainInstance, fromAsset, fromAmount, evmAccount]) => {
      if (
        fromAsset == null ||
        fromAmount.length === 0 ||
        evmAccount == null ||
        chainInstance == null
      ) {
        throw new Error()
      }
      const amount = BigInt(
        new Decimal(fromAmount)
          .times(Decimal.pow(10, fromAsset.decimals))
          .toHex(),
      )
      const tx = await (chainInstance as EvmChain).getApproval(
        fromAsset.location,
        evmAccount,
        amount,
      )
      return tx
    },
    {refreshInterval: (latestData) => (latestData == null ? 0 : 3000)},
  )

  const approved =
    fromAmount.length > 0 && approvalTx == null && !isLoading && error == null

  const handleApprove = async (amount: string): Promise<void> => {
    if (approvalTx != null && browserProvider != null) {
      setApproveLoading(true)
      try {
        const signer = await browserProvider.getSigner()
        const tx = await signer.sendTransaction(approvalTx)
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
          : 'Transfer'}
      </LoadingButton>
    </Stack>
  )
}

export default EvmAction
