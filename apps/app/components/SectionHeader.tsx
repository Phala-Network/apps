import {Stack, type SxProps, Typography} from '@mui/material'
import type {FC, ReactNode} from 'react'

const SectionHeader: FC<{
  icon: ReactNode
  title: ReactNode
  children?: ReactNode
  sx?: SxProps
}> = ({title, icon, children, sx}) => {
  return (
    <Stack direction="row" alignItems="center" width="100%" my={3} sx={sx}>
      <Stack direction="row" spacing={{xs: 1, md: 2}} alignItems="center">
        <Stack
          alignItems="center"
          justifyContent="center"
          flexShrink="0"
          width={{xs: 32, md: 40}}
        >
          {icon}
        </Stack>
        <Typography
          component="h2"
          variant="h4"
          display={{xs: 'none', md: 'block'}}
        >
          {title}
        </Typography>
        <Typography
          component="h2"
          variant="h5"
          display={{xs: 'block', md: 'none'}}
        >
          {title}
        </Typography>
      </Stack>
      {children}
    </Stack>
  )
}

export default SectionHeader
