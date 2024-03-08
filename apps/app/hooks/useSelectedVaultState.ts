import type {AccountByIdQuery} from '@/lib/subsquidQuery'
import {vaultIdAtom} from '@/store/common'
import {useAtom} from 'jotai'
import {useMemo} from 'react'
import useAccountQuery from './useAccountQuery'

const useSelectedVaultState = ():
  | Exclude<
      AccountByIdQuery['accountById'],
      null | undefined
    >['ownedPools'][number]
  | undefined
  | null => {
  const [vaultId] = useAtom(vaultIdAtom)
  const {data: accountData} = useAccountQuery()

  const selectedVault = useMemo(() => {
    return vaultId != null
      ? accountData?.ownedPools.find((x) => x.id === vaultId)
      : null
  }, [accountData?.ownedPools, vaultId])

  return selectedVault
}

export default useSelectedVaultState
