import WithdrawalQueueIcon from '@/assets/withdraw_queue.svg'
import SectionHeader from '@/components/SectionHeader'
import {BasePoolCommonFragment} from '@/lib/subsquidQuery'
import {FC} from 'react'

const WithdrawQueue: FC<{basePool: BasePoolCommonFragment}> = () => {
  return (
    <SectionHeader
      icon={<WithdrawalQueueIcon />}
      title="Withdrawal Queue"
    ></SectionHeader>
  )
}

export default WithdrawQueue
