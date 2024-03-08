import type {WikiEntry} from '@/assets/wikiData'
import {wikiExpandEntryAtom} from '@/store/common'
import {wikiDialogOpenAtom} from '@/store/ui'
import InfoIcon from '@mui/icons-material/Info'
import {IconButton, Stack} from '@mui/material'
import {useAtom} from 'jotai'
import type {FC, ReactNode} from 'react'

const WikiButton: FC<{entry: WikiEntry; children?: ReactNode}> = ({
  entry,
  children,
}) => {
  const [, setOpen] = useAtom(wikiDialogOpenAtom)
  const [, setExpand] = useAtom(wikiExpandEntryAtom)

  return (
    <Stack direction="row" alignItems="center">
      {children}
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation()
          setOpen(true)
          setExpand(entry)
        }}
        sx={{p: 0.5, mr: -0.5, mb: -1, mt: '-9px', ml: 0}}
      >
        <InfoIcon color="disabled" sx={{fontSize: '1rem'}} />
      </IconButton>
    </Stack>
  )
}

export default WikiButton
