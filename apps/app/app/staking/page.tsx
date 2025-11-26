'use client'

import poweredBySlpx from '@/assets/powered_by_slpx.png'
import PageHeader from '@/components/PageHeader'
import Staking from '@/components/Staking'
import {Box, Chip} from '@mui/material'
import {ConnectButton} from '@rainbow-me/rainbowkit'
import Image from 'next/image'

export default function StakingPage() {
  return (
    <>
      <PageHeader
        title="Staking"
        pageTitle={
          <Box
            display="inline-flex"
            alignItems="center"
            gap={2}
            flexWrap="wrap"
          >
            Staking
            <Chip label="Ethereum" color="info" variant="outlined" />
            <Box
              component="a"
              href="https://bifrost.io/slpx"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                css={{display: 'block'}}
                src={poweredBySlpx}
                width={170}
                height={40}
                alt="Powered by SLPx"
              />
            </Box>
          </Box>
        }
      >
        <ConnectButton />
      </PageHeader>
      <Staking />
    </>
  )
}
