import {vaultIdAtom} from '@/store/common'
import {useAtom} from 'jotai'
import {useMemo} from 'react'
import useAccountQuery from './useAccountQuery'

const useSelectedVaultState = () => {
  const [vaultId] = useAtom(vaultIdAtom)
  const {data: accountData} = useAccountQuery()

  const selectedVault = useMemo(() => {
    return vaultId
      ? accountData?.accountById?.ownedPools.find((x) => x.id === vaultId)
      : null
  }, [accountData?.accountById?.ownedPools, vaultId])

  return selectedVault
}

export default useSelectedVaultState
