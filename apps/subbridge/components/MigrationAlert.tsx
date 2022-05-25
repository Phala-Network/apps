import {migrationAlertOpenAtom} from '@/store/common'
import {Alert, AlertProps} from '@mui/material'
import {useAtom} from 'jotai'
import {FC, useEffect, useState} from 'react'

const MigrationAlert: FC<AlertProps> = ({sx, ...props}) => {
  const [open, setOpen] = useAtom(migrationAlertOpenAtom)
  const [isFromApp, setIsFromApp] = useState(false)

  useEffect(() => {
    try {
      const url = new URL(document.referrer)
      if (url.hostname === 'app.phala.network') {
        setIsFromApp(true)
      }
    } catch (err) {
      // noop
    }
  }, [])

  if (!open || !isFromApp) return null

  return (
    <Alert
      icon={false}
      severity="info"
      sx={[{border: 'none'}, ...(Array.isArray(sx) ? sx : [sx])]}
      onClose={() => {
        setOpen(false)
      }}
      {...props}
    >{`We're happy to announce that SubBridge has been upgraded to an independent app! It used to be a feature in Phala App.`}</Alert>
  )
}

export default MigrationAlert
