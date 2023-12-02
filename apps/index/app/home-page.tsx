'use client'
import HomeDemo from '@/components/HomeDemo'
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  alpha,
  keyframes,
} from '@mui/material'
import {NextPage} from 'next'
import {FORM_URL} from '../constants'
import HomeBar from './home-bar'

const textOpen = keyframes`
  0% {
    width: 0px;
  }
  100% {
    width: 160px;
  }
`

const Page: NextPage = () => {
  return (
    <>
      <HomeBar />
      <Container maxWidth="xl" sx={{mt: 3}}>
        <Stack
          component="main"
          direction={['column', 'column', 'row']}
          justifyContent={[null, null, 'space-between']}
        >
          <Stack
            alignItems="flex-start"
            maxWidth={380}
            ml={[1, 1, 1, 8]}
            mb={12}
          >
            <Typography variant="h3" component="h1" mt={[4, 4, 8, 12]}>
              Cross-Chain
              <Box
                sx={(theme) => ({
                  ml: -1,
                  my: 1,
                  width: '0px',
                  animation: `${textOpen} 0.5s ease-in-out forwards`,
                  animationDelay: '1s',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  background:
                    theme.palette.mode === 'dark' ? '#7ca920' : '#d1ff7b',
                })}
              >
                <Box sx={{ml: 1}}>Intent</Box>
              </Box>
              Infrastructure
            </Typography>
            <Typography variant="body1" maxWidth={600} mt={5}>
              inDEX serves as an intent-centric infrastructure in the blockchain
              ecosystem, strictly dedicated to seeking out the best trading
              prices across liquidity pools on multiple chains, ensuring MEV
              protection, and preserving user privacy.
            </Typography>
            <Stack direction="row" spacing={3} mt={8}>
              <Button
                variant="contained"
                size="large"
                href={FORM_URL}
                target="_blank"
              >
                Join Waitlist
              </Button>
              <Button size="large" href="" target="_blank">
                Read the Docs
              </Button>
            </Stack>
          </Stack>
          <Box
            maxWidth={750}
            maxHeight={800}
            minHeight={600}
            ml={[0, 0, 8, 8]}
            mr={[0, 0, 0, 4]}
            mb={[8, 8, 0, 0]}
            flex={['none', 'none', 1]}
            height={[600, 600, '80vh']}
            borderRadius={2}
            p={3}
            position="relative"
            sx={(theme) => ({
              background: theme.palette.background.paper,
            })}
          >
            <HomeDemo />
            <Box
              sx={(theme) => ({
                position: 'absolute',
                top: -16,
                left: -16,
                bottom: -16,
                right: -16,
                backdropFilter: 'blur(2px)',
                background: alpha(
                  theme.palette.background.paper,
                  theme.palette.mode === 'dark' ? 0.5 : 0.3,
                ),
                zIndex: -1,
                borderRadius: 3,
              })}
            ></Box>
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export default Page
