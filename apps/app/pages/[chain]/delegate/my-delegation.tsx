import DelegationList from '@/components/Delegation/List'
import DelegationDetailCard from '@/components/DelegationDetailCard'
import DelegationScatterChart from '@/components/DelegationScatterChart'
import PageHeader from '@/components/PageHeader'
import useSelectedVaultState from '@/hooks/useSelectedVaultState'
import {Box, Paper, Stack} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import type {FC} from 'react'

const MyDelegation: FC = () => {
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const selectedVaultState = useSelectedVaultState()
  return (
    <>
      <PageHeader title="My Delegation" />
      <Stack direction={{xs: 'column', md: 'row'}} spacing={2}>
        <DelegationDetailCard sx={{flex: {xs: 'none', md: '1 0'}}} />
        <Paper
          sx={{
            p: {xs: 1.5, sm: 2},
            background: 'none',
            minWidth: 0,
            height: {xs: 300, md: 'auto'},
            flex: {xs: 'none', md: '1 0'},
          }}
        >
          <Box ml={{xs: -1.5, sm: -2}} height="100%">
            <DelegationScatterChart
              address={
                selectedVaultState === null
                  ? polkadotAccount?.address
                  : selectedVaultState?.account.id
              }
            />
          </Box>
        </Paper>
      </Stack>
      <Box mt={{xs: 2, md: 5}} component="section">
        <DelegationList
          isOwner
          isVault={selectedVaultState !== null}
          address={
            selectedVaultState === null
              ? polkadotAccount?.address
              : selectedVaultState?.account.id
          }
        />
      </Box>
    </>
  )
}

export default MyDelegation
