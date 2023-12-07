import PhalaBrandLogo from '@/assets/phala_brand_logo.svg'
import PhatLogo from '@/assets/phat_logo.svg'
import {Box, Stack, Typography, type StackProps} from '@mui/material'
import {type FC} from 'react'

const Footer: FC<StackProps> = (props) => {
  return (
    <Stack component="footer" spacing={2} color="text.secondary" {...props}>
      <Stack direction="row" alignItems="center" spacing={3}>
        <Box
          color="text.primary"
          component="a"
          href="https://phala.network"
          target="_blank"
          width={90}
        >
          <PhalaBrandLogo display="block" />
        </Box>
        <Box
          color="text.primary"
          component="a"
          href="https://bricks.phala.network"
          target="_blank"
          width={75}
        >
          <PhatLogo display="block" />
        </Box>
      </Stack>
      <Typography variant="caption" flex="none">
        Built by Phala Network with Phat Contract.
      </Typography>
    </Stack>
  )
}

export default Footer
