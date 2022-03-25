import {Value} from 'baseui/select'
import Decimal from 'decimal.js'
import {atom, useAtom} from 'jotai'
import {coins, Network, networks} from '../config'

const fromAddress = atom<string>('')
const amount = atom<number>(0)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const _fromNetwork = atom<Network[]>([networks[0]])

const fromNetwork = atom(
  (get) => get(_fromNetwork),
  (get, set, newPrice: Network[]) => {
    const toNetworkValue = get(toNetwork)
    const fromNetworkValue = get(_fromNetwork)

    // HACK: hardcode from karura is not allowed now
    if (newPrice[0]?.id === 'Ethereum' && toNetworkValue[0]?.id === 'Karura') {
      set(toNetwork, [networks[1]])
    }

    if (toNetworkValue[0]?.id === newPrice[0]?.id) {
      set(toNetwork, fromNetworkValue)
      set(_fromNetwork, newPrice)
    } else {
      set(_fromNetwork, newPrice)
    }
  }
)

const fromCoin = atom<Value>([coins[0]])

const toAddress = atom<string>('')

const toNetwork = atom<Network[]>([networks[1]])

const toCoin = atom<Value>([coins[0]])

export const useFromAddress = () => useAtom(fromAddress)
export const useAmount = () => useAtom(amount)
export const useFromNetwork = () => useAtom(fromNetwork)
export const useFromCoin = () => useAtom(fromCoin)

export const useToAddress = () => useAtom(toAddress)
export const useToNetwork = () => useAtom(toNetwork)
export const useToCoin = () => useAtom(toCoin)

export function useAllTransferData() {
  const [fromAddress] = useFromAddress()
  const [fromNetwork] = useFromNetwork()
  const [fromCoin] = useFromCoin()
  const [amount] = useAmount()

  const [toAddress] = useToAddress()
  const [toNetwork] = useToNetwork()
  const [toCoin] = useToCoin()

  return {
    fromBlockchainType: fromNetwork[0]?.blockchainType,
    fromAddress,
    fromNetwork: fromNetwork[0]?.name,
    fromCoin: fromCoin[0]?.name,
    amount,
    amountDecimal: new Decimal(amount || 0),
    from: {
      address: fromAddress,
      network: fromNetwork[0]?.name,
      blockchainType: fromNetwork[0]?.blockchainType,
      coin: fromCoin[0]?.name,
    },
    toBlockchainType: toNetwork[0]?.blockchainType,
    toAddress,
    toNetwork: toNetwork[0]?.name,
    toCoin: toCoin[0]?.name,
    to: {
      address: toAddress,
      network: toNetwork[0]?.name,
      blockchainType: toNetwork[0]?.blockchainType,
      coin: toCoin[0]?.name,
    },
  }
}

// switch all from and to fields
export function useSwitchToAndFormData() {
  const [fromAddress, setFromAddress] = useFromAddress()
  const [fromNetwork, setFromNetwork] = useFromNetwork()
  const [fromCoin, setFromCoin] = useFromCoin()

  const [toAddress, setToAddress] = useToAddress()
  const [toNetwork, setToNetwork] = useToNetwork()
  const [toCoin, setToCoin] = useToCoin()

  const switchToAndFormData = () => {
    setFromAddress(toAddress)
    setFromNetwork(toNetwork)
    setFromCoin(toCoin)

    setToAddress(fromAddress)
    setToNetwork(fromNetwork)
    setToCoin(fromCoin)
  }

  return switchToAndFormData
}
