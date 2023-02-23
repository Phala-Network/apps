import {wikiDialogOpenAtom} from '@/store/ui'
import {
  Dialog,
  DialogContent,
  Slide,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {type TransitionProps} from '@mui/material/transitions'
import {useAtom} from 'jotai'
import {forwardRef, type FC, type Ref} from 'react'
import Wiki from '.'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const WikiDialog: FC = () => {
  const [open, setOpen] = useAtom(wikiDialogOpenAtom)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      {...(fullScreen
        ? {fullScreen: true}
        : {
            maxWidth: 'md',
            fullWidth: true,
          })}
      TransitionComponent={Transition}
      open={open}
      onClose={() => {
        setOpen(false)
      }}
      PaperProps={{
        sx: {
          height: '100vh',
        },
      }}
    >
      <DialogContent>
        <Wiki></Wiki>
      </DialogContent>
    </Dialog>
  )
}

export default WikiDialog
