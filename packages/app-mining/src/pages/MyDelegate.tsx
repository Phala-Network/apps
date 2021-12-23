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
  padding: 20px;
  margin-top: 20px;
  background: #fff;
`

const Header = styled.div`
  padding: 20px;
  background: #fff;
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
      <Header>
        <Heading>
          <Link to="/delegate">
            <Button size="compact" kind="minimal">
              <ChevronLeft />
            </Button>
          </Link>
          <HeadingMedium as="div">My Delegate</HeadingMedium>
        </Heading>
        <Button size="compact" disabled={!data?.findManyStakePools.length}>
          Claim All
        </Button>
      </Header>
      <Block>
        <StakePoolTableV2 kind="myDelegate" />
      </Block>
    </Wrapper>
  )
}
