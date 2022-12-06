import DashboardAccount from '@/components/DashboardAccount'
import DashboardAssetList from '@/components/DashboardAssetList'
import Title from '@/components/Title'
import {Box, Paper, Stack} from '@mui/material'
import {FC} from 'react'

const Dashboard: FC = () => {
  return (
    <>
      <Title>Dashboard</Title>
      <Stack
        spacing={{xs: 2, md: 2.5}}
        mt={5}
        direction={{xs: 'column', md: 'row'}}
      >
        <DashboardAccount />

        <Paper sx={{width: '400px', flexShrink: 0}}></Paper>
      </Stack>

      <Box component="section">
        <DashboardAssetList />
      </Box>
    </>
  )
}

export default Dashboard
