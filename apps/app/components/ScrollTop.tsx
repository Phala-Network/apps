import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import {Box, Fab, Fade, useScrollTrigger} from '@mui/material'
import type {FC} from 'react'

const ScrollTop: FC = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 600,
  })

  const handleClick = (): void => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{position: 'fixed', bottom: 70, right: 20}}
      >
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </Box>
    </Fade>
  )
}
export default ScrollTop
