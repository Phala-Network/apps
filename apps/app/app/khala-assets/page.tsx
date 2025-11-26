'use client'

import ClaimAssets from '@/components/ClaimAssets'
import PolkadotProvider from '@/components/PolkadotProvider'
import Title from '@/components/Title'
import {Link, Paper, Stack, Typography} from '@mui/material'
import khalaIcon from '@phala/ui/icons/chain/khala.png'
import phalaIcon from '@phala/ui/icons/chain/phala.png'
import Image from 'next/image'

export default function KhalaAssetsPage() {
  return (
    <PolkadotProvider>
      <Title>Claim Phala/Khala Assets</Title>
      <Stack maxWidth={900} mx="auto" alignItems="center" mt={6} gap={3}>
        <Typography variant="h4">Claim Phala/Khala Assets</Typography>

        <Paper sx={{background: 'transparent', p: 3, width: '100%'}}>
          <Typography variant="body1" color="text.secondary" paragraph>
            Khala was terminated at block #7918688, and you can now claim your
            assets on Ethereum. For more details, please refer to the{' '}
            <Link
              href="https://x.com/PhalaNetwork/status/1877822605660741916"
              target="_blank"
            >
              announcement
            </Link>{' '}
            and{' '}
            <Link
              href="https://forum.phala.network/t/khala-asset-claim-system-is-now-live/3964"
              target="_blank"
            >
              tutorial
            </Link>
            .
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Phala was terminated at block #9064613, and you can now claim your
            assets on{' '}
            <Link
              href="https://explorer.phala.network/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Phala L2
            </Link>
            , our new Ethereum Layer 2 network.
          </Typography>
        </Paper>

        <Stack
          direction={{xs: 'column', md: 'row'}}
          gap={3}
          width="100%"
          alignItems="stretch"
        >
          <Paper
            sx={{
              background: 'transparent',
              p: 3,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap={1}
              mb={3}
            >
              <Image src={khalaIcon} width={32} height={32} alt="Khala" />
              <Typography variant="h5">Khala</Typography>
            </Stack>
            <ClaimAssets chain="khala" />
          </Paper>

          <Paper
            sx={{
              background: 'transparent',
              p: 3,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap={1}
              mb={3}
            >
              <Image src={phalaIcon} width={32} height={32} alt="Phala" />
              <Typography variant="h5">Phala</Typography>
            </Stack>
            <ClaimAssets chain="phala" />
          </Paper>
        </Stack>

        <Paper sx={{background: 'transparent', p: 3, width: '100%'}}>
          <Typography variant="h6">Frequently Asked Questions</Typography>
          <Stack gap={1} mt={2}>
            <Typography variant="subtitle1" fontWeight={500}>
              How to claim with multisig account?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Due to the multisig account's inability to verify signatures,
              please send an email to delegation@phala.network, and we will
              assist you manually with the claim.
            </Typography>
            <Typography variant="subtitle1" fontWeight={500} sx={{mt: 2}}>
              How to claim with Ledger or other hardware wallets address?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Claiming assets on Ledger wallet is supported.{' '}
              <Link
                href="https://forum.phala.network/t/special-cases-during-the-khala-assets-claim-process/3966#a-khala-network-ledger-users-1"
                target="_blank"
              >
                Tutorial
              </Link>
            </Typography>
            <Typography variant="subtitle1" fontWeight={500} sx={{mt: 2}}>
              I can't connect my wallet and Ethereum wallet at the same time.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Walletconnect is supported.{' '}
              <Link
                href="https://forum.phala.network/t/special-cases-during-the-khala-assets-claim-process/3966#b-how-to-claim-assets-across-multiple-devices-6"
                target="_blank"
              >
                Tutorial
              </Link>
            </Typography>
            <Typography variant="subtitle1" fontWeight={500} sx={{mt: 2}}>
              How to transfer vPHA between Ethereum and Phala L2?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You can use{' '}
              <Link
                href="https://bridge.phala.network/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Phala Bridge
              </Link>{' '}
              to transfer vPHA tokens between Ethereum (L1) and Phala L2. The
              bridge supports bidirectional transfers, allowing you to move
              assets freely between both networks.
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </PolkadotProvider>
  )
}
