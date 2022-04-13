import {fromChainAtom} from '@/store/bridge'
import {
  ethereumProviderAtom,
  ethersProviderAtom,
  evmAccountAtom,
  evmChainIdAtom,
  isEvmWalletAuthorizedAtom,
} from '@/store/ethers'
import type {ethers} from 'ethers'
import {useAtom} from 'jotai'
import {useEffect} from 'react'

export const useEthersInitialization = (): void => {
  const [fromChain] = useAtom(fromChainAtom)
  const [evmAccount] = useAtom(evmAccountAtom)
  const [ethereumProvider, setEthereumProvider] = useAtom(ethereumProviderAtom)
  const [, setEthersProvider] = useAtom(ethersProviderAtom)
  const [, setEvmAccount] = useAtom(evmAccountAtom)
  const [evmChainId, setEvmChainId] = useAtom(evmChainIdAtom)
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
    let unmounted = false
    if (
      evmChainId &&
      ethereumProvider &&
      fromChain.kind === 'evm' &&
      fromChain.evmChainId === evmChainId
    ) {
      import('ethers').then(({ethers}) => {
        if (unmounted) return
        const provider = new ethers.providers.Web3Provider(ethereumProvider)
        setEthersProvider(provider)
      })
    }
    return () => {
      unmounted = true
    }
  }, [evmChainId, ethereumProvider, setEthersProvider, fromChain])

  useEffect(() => {
    if (evmAccount) {
      setIsEvmWalletAuthorized(true)
    }
  }, [evmAccount, setIsEvmWalletAuthorized])
}
