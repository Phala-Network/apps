import DelegateHeader from '@/components/DelegateHeader'
import {Title} from '@mui/icons-material'
import {Container} from '@mui/material'
import {FC} from 'react'

const DelegateStakePools: FC = () => {
  return (
    <Container maxWidth="lg">
      <Title>Delegate</Title>
      <DelegateHeader />
    </Container>
  )
}

export default DelegateStakePools
