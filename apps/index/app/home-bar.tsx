'use client'
import Logo from '@/assets/index_logo.svg'
import {AppBar, Box, Button, Container, Stack, Toolbar} from '@mui/material'
import {type FC} from 'react'

const pages: Array<[string, string]> = [
  ['Docs', ''],
  ['Community', 'https://t.me/inDEXbyPhala/1'],
  ['Github', 'https://github.com/Phala-Network/index-contract'],
]

const HomeBar: FC = () => {
  return (
    <AppBar color="transparent" position="static" sx={{border: 'none'}}>
      <Container maxWidth="xl">
        <Toolbar sx={{py: [0, 1, 2, 3], px: '0!important'}}>
          <Box sx={{flex: 1}}>
            <Box width={[100, 100, 120, 120]}>
              <Logo display="block" />
            </Box>
          </Box>
          <Stack sx={{flex: 'none'}} spacing={[0, 1, 2]} direction="row">
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
      </Container>
    </AppBar>
  )
}

export default HomeBar
