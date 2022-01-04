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
