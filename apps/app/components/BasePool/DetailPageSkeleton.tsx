import {Box} from '@mui/material'
import {useRouter} from 'next/router'
import type {FC} from 'react'
import PageHeader from '../PageHeader'

const DetailPageSkeleton: FC = () => {
  const router = useRouter()
  const pathname = router.pathname
  const kind = pathname.includes('vault') ? 'Vault' : 'StakePool'

  return (
    <>
      <PageHeader title={kind} pageTitle={kind} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        Loading...
      </Box>
    </>
  )
}

export default DetailPageSkeleton
