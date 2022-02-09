import {Button} from '@phala/react-components'
import {Helmet} from 'react-helmet'
import {up} from 'styled-breakpoints'
import styled from 'styled-components'
import MyDelegateTable from '../components/Delegate/MyDelegateTable'
import {Link} from 'gatsby'
import StatusBar from '../components/StatusBar'

const Wrapper = styled.div`
  overflow-x: auto;

  ${up('md')} {
    margin: 30px;
    margin-top: 10px;
    flex: 1;
  }
`

const Block = styled.div`
  padding: 20px;
  background: #fff;
`

const Header = styled.div`
  padding: 10px;
`

export const MyDelegate = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>My Delegate</title>
      </Helmet>
      <StatusBar />
      <Header>
        <Link to="/v1/delegate">
          <Button size="small">Back</Button>
        </Link>
      </Header>
      <Block>
        <MyDelegateTable />
      </Block>
    </Wrapper>
  )
}
