import {Value} from 'baseui/select'
import {atom, useAtom} from 'jotai'

const fromAddress = atom<string>('')
const fromAmount = atom<number>(0)
const fromNetwork = atom<Value>([{label: 'Phala'}])
const fromCoin = atom<Value>([{label: 'PHA'}])

const toAddress = atom<string>('')
const toNetwork = atom<Value>([{label: 'Phala'}])
const toCoin = atom<Value>([{label: 'PHA'}])

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
