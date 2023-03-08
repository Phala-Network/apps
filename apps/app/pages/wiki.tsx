import PageHeader from '@/components/PageHeader'
import Wiki from '@/components/Wiki'
import {Container} from '@mui/material'
import {type NextPage} from 'next'

const WikiPage: NextPage = () => {
  return (
    <Container maxWidth="lg" sx={{p: 0}}>
      <PageHeader title="Wiki"></PageHeader>
      <Wiki defaultExpanded></Wiki>
    </Container>
  )
}

export default WikiPage
