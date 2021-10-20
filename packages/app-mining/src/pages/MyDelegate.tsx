import {navigate} from 'gatsby-plugin-intl'
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

const Header = styled.div`
  padding: 10px;
`

export const MyDelegate = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>My Delegate</title>
      </Helmet>
      <Header>
        <Button size="small" onClick={() => navigate('/delegate/')}>
          Back
        </Button>
      </Header>
      <Block>
        <MyDelegateTable />
      </Block>
    </Wrapper>
  )
}
