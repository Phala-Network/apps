import PhalaBrandLogo from '@/assets/phala_brand_logo.svg?react'
import {Box, Typography, useTheme} from '@mui/material'
import type {FC} from 'react'

const Footer: FC = () => {
  const theme = useTheme()
  return (
    <footer>
      <Box
        sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      >
        <Typography
          variant="body2"
          component="span"
          sx={{mr: 2, color: theme.palette.text.secondary}}
        >
          Brought by
        </Typography>
        <a
          href="https://phala.network"
          target="_blank"
          rel="noreferrer noopener"
        >
          <PhalaBrandLogo
            fill={theme.palette.text.primary}
            width="80px"
            display="block"
          />
        </a>
      </Box>
    </footer>
  )
}

export default Footer
