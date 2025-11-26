'use client'

import Close from '@mui/icons-material/Close'
import Menu from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  NoSsr,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'
import {usePathname} from 'next/navigation'
import {type FC, useState} from 'react'

import phalaLogo from '@/assets/phala_logo.svg'
import AppKitButton from '@/components/app-kit-button'

const navItems = [
  {label: 'Staking', href: '/staking', external: false},
  {label: 'GPU Mining', href: '/gpu-mining', external: false},
  {label: 'Bridge', href: 'https://bridge.phala.network/', external: true},
  {
    label: 'Governance',
    href: 'https://snapshot.box/#/s:phala-network.eth',
    external: true,
  },
  {
    label: 'Analytics',
    href: 'https://dune.com/phala_network/phala-analytics',
    external: true,
  },
  {
    label: 'Explorer',
    href: 'https://explorer.phala.network/',
    external: true,
  },
]

const TopBar: FC = () => {
  const theme = useTheme()
  const pathname = usePathname()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const background = '#1f222e'

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const drawer = (
    <Box sx={{width: 280, height: '100%', bgcolor: background}}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <NextLink href="/" style={{display: 'flex', alignItems: 'center'}}>
          <Image
            src={phalaLogo}
            alt="Phala Network"
            width={30}
            height={30}
            style={{flexShrink: 0, cursor: 'pointer'}}
          />
        </NextLink>
        <IconButton onClick={handleDrawerToggle} sx={{color: 'text.primary'}}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={item.external ? 'a' : NextLink}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              onClick={handleDrawerToggle}
              selected={!item.external && pathname === item.href}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgba(197, 255, 70, 0.1)',
                  borderRight: `3px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{fontWeight: 600}}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{p: 2}}>
        <Chip
          variant="outlined"
          color="primary"
          size="small"
          href="/khala-assets"
          component={NextLink}
          label="Claim Phala/Khala Assets"
          onClick={handleDrawerToggle}
          sx={{width: '100%'}}
        />
      </Box>
    </Box>
  )

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          borderTop: 0,
          borderLeft: 0,
          borderRight: 0,
          background,
          mb: 1,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{mr: 1}}
            >
              <Menu />
            </IconButton>
          )}

          <NextLink href="/" style={{display: 'flex', alignItems: 'center'}}>
            <Image
              src={phalaLogo}
              alt="Phala Network"
              width={30}
              height={30}
              style={{flexShrink: 0, cursor: 'pointer'}}
            />
          </NextLink>

          {!isMobile && (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ml: 3}}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={item.external ? 'a' : NextLink}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  variant="text"
                  sx={{
                    color:
                      !item.external && pathname === item.href
                        ? 'primary.main'
                        : 'text.primary',
                    fontWeight: 'bold',
                    minHeight: 0,
                    py: 0,
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          )}

          {!isMobile && (
            <Chip
              variant="outlined"
              color="primary"
              size="small"
              href="/khala-assets"
              component={NextLink}
              label="Claim Phala/Khala Assets"
              onClick={() => {}}
              sx={{ml: 'auto'}}
            />
          )}

          <Box sx={{ml: isMobile ? 'auto' : 2}}>
            <AppKitButton />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{keepMounted: true}}
        sx={{
          display: {xs: 'block', md: 'none'},
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            bgcolor: background,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default TopBar
