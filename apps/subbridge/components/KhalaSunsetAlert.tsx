import {khalaSunsetAlertOpenAtom} from '@/store/common'
import {Alert, type AlertProps, Link} from '@mui/material'
import {useAtom} from 'jotai'
import type {FC} from 'react'

const KhalaSunsetAlert: FC<AlertProps> = ({sx, ...props}) => {
  const [open, setOpen] = useAtom(khalaSunsetAlertOpenAtom)
  if (!open) return null

  return (
    <Alert
      icon={false}
      severity="info"
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      sx={[{border: 'none'}, ...(Array.isArray(sx) ? (sx as any) : [sx])]}
      onClose={() => {
        setOpen(false)
      }}
      {...props}
    >
      Khala Network has officially closed.{' '}
      <Link
        href="https://x.com/PhalaNetwork/status/1876686031736414684"
        target="_blank"
      >
        Learn more
      </Link>
    </Alert>
  )
}

export default KhalaSunsetAlert
