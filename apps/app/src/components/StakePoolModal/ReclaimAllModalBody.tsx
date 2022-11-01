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
import {Notification} from 'baseui/notification'
import {Skeleton} from 'baseui/skeleton'
import {StatefulTooltip} from 'baseui/tooltip'
import {ParagraphSmall} from 'baseui/typography'
import {addDays} from 'date-fns'
import Decimal from 'decimal.js'
import {FC, useMemo, useState} from 'react'
import {
  MinerState,
  StakePool,
  useReclaimableWorkersConnectionQuery,
  WorkerOrderByInput,
} from '../../hooks/subsquid'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {subsquidClient} from '../../lib/graphqlClient'
import FormDisplay from '../FormDisplay'

const ReclaimAllModalBody: FC<
  {stakePool: Pick<StakePool, 'pid'>} & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const [date] = useState(() => addDays(new Date(), -7).toISOString())
  const {pid} = stakePool
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const [confirmLock, setConfirmLock] = useState(false)
  const {data, isInitialLoading} = useReclaimableWorkersConnectionQuery(
    subsquidClient,
    {
      orderBy: WorkerOrderByInput.MinerStakeDesc,
      where: {
        stakePool: {id_eq: pid},
        miner: {
          state_eq: MinerState.MiningCoolingDown,
          coolingDownStartTime_lt: date,
        },
      },
    }
  )

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
  const reclaimableStake = useMemo(
    () =>
      data &&
      `${formatCurrency(
        data.workersConnection.edges.reduce((acc, cur) => {
          if (cur.node.miner) {
            return acc.plus(cur.node.miner.stake)
          }
          return acc
        }, new Decimal(0))
      )} PHA`,
    [data]
  )

  const extrinsic = useMemo(() => {
    if (api && data) {
      return api.tx.utility.batch(
        data.workersConnection.edges.map(({node}) =>
          api.tx.phalaStakePool.reclaimPoolWorker(pid, node.id)
        )
      )
    }
  }, [api, data, pid])

  const hasWorkersReclaimable = !!data?.workersConnection.edges.length

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

        {isInitialLoading ? (
          <Skeleton height="120px" />
        ) : hasWorkersReclaimable ? (
          <>
            <FormDisplay label="Worker Public Keys">
              <ParagraphSmall as="div">
                {data.workersConnection.edges.map(({node}, index, arr) => (
                  <>
                    <StatefulTooltip content={node.id} key={node.id}>
                      {trimAddress(node.id)}
                    </StatefulTooltip>
                    {index !== arr.length - 1 && ', '}
                  </>
                ))}
              </ParagraphSmall>
            </FormDisplay>

            <FormDisplay label="Reclaimable Stake">
              <ParagraphSmall as="div">{reclaimableStake}</ParagraphSmall>
            </FormDisplay>
          </>
        ) : (
          <Notification
            overrides={{
              Body: {style: {marginLeft: 0, marginRight: 0, width: 'auto'}},
            }}
          >
            No worker is able to be reclaimed.
          </Notification>
        )}
      </ModalBody>
      {hasWorkersReclaimable && (
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
      )}
    </>
  )
}

export default ReclaimAllModalBody
