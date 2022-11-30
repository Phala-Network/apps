import BasePoolList from '@/components/BasePool/List'
import CreateBasePoolButton from '@/components/CreateBasePoolButton'
import PageHeader from '@/components/PageHeader'
import {Box, Stack} from '@mui/material'
import {FC} from 'react'

const MyVaults: FC = () => {
  return (
    <>
      <PageHeader title="My Vaults" />
      <Stack direction="row">
        <Stack></Stack>
        <CreateBasePoolButton kind="Vault" />
      </Stack>
      <Box mt={3}>
        <BasePoolList kind="Vault" variant="farm" />
      </Box>
    </>
  )
}

export default MyVaults
