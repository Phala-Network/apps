import ClaimKhalaAssets from '@/components/ClaimKhalaAssets'
import Title from '@/components/Title'
import {Link, Paper, Stack, Typography} from '@mui/material'

const Page = () => {
  return (
    <>
      <Title>Claim Khala Assets</Title>
      <Stack maxWidth={450} mx="auto" alignItems="center" mt={6} gap={3}>
        <Typography variant="h4">Claim Khala Assets</Typography>

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
        <Paper sx={{background: 'transparent', p: 3, width: '100%'}}>
          <ClaimKhalaAssets />
        </Paper>
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
              How to claim with Ledger or other hardware wallets address on
              Khala?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Claiming Khala assets on Ledger wallet is supported.{' '}
              <Link
                href="https://forum.phala.network/t/special-cases-during-the-khala-assets-claim-process/3966#a-khala-network-ledger-users-1"
                target="_blank"
              >
                Tutorial
              </Link>
            </Typography>
            <Typography variant="subtitle1" fontWeight={500} sx={{mt: 2}}>
              I can't connect my Khala wallet and Ethereum wallet at the same
              time.
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
