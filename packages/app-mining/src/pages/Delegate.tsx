import {Helmet} from 'react-helmet'
import styled from 'styled-components'
import {up} from 'styled-breakpoints'
import {Card} from 'baseui/card'
import DelegateBanner from '../components/DelegateBanner'
import StakePoolTableV2 from '../components/StakePoolTableV2'
import UpdateInfo from '../components/UpdateInfo'

const Wrapper = styled.div`
  overflow-x: auto;

  ${up('md')} {
    margin: 10px 30px 70px;
    flex: 1;
  }
`

export const Delegate = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Delegate</title>
      </Helmet>

      <Wrapper>
        <UpdateInfo />
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
