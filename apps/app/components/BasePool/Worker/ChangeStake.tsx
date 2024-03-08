import Property from '@/components/Property'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {type GlobalStateQuery, useGlobalStateQuery} from '@/lib/subsquidQuery'
import {barlow} from '@/lib/theme'
import {subsquidClientAtom} from '@/store/common'
import {LoadingButton} from '@mui/lab'
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material'
import {getDecimalPattern, toCurrency} from '@phala/lib'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {type FC, useMemo, useState} from 'react'
import type {Worker} from './List'

type ConfidenceLevel = 1 | 2 | 3 | 4 | 5
const confidenceScoreMap = {
  1: '1',
  2: '1',
  3: '1',
  4: '0.8',
  5: '0.7',
} satisfies Record<ConfidenceLevel, string>

const getSMin = (
  worker: Worker,
  globalState: Exclude<GlobalStateQuery['globalStateById'], null | undefined>,
): Decimal | undefined => {
  const {initialScore} = worker
  const {k} = globalState
  if (typeof initialScore !== 'number') return
  return new Decimal(k)
    .times(new Decimal(initialScore).sqrt())
    .toDP(12, Decimal.ROUND_UP)
}

const getSMax = (
  worker: Worker,
  globalState: Exclude<GlobalStateQuery['globalStateById'], null | undefined>,
): Decimal | undefined => {
  const {initialScore, confidenceLevel} = worker
  const {vMax, re, phaRate} = globalState
  if (typeof initialScore !== 'number') return
  if (
    confidenceLevel === 1 ||
    confidenceLevel === 2 ||
    confidenceLevel === 3 ||
    confidenceLevel === 4 ||
    confidenceLevel === 5
  ) {
    const confidenceScore = confidenceScoreMap[confidenceLevel]
    return new Decimal(vMax)
      .div(new Decimal(re).minus(1).times(confidenceScore).plus(1))
      .minus(new Decimal(initialScore).times('0.3').div(phaRate))
      .toDP(12, Decimal.ROUND_DOWN)
  }
}
const ChangeStake: FC<{
  isChangeStake: boolean
  onClose: () => void
  worker?: Worker
}> = ({isChangeStake = false, onClose, worker}) => {
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const [loading, setLoading] = useState(false)
  const [amountString, setAmountString] = useState('')
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data: globalState} = useGlobalStateQuery(subsquidClient, undefined, {
    select: (data) => data.globalStateById,
  })
  const sMin = useMemo(() => {
    if (worker != null && globalState != null) {
      return getSMin(worker, globalState)
    }
  }, [worker, globalState])
  const sMax = useMemo(() => {
    if (worker != null && globalState != null) {
      return getSMax(worker, globalState)
    }
  }, [worker, globalState])

  if (worker == null) return null

  const onClick = (): void => {
    if (api == null || worker.stakePool == null) return
    const amount = new Decimal(amountString).times(1e12).toHex()
    const extrinsic = isChangeStake
      ? api.tx.phalaStakePoolv2.restartComputing(
          worker.stakePool.id,
          worker.id,
          amount,
        )
      : api.tx.phalaStakePoolv2.startComputing(
          worker.stakePool.id,
          worker.id,
          amount,
        )

    setLoading(true)
    signAndSend(extrinsic)
      .then(() => {
        onClose()
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <DialogTitle>
        {isChangeStake ? 'Change Stake' : 'Start Computing'}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Stake"
          autoFocus
          disabled={loading}
          fullWidth
          placeholder="0.00"
          value={amountString}
          InputProps={{
            endAdornment: 'PHA',
            sx: {fontFamily: barlow.style.fontFamily, fontWeight: 600},
          }}
          inputProps={{inputMode: 'decimal', pattern: getDecimalPattern(12)}}
          size="small"
          onChange={(e) => {
            if (!e.target.validity.patternMismatch) {
              setAmountString(e.target.value)
            }
          }}
        />
        <Stack mt={2} spacing={0.5}>
          {!isChangeStake && (
            <Property size="small" label="SMin">
              {sMin != null ? (
                `${toCurrency(sMin)} PHA`
              ) : (
                <Skeleton width={32} />
              )}
            </Property>
          )}
          <Property size="small" label="SMax">
            {sMax != null ? `${toCurrency(sMax)} PHA` : <Skeleton width={32} />}
          </Property>
          <Property size="small" label="Free Value">
            {worker.stakePool?.basePool.freeValue !== undefined &&
              `${toCurrency(worker.stakePool.basePool.freeValue)} PHA`}
          </Property>
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loading}
          variant="text"
          onClick={onClick}
          disabled={amountString === ''}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default ChangeStake
