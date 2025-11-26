import {Button, type ButtonProps} from '@mui/material'
import type {FC, ReactNode} from 'react'

import MetaMaskIcon from './metamask-icon'

interface MetaMaskButtonProps extends Omit<ButtonProps, 'startIcon'> {
  children: ReactNode
}

const MetaMaskButton: FC<MetaMaskButtonProps> = ({children, sx, ...props}) => {
  return (
    <Button
      size="small"
      variant="outlined"
      startIcon={<MetaMaskIcon />}
      sx={{
        fontSize: '0.75rem',
        py: 0.5,
        px: 1.5,
        color: 'text.secondary',
        borderColor: 'divider',
        '&:hover': {
          color: 'text.primary',
          borderColor: 'text.secondary',
          bgcolor: 'action.hover',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default MetaMaskButton
