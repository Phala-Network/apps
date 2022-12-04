import PhalaLogo from '@/assets/phala_logo.svg'
import {montserrat} from '@/lib/theme'
import {AppBar, Button, Stack, Toolbar, Tooltip, useTheme} from '@mui/material'
import NextLink from 'next/link'
import {FC} from 'react'
import Account from './Account'
import Chain from './Chain'

interface NavItem {
  label: string
  href?: string
  sub?: NavItem[]
}

const navItems: NavItem[] = [
  {label: 'Dashboard', href: '/'},
  {
    label: 'Delegate',
    sub: [
      {label: 'Vault', href: '/delegate/vault'},
      {label: 'Stake Pool', href: '/delegate/stake-pool'},
      {label: 'My Delegation', href: '/delegate/my-delegation'},
    ],
  },
  {
    label: 'Farm',
    sub: [
      {label: 'Vault', href: '/farm/vault'},
      {label: 'Stake Pool', href: '/farm/stake-pool'},
    ],
  },
  {label: 'SubBridge', href: 'https://subbridge.io'},
  {label: 'DAO', href: ''},
]

const NavItem: FC<{item: NavItem}> = ({item: {label, href}}) => {
  const isExternal = !href || !href.startsWith('/')
  const theme = useTheme()

  const link = (
    <Button
      variant="text"
      className={montserrat.className}
      sx={{
        fontWeight: 600,
        color: theme.palette.text.primary,
        ...(!href && {cursor: 'default'}),
      }}
      {...(isExternal && href && {href, target: '_blank'})}
    >
      {label}
    </Button>
  )

  if (isExternal) {
    return link
  }

  return (
    <NextLink href={href} passHref legacyBehavior shallow>
      {link}
    </NextLink>
  )
}

NavItem.displayName = 'NavItem'

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
          display={{xs: 'none', lg: 'flex'}}
        >
          {navItems.map((item) => {
            if (!item.sub) {
              return <NavItem key={item.label} item={item} />
            }
            return (
              <Tooltip
                enterTouchDelay={0}
                title={
                  <Stack>
                    {item.sub.map((item) => (
                      <NavItem key={item.label} item={item} />
                    ))}
                  </Stack>
                }
                placement="bottom-start"
                key={item.label}
              >
                <span>
                  <NavItem key={item.label} item={item} />
                </span>
              </Tooltip>
            )
          })}
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
