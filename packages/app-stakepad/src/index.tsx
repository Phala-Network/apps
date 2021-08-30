import {Helmet} from 'react-helmet'
import {Link} from 'gatsby-plugin-intl'
import styled from 'styled-components'
import StatusBanner from './components/StatusBanner'

const Wrapper = styled.div`
  padding: 30px;
  flex: 1;
`

const Banner = styled.div`
  display: flex;
`

const MyStakeButton = styled.button`
  margin-left: 30px;
`

const Stakepad = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Stakepad</title>
      </Helmet>

      <Wrapper>
        <Banner>
          <StatusBanner />
          <Link to="/stakepad/my-stake/">
            <MyStakeButton>My Stake</MyStakeButton>
          </Link>
        </Banner>
      </Wrapper>
    </>
  )
}

export {default as MyStake} from './MyStake'
export default Stakepad
