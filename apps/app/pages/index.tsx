import ClientOnly from '@/components/ClientOnly'
import Title from '@/components/Title'
import {colors} from '@/lib/theme'
import {hideBalanceAtom} from '@/store/ui'
import {RemoveRedEye, VisibilityOff} from '@mui/icons-material'
import {
  Box,
  experimental_sx as sx,
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {trimAddress} from '@phala/util'
import {useAtom} from 'jotai'
import dynamic from 'next/dynamic'
import {FC} from 'react'

const BalanceBox = styled(Box)(
  sx({
    flex: 1,
    background: colors.main[500],
    padding: {xs: 1, sm: 2},
    borderRadius: '2px',
  })
)

const Identicon = dynamic(() => import('@polkadot/react-identicon'), {
  ssr: false,
})

const Dashboard: FC = () => {
  const [hideBalance, setHideBalance] = useAtom(hideBalanceAtom)
  const [account] = useAtom(polkadotAccountAtom)
  return (
    <>
      <Title>Dashboard</Title>
      <Stack
        spacing={{xs: 2, md: 2.5}}
        mt={5}
        direction={{xs: 'column', md: 'row'}}
      >
        <Paper
          sx={{
            background: 'transparent',
            p: {xs: 2, md: 2.5},
            flex: 1,
            minWidth: 0,
          }}
        >
          <ClientOnly>
            {account ? (
              <Box>
                <Stack
                  direction="row"
                  spacing={{xs: 2, md: 3}}
                  alignItems="center"
                >
                  <Identicon value={account.address} theme="polkadot" />
                  <Box flex="1">
                    <Typography
                      variant="h4"
                      component="div"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      minWidth={0}
                    >
                      {account.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="div"
                    >
                      {trimAddress(account.address)}
                    </Typography>
                  </Box>
                  <IconButton onClick={() => setHideBalance((x) => !x)}>
                    {hideBalance ? (
                      <RemoveRedEye color="disabled" />
                    ) : (
                      <VisibilityOff color="disabled" />
                    )}
                  </IconButton>
                </Stack>

                <Stack
                  spacing={{xs: 2, md: 2.5}}
                  direction="row"
                  mt={{xs: 2, md: 2.5}}
                >
                  <BalanceBox>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      lineHeight={1}
                    >
                      Balance
                    </Typography>
                  </BalanceBox>
                  <BalanceBox>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      lineHeight={1}
                    >
                      Delegation
                    </Typography>
                  </BalanceBox>
                </Stack>
              </Box>
            ) : (
              <Box></Box>
            )}
          </ClientOnly>
        </Paper>
        <Paper sx={{width: '400px', flexShrink: 0}}></Paper>
      </Stack>
    </>
  )
}

export default Dashboard
