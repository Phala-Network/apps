import StakePoolIcon from '@/assets/stake_pool.svg'
import VaultIcon from '@/assets/vault.svg'
import BasePoolList from '@/components/BasePool/List'
import ClientOnly from '@/components/ClientOnly'
import DelegateChartCard from '@/components/DelegateChartCard'
import DelegateDetailCard from '@/components/DelegateDetailCard'
import NetworkOverview from '@/components/NetworkOverview'
import PageHeader from '@/components/PageHeader'
import useSelectedVaultState from '@/hooks/useSelectedVaultState'
import {BasePoolKind} from '@/lib/subsquid'
import {colors} from '@/lib/theme'
import {
  Box,
  experimental_sx as sx,
  Stack,
  styled,
  Switch,
  Typography,
} from '@mui/material'
import {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import {useRouter} from 'next/router'
import {useCallback, useEffect, useState} from 'react'

const PoolSwitch = styled(Switch)(
  sx({
    p: 0,
    width: 'initial',
    height: 'initial',
    '& .MuiSwitch-switchBase': {
      '&:hover': {backgroundColor: 'transparent'},
      p: '3px',
      '&.Mui-checked': {
        transform: 'translateX(147px)',
        '& .MuiSwitch-thumb': {
          backgroundColor: colors.main[500],
        },
      },
      '& .MuiSwitch-thumb': {
        width: '147px',
        height: '36px',
        borderRadius: 18,
        boxShadow: 'none',
        backgroundColor: colors.vault[500],
      },
    },
    '& .MuiSwitch-track': {
      width: '300px',
      height: '42px',
      borderRadius: 21,
      backgroundColor: '#212330 !important',
      opacity: '1 !important',
    },
  })
)

export const getStaticProps: GetStaticProps = async () => {
  return {props: {}}
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{params: {kind: 'vault'}}, {params: {kind: 'stake-pool'}}],
    fallback: false,
  }
}

const Delegate: NextPage = () => {
  const {
    query: {kind},
  } = useRouter()
  const router = useRouter()
  const isVault = kind === 'vault'
  // Avoid ui lag
  const [switchChecked, setSwitchChecked] = useState(!isVault)
  const selectedVaultState = useSelectedVaultState()
  const asAccount = selectedVaultState === null

  const handleSwitchChange = useCallback(
    (checked: boolean) => {
      setSwitchChecked(checked)
      router.replace(
        `/delegate/${checked ? 'stake-pool' : 'vault'}`,
        undefined,
        {
          shallow: true,
        }
      )
    },
    [router]
  )

  useEffect(() => {
    if (!asAccount) {
      handleSwitchChange(true)
    }
  }, [asAccount, handleSwitchChange])

  return (
    <>
      <PageHeader title="Delegate">
        <NetworkOverview />
      </PageHeader>

      <Stack
        direction={{xs: 'column', md: 'row'}}
        spacing={2}
        sx={{'>div': {flex: '1 0'}}}
      >
        <DelegateDetailCard />
        <DelegateChartCard />
      </Stack>

      <ClientOnly>
        {asAccount && (
          <Stack
            direction="row"
            mt={{xs: 2, md: 5}}
            alignItems="center"
            justifyContent="center"
          >
            <Box position="relative">
              <PoolSwitch
                checked={switchChecked}
                onChange={(e) => {
                  handleSwitchChange(e.target.checked)
                }}
              />
              <Stack
                direction="row"
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                width={1}
                sx={{pointerEvents: 'none'}}
              >
                <Stack
                  px={2}
                  flex="1 0"
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  color={switchChecked ? 'text.secondary' : 'text.primary'}
                >
                  <VaultIcon width={24} />
                  <Typography variant="button" flex="1" textAlign="center">
                    Vault
                  </Typography>
                </Stack>
                <Stack
                  px={2}
                  flex="1 0"
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  color={switchChecked ? 'text.primary' : 'text.secondary'}
                >
                  <StakePoolIcon width={24} />
                  <Typography variant="button" flex="1" textAlign="center">
                    Stake Pool
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        )}
      </ClientOnly>

      <BasePoolList
        sx={{mt: {xs: 2, md: 5}}}
        variant="delegate"
        kind={isVault ? BasePoolKind.Vault : BasePoolKind.StakePool}
      />
    </>
  )
}

export default Delegate
