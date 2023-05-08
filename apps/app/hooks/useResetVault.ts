import {vaultIdAtom} from '@/store/common'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import {useEffect, useRef} from 'react'

const useResetVault = (): void => {
  const [, setVaultId] = useAtom(vaultIdAtom)
  const [account] = useAtom(polkadotAccountAtom)
  const prevAccountAddress = useRef<string>()
  useEffect(() => {
    if (prevAccountAddress.current != null) {
      setVaultId(null)
    }
    prevAccountAddress.current = account?.address
  }, [account?.address, setVaultId])
}

export default useResetVault
