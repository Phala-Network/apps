'use client'

import poweredBySlpx from '@/assets/powered_by_slpx.png'
import AppKitButton from '@/components/AppKitButton'
import PageHeader from '@/components/PageHeader'
import Staking from '@/components/Staking'
import {Box, Chip} from '@mui/material'
import Image from 'next/image'

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
          </Box>
        }
      >
        <AppKitButton />
      </PageHeader>
      <Staking />
    </>
  )
}
