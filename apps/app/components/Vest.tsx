import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Stack,
} from '@mui/material'
import {toCurrency} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import type {DeriveBalancesAll} from '@polkadot/api-derive/types'
import BN from 'bn.js'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {type FC, type ReactElement, useEffect, useState} from 'react'
import PromiseButton from './PromiseButton'
import Property from './Property'

const format = (bn?: BN): ReactElement => {
  if (bn !== undefined) {
    // HACK: derived vestedClaimable may be negative
    const value = bn.isNeg() ? new BN(0) : bn
    return <>{`${toCurrency(new Decimal(value.toString()).div(1e12))} PHA`}</>
  }
  return <Skeleton width={32} variant="text" />
}

const Vest: FC<{onClose: () => void}> = ({onClose}) => {
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const [allBalances, setAllBalances] = useState<DeriveBalancesAll>()
  const [account] = useAtom(polkadotAccountAtom)

  useEffect(() => {
    let unmounted = false
    if (api != null && account != null) {
      void api.derive.balances.all(account.address).then((all) => {
        if (!unmounted) {
          setAllBalances(all)
        }
      })
    }
    return () => {
      unmounted = true
    }
  }, [api, account])

  const vest = async (): Promise<void> => {
    if (api !== undefined) {
      await signAndSend(api.tx.vesting.vest()).then(onClose)
    }
  }

  return (
    <>
      <DialogTitle>Claim Crowdloan Reward</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Property label="Unlocked" size="small">
            {format(
              allBalances?.vestedBalance.sub(allBalances.vestedClaimable),
            )}
          </Property>
          <Property label="Locked" size="small">
            {format(allBalances?.vestingLocked)}
          </Property>
          <Property label="Claimable" size="small">
            {format(allBalances?.vestedClaimable)}
          </Property>
        </Stack>
      </DialogContent>
      <DialogActions>
        <PromiseButton
          disabled={
            allBalances == null ||
            allBalances.vestedClaimable.isNeg() ||
            allBalances.vestedClaimable.isZero()
          }
          variant="text"
          onClick={vest}
        >
          Claim
        </PromiseButton>
      </DialogActions>
    </>
  )
}

export default Vest
