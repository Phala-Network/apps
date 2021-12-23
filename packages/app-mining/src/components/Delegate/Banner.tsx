import styled from 'styled-components'
import {DisplayXSmall, LabelLarge} from 'baseui/typography'
import {Link} from 'gatsby'
import {Button} from 'baseui/button'
import {Skeleton} from 'baseui/skeleton'
import {useAggregateStakePoolsQuery} from '../../hooks/graphql'
import {client} from '../../utils/GraphQLClient'
import {formatCurrency} from '@phala/utils'
import {ChevronRight} from 'react-feather'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 20px;
`

const Banner = (): JSX.Element => {
  const {data} = useAggregateStakePoolsQuery(client)

  const value = data?.aggregateStakePools._sum?.totalStake

  return (
    <Wrapper>
      <div>
        <LabelLarge>Total Delegated</LabelLarge>
        <DisplayXSmall>
          {value ? (
            `${formatCurrency(value)} PHA`
          ) : (
            <Skeleton animation height="44px" width="300px" />
          )}
        </DisplayXSmall>
      </div>
      <Link to="/delegate/my-delegate">
        <Button kind="minimal" size="compact">
          My Delegate
          <ChevronRight />
        </Button>
      </Link>
    </Wrapper>
  )
}

export default Banner
