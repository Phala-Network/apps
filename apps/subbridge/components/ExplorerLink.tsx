import {getFullUrl} from '@/lib/getFullUrl'
import {Link, type LinkProps} from '@mui/material'
import type {FC} from 'react'

const ExplorerLink: FC<
  {kind: 'tx' | 'extrinsic'; url: string; hash: string} & LinkProps
> = ({kind, url, hash, ...props}) => {
  return (
    <Link
      color="inherit"
      href={getFullUrl(url, `${kind}/${hash}`)}
      target="_blank"
      rel="noopener"
      sx={{ml: 1}}
      {...props}
    />
  )
}

export default ExplorerLink
