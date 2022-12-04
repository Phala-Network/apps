import Property from '@/components/Property'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import useTokenomicParameters, {
  TokenomicParameters,
} from '@/hooks/useTokenomicParameters'
import {barlow} from '@/lib/theme'
import {LoadingButton} from '@mui/lab'
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material'
import {getDecimalPattern, toCurrency} from '@phala/util'
import Decimal from 'decimal.js'
import {FC, useMemo, useState} from 'react'
import {Worker} from './List'

type ConfidenceLevel = 1 | 2 | 3 | 4 | 5
const confidenceScoreMap: Record<ConfidenceLevel, string> = {
  1: '1',
  2: '1',
  3: '1',
  4: '0.8',
  5: '0.7',
}

const getSMin = (
  worker: Worker,
  tokenomicParameters: TokenomicParameters
): Decimal | undefined => {
  const {initialScore} = worker
  const {k} = tokenomicParameters
  if (typeof initialScore !== 'number') return
  return k.times(new Decimal(initialScore).sqrt()).toDP(12, Decimal.ROUND_UP)
}

const getSMax = (
  worker: Worker,
  tokenomicParameters: TokenomicParameters
): Decimal | undefined => {
  const {initialScore, confidenceLevel} = worker
  const {vMax, re, phaRate} = tokenomicParameters
  if (typeof initialScore !== 'number') return
  if (
    confidenceLevel === 1 ||
    confidenceLevel === 2 ||
    confidenceLevel === 3 ||
    confidenceLevel === 4 ||
    confidenceLevel === 5
  ) {
    const confidenceScore = confidenceScoreMap[confidenceLevel]
    return vMax
      .div(re.minus(1).times(confidenceScore).plus(1))
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
  const tokenomicParameters = useTokenomicParameters()
  const sMin = useMemo(() => {
    if (worker && tokenomicParameters) {
      return getSMin(worker, tokenomicParameters)
    }
  }, [worker, tokenomicParameters])
  const sMax = useMemo(() => {
    if (worker && tokenomicParameters) {
      return getSMax(worker, tokenomicParameters)
    }
  }, [worker, tokenomicParameters])

  if (!worker) return null

  const onClick = () => {
    if (!api || !worker.stakePool) return
    const amount = new Decimal(amountString).times(1e12).toHex()
    const extrinsic = isChangeStake
      ? api.tx.phalaStakePoolv2.restartComputing(
          worker.stakePool.id,
          worker.id,
          amount
        )
      : api.tx.phalaStakePoolv2.startComputing(
          worker.stakePool.id,
          worker.id,
          amount
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
              {sMin ? `${toCurrency(sMin)} PHA` : <Skeleton width={32} />}
            </Property>
          )}
          {isChangeStake && worker.session?.stake && (
            <Property size="small" label="Current Stake">
              {`${toCurrency(worker.session.stake)} PHA`}
            </Property>
          )}
          <Property size="small" label="SMax">
            {sMax ? `${toCurrency(sMax)} PHA` : <Skeleton width={32} />}
          </Property>
          <Property size="small" label="Free Value">
            {worker.stakePool?.basePool.freeValue &&
              `${toCurrency(worker.stakePool.basePool.freeValue)} PHA`}
          </Property>
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loading}
          variant="text"
          onClick={onClick}
          disabled={!amountString}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default ChangeStake
