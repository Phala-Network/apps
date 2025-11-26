import phalaLogo from '@/assets/phala_logo.svg'
import {faDiscord, faXTwitter} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Language from '@mui/icons-material/Language'
import {
  AppBar,
  Button,
  Chip,
  IconButton,
  NoSsr,
  Stack,
  Toolbar,
  useTheme,
} from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'
import type {FC} from 'react'

const TopBar: FC = () => {
  const theme = useTheme()

  const background = '#1f222e'

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
          <NoSsr>
            <NextLink href="/" css={{display: 'flex', alignItems: 'center'}}>
              <Image
                src={phalaLogo}
                alt="Phala Network"
                width={30}
                height={30}
                css={{flexShrink: 0, cursor: 'pointer'}}
              />
            </NextLink>
          </NoSsr>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ml: 3}}>
            <Button
              component={NextLink}
              href="/staking"
              variant="text"
              sx={{
                color: 'text.primary',
                fontWeight: 'bold',
                minHeight: 0,
                py: 0,
              }}
            >
              Staking
            </Button>
            <Button
              component="a"
              href="https://bridge.phala.network/"
              target="_blank"
              rel="noopener noreferrer"
              variant="text"
              sx={{
                color: 'text.primary',
                fontWeight: 'bold',
                minHeight: 0,
                py: 0,
              }}
            >
              Bridge
            </Button>
            <Button
              component="a"
              href="https://snapshot.box/#/s:phala-network.eth"
              target="_blank"
              rel="noopener noreferrer"
              variant="text"
              sx={{
                color: 'text.primary',
                fontWeight: 'bold',
                minHeight: 0,
                py: 0,
              }}
            >
              Governance
            </Button>
            <Button
              component={NextLink}
              href="/gpu-mining"
              variant="text"
              sx={{
                color: 'text.primary',
                fontWeight: 'bold',
                minHeight: 0,
                py: 0,
              }}
            >
              GPU Mining
            </Button>
          </Stack>

          <Stack
            direction="row"
            ml="auto"
            spacing={1}
            alignItems="center"
            sx={{mr: 2}}
          >
            <Chip
              variant="outlined"
              color="primary"
              size="small"
              href="/khala-assets"
              component={NextLink}
              label="Claim Phala/Khala Assets"
              onClick={() => {}}
            />
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              size="small"
              href="https://discord.gg/phala-network"
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
              href="https://x.com/PhalaNetwork"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faXTwitter}
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
        </Toolbar>
      </AppBar>
    </>
  )
}

export default TopBar
