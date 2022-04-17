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
import {StakePool} from '.'
import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {Block} from 'baseui/block'

const SetCommissionModalBody: VFC<
  {
    stakePool: Pick<StakePool, 'pid'> & Partial<Pick<StakePool, 'commission'>>
  } & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid, commission: currentCommission} = stakePool
  const {api} = useApiPromise()
  const [commission, setCommission] = useState('')
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
    if (api && decimals && commission) {
      return api.tx.phalaStakePool?.setPayoutPref?.(
        pid,
        new Decimal(commission).times(10 ** 4).toString()
      )
    }
  }, [api, commission, decimals, pid])

  if (currentCommission === undefined) return null

  return (
    <>
      <ModalHeader>Set Commission</ModalHeader>
      <ModalBody>
        <FormControl label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormControl>
        <FormControl
          label="New Commission"
          caption={
            <span>
              Current Commission:{' '}
              {new Decimal(currentCommission).times(100).toString()}%
            </span>
          }
        >
          {/* FIXME: add amount validation */}
          <Input
            size="compact"
            autoFocus
            type="number"
            endEnhancer="%"
            placeholder="0 - 100"
            min={0}
            max={100}
            onChange={(e) => setCommission(e.currentTarget.value)}
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
          <ModalButton disabled={!commission} onClick={onConfirm}>
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default SetCommissionModalBody
