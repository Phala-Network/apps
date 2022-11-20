import {Stack} from '@mui/material'
import {FC} from 'react'
import DelegateDetails from './DelegateDetails'
import NetworkOverview from './NetworkOverview'
import PageHeader from './PageHeader'

const DelegateHeader: FC = () => {
  return (
    <>
      <PageHeader title="Delegate">
        <NetworkOverview />
      </PageHeader>
      <Stack>
        <DelegateDetails />
      </Stack>
    </>
  )
}

export default DelegateHeader
