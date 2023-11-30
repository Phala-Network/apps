'use client'
import Logo from '@/assets/index_logo.svg'
import {AppBar, Box, Button, Stack, Toolbar} from '@mui/material'
import {type FC} from 'react'

const pages: Array<[string, string]> = [
  ['Docs', ''],
  ['Telegram', 'https://t.me'],
  ['Github', ''],
]

const HomeBar: FC = () => {
  return (
    <AppBar color="transparent" sx={{border: 'none'}}>
      <Toolbar sx={{py: [0, 0, 2, 3]}}>
        <Box sx={{mr: 1, flex: 1}}>
          <Box width={[100, 100, 120, 120]}>
            <Logo display="block" />
          </Box>
        </Box>
        <Stack
          sx={{flex: 'none', display: {md: 'flex'}}}
          spacing={[1, 1, 2, 2]}
          direction="row"
        >
          {pages.map(([name, href]) => (
            <Button
              color="inherit"
              href={href}
              variant="text"
              key={name}
              sx={{display: 'block'}}
              target="_blank"
            >
              {name}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default HomeBar
