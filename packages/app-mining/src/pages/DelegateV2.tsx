import {Helmet} from 'react-helmet'
import styled from 'styled-components'
import {Card} from 'baseui/card'
import DelegateBanner from '../components/DelegateBanner'
import StakePoolTableV2 from '../components/StakePoolTableV2'
import DelegateTopBar from '../components/DelegateTopBarV2'

const Wrapper = styled.div`
  overflow-x: auto;
  margin: 10px 40px 70px;
  flex: 1;
`

export const DelegateV2 = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Delegate</title>
      </Helmet>

      <Wrapper>
        <DelegateTopBar />
        <DelegateBanner></DelegateBanner>

        <Card
          overrides={{Root: {style: {borderRadius: '4px', marginTop: '20px'}}}}
        >
          <StakePoolTableV2 kind="delegate" />
        </Card>
      </Wrapper>
    </>
  )
}
