import DelegateChartCard from '@/components/DelegateChartCard'
import DelegateDetailCard from '@/components/DelegateDetailCard'
import DelegationList from '@/components/Delegation/List'
import PageHeader from '@/components/PageHeader'
import {Box, Stack} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import {FC} from 'react'

const MyDelegation: FC = () => {
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  return (
    <>
      <PageHeader title="My Delegation"></PageHeader>
      <Stack
        direction={{xs: 'column', md: 'row'}}
        spacing={2}
        sx={{'>div': {flex: '1 0'}}}
      >
        <DelegateDetailCard />
        <DelegateChartCard />
      </Stack>
      <Box mt={{xs: 2, md: 5}} component="section">
        <DelegationList address={polkadotAccount?.address} />
      </Box>
    </>
  )
}

export default MyDelegation
