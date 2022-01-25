import styled from 'styled-components'
import {up} from 'styled-breakpoints'
import {Helmet} from 'react-helmet'
import {Link} from 'gatsby'
import {HeadingMedium} from 'baseui/typography'
import StakePoolTableV2 from '../components/StakePoolTableV2'
import {Button} from 'baseui/button'
import {ChevronLeft} from 'react-feather'
import {Card} from 'baseui/card'
import ClaimAll from '../components/ClaimAll'
import DelegateTopBar from '../components/DelegateTopBarV2'

const Wrapper = styled.div`
  overflow-x: auto;
  padding: 10px 40px 70px;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  ${up('md')} {
    margin: 0 auto;
    max-width: 1780px;
  }
`

const Heading = styled.div`
  display: flex;
  align-items: center;
`

export const MyDelegateV2 = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>My Delegate</title>
      </Helmet>
      <DelegateTopBar />
      <Card
        overrides={{
          Root: {style: {borderRadius: '0'}},
          Body: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          },
        }}
      >
        <Heading>
          <Link to="/delegate/">
            <Button size="compact" kind="minimal">
              <ChevronLeft />
            </Button>
          </Link>
          <HeadingMedium as="div">My Delegate</HeadingMedium>
        </Heading>

        <ClaimAll />
      </Card>

      <Card overrides={{Root: {style: {borderRadius: '0', marginTop: '20px'}}}}>
        <StakePoolTableV2 kind="myDelegate" />
      </Card>
    </Wrapper>
  )
}
