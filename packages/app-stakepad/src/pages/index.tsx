import {Helmet} from 'react-helmet'
import {Link} from 'gatsby-plugin-intl'
import styled from 'styled-components'
import MainTable from '../components/MainTable'
import {Button} from '@phala/react-components'

const Wrapper = styled.div`
  overflow-x: auto;
  margin: 30px;
  flex: 1;
`

const Banner = styled.div`
  display: flex;
`

const Block = styled.div`
  padding: 20px;
  background: #fff;
`

const Stakepad = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Stakepad</title>
      </Helmet>

      <Wrapper>
        <Banner>
          <Link to="/stakepad/my-stake/">
            <Button>My Stake</Button>
          </Link>
        </Banner>

        <Block>
          <MainTable></MainTable>
        </Block>
      </Wrapper>
    </>
  )
}

export {default as MyStake} from './MyStake'
export default Stakepad
