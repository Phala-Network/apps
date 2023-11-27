'use client'
import {
  Button,
  Paper,
  Skeleton,
  Typography,
  type ButtonProps as MuiButtonProps,
} from '@mui/material'
import {type FC, type ReactNode} from 'react'

const AccountTemplate: FC<{
  balance?: ReactNode
  account: ReactNode
  ButtonProps?: MuiButtonProps
}> = ({balance, account, ButtonProps}) => {
  return (
    <Paper sx={{display: 'flex', alignItems: 'center'}}>
      {balance == null || balance === false ? (
        <Skeleton width={80} height={20} sx={{mx: 1}} />
      ) : (
        <Typography
          variant="body2"
          component="span"
          sx={{mx: 1, flex: 'none', fontWeight: 500}}
        >
          {balance}
        </Typography>
      )}

      <Button
        sx={{px: 1, maxWidth: 128, flex: 'none', my: '-1px', mr: '-1px'}}
        {...ButtonProps}
      >
        <span
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {account}
        </span>
      </Button>
    </Paper>
  )
}

export default AccountTemplate
