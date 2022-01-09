import {Value} from 'baseui/select'
import {atom, useAtom} from 'jotai'
import {coins, Network, networks} from '../config'

const fromAddress = atom<string>(
  '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty'
)
const fromAmount = atom<number>(0)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fromNetwork = atom<Network[]>([networks[0]])
const fromCoin = atom<Value>([coins[0]])

const toAddress = atom<string>(
  '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const toNetwork = atom<Network[]>([networks[0]])
const toCoin = atom<Value>([coins[0]])

export const useFromAddress = () => useAtom(fromAddress)
export const useFromAmount = () => useAtom(fromAmount)
export const useFromNetwork = () => useAtom(fromNetwork)
export const useFromCoin = () => useAtom(fromCoin)

export const useToAddress = () => useAtom(toAddress)
export const useToNetwork = () => useAtom(toNetwork)
export const useToCoin = () => useAtom(toCoin)

export function useAllTransferData() {
  const [fromAddress] = useFromAddress()
  const [fromNetwork] = useFromNetwork()
  const [fromCoin] = useFromCoin()
  const [fromAmount] = useFromAmount()

  const [toAddress] = useToAddress()
  const [toNetwork] = useToNetwork()
  const [toCoin] = useToCoin()

  return {
    fromBlockchainType: fromNetwork[0]?.blockchainType,
    fromAddress,
    fromNetwork: fromNetwork[0]?.name,
    fromCoin: fromCoin[0]?.name,
    fromAmount,
    from: {
      address: fromAddress,
      amount: fromAmount,
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
      amount: fromAmount,
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
