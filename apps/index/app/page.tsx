import Logo from '@/assets/index_logo.svg'
import {Box, Stack} from '@mui/material'
import {NextPage} from 'next'

const Page: NextPage = () => {
  return (
    <Stack sx={{alignItems: 'center'}}>
      <Box width={200} mt={10}>
        <Logo />
      </Box>
    </Stack>
  )
}

export default Page
