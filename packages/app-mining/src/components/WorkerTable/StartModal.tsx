import {
  InputNumber,
  PhalaStakePoolTransactionFeeLabel,
} from '@phala/react-components'
import {useTokenomicParameters} from '@phala/react-hooks'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import Decimal from 'decimal.js'
import {useCallback, useMemo, useState} from 'react'
import styled from 'styled-components'
import {WorkerModalProps} from '.'
import useFormat from '../../hooks/useFormat'
import useSelfStakePools from '../../hooks/useSelfStakePools'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from '../ActionModal'

const Extra = styled.div`
  margin-top: 2px;
  font-size: 12px;
`

const StartModal = (props: WorkerModalProps): JSX.Element => {
  const {worker, onClose} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const format = useFormat()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [amount, setAmount] = useState<number | undefined>()
  const {data: tokenomicParameters} = useTokenomicParameters()
  const {data: stakePools} = useSelfStakePools()

  const poolFreeStake = useMemo<string>(() => {
    if (!stakePools) return '-'
    const stakePool = stakePools.find((pool) => pool.pid === worker.pid)
    return format(stakePool?.freeStake)
  }, [stakePools, format, worker.pid])

  const sMin = useMemo<string>(() => {
    if (!tokenomicParameters) return '-'
    const {k} = tokenomicParameters
    const {initialScore} = worker
    return `${k.mul(Math.sqrt(initialScore)).toString()} PHA`
  }, [worker, tokenomicParameters])

  const sMax = useMemo<string>(() => {
    if (!tokenomicParameters) return '-'
    const {vMax, phaRate, re} = tokenomicParameters
    const {initialScore, confidenceLevel} = worker
    const confidenceScoreMap = {1: 1, 2: 1, 3: 1, 4: 0.8, 5: 0.7}
    const confidenceScore = confidenceScoreMap[confidenceLevel]

    const s = vMax
      .div(re.sub(1).mul(confidenceScore).add(1))
      .sub(new Decimal(initialScore).mul(0.3).div(phaRate))

    return `${s.toString()} PHA`
  }, [tokenomicParameters, worker])

  const action = useMemo(() => {
    if (!api || !decimals || !amount) return

    return api.tx.phalaStakePool?.startMining?.(
      worker.pid,
      worker.pubkey,
      new Decimal(amount).mul(decimals).toString()
    )
  }, [amount, api, decimals, worker.pid, worker.pubkey])

  const onConfirm = useCallback(async () => {
    if (action) {
      return waitSignAndSend(action)
    }
  }, [waitSignAndSend, action])

  const onInputChange = useCallback((value) => {
    const number = parseFloat(value)
    if (typeof number === 'number') {
      setAmount(number)
    }
  }, [])

  return (
    <ActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="Start Mining"
      subtitle="Start a miner on behalf of the stake pool"
      disabled={!amount}
      actionsExtra={<PhalaStakePoolTransactionFeeLabel action={action} />}
    >
      <Label>pid</Label>
      <Value>{worker.pid}</Value>
      <Label>WorkerPublicKey</Label>
      <Value>{worker.pubkey}</Value>
      <Label>Amount</Label>
      <InputNumber
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={onInputChange}
        after="PHA"
      ></InputNumber>

      <Extra>Smin: {sMin}</Extra>
      <Extra>Smax: {sMax}</Extra>
      <Extra>Pool Free Delegation: {poolFreeStake}</Extra>
    </ActionModal>
  )
}

export default StartModal
