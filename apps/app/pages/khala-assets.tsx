import ClaimAssets from '@/components/ClaimAssets'
import Title from '@/components/Title'
import {Divider, Link, Paper, Stack, Typography} from '@mui/material'

const Page = () => {
  return (
    <>
      <Title>Claim Phala/Khala Assets</Title>
      <Stack maxWidth={900} mx="auto" alignItems="center" mt={6} gap={3}>
        <Typography variant="h4">Claim Phala/Khala Assets</Typography>

        <Paper sx={{background: 'transparent', p: 3, width: '100%'}}>
          <Typography variant="body1" color="text.secondary">
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
        </Paper>

        <Stack
          direction={{xs: 'column', md: 'row'}}
          gap={3}
          width="100%"
          alignItems="flex-start"
        >
          <Paper sx={{background: 'transparent', p: 3, flex: 1}}>
            <Typography variant="h5" mb={3} textAlign="center">
              Claim Khala Assets
            </Typography>
            <ClaimAssets chain="khala" />
          </Paper>

          <Divider
            orientation="vertical"
            flexItem
            sx={{display: {xs: 'none', md: 'block'}}}
          />
          <Divider
            orientation="horizontal"
            flexItem
            sx={{display: {xs: 'block', md: 'none'}}}
          />

          <Paper sx={{background: 'transparent', p: 3, flex: 1}}>
            <Typography variant="h5" mb={3} textAlign="center">
              Claim Phala Assets
            </Typography>
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
          </Stack>
        </Paper>
      </Stack>
    </>
  )
}

export default Page
