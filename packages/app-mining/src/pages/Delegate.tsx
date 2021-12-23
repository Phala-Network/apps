import {Helmet} from 'react-helmet'
import styled from 'styled-components'
import {up} from 'styled-breakpoints'
import Banner from '../components/Delegate/Banner'
import StakePoolTableV2 from '../components/StakePoolTableV2'

const Wrapper = styled.div`
  overflow-x: auto;

  ${up('md')} {
    margin: 30px;
    flex: 1;
    margin-bottom: 70px;
  }
`

const Block = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #fff;
`

export const Delegate = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Delegate</title>
      </Helmet>

      <Wrapper>
        <Banner></Banner>

        <Block>
          <StakePoolTableV2 kind="delegate" />
        </Block>
      </Wrapper>
    </>
  )
}
