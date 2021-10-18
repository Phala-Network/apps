import {Link} from 'gatsby-plugin-intl'
import styled from 'styled-components'
import {Button} from '@phala/react-components'
import MyDelegateTable from '../components/Delegate/MyDelegateTable'
import {Helmet} from 'react-helmet'
import {up} from 'styled-breakpoints'

const Wrapper = styled.div`
  overflow-x: auto;

  ${up('md')} {
    margin: 30px;
    flex: 1;
  }
`

const Block = styled.div`
  padding: 20px;
  background: #fff;
`

export const MyDelegate = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>My Delegate</title>
      </Helmet>
      <Link to="/delegate/">
        <Button>Back</Button>
      </Link>
      <Block>
        <MyDelegateTable />
      </Block>
    </Wrapper>
  )
}
