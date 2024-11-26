import PageHeader from '@/components/PageHeader'
import Wiki from '@/components/Wiki'
import type {NextPage} from 'next'

const WikiPage: NextPage = () => {
  return (
    <>
      <PageHeader title="Wiki" />
      <Wiki defaultExpanded />
    </>
  )
}

export default WikiPage
