import PhalaBrandLogo from '@/assets/phala_brand_logo.svg'
import PhatLogo from '@/assets/phat_logo.svg'
import {Box, Stack, Typography, type StackProps} from '@mui/material'
import {type FC} from 'react'

const Footer: FC<StackProps> = (props) => {
  return (
    <Stack
      component="footer"
      color="InactiveCaptionText"
      spacing={2}
      {...props}
    >
      <Stack direction="row" alignItems="center" spacing={3}>
        <Box
          component="a"
          color="CaptionText"
          href="https://phala.network"
          target="_blank"
          width={60}
        >
          <PhalaBrandLogo display="block" />
        </Box>
        <Box
          component="a"
          color="CaptionText"
          href="https://bricks.phala.network"
          target="_blank"
          width={50}
        >
          <PhatLogo display="block" />
        </Box>
      </Stack>
      <Typography variant="caption" flex="none">
        inDEX is a Phala Network project built off Phat Contract.
      </Typography>
    </Stack>
  )
}

export default Footer
