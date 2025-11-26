'use client'

import type {IconProp} from '@fortawesome/fontawesome-svg-core'
import {faDiscord, faXTwitter} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Language from '@mui/icons-material/Language'
import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import type {FC} from 'react'

const Footer: FC = () => {
  const theme = useTheme()

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: 'auto',
        borderTop: `1px solid ${theme.palette.divider}`,
        // bgcolor: '#1f222e',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{xs: 'column', sm: 'row'}}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Phala Network
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              size="small"
              href="https://discord.gg/phala-network"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faDiscord as IconProp}
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
                icon={faXTwitter as IconProp}
                color={theme.palette.text.secondary}
              />
            </IconButton>
            <IconButton size="small" href="https://phala.com" target="_blank">
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
      </Container>
    </Box>
  )
}

export default Footer
