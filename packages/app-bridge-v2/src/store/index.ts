import {Value} from 'baseui/select'
import {atom, useAtom} from 'jotai'
import {coins, networks} from '../config'

const fromAddress = atom<string>(
  '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty'
)
const fromAmount = atom<number>(0)
const fromNetwork = atom<Value>([networks[0]])
const fromCoin = atom<Value>([coins[0]])

const toAddress = atom<string>(
  '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
)
const toNetwork = atom<Value>([networks[0]])
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
    fromAddress,
    fromNetwork: fromNetwork[0]?.id as string,
    fromCoin: fromCoin[0]?.id as string,
    fromAmount,
    toAddress,
    toNetwork: toNetwork[0]?.id as string,
    toCoin: toCoin[0]?.id as string,
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
