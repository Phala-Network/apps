import {Box, Button, Paper, Stack, Typography, useTheme} from '@mui/material'
import {FC} from 'react'
import DelegatorSelect from './DelegatorSelect'

const DelegateDetailCard: FC = () => {
  const theme = useTheme()
  return (
    <Paper sx={{p: {xs: 1.5, sm: 2}}}>
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography
              variant="subtitle1"
              component="div"
              color={theme.palette.text.secondary}
            >
              Delegation
            </Typography>
            <Stack direction="row" alignItems="baseline" spacing={0.5}>
              <Typography variant="num2" component="div" lineHeight="1.2">
                354,831,233
              </Typography>
              <Typography variant="body1" component="div">
                PHA
              </Typography>
            </Stack>
          </Box>
          <DelegatorSelect />
        </Stack>
        <Stack direction="row">
          <Box></Box>
          <Box></Box>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          borderRadius="2px"
          pl={2}
          pr={0.5}
          py={1}
          sx={{background: theme.palette.grey[900]}}
        >
          <Typography
            variant="subtitle1"
            component="div"
            color={theme.palette.text.secondary}
          >
            Locked
          </Typography>
          <Typography variant="subtitle2" component="div" flex="1 0" ml={1.5}>
            201 PHA
          </Typography>
          <Button variant="text" size="small">
            Claim All
          </Button>
          <Button variant="text" size="small">
            Track
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default DelegateDetailCard
