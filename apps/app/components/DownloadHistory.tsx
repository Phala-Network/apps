import {chainAtom} from '@/store/common'
import {Button, type ButtonProps} from '@mui/material'
import {useAtom} from 'jotai'
import type {FC} from 'react'

const DownloadHistory: FC<
  {
    kind: 'pool' | 'account' | 'delegation'
    id: string
  } & ButtonProps
> = ({kind, id, ...props}) => {
  const [chain] = useAtom(chainAtom)
  return (
    <Button
      variant="text"
      size="small"
      href={`/api/${chain}/snapshots/${kind}/${id}`}
      {...props}
    >
      Download history data
    </Button>
  )
}

export default DownloadHistory
