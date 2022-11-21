import {Stack} from '@mui/material'
import {FC} from 'react'
import DelegateChartCard from './DelegateChartCard'
import DelegateDetailCard from './DelegateDetailCard'
import NetworkOverview from './NetworkOverview'
import PageHeader from './PageHeader'

const DelegateHeader: FC = () => {
  return (
    <>
      <PageHeader title="Delegate">
        <NetworkOverview />
      </PageHeader>
      <Stack direction={{md: 'row'}} spacing={2} sx={{'>div': {flex: '1 0'}}}>
        <DelegateDetailCard />
        <DelegateChartCard />
      </Stack>
    </>
  )
}

export default DelegateHeader
