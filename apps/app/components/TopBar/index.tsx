import PhalaLogo from '@/assets/phala_logo.svg'
import {faDiscord, faXTwitter} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Language from '@mui/icons-material/Language'
import {
  AppBar,
  Chip,
  IconButton,
  NoSsr,
  Stack,
  Toolbar,
  useTheme,
} from '@mui/material'
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
            <NextLink href="/">
              <PhalaLogo width={30} css={{flexShrink: 0, cursor: 'pointer'}} />
            </NextLink>
          </NoSsr>

          <Stack
            direction="row"
            ml="auto"
            spacing={2}
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
