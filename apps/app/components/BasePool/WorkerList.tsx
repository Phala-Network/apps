import WorkersIcon from '@/assets/workers.svg'
import SectionHeader from '@/components/SectionHeader'
import {BasePoolCommonFragment} from '@/lib/subsquidQuery'
import {FC} from 'react'

const WorkerList: FC<{basePool: BasePoolCommonFragment}> = () => {
  return (
    <>
      <SectionHeader title="Workers" icon={<WorkersIcon />}></SectionHeader>
    </>
  )
}

export default WorkerList
