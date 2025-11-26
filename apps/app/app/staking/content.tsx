'use client'

import {Box, Chip} from '@mui/material'
import Image from 'next/image'

import poweredBySlpx from '@/assets/powered_by_slpx.png'
import PageHeader from '@/components/page-header'
import Staking from '@/components/staking'

export default function StakingContent() {
  return (
    <>
      <PageHeader
        pageTitle={
          <Box
            display="inline-flex"
            alignItems="center"
            gap={2}
            flexWrap="wrap"
          >
            Staking
            <Chip label="Ethereum" color="info" variant="outlined" />
          </Box>
        }
      >
        <Box
          component="a"
          href="https://bifrost.io/slpx"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            style={{display: 'block'}}
            src={poweredBySlpx}
            width={170}
            height={40}
            alt="Powered by SLPx"
          />
        </Box>
      </PageHeader>
      <Staking />
    </>
  )
}
