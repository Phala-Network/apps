import {Alert, type AlertProps, Typography} from '@mui/material'
import type {FC} from 'react'

const DestinationAccountWarning: FC<AlertProps> = ({sx, ...props}) => {
  return (
    <Alert
      icon={false}
      severity="warning"
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      sx={[{border: 'none'}, ...(Array.isArray(sx) ? (sx as any) : [sx])]}
      {...props}
    >
      <Typography variant="body2" component="span">
        Please check the target address/network again before transferring. Do
        not transfer to <b>hardware wallets</b>.
      </Typography>
    </Alert>
  )
}

export default DestinationAccountWarning
