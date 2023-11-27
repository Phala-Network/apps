import {AppBar, Stack, Toolbar} from '@mui/material'
import {type FC} from 'react'
import Account from './Account'
import MoreButton from './MoreButton'

const TopBar: FC = () => {
  return (
    <AppBar color="transparent" position="fixed" sx={{border: 'none'}}>
      <Toolbar sx={{justifyContent: 'flex-end'}}>
        <Stack direction="row" spacing={{xs: 1, sm: 2}}>
          <Account />
          <MoreButton />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
