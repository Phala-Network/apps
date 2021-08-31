import {Link} from 'gatsby-plugin-intl'
import styled from 'styled-components'
import {Button} from '@phala/react-components'
import MyStakeTable from '../components/MyStakeTable'

const Wrapper = styled.div`
  overflow-x: auto;
  margin: 30px;
  flex: 1;
`

const Block = styled.div`
  padding: 20px;
  background: #fff;
`

const MyState = () => {
  return (
    <Wrapper>
      <Link to="/stakepad/">
        <Button>Back</Button>
      </Link>
      <Block>
        <MyStakeTable />
      </Block>
    </Wrapper>
  )
}

export default MyState
