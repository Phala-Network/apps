import {Stack, SxProps, Typography} from '@mui/material'
import {FC, ReactNode} from 'react'

const Property: FC<{
  size?: 'medium' | 'small'
  label: ReactNode
  children: ReactNode
  sx?: SxProps
}> = ({size = 'medium', label, children, sx}) => {
  return (
    <Stack sx={sx} direction={size === 'medium' ? 'column' : 'row'}>
      <Typography
        lineHeight={1.3}
        variant="subtitle2"
        component="div"
        color="text.secondary"
        mr={0.5}
      >
        {label}
      </Typography>
      {size === 'medium' ? (
        <Typography lineHeight={1.3} variant="num6" component="div">
          {children}
        </Typography>
      ) : (
        <Typography lineHeight={1.3} variant="num7" component="div" ml="auto">
          {children}
        </Typography>
      )}
    </Stack>
  )
}

export default Property
