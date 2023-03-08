import {type WikiEntry} from '@/assets/wikiData'
import {Stack, Typography, type SxProps} from '@mui/material'
import {type FC, type ReactNode} from 'react'
import WikiButton from './Wiki/Button'

const Property: FC<{
  size?: 'medium' | 'small'
  label: ReactNode
  children: ReactNode
  fullWidth?: boolean
  sx?: SxProps
  wikiEntry?: WikiEntry
}> = ({size = 'medium', label, children, fullWidth = false, sx, wikiEntry}) => {
  const labelNode = (
    <Typography
      lineHeight={1.3}
      variant="subtitle2"
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
      direction={size === 'medium' ? 'column' : 'row'}
      alignItems={size === 'medium' ? 'flex-start' : 'baseline'}
      {...(fullWidth && {justifyContent: 'space-between'})}
    >
      {wikiEntry == null ? (
        labelNode
      ) : (
        <WikiButton entry={wikiEntry}>{labelNode}</WikiButton>
      )}
      {size === 'medium' ? (
        <Typography
          lineHeight={1.3}
          variant="num5"
          component="div"
          mt={0.25}
          whiteSpace="nowrap"
        >
          {children}
        </Typography>
      ) : (
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
