import ClaimKhalaAssets from '@/components/ClaimKhalaAssets'
import Title from '@/components/Title'
import {Paper, Stack, Typography} from '@mui/material'

const Page = () => {
  return (
    <>
      <Title>Claim Khala Assets</Title>
      <Stack maxWidth={450} mx="auto" alignItems="center" mt={6} gap={4}>
        <Typography variant="h4">Claim Khala Assets</Typography>
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
              We are currently testing the Ledger hardware wallet, the function
              will be launched with January. Ledger users please pay attention
              to our next announcement.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ethereum ledger users are not affected. You can use ledgers
              ethereum address as claim address now.
            </Typography>
            <Typography variant="subtitle1" fontWeight={500} sx={{mt: 2}}>
              I can't connect my Khala wallet and Ethereum wallet at the same
              time.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are preparing a new version to facilitate claiming with
              different devices. Please try to move both of your Khala and
              Ethereum address into one device, or be patient for our next
              upgrade.
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </>
  )
}

export default Page
