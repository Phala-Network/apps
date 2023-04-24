import {alpha, AppBar, Stack, Toolbar, useTheme} from '@mui/material'
import {type FC} from 'react'
import Account from './Account'
import Logo from './Logo'
import MoreButton from './MoreButton'

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
        <Logo />
        <Stack direction="row" spacing={{xs: 1, sm: 2}}>
          <Account />
          <MoreButton />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
