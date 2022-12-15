import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Stack,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {toCurrency} from '@phala/util'
import {DeriveBalancesAll} from '@polkadot/api-derive/types'
import BN from 'bn.js'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {FC, useEffect, useState} from 'react'
import PromiseButton from './PromiseButton'
import Property from './Property'

const format = (bn?: BN) => {
  if (bn) {
    // HACK: derived vestedClaimable may be negative
    if (bn.isNeg()) {
      bn = new BN(0)
    }
    return `${toCurrency(new Decimal(bn.toString()).div(1e12))} PHA`
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
    if (api && account) {
      api.derive.balances.all(account.address).then((all) => {
        if (!unmounted) {
          setAllBalances(all)
        }
      })
    }
    return () => {
      unmounted = true
    }
  }, [api, account])

  const vest = async () => {
    if (api) {
      return signAndSend(api.tx.vesting.vest()).then(onClose)
    }
  }

  return (
    <>
      <DialogTitle>Claim PHA</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Property label="Unlocked" size="small">
            {format(
              allBalances &&
                allBalances.vestedBalance.sub(allBalances.vestedClaimable)
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
            !allBalances ||
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
