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
import {ParagraphSmall} from 'baseui/typography'
import Decimal from 'decimal.js'
import {useMemo, useState} from 'react'
import type {Miners} from '../../hooks/graphql'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'

const StartModalBody = ({
  miner,
  onClose,
}: {miner: Miners} & Pick<ModalProps, 'onClose'>): JSX.Element => {
  const {
    pid,
    workerPublicKey,
    sMin,
    sMax,
    stakePools: {freeStake},
  } = miner
  const {api} = useApiPromise()
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
    if (api && decimals && amount) {
      return api.tx.phalaStakePool?.startMining?.(
        pid,
        workerPublicKey,
        new Decimal(amount).times(decimals).floor().toString()
      )
    }
  }, [amount, api, decimals, pid, workerPublicKey])

  return (
    <>
      <ModalHeader>Start Mining</ModalHeader>
      <ModalBody>
        <ParagraphSmall>
          Start a miner on behalf of the stake pool
        </ParagraphSmall>
        <FormControl label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormControl>
        <FormControl label="Worker Public Key">
          <ParagraphSmall as="div" $style={{wordBreak: 'break-all'}}>
            {workerPublicKey}
          </ParagraphSmall>
        </FormControl>
        <FormControl
          label="Amount"
          caption={
            <>
              Smin: {formatCurrency(sMin)} PHA
              <br />
              Smax: {formatCurrency(sMax)} PHA
              <br />
              Pool Free Delegation: {formatCurrency(freeStake)} PHA
            </>
          }
        >
          {/* FIXME: add amount validation */}
          <Input
            size="compact"
            autoFocus
            type="number"
            placeholder="Amount (PHA)"
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

export default StartModalBody
