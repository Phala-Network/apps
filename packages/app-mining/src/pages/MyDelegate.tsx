import styled from 'styled-components'
import {Helmet} from 'react-helmet'
import {up} from 'styled-breakpoints'
import {Link} from 'gatsby'
import {HeadingMedium} from 'baseui/typography'
import StakePoolTableV2 from '../components/StakePoolTableV2'
import {useStakePoolsQuery} from '../hooks/graphql'
import {client} from '../utils/GraphQLClient'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {Button} from 'baseui/button'
import {ChevronLeft} from 'react-feather'
import {Card} from 'baseui/card'

const Wrapper = styled.div`
  overflow-x: auto;

  ${up('md')} {
    margin: 30px;
    flex: 1;
  }
`

const Heading = styled.div`
  display: flex;
  align-items: center;
`

const Block = styled.div`
  margin-top: 20px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const MyDelegate = () => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  const {data} = useStakePoolsQuery(
    client,
    {
      withStakePoolStakers: true,
      where: {
        stakePoolStakers: {
          some: {
            AND: [
              {address: {equals: polkadotAccount?.address}},
              {shares: {gt: '0'}},
            ],
          },
        },
      },
    },
    {enabled: Boolean(polkadotAccount?.address)}
  )
  return (
    <Wrapper>
      <Helmet>
        <title>My Delegate</title>
      </Helmet>
      <Card>
        <Header>
          <Heading>
            <Link to="/delegate">
              <Button size="compact" kind="minimal">
                <ChevronLeft />
              </Button>
            </Link>
            <HeadingMedium as="div">My Delegate</HeadingMedium>
          </Heading>
          <Button kind="secondary" disabled={!data?.findManyStakePools.length}>
            Claim All
          </Button>
        </Header>
      </Card>

      <Block>
        <Card>
          <StakePoolTableV2 kind="myDelegate" />
        </Card>
      </Block>
    </Wrapper>
  )
}
