import {colors} from '@/lib/theme'
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import {FC} from 'react'
import DelegatorSelect from './DelegatorSelect'

const DelegateDataCard: FC<{
  background: string
  title: string
  count: number
}> = ({background, title, count}) => {
  const theme = useTheme()
  return (
    <Box
      sx={{background}}
      borderRadius="2px"
      px={{xs: 1.5, sm: 2}}
      py={{xs: 1, sm: 1.5}}
    >
      <Stack direction="row" alignItems="center" height={24}>
        <Typography
          variant="subtitle1"
          color={theme.palette.text.secondary}
          lineHeight={1}
        >
          {title}
        </Typography>
        {count > 0 && <Chip size="small" label={count} sx={{ml: 'auto'}} />}
      </Stack>
      <Typography
        variant="num3"
        component="div"
        mb={{xs: 0, md: 0.5}}
        mt={{xs: -0.5, md: 0}}
      >
        32,481<sub>PHA</sub>
      </Typography>
      <Stack direction="row" alignItems="baseline" spacing={1}>
        <Typography
          variant="caption"
          component="div"
          color={theme.palette.text.secondary}
        >
          Est. APY
        </Typography>
        <Typography variant="num7" component="div">
          34.5%
        </Typography>
      </Stack>
    </Box>
  )
}

const DelegateDetailCard: FC = () => {
  const theme = useTheme()
  return (
    <Paper sx={{p: {xs: 1.5, sm: 2}, background: 'none'}}>
      <Stack spacing={{xs: 1.5, sm: 2}}>
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
            <Typography
              variant="num1"
              component="div"
              display={{xs: 'none', md: 'block'}}
              lineHeight="1.2"
            >
              4,831,233
              <sub>PHA</sub>
            </Typography>
            <Typography
              variant="num2"
              component="div"
              display={{xs: 'block', md: 'none'}}
              lineHeight="1.2"
            >
              4,831,233
              <sub>PHA</sub>
            </Typography>
          </Box>
          <DelegatorSelect />
        </Stack>
        <Stack
          direction="row"
          spacing={{xs: 1.5, sm: 2}}
          sx={{'>div': {flex: '1 0'}}}
        >
          <DelegateDataCard
            background={colors.vault[300]}
            title="Vault"
            count={12}
          />
          <DelegateDataCard
            background={colors.main[500]}
            title="Stake Pool"
            count={0}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="baseline"
          borderRadius="2px"
          pl={{xs: 1, sm: 2}}
          pr={0.5}
          py={1}
          sx={{background: theme.palette.action.hover}}
        >
          <Typography
            variant="subtitle1"
            component="div"
            color={theme.palette.text.secondary}
          >
            Locked
          </Typography>
          <Typography variant="num6" component="div" flex="1 0" ml={1.5}>
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
