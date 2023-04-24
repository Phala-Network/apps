import {Box} from '@mui/material'
import {type FC} from 'react'

const Logo: FC<{className?: string}> = ({className}) => {
  return (
    <Box
      className={className}
      fontWeight="bold"
      fontSize="h5.fontSize"
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      inDEX
    </Box>
  )
}

export default Logo
