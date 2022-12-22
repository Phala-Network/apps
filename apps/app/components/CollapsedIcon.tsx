import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import {useTheme} from '@mui/material'
import {FC} from 'react'

const CollapsedIcon: FC<{collapsed: boolean}> = ({collapsed}) => {
  const theme = useTheme()
  return (
    <KeyboardArrowRight
      sx={{
        transform: `rotate(${collapsed ? 0 : 90}deg)`,
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeInOut,
        }),
      }}
    />
  )
}

export default CollapsedIcon
