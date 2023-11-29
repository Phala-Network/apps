import Logo from '@/assets/index_logo.svg'
import {ChevronRight} from '@mui/icons-material'
import {Box, Button, Container, Stack, Typography} from '@mui/material'
import {NextPage} from 'next'

const Page: NextPage = () => {
  return (
    <Container maxWidth={false}>
      <Stack
        sx={{alignItems: 'flex-start'}}
        spacing={5}
        maxWidth={400}
        ml={[0, 4, 8, 12]}
      >
        <Box width={200} fontSize={0}>
          <Logo />
        </Box>
        <Typography variant="h3" component="h1">
          Cross-Chain
          <br />
          <Box component="span" color="#c5ff46" fontWeight={600}>
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
    </Container>
  )
}

export default Page
