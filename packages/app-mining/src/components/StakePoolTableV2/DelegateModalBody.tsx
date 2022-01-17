import {useState} from 'react'
import {Input} from 'baseui/input'
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ModalProps,
} from 'baseui/modal'
import {ParagraphSmall} from 'baseui/typography'
import {FormControl} from 'baseui/form-control'
import type {StakePools} from '../../hooks/graphql'
import {useDelegableBalance} from '../../hooks/useDelegableBalance'
import Decimal from 'decimal.js'
import {formatCurrency} from '@phala/utils'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {Skeleton} from 'baseui/skeleton'

const DelegateModalBody = ({
  stakePool,
  onClose,
}: {stakePool: StakePools} & Pick<ModalProps, 'onClose'>): JSX.Element => {
  const {pid, remainingStake} = stakePool
  const {api} = useApiPromise()
  const delegableBalance = useDelegableBalance()
  const [amount, setAmount] = useState('')
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const onConfirm = () => {
    if (api && decimals) {
      waitSignAndSend(
        api.tx.phalaStakePool?.contribute?.(
          pid,
          new Decimal(amount).times(decimals).floor().toString()
        ),
        (status) => {
          if (status.isReady) {
            onClose?.({closeSource: 'closeButton'})
          }
        }
      )
    }
  }

  const remaining = remainingStake
    ? `${formatCurrency(remainingStake)} PHA`
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
              Pool Remaining: {remaining}
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
        <ModalButton disabled={!amount} onClick={onConfirm}>
          Confirm
        </ModalButton>
      </ModalFooter>
    </>
  )
}

export default DelegateModalBody
