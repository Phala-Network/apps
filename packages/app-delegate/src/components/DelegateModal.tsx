import {usePolkadotAccountAtom} from '@phala/app-store'
import {Alert, InputNumber} from '@phala/react-components'
import {useUserStakeInfo} from '@phala/react-hooks'
import {useTranslation} from '@phala/react-i18n'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import Decimal from 'decimal.js'
import {useCallback, useState} from 'react'
import styled from 'styled-components'
import {useDelegableBalance} from '../hooks/useDelegableBalance'
import useFormat from '../hooks/useFormat'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from './ActionModal'

const Extra = styled.div`
  margin-top: 10px;
  font-size: 12px;
`

const DelegateModal = (props: StakePoolModalProps): JSX.Element => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  const delegableBalance = useDelegableBalance()
  const {onClose, stakePool} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [amount, setAmount] = useState<number | undefined>()
  const {refetch} = useUserStakeInfo(polkadotAccount?.address, stakePool.pid)
  const format = useFormat()
  const {t} = useTranslation()

  const remaining =
    stakePool.cap === null
      ? '∞'
      : format(stakePool.cap.sub(stakePool.totalStake))

  const onConfirm = useCallback(async () => {
    if (api && decimals && amount) {
      return waitSignAndSend(
        api.tx.phalaStakePool?.contribute?.(
          stakePool.pid,
          new Decimal(amount).mul(decimals).toString()
        )
      )
    }
  }, [api, waitSignAndSend, stakePool.pid, amount, decimals])
  const onInputChange = useCallback((value) => {
    const number = parseFloat(value)
    if (typeof number === 'number') {
      setAmount(number)
    }
  }, [])

  return (
    <ActionModal
      onClose={() => {
        refetch()
        onClose()
      }}
      onConfirm={onConfirm}
      title={t('delegate.delegate')}
      subtitle={t('delegate.delegate_some_stake_to_a_pool')}
      disabled={!amount}
    >
      <Label>pid</Label>
      <Value>{stakePool.pid}</Value>
      <Label>{t('delegate.amount')}</Label>
      <InputNumber
        type="number"
        placeholder={t('delegate.amount_pha')}
        value={amount}
        onChange={onInputChange}
        after="PHA"
      ></InputNumber>
      <Alert style={{marginTop: 10}}>{t('delegate.please_reserve')}</Alert>
      <Extra>
        {t('delegate.delegable_balance')}: {format(delegableBalance)}
      </Extra>
      <Extra>
        {t('delegate.pool_remaining')}: {remaining}
      </Extra>
    </ActionModal>
  )
}

export default DelegateModal
