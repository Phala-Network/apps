import type {WikiEntry} from '@/assets/wikiData'
import {Stack, type SxProps, Typography} from '@mui/material'
import type {FC, ReactNode} from 'react'
import WikiButton from './Wiki/Button'
import WrapDecimal from './WrapDecimal'

const Property: FC<{
  size?: 'large' | 'medium' | 'small'
  label: ReactNode
  children: ReactNode
  fullWidth?: boolean
  sx?: SxProps
  wikiEntry?: WikiEntry
  wrapDecimal?: boolean
}> = ({
  size = 'medium',
  label,
  children,
  fullWidth = false,
  sx,
  wikiEntry,
  wrapDecimal = false,
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
      alignItems={size === 'small' ? 'baseline' : 'flex-start'}
      {...(fullWidth && {justifyContent: 'space-between'})}
    >
      {wikiEntry == null ? (
        labelNode
      ) : (
        <WikiButton entry={wikiEntry}>{labelNode}</WikiButton>
      )}
      {size === 'large' && (
        <Typography
          lineHeight={1.3}
          variant="num1"
          component="div"
          whiteSpace="nowrap"
        >
          {value}
        </Typography>
      )}
      {size === 'medium' && (
        <Typography
          lineHeight={1.3}
          variant="num5"
          component="div"
          mt={0.25}
          whiteSpace="nowrap"
        >
          {value}
        </Typography>
      )}
      {size === 'small' && (
        <Typography
          lineHeight={1.3}
          variant="num6"
          component="div"
          ml={0.5}
          whiteSpace="nowrap"
          sx={{wordBreak: 'break-all'}}
        >
          {value}
        </Typography>
      )}
    </Stack>
  )
}

export default Property
