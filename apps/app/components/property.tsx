'use client'

import {Stack, type StackProps, type SxProps, Typography} from '@mui/material'
import type {FC, ReactNode} from 'react'

import WrapDecimal from './wrap-decimal'

const Property: FC<
  {
    size?: 'large' | 'medium' | 'small'
    label: ReactNode
    children: ReactNode
    fullWidth?: boolean
    sx?: SxProps
    wrapDecimal?: boolean
    center?: boolean
  } & StackProps
> = ({
  size = 'medium',
  label,
  children,
  fullWidth = false,
  sx,
  wrapDecimal = false,
  center = false,
  ...stackProps
}) => {
  const labelNode = (
    <Typography
      lineHeight={1.3}
      variant={size === 'large' ? 'subtitle1' : 'subtitle2'}
      component="div"
      color="text.secondary"
      flexShrink={0}
    >
      {label}
    </Typography>
  )

  const value = wrapDecimal ? <WrapDecimal>{children}</WrapDecimal> : children

  return (
    <Stack
      sx={sx}
      direction={size === 'small' ? 'row' : 'column'}
      alignItems={
        center ? 'center' : size === 'small' ? 'baseline' : 'flex-start'
      }
      {...(fullWidth && {justifyContent: 'space-between'})}
      {...stackProps}
    >
      {labelNode}
      {size === 'large' && (
        <Typography
          lineHeight={1.3}
          component="div"
          sx={{
            fontWeight: 600,
            fontSize: {xs: '1.25rem', sm: '1.5rem'},
            wordBreak: 'break-word',
          }}
        >
          {value}
        </Typography>
      )}
      {size === 'medium' && (
        <Typography
          lineHeight={1.3}
          component="div"
          mt={0.25}
          sx={{
            fontWeight: 500,
            fontSize: {xs: '0.9rem', sm: '1rem'},
            wordBreak: 'break-word',
          }}
        >
          {value}
        </Typography>
      )}
      {size === 'small' && (
        <Typography
          lineHeight={1.3}
          component="div"
          ml={0.5}
          sx={{
            fontWeight: 500,
            fontSize: {xs: '0.8rem', sm: '0.9rem'},
            wordBreak: 'break-word',
          }}
        >
          {value}
        </Typography>
      )}
    </Stack>
  )
}

export default Property
