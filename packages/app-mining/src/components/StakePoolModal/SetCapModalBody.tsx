import {useMemo, useState, VFC} from 'react'
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
import Decimal from 'decimal.js'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {formatCurrency} from '@phala/utils'
import {StakePool} from '.'
import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {Block} from 'baseui/block'

const SetCapModalBody: VFC<
  {
    stakePool: Pick<StakePool, 'pid'> &
      Partial<Pick<StakePool, 'cap' | 'totalStake'>>
  } & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid, cap: currentCap, totalStake} = stakePool
  const {api} = useApiPromise()
  const [cap, setCap] = useState('')
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const onConfirm = () => {
    waitSignAndSend(extrinsic, (status) => {
      if (status.isReady) {
        onClose?.({closeSource: 'closeButton'})
      }
    })
  }

  const extrinsic = useMemo(() => {
    if (api && decimals && cap) {
      return api.tx.phalaStakePool?.setCap?.(
        pid,
        new Decimal(cap).times(decimals).floor().toString()
      )
    }
  }, [api, cap, decimals, pid])

  if (totalStake === undefined || currentCap === undefined) return null

  return (
    <>
      <ModalHeader>Set Cap</ModalHeader>
      <ModalBody>
        <FormControl label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormControl>
        <FormControl
          label="New Cap"
          caption={
            <>
              Current Cap:{' '}
              {currentCap ? `${formatCurrency(currentCap)} PHA` : '∞'}
              <br />
              Delegated: {formatCurrency(totalStake)} PHA
            </>
          }
        >
          {/* FIXME: add cap validation */}
          <Input
            size="compact"
            autoFocus
            type="number"
            endEnhancer="PHA"
            min={0}
            onChange={(e) => setCap(e.currentTarget.value)}
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
          <ModalButton disabled={!cap} onClick={onConfirm}>
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default SetCapModalBody
