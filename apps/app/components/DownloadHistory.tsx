import {Button, type ButtonProps} from '@mui/material'
import type {FC} from 'react'

const DownloadHistory: FC<
  {
    kind: 'pool' | 'account' | 'delegation'
    id: string
  } & ButtonProps
> = ({kind, id, ...props}) => {
  return (
    <Button
      variant="text"
      size="small"
      href={`/api/phala/snapshots/${kind}/${id}`}
      {...props}
    >
      Download historical data
    </Button>
  )
}

export default DownloadHistory
