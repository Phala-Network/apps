import {type WikiEntry} from '@/assets/wikiData'
import {Stack, Typography, type SxProps} from '@mui/material'
import {type FC, type ReactNode} from 'react'
import WikiButton from './Wiki/Button'

const Property: FC<{
  size?: 'large' | 'medium' | 'small'
  label: ReactNode
  children: ReactNode
  fullWidth?: boolean
  sx?: SxProps
  wikiEntry?: WikiEntry
}> = ({size = 'medium', label, children, fullWidth = false, sx, wikiEntry}) => {
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
          {children}
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
          {children}
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
          {children}
        </Typography>
      )}
    </Stack>
  )
}

export default Property
