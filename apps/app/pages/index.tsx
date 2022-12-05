import Title from '@/components/Title'
import {Box, Stack} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import {FC} from 'react'

const Dashboard: FC = () => {
  const [account] = useAtom(polkadotAccountAtom)
  return (
    <>
      <Title>Dashboard</Title>
      <Stack>
        <Box>{account?.address}</Box>
      </Stack>
    </>
  )
}

export default Dashboard
