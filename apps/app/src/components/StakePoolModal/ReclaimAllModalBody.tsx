import {TransactionFeeLabel} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import {formatCurrency, trimAddress} from '@phala/utils'
import {Block} from 'baseui/block'
import {
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from 'baseui/modal'
import {StatefulTooltip} from 'baseui/tooltip'
import {ParagraphSmall} from 'baseui/typography'
import Decimal from 'decimal.js'
import {FC, useMemo, useState} from 'react'
import {StakePool} from '../../hooks/subsquid'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import FormDisplay from '../FormDisplay'

const ReclaimAllModalBody: FC<
  {
    stakePool: Pick<StakePool, 'pid'> & Partial<Pick<StakePool, 'miners'>>
  } & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid, miners} = stakePool
  const {api} = useApiPromise()
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
      // setConfirmLock(false)
    } finally {
      setConfirmLock(false)
    }
  }
  const reclaimableStake = useMemo(
    () =>
      miners
        ? `${formatCurrency(
            miners.reduce(
              (acc, cur) => acc.add(new Decimal(cur.stake)),
              new Decimal(0)
            )
          )} PHA`
        : '',
    [miners]
  )

  const extrinsic = useMemo(() => {
    if (api && miners) {
      return api.tx.utility.batch(
        miners.map(({worker}) =>
          api.tx.phalaStakePool.reclaimPoolWorker(pid, worker?.id)
        )
      )
    }
  }, [api, miners, pid])

  if (!miners) return null

  return (
    <>
      <ModalHeader>Reclaim All Workers</ModalHeader>
      <ModalBody>
        <ParagraphSmall>
          Reclaim the releasing stake of miners in a pool
        </ParagraphSmall>
        <FormDisplay label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormDisplay>

        <FormDisplay label="Worker Public Keys">
          <ParagraphSmall as="div">
            {miners.map((miner, index) => (
              <>
                <StatefulTooltip
                  content={miner.worker?.id}
                  key={miner.worker?.id}
                >
                  {trimAddress(miner.worker?.id || '')}
                </StatefulTooltip>
                {index !== miners.length - 1 && ', '}
              </>
            ))}
          </ParagraphSmall>
        </FormDisplay>

        <FormDisplay label="Reclaimable Stake">
          <ParagraphSmall as="div">{reclaimableStake}</ParagraphSmall>
        </FormDisplay>
      </ModalBody>
      <ModalFooter>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <TransactionFeeLabel action={extrinsic} />
          <ModalButton disabled={confirmLock} onClick={onConfirm}>
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default ReclaimAllModalBody
