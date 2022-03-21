import {useEthereumAccountAtom, usePolkadotAccountAtom} from '@phala/app-store'
import {
  useEthereumAccountBalanceDecimal,
  usePolkadotAccountTransferrableBalanceDecimal,
} from '@phala/react-hooks'
import {Decimal} from 'decimal.js'
import {blockchainTypes} from './config'
import {useAllTransferData} from './store'

export function useBridgePage() {
  const transactionInfo = useAllTransferData()

  const blockchainType =
    transactionInfo?.fromBlockchainType || blockchainTypes.ethereum
  const [polkadotAccount] = usePolkadotAccountAtom()
  const polkadotAccountAddress = polkadotAccount?.address
  const [ethereumAccount] = useEthereumAccountAtom()
  const ethereumAccountAddress = ethereumAccount?.address

  const ethereumAccountBalanceDecimal = useEthereumAccountBalanceDecimal(
    ethereumAccountAddress
  )
  const polkadotAccountBalanceDecimal =
    usePolkadotAccountTransferrableBalanceDecimal(polkadotAccountAddress)

  const isFromEthereum = blockchainType === blockchainTypes.ethereum
  // HACK: backforward compatibility
  const isFromKhala =
    transactionInfo.fromNetwork === 'Khala' &&
    transactionInfo.toNetwork === 'Ethereum'
  const isToKarura = transactionInfo.toNetwork === 'Karura'
  const currentAddress = isFromEthereum
    ? ethereumAccountAddress
    : polkadotAccountAddress

  const currentBalance = isFromEthereum
    ? ethereumAccountBalanceDecimal
    : polkadotAccountBalanceDecimal

  const maxAmountDecimal = new Decimal(currentBalance)

  const isShowRecipient = isFromEthereum
    ? !!polkadotAccountAddress
    : !!ethereumAccountAddress

  const isShowMaxButton = maxAmountDecimal.greaterThan(0) && isFromEthereum

  return {
    maxAmountDecimal,
    isFromKhala,
    isFromEthereum,
    currentBalance,
    currentAddress,
    isShowRecipient,
    isShowMaxButton,
    isToKarura,
  } as const
}
