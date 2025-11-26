'use client'

import Title from '@/components/Title'
import OpenInNew from '@mui/icons-material/OpenInNew'
import {Box, Button, Link, Paper, Stack, Typography} from '@mui/material'

export default function GpuMiningPage() {
  return (
    <>
      <Title>GPU Mining</Title>
      <Stack maxWidth={800} mx="auto" alignItems="center" mt={6} gap={4}>
        <Typography variant="h4">GPU Mining</Typography>

        <Paper sx={{background: 'transparent', p: 4, width: '100%'}}>
          <Stack gap={4} alignItems="center">
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
            >
              Start mining with your GPU on the Phala Network. Access the Mining
              Portal to manage your stake pools and monitor your mining
              operations.
            </Typography>

            <Stack
              direction={{xs: 'column', sm: 'row'}}
              gap={2}
              width="100%"
              justifyContent="center"
            >
              <Button
                component="a"
                href="https://phala-stake-pool-lite.web.app/stakepool"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="large"
                endIcon={<OpenInNew />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                Mining Portal
              </Button>

              <Button
                component="a"
                href="https://docs.phala.com/network/compute-providers/introduction"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="large"
                endIcon={<OpenInNew />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                Documentation
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.secondary',
          }}
        >
          <Typography variant="body2">Powered by</Typography>
          <Link
            href="https://dephy.io/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'primary.main',
              fontWeight: 600,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            DePHY
          </Link>
        </Box>
      </Stack>
    </>
  )
}
