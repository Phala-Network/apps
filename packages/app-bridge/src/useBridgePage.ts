import {useEthereumAccountAtom, useCurrentAccount} from '@phala/store'
import {
  useEthereumAccountBalanceDecimal,
  usePolkadotAccountTransferrableBalanceDecimal,
} from '@phala/react-hooks'
import {Decimal} from 'decimal.js'
import {blockchainTypes} from './config'
import {useKaruraPHABalance} from './hooks/useKaruraApi'
import {useAllTransferData} from './store'

export function useBridgePage() {
  const transactionInfo = useAllTransferData()
  const {fromNetwork} = transactionInfo

  const blockchainType =
    transactionInfo?.fromBlockchainType || blockchainTypes.ethereum
  const [polkadotAccount] = useCurrentAccount()
  const polkadotAccountAddress = polkadotAccount?.address
  const [ethereumAccount] = useEthereumAccountAtom()
  const ethereumAccountAddress = ethereumAccount?.address

  const ethereumAccountBalanceDecimal = useEthereumAccountBalanceDecimal(
    ethereumAccountAddress
  )
  const polkadotAccountBalanceDecimal =
    usePolkadotAccountTransferrableBalanceDecimal(polkadotAccountAddress)
  const karuraPHABalance = useKaruraPHABalance()

  const isFromEthereum = blockchainType === blockchainTypes.ethereum
  const currentAddress = isFromEthereum
    ? ethereumAccountAddress
    : polkadotAccountAddress

  const currentBalance =
    fromNetwork === 'Karura'
      ? karuraPHABalance
      : fromNetwork === 'Ethereum'
      ? ethereumAccountBalanceDecimal
      : polkadotAccountBalanceDecimal

  const maxAmountDecimal = new Decimal(currentBalance || 0)

  const isShowRecipient = isFromEthereum
    ? !!polkadotAccountAddress
    : !!ethereumAccountAddress

  const isShowMaxButton = maxAmountDecimal.greaterThan(0) && isFromEthereum

  return {
    maxAmountDecimal,
    isFromEthereum,
    currentBalance,
    currentAddress,
    isShowRecipient,
    isShowMaxButton,
  } as const
}
