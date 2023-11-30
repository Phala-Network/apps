import {ChevronRight} from '@mui/icons-material'
import {Box, Button, Stack, Typography} from '@mui/material'
import {NextPage} from 'next'
import Gtag from './gtag'
import HomeBar from './home-bar'

const Page: NextPage = () => {
  return (
    <>
      <HomeBar />
      <Stack direction="row" component="main" mt={16}>
        <Stack
          sx={{alignItems: 'flex-start'}}
          gap={5}
          maxWidth={400}
          ml={[4, 4, 8, 12]}
        >
          <Typography variant="h3" component="h1" mt={[0, 0, 3, 6]}>
            Cross-Chain
            <br />
            <Box component="span" color="#c5ff46">
              Intent
            </Box>
            <br />
            Infrastructure
          </Typography>
          <Typography variant="body1" maxWidth={600}>
            inDEX serves as an intent-centric infrastructure in the blockchain
            ecosystem, strictly dedicated to seeking out the best trading prices
            across liquidity pools on multiple chains, ensuring MEV protection,
            and preserving user privacy.
          </Typography>
          <Button variant="contained" size="large" endIcon={<ChevronRight />}>
            Docs
          </Button>
        </Stack>

        <Box flex={1} height="80vh" ml={8} border={1} sx={{}}></Box>
      </Stack>
      <Gtag />
    </>
  )
}

export default Page
