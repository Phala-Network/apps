import {useApiPromise} from '@phala/react-libs'
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
import {StakePool} from '../../hooks/subsquid'
import {useDelegableBalance} from '../../hooks/useDelegableBalance'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import FormDisplay from '../FormDisplay'
import {TransactionFeeLabel} from '../TransactionFeeLabel'

const DelegateModalBody: FC<
  {
    stakePool: Pick<StakePool, 'pid'> & Partial<Pick<StakePool, 'delegable'>>
  } & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid, delegable} = stakePool
  const {api} = useApiPromise()
  const delegableBalance = useDelegableBalance()
  const [amount, setAmount] = useState('')
  const waitSignAndSend = useWaitSignAndSend()
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
      setConfirmLock(false)
    }
  }
  const extrinsic = useMemo(() => {
    if (api && amount) {
      return api.tx.phalaStakePool.contribute(
        pid,
        new Decimal(amount).times(1e12).floor().toString()
      )
    }
  }, [api, pid, amount])

  if (delegable === undefined) return null

  const delegableStake = delegable ? `${formatCurrency(delegable)} PHA` : '∞'

  return (
    <>
      <ModalHeader>Delegate</ModalHeader>
      <ModalBody>
        <FormDisplay label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormDisplay>
        <FormControl
          label="Amount"
          caption={
            <>
              Pool Delegable: {delegableStake}
              <br />
              Delegable Balance:{' '}
              {delegableBalance ? (
                `${formatCurrency(delegableBalance.div(1e12))} PHA`
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
          <TransactionFeeLabel action={extrinsic} />
          <ModalButton disabled={!amount || confirmLock} onClick={onConfirm}>
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default DelegateModalBody
