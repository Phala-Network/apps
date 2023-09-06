import {
  ethereumProviderAtom,
  evmAccountAtom,
  evmChainIdAtom,
  isEvmWalletAuthorizedAtom,
} from '@/store/ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import {type Eip1193Provider} from 'ethers'
import {useAtom} from 'jotai'
import {useEffect} from 'react'

export const useEthereumProviderInitialization = (): void => {
  const [evmAccount] = useAtom(evmAccountAtom)
  const [ethereumProvider, setEthereumProvider] = useAtom(ethereumProviderAtom)
  const [, setEvmAccount] = useAtom(evmAccountAtom)
  const [, setEvmChainId] = useAtom(evmChainIdAtom)
  const [isEvmWalletAuthorized, setIsEvmWalletAuthorized] = useAtom(
    isEvmWalletAuthorizedAtom,
  )

  useEffect(() => {
    if (ethereumProvider != null) return
    const init = async (): Promise<void> => {
      const ethereum = await detectEthereumProvider()
      if (ethereum == null) return
      setEthereumProvider(ethereum as unknown as Eip1193Provider)
      const updateAccounts = (accounts: unknown): void => {
        const account = (accounts as string[])[0]
        setEvmAccount(account ?? null)
      }
      const updateChainId = (chainId: unknown): void => {
        setEvmChainId(parseInt(chainId as string, 16))
      }

      ethereum.on('accountsChanged', updateAccounts)
      ethereum.on('chainChanged', updateChainId)
      await (ethereum as unknown as Eip1193Provider)
        .request({method: 'eth_chainId'})
        .then(updateChainId)
      if (isEvmWalletAuthorized) {
        ;(ethereum as unknown as Eip1193Provider)
          .request({method: 'eth_requestAccounts'})
          .then((accounts) => {
            const account = (accounts as string[])[0]
            setEvmAccount(account ?? null)
          })
          .catch((error) => {
            // User rejected
            if (error.code === 4001) {
              setIsEvmWalletAuthorized(false)
            } else {
              throw error
            }
          })
      }
    }

    void init()
  }, [
    ethereumProvider,
    isEvmWalletAuthorized,
    setEthereumProvider,
    setIsEvmWalletAuthorized,
    setEvmAccount,
    setEvmChainId,
  ])

  useEffect(() => {
    if (evmAccount != null) {
      setIsEvmWalletAuthorized(true)
    }
  }, [evmAccount, setIsEvmWalletAuthorized])
}
