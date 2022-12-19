import PhalaLogo from '@/assets/phala_logo.svg'
import {montserrat} from '@/lib/theme'
import {chainAtom} from '@/store/common'
import {faDiscord, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Language from '@mui/icons-material/Language'
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  useTheme,
} from '@mui/material'
import {useAtom} from 'jotai'
import NextLink from 'next/link'
import {FC} from 'react'
import Account from './Account'
import Chain from './Chain'

interface NavItem {
  label: string
  href?: string
  disabled?: boolean
  sub?: NavItem[]
}

const NavItem: FC<{item: NavItem}> = ({item: {label, href, disabled}}) => {
  const isExternal = !href || !href.startsWith('/')
  const theme = useTheme()

  const link = (
    <Button
      disabled={disabled}
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
  const [chain] = useAtom(chainAtom)
  const theme = useTheme()
  const navItems: NavItem[] = [
    {label: 'Dashboard', href: '/'},
    {
      label: 'Delegate',
      disabled: chain !== 'khala',
      sub: [
        {label: 'Delegate', href: '/delegate/vault'},
        {label: 'My Delegation', href: '/delegate/my-delegation'},
      ],
    },
    {
      label: 'Farm',
      disabled: chain !== 'khala',
      sub: [
        {label: 'Vault', href: '/farm/vault'},
        {label: 'StakePool', href: '/farm/stake-pool'},
      ],
    },
    {label: 'SubBridge', href: 'https://subbridge.io'},
    {
      label: 'DAO',
      sub: [
        {label: 'Forum', href: 'https://forum.phala.network/'},
        {
          label: 'Governance',
          href: 'https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkhala-api.phala.network%2Fws#/democracy',
        },
        {label: 'Subsquare.io', href: 'https://khala.subsquare.io/'},
      ],
    },
  ]
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
          ml={2}
          spacing={1}
          component="nav"
          direction="row"
          display={{xs: 'none', md: 'flex'}}
        >
          {navItems.map((item) => {
            if (!item.sub) {
              return <NavItem key={item.label} item={item} />
            }
            return (
              <Tooltip
                disableFocusListener={item.disabled}
                disableHoverListener={item.disabled}
                disableTouchListener={item.disabled}
                leaveDelay={200}
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
        <Stack direction="row" ml="auto" spacing={2} alignItems="center">
          <Chain />
          <Account />
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            display={{xs: 'none', md: 'flex'}}
          >
            <IconButton
              size="small"
              href="https://discord.gg/phala"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faDiscord}
                width={18}
                color={theme.palette.text.secondary}
              />
            </IconButton>
            <IconButton
              size="small"
              href="https://twitter.com/PhalaNetwork"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                color={theme.palette.text.secondary}
              />
            </IconButton>
            <IconButton
              size="small"
              href="https://phala.network"
              target="_blank"
            >
              <Language
                sx={{
                  width: 18,
                  height: 18,
                  color: theme.palette.text.secondary,
                }}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
