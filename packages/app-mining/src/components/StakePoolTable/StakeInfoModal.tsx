import {Button, Modal, Table} from '@phala/react-components'
import {formatDuration, intervalToDuration} from 'date-fns'
import {useMemo} from 'react'
import {Column} from 'react-table'
import styled from 'styled-components'
import {StakePoolModalProps} from '.'
import useFormat from '../../hooks/useFormat'
import useGracePeriod from '../../hooks/useGracePeriod'
import useModalVisible from '../../hooks/useModalVisible'
import useSelfUserStakeInfo from '../../hooks/useSelfUserStakeInfo'
import {StakePool} from '@phala/react-hooks'
import {Label, Value} from '../ActionModal'

const Line = styled.div`
  display: flex;

  & > div {
    flex: 1;
  }
`

type WithdrawQueue = StakePool['withdrawQueue'] extends (infer P)[] ? P : never

const StakeInfoModal = (props: StakePoolModalProps): JSX.Element => {
  const {open} = useModalVisible()
  const {stakePool, onClose} = props
  const format = useFormat()
  const {data: userStakeInfo, isLoading} = useSelfUserStakeInfo(stakePool.pid)
  const {data: gracePeriod} = useGracePeriod()
  const withdrawQueueColumns = useMemo<Column<WithdrawQueue>[]>(
    () => [
      {Header: 'Delegator', accessor: 'user'},
      {
        Header: 'Delegation',
        accessor: (queue) =>
          format(
            queue.shares.mul(stakePool.totalStake.div(stakePool.totalShares))
          ),
      },
      {
        Header: 'Countdown',
        accessor: (queue) => {
          if (typeof gracePeriod !== 'number') return '-'
          const {startTime} = queue
          const duration = formatDuration(
            intervalToDuration({
              start: new Date(),
              end: new Date((startTime + gracePeriod) * 1000),
            }),
            {format: ['days', 'hours', 'minutes'], zero: true}
          )
          return duration
        },
      },
    ],
    [format, gracePeriod, stakePool]
  )

  return (
    <Modal
      bodyStyle={{width: 800}}
      visible={true}
      onClose={onClose}
      title={`#${stakePool.pid} Stakepool Info`}
      actions={[
        <Button key="delegate" onClick={() => open('delegate')}>
          Delegate
        </Button>,
        <Button key="withdraw" onClick={() => open('withdraw')}>
          Withdraw
        </Button>,
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <Line>
        <div>
          <Label>Total Shares</Label>
          <Value>{format(stakePool.totalShares, {unit: null})}</Value>
        </div>
        <div>
          <Label>Delegated</Label>
          <Value>{format(stakePool.totalStake)}</Value>
        </div>
      </Line>

      <Line>
        <div>
          <Label>Free Delegation</Label>
          <Value>{format(stakePool.freeStake)}</Value>
        </div>
        <div>
          <Label>Releasing Stake</Label>
          <Value>{format(stakePool.releasingStake)}</Value>
        </div>
      </Line>

      <Label>Withdraw Queue</Label>
      <Table
        isLoading={isLoading}
        columns={withdrawQueueColumns}
        data={stakePool.withdrawQueue}
        initialState={{pageSize: 5}}
      ></Table>

      <Line>
        <div>
          <Label>Your Delegation</Label>
          <Value>{format(userStakeInfo?.locked)}</Value>
        </div>
      </Line>
    </Modal>
  )
}

export default StakeInfoModal
