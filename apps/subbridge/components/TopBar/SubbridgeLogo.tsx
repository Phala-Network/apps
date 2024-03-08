import SubbridgeLogoIcon from '@/assets/subbridge_logo_icon.svg?react'
import SubbridgeLogoText from '@/assets/subbridge_logo_text.svg?react'
import {Box} from '@mui/material'
import {useTheme} from '@mui/system'
import type {FC} from 'react'

const SubbridgeLogo: FC<{className?: string}> = ({className}) => {
  const theme = useTheme()
  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <SubbridgeLogoIcon
        fill="currentColor"
        css={{
          flex: 'none',
          width: 36,
          [theme.breakpoints.down('sm')]: {
            width: 32,
          },
        }}
      />
      <SubbridgeLogoText
        fill="currentColor"
        css={{
          flex: 'none',
          marginLeft: 13,
          width: 111,
          [theme.breakpoints.down('sm')]: {
            display: 'none',
          },
        }}
      />
    </Box>
  )
}

export default SubbridgeLogo
