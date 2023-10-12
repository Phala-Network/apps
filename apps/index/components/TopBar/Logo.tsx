import {Box} from '@mui/material'
import {useRouter} from 'next/router'
import {type FC} from 'react'

const Logo: FC<{className?: string}> = ({className}) => {
  const {pathname} = useRouter()
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
      inDEX{pathname === '/gpt' ? ' GPT' : ''}
    </Box>
  )
}

export default Logo
