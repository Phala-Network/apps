import {
  Button,
  type ButtonProps as MuiButtonProps,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material'
import type {FC, ReactNode} from 'react'

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
          css={{
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
