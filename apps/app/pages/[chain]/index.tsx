import DashboardAccount from '@/components/DashboardAccount'
import DashboardAssetList from '@/components/DashboardAssetList'
import DashboardCarousel from '@/components/DashboardCarousel'
import DashboardNftList from '@/components/DashboardNftList'
import Title from '@/components/Title'
import {Box, Paper, Stack} from '@mui/material'
import type {GetStaticPaths, GetStaticProps} from 'next'
import type {FC} from 'react'

export const getStaticProps: GetStaticProps = async () => {
  return {props: {}}
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{params: {chain: 'phala'}}, {params: {chain: 'khala'}}],
    fallback: 'blocking',
  }
}

const Dashboard: FC = () => {
  return (
    <>
      <Title>Dashboard</Title>
      <Stack
        spacing={{xs: 2, md: 2.5}}
        mt={{xs: 2, md: 5}}
        direction={{xs: 'column', md: 'row'}}
      >
        <DashboardAccount />

        <Paper
          sx={{
            height: {xs: 200, md: 'auto'},
            width: {xs: '100%', md: 300, lg: 370},
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <DashboardCarousel />
        </Paper>
      </Stack>

      <Box component="section" mt={4}>
        <DashboardAssetList />
      </Box>
      <Box component="section" mt={4}>
        <DashboardNftList />
      </Box>
    </>
  )
}

export default Dashboard
