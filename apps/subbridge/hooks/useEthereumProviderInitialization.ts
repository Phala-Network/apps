import {
  ethersWeb3ProviderAtom,
  evmAccountAtom,
  evmChainIdAtom,
} from '@/store/ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import {ethers} from 'ethers'
import {useAtom} from 'jotai'
import {useEffect, useRef} from 'react'

export const useEthereumProviderInitialization = (): void => {
  const [, setEthersWeb3Provider] = useAtom(ethersWeb3ProviderAtom)
  const [, setEvmAccount] = useAtom(evmAccountAtom)
  const [, setEvmChainId] = useAtom(evmChainIdAtom)
  const runRef = useRef(false)

  useEffect(() => {
    if (runRef.current) return
    runRef.current = true
    const init = async (): Promise<void> => {
      const ethereum = await detectEthereumProvider({silent: true})
      if (ethereum == null) return
      const provider = new ethers.providers.Web3Provider(ethereum)
      setEthersWeb3Provider(provider)
      const updateAccounts = (accounts: unknown): void => {
        const account = (accounts as string[])[0]
        setEvmAccount(account ?? null)
      }
      const updateChainId = (chainId: unknown): void => {
        setEvmChainId(Number.parseInt(chainId as string, 16))
      }
      await provider.listAccounts().then(updateAccounts)
      ethereum.on('accountsChanged', updateAccounts)
      ethereum.on('chainChanged', updateChainId)
      await provider.provider
        .request?.({method: 'eth_chainId'})
        .then(updateChainId)
    }

    void init()
  }, [setEthersWeb3Provider, setEvmAccount, setEvmChainId])
}
