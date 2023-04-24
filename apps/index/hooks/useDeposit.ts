import {ChainType} from '@/lib/fetchConfig'
import {
  destinationAccountAtom,
  fromAmountAtom,
  fromAssetAtom,
  fromChainAtom,
} from '@/store/core'
import {waitSignAndSend} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import {isHex, u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useEthersHandlerContract} from './useEthersContract'
import {useEthersBrowserProvider} from './useEthersProvider'
import {useCurrentPolkadotApi} from './usePolkadotApi'
import useSolutions from './useSolutions'

const useDeposit = (): (({
  onReady,
}: {
  onReady?: () => void
}) => Promise<void>) => {
  const [fromChain] = useAtom(fromChainAtom)
  const [fromAsset] = useAtom(fromAssetAtom)
  const [fromAmount] = useAtom(fromAmountAtom)
  const {data: solutions} = useSolutions()
  const [destinationAccount] = useAtom(destinationAccountAtom)
  const ethersProvider = useEthersBrowserProvider()
  const handlerContract = useEthersHandlerContract(
    ethersProvider,
    fromChain.handlerContract,
  )
  const polkadotApi = useCurrentPolkadotApi()
  const [polkadotAccount] = useAtom(polkadotAccountAtom)

  const worker = '0xa6f5369a76a0d4a9e1a35629006165fdfc2e3607'

  return async ({onReady}) => {
    if (fromAmount.length === 0 || solutions == null) {
      throw new Error('Deposit missing required parameters')
    }

    const id = u8aToHex(crypto.getRandomValues(new Uint8Array(32)))
    const data = JSON.stringify(solutions.compact)
    const hexAddress = isHex(destinationAccount)
      ? destinationAccount
      : u8aToHex(decodeAddress(destinationAccount))

    const amount = BigInt(
      new Decimal(fromAmount)
        .times(Decimal.pow(10, fromAsset.decimals))
        .toHex(),
    ).toString()

    if (fromChain.chainType === ChainType.EVM && handlerContract != null) {
      try {
        await handlerContract.deposit(
          fromAsset.location,
          amount,
          hexAddress,
          worker,
          id,
          data,
        )
      } catch (err) {}

      onReady?.()
    } else if (
      fromChain.chainType === ChainType.Substrate &&
      polkadotApi != null &&
      polkadotAccount?.wallet != null
    ) {
      const extrinsic = polkadotApi.tx.palletIndex.depositTas(
        fromAsset.location,
        amount,
        hexAddress,
        worker,
        id,
        data,
      )
      await waitSignAndSend({
        api: polkadotApi,
        extrinsic,
        account: polkadotAccount.address,
        signer: polkadotAccount.wallet.signer,
        onReady,
      })
    } else {
      throw new Error('Deposit not ready')
    }
  }
}

export default useDeposit
