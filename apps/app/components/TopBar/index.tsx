import PhalaLogo from '@/assets/phala_logo.svg'
import {montserrat} from '@/lib/theme'
import {chainAtom} from '@/store/common'
import {faDiscord, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Language from '@mui/icons-material/Language'
import Menu from '@mui/icons-material/Menu'
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  ButtonProps,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  useTheme,
} from '@mui/material'
import {useAtom} from 'jotai'
import NextLink from 'next/link'
import {FC, useState} from 'react'
import Account from './Account'
import Chain from './Chain'

interface NavItem {
  label: string
  href?: string
  disabled?: boolean
  sub?: NavItem[]
}

const NavItem: FC<{item: NavItem; onClick?: ButtonProps['onClick']}> = ({
  item: {label, href, disabled},
  onClick,
}) => {
  const isExternal = !href || !href.startsWith('/')
  const theme = useTheme()

  const link = (
    <Button
      disabled={disabled}
      variant="text"
      className={montserrat.className}
      sx={{
        minWidth: 0,
        fontWeight: 600,
        color: theme.palette.text.primary,
        justifyContent: 'flex-start',
        ...(!href && {cursor: 'default'}),
      }}
      onClick={onClick}
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
  const [collapseIn, setCollapseIn] = useState(false)
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

  const toggleCollapse = () => {
    setCollapseIn((prev) => !prev)
  }

  const icons = (
    <Stack direction="row" spacing={1} alignItems="center">
      <IconButton size="small" href="https://discord.gg/phala" target="_blank">
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
      <IconButton size="small" href="https://phala.network" target="_blank">
        <Language
          sx={{
            width: 18,
            height: 18,
            color: theme.palette.text.secondary,
          }}
        />
      </IconButton>
    </Stack>
  )

  const background = '#1f222e'

  return (
    <>
      <Backdrop
        sx={{zIndex: (theme) => theme.zIndex.appBar - 1}}
        open={collapseIn}
        onClick={toggleCollapse}
      />
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
          <PhalaLogo width={30} css={{flexShrink: 0}} />
          <Stack
            ml={{md: 1, lg: 2}}
            spacing={{lg: 1}}
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
            <IconButton
              sx={{display: {sx: 'inline-flex', md: 'none'}}}
              onClick={toggleCollapse}
            >
              <Menu />
            </IconButton>
            <Box display={{xs: 'none', md: 'block'}}>{icons}</Box>
          </Stack>
        </Toolbar>

        <Collapse
          sx={{
            position: 'absolute',
            top: 57,
            left: 0,
            right: 0,
            background,
          }}
          in={collapseIn}
        >
          <Stack divider={<Divider flexItem />} spacing={1} p={2}>
            {navItems.map((item) => {
              if (!item.sub) {
                return (
                  <NavItem
                    onClick={toggleCollapse}
                    key={item.label}
                    item={item}
                  />
                )
              } else {
                return item.sub.map((subItem) => (
                  <NavItem
                    onClick={toggleCollapse}
                    key={subItem.label}
                    item={{
                      ...subItem,
                      label:
                        item.label === 'Delegate'
                          ? subItem.label
                          : `${item.label} - ${subItem.label}`,
                    }}
                  />
                ))
              }
            })}
            <Box py={1}>{icons}</Box>
          </Stack>
        </Collapse>
      </AppBar>
    </>
  )
}

export default TopBar
