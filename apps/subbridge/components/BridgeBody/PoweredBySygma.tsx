import SygmaLogo from '@/assets/sygma_logo.svg?react'
import {Stack, type StackProps, Typography, useTheme} from '@mui/material'
import type {FC} from 'react'

const PoweredBySygma: FC<StackProps> = (props) => {
  const theme = useTheme()
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Typography
        variant="body2"
        component="span"
        sx={{mr: 2, color: theme.palette.text.secondary}}
      >
        Powered by
      </Typography>
      <a
        href="https://buildwithsygma.com/"
        target="_blank"
        rel="noreferrer noopener"
        css={{color: 'inherit'}}
      >
        <SygmaLogo
          fill={theme.palette.text.primary}
          width="80px"
          display="block"
        />
      </a>
    </Stack>
  )
}

export default PoweredBySygma
