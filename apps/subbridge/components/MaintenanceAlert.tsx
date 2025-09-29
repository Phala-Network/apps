import {Alert, type AlertProps, AlertTitle} from '@mui/material'
import type {FC} from 'react'

const MaintenanceAlert: FC<AlertProps> = ({sx, ...props}) => {
  return (
    <Alert
      // icon={false}
      severity="info"
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      sx={[{border: 'none'}, ...(Array.isArray(sx) ? (sx as any) : [sx])]}
      {...props}
    >
      <AlertTitle>
        Phala ↔ Ethereum bridge currently under maintenance
      </AlertTitle>
    </Alert>
  )
}

export default MaintenanceAlert
