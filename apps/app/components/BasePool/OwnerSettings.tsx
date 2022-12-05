import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {BasePoolCommonFragment} from '@/lib/subsquidQuery'
import {barlow} from '@/lib/theme'
import {LoadingButton} from '@mui/lab'
import {DialogContent, DialogTitle, Stack, TextField} from '@mui/material'
import {getDecimalPattern} from '@phala/util'
import Decimal from 'decimal.js'
import {FC, useMemo, useState} from 'react'

const OwnerSettings: FC<{
  basePool: BasePoolCommonFragment
}> = ({basePool}) => {
  const {id, kind, stakePool} = basePool
  const isVault = kind === 'Vault'
  const color = isVault ? 'secondary' : 'primary'
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const [commissionLoading, setCommissionLoading] = useState(false)
  const [commissionString, setCommissionString] = useState(
    new Decimal(basePool.commission).times(100).toString()
  )
  const [capacityLoading, setCapacityLoading] = useState(false)
  const [capacityString, setCapacityString] = useState(() =>
    stakePool?.capacity ? new Decimal(stakePool.capacity).toString() : ''
  )

  const commissionValid = useMemo(() => {
    try {
      const commission = new Decimal(commissionString)
      return commission.gte(0) && commission.lte(100)
    } catch (err) {
      return false
    }
  }, [commissionString])

  const setCommission = () => {
    if (!api) return
    const commission = new Decimal(commissionString).times(1e4).toHex()
    const extrinsic = isVault
      ? api.tx.phalaVault.setPayoutPref(basePool.id, commission)
      : api.tx.phalaStakePoolv2.setPayoutPref(basePool.id, commission)
    setCommissionLoading(true)
    signAndSend(extrinsic).finally(() => {
      setCommissionLoading(false)
    })
  }

  const setCapacity = () => {
    if (!api) return
    const capacity = new Decimal(capacityString).times(1e12).toHex()
    const extrinsic = api.tx.phalaStakePoolv2.setCap(basePool.id, capacity)
    setCapacityLoading(true)
    signAndSend(extrinsic).finally(() => {
      setCapacityLoading(false)
    })
  }

  return (
    <>
      <DialogTitle>{`${
        isVault ? 'Vault' : 'Stake Pool'
      } #${id} Settings`}</DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Commission"
              placeholder="0.00"
              disabled={commissionLoading}
              value={commissionString}
              InputProps={{
                endAdornment: '%',
                sx: {fontFamily: barlow.style.fontFamily, fontWeight: 600},
              }}
              inputProps={{
                inputMode: 'decimal',
                pattern: getDecimalPattern(4),
              }}
              sx={{flex: '1 0'}}
              color={color}
              size="small"
              onChange={(e) => {
                if (!e.target.validity.patternMismatch) {
                  setCommissionString(e.target.value)
                }
              }}
            />
            <LoadingButton
              onClick={setCommission}
              disabled={!commissionValid}
              loading={commissionLoading}
              color={color}
              variant="contained"
            >
              Save
            </LoadingButton>
          </Stack>

          {!isVault && (
            <Stack direction="row" spacing={2}>
              <TextField
                label="Capacity"
                placeholder="0.00"
                disabled={capacityLoading}
                value={capacityString}
                InputProps={{
                  endAdornment: 'PHA',
                  sx: {fontFamily: barlow.style.fontFamily, fontWeight: 600},
                }}
                inputProps={{
                  inputMode: 'decimal',
                  pattern: getDecimalPattern(4),
                }}
                sx={{flex: '1 0'}}
                color={color}
                size="small"
                onChange={(e) => {
                  if (!e.target.validity.patternMismatch) {
                    setCapacityString(e.target.value)
                  }
                }}
              />
              <LoadingButton
                onClick={setCapacity}
                disabled={!capacityString}
                loading={capacityLoading}
                color={color}
                variant="contained"
              >
                Save
              </LoadingButton>
            </Stack>
          )}
        </Stack>
      </DialogContent>
    </>
  )
}

export default OwnerSettings
