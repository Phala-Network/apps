import {phalaSunsetAlertOpenAtom} from '@/store/common'
import {Alert, type AlertProps, AlertTitle, Link} from '@mui/material'
import {useAtom} from 'jotai'
import type {FC} from 'react'

const PhalaSunsetAlert: FC<AlertProps> = ({sx, ...props}) => {
  const [open, setOpen] = useAtom(phalaSunsetAlertOpenAtom)
  if (!open) return null

  return (
    <Alert
      severity="warning"
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      sx={[{border: 'none'}, ...(Array.isArray(sx) ? (sx as any) : [sx])]}
      onClose={() => {
        setOpen(false)
      }}
      {...props}
    >
      <AlertTitle>Phala Bridge Service Ending</AlertTitle>
      The Phala &lt;-&gt; Ethereum bridge will stop service on November 10th due
      to the Phala parachain sunset.{' '}
      <Link
        href="https://phala.subsquare.io/democracy/referenda/77"
        target="_blank"
      >
        Learn more
      </Link>
    </Alert>
  )
}

export default PhalaSunsetAlert
