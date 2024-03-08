import {wikiDialogOpenAtom} from '@/store/ui'
import {Dialog, DialogContent, useMediaQuery, useTheme} from '@mui/material'
import {useAtom} from 'jotai'
import type {FC} from 'react'
import Wiki from '.'

const WikiDialog: FC = () => {
  const [open, setOpen] = useAtom(wikiDialogOpenAtom)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      {...(fullScreen ? {fullScreen: true} : {maxWidth: 'md', fullWidth: true})}
      open={open}
      onClose={() => {
        setOpen(false)
      }}
      PaperProps={{sx: {height: fullScreen ? undefined : '700px'}}}
    >
      <DialogContent>
        <Wiki />
      </DialogContent>
    </Dialog>
  )
}

export default WikiDialog
