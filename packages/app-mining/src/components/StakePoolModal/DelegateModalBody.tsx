import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {formatCurrency} from '@phala/utils'
import {Block} from 'baseui/block'
import {FormControl} from 'baseui/form-control'
import {Input} from 'baseui/input'
import {
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from 'baseui/modal'
import {Skeleton} from 'baseui/skeleton'
import {ParagraphSmall} from 'baseui/typography'
import Decimal from 'decimal.js'
import {FC, useMemo, useState} from 'react'
import {StakePool} from '.'
import {useDelegableBalance} from '../../hooks/useDelegableBalance'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'

const DelegateModalBody: FC<
  {
    stakePool: Pick<StakePool, 'pid'> &
      Partial<Pick<StakePool, 'availableStake'>>
  } & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid, availableStake} = stakePool
  const {api} = useApiPromise()
  const delegableBalance = useDelegableBalance()
  const [amount, setAmount] = useState('')
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [confirmLock, setConfirmLock] = useState(false)

  const onConfirm = async () => {
    setConfirmLock(true)
    try {
      await waitSignAndSend(extrinsic, (status) => {
        if (status.isReady) {
          onClose?.({closeSource: 'closeButton'})
          setConfirmLock(false)
        }
      })
    } catch (err) {
      // setConfirmLock(false)
    } finally {
      setConfirmLock(false)
    }
  }
  const extrinsic = useMemo(() => {
    if (api && amount && decimals) {
      return api.tx.phalaStakePool?.contribute?.(
        pid,
        new Decimal(amount).times(decimals).floor().toString()
      )
    }
  }, [api, pid, amount, decimals])

  if (availableStake === undefined) return null

  const delegableStake = availableStake
    ? `${formatCurrency(availableStake)} PHA`
    : '∞'

  return (
    <>
      <ModalHeader>Delegate</ModalHeader>
      <ModalBody>
        <FormControl label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormControl>
        <FormControl
          label="Amount"
          caption={
            <>
              Pool Delegable: {delegableStake}
              <br />
              Delegable Balance:{' '}
              {delegableBalance && decimals ? (
                `${formatCurrency(delegableBalance.div(decimals))} PHA`
              ) : (
                <Skeleton
                  animation
                  rows={1}
                  width="96px"
                  overrides={{
                    Root: {
                      style: {display: 'inline-block', verticalAlign: 'middle'},
                    },
                  }}
                />
              )}
            </>
          }
        >
          {/* FIXME: add amount validation */}
          <Input
            size="compact"
            autoFocus
            type="number"
            endEnhancer="PHA"
            min={0}
            onChange={(e) => setAmount(e.currentTarget.value)}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <PhalaStakePoolTransactionFeeLabel action={extrinsic} />
          <ModalButton disabled={!amount || confirmLock} onClick={onConfirm}>
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default DelegateModalBody
