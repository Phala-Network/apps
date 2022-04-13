import {alpha, AppBar, Stack, Toolbar, useTheme} from '@mui/material'
import {FC} from 'react'
import Account from './Account'
import MoreButton from './MoreButton'
import SubbridgeLogo from './SubbridgeLogo'

const TopBar: FC = () => {
  const theme = useTheme()

  return (
    <AppBar
      color="transparent"
      position="fixed"
      sx={{
        border: 'none',
        background: alpha(theme.palette.background.default, 0.6),
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <SubbridgeLogo />
        <Stack direction="row" spacing={{xs: 1, sm: 2}}>
          <Account />
          <MoreButton />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
