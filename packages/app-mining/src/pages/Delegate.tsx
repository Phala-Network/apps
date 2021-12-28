import {Helmet} from 'react-helmet'
import styled from 'styled-components'
import {up} from 'styled-breakpoints'
import {Card} from 'baseui/card'
import DelegateBanner from '../components/DelegateBanner'
import StakePoolTableV2 from '../components/StakePoolTableV2'

const Wrapper = styled.div`
  overflow-x: auto;

  ${up('md')} {
    margin: 30px;
    flex: 1;
    margin-bottom: 70px;
  }
`

export const Delegate = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Delegate</title>
      </Helmet>

      <Wrapper>
        <DelegateBanner></DelegateBanner>

        <Card
          overrides={{Root: {style: {borderRadius: '0', marginTop: '20px'}}}}
        >
          <StakePoolTableV2 kind="delegate" />
        </Card>
      </Wrapper>
    </>
  )
}
