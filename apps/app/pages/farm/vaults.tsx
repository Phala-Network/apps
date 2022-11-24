import BasePoolList from '@/components/BasePoolList'
import CreateBasePoolButton from '@/components/CreateBasePoolButton'
import PageHeader from '@/components/PageHeader'
import {BasePoolKind} from '@/lib/subsquid'
import {Box, Stack} from '@mui/material'
import {FC} from 'react'

const MyVaults: FC = () => {
  return (
    <>
      <PageHeader title="My Vaults" />
      <Stack direction="row">
        <Stack></Stack>
        <CreateBasePoolButton kind={BasePoolKind.Vault} />
      </Stack>
      <Box mt={3}>
        <BasePoolList kind={BasePoolKind.Vault} variant="farm" />
      </Box>
    </>
  )
}

export default MyVaults
