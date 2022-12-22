import {Stack, SxProps, Typography} from '@mui/material'
import {FC} from 'react'

const Empty: FC<{message?: string; sx?: SxProps}> = ({
  message = 'No Results',
  sx,
}) => {
  return (
    <Stack justifyContent="center" alignItems="center" height="100%" sx={sx}>
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Stack>
  )
}

export default Empty
