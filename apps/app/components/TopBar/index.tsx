import PhalaLogo from '@/assets/phala_logo.svg'
import {montserrat} from '@/lib/theme'
import {AppBar, Button, Stack, Toolbar, useTheme} from '@mui/material'
import NextLink from 'next/link'
import {FC} from 'react'
import Account from './Account'
import Chain from './Chain'

interface NavItem {
  name: string
  href: string
}

const navItems: NavItem[] = [
  {name: 'dashboard', href: '/'},
  {name: 'delegate', href: '/delegate/vault'},
  {name: 'farm', href: '/farm/stake-pool'},
  {name: 'subBridge', href: 'https://subbridge.io'},
  {name: 'DAO', href: ''},
]

const NavItem: FC<{item: NavItem}> = ({item: {name, href}}) => {
  const isExternal = !href.startsWith('/')
  const theme = useTheme()

  const link = (
    <Button
      variant="text"
      className={montserrat.className}
      sx={{
        textTransform: 'capitalize',
        color: theme.palette.text.primary,
      }}
      {...(isExternal && {href, target: '_blank'})}
    >
      {name}
    </Button>
  )

  if (isExternal) {
    return link
  }

  return (
    <NextLink href={href} passHref legacyBehavior>
      {link}
    </NextLink>
  )
}

const TopBar: FC = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        background: '#1f222e',
        mb: 1,
      }}
    >
      <Toolbar>
        <PhalaLogo width={30} css={{flexShrink: 0}} />
        <Stack
          ml={3}
          spacing={1}
          component="nav"
          direction="row"
          display={['none', 'flex']}
        >
          {navItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </Stack>
        <Stack direction="row" ml="auto" spacing={2}>
          <Chain />
          <Account />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
