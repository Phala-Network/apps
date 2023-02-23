import {wikiExpandAtom} from '@/store/common'
import {wikiDialogOpenAtom} from '@/store/ui'
import InfoIcon from '@mui/icons-material/Info'
import {IconButton} from '@mui/material'
import {useAtom} from 'jotai'
import {type FC} from 'react'

const WikiButton: FC<{entry: string}> = ({entry}) => {
  const [, setOpen] = useAtom(wikiDialogOpenAtom)
  const [, setExpand] = useAtom(wikiExpandAtom)
  return (
    <IconButton
      size="small"
      onClick={() => {
        setOpen(true)
        setExpand(entry)
      }}
    >
      <InfoIcon color="disabled" fontSize="small" />
    </IconButton>
  )
}

export default WikiButton
