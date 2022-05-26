import {
  ethereumProviderAtom,
  evmAccountAtom,
  evmChainIdAtom,
  isEvmWalletAuthorizedAtom,
} from '@/store/ethers'
import type {ethers} from 'ethers'
import {useAtom} from 'jotai'
import {useEffect} from 'react'

export const useEthereumProviderInitialization = (): void => {
  const [evmAccount] = useAtom(evmAccountAtom)
  const [ethereumProvider, setEthereumProvider] = useAtom(ethereumProviderAtom)
  const [, setEvmAccount] = useAtom(evmAccountAtom)
  const [, setEvmChainId] = useAtom(evmChainIdAtom)
  const [isEvmWalletAuthorized, setIsEvmWalletAuthorized] = useAtom(
    isEvmWalletAuthorizedAtom
  )

  useEffect(() => {
    if (ethereumProvider) return

    import('@metamask/detect-provider')
      .then(({default: detectEthereumProvider}) => detectEthereumProvider())
      .then((provider) => {
        if (!provider) return
        const ethereum = provider as ethers.providers.ExternalProvider
        setEthereumProvider(ethereum)
        const updateAccounts = (accounts: unknown) => {
          const account = (accounts as string[])[0]
          setEvmAccount(account || null)
        }
        const updateChainId = (chainId: unknown) => {
          setEvmChainId(parseInt(chainId as string, 16))
        }

        ethereum.on('accountsChanged', updateAccounts)
        ethereum.on('chainChanged', updateChainId)
        ethereum.request({method: 'eth_chainId'}).then(updateChainId)
        if (isEvmWalletAuthorized) {
          ethereum
            .request({method: 'eth_requestAccounts'})
            .then((accounts) => {
              const account = (accounts as string[])[0]
              setEvmAccount(account || null)
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
      })
  }, [
    ethereumProvider,
    isEvmWalletAuthorized,
    setEthereumProvider,
    setIsEvmWalletAuthorized,
    setEvmAccount,
    setEvmChainId,
  ])

  useEffect(() => {
    if (evmAccount) {
      setIsEvmWalletAuthorized(true)
    }
  }, [evmAccount, setIsEvmWalletAuthorized])
}
