import {Stack, type SxProps, Typography} from '@mui/material'
import {type FC, type ReactNode} from 'react'

const Property: FC<{
  size?: 'medium' | 'small'
  label: ReactNode
  children: ReactNode
  fullWidth?: boolean
  sx?: SxProps
}> = ({size = 'medium', label, children, fullWidth = false, sx}) => {
  return (
    <Stack
      sx={sx}
      direction={size === 'medium' ? 'column' : 'row'}
      overflow="hidden"
      alignItems={size === 'medium' ? 'flex-start' : 'baseline'}
      {...(fullWidth && {justifyContent: 'space-between'})}
    >
      <Typography
        lineHeight={1.3}
        variant="subtitle2"
        component="div"
        color="text.secondary"
        mr={0.5}
        flexShrink={0}
      >
        {label}
      </Typography>
      {size === 'medium' ? (
        <Typography lineHeight={1.3} variant="num6" component="div">
          {children}
        </Typography>
      ) : (
        <Typography
          lineHeight={1.3}
          variant="num7"
          component="div"
          ml={0.5}
          sx={{wordBreak: 'break-all'}}
        >
          {children}
        </Typography>
      )}
    </Stack>
  )
}

export default Property
