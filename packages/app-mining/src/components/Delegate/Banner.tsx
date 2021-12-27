import styled from 'styled-components'
import {DisplayXSmall, LabelLarge} from 'baseui/typography'
import {Link} from 'gatsby'
import {Button} from 'baseui/button'
import {Skeleton} from 'baseui/skeleton'
import {useAggregateStakePoolsQuery} from '../../hooks/graphql'
import {client} from '../../utils/GraphQLClient'
import {formatCurrency} from '@phala/utils'
import {ChevronRight} from 'react-feather'
import {Card} from 'baseui/card'

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
`

const Banner = (): JSX.Element => {
  const {data} = useAggregateStakePoolsQuery(client)

  const value = data?.aggregateStakePools._sum?.totalStake

  return (
    <Card>
      <Content>
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
          <Button kind="minimal">
            My Delegate
            <ChevronRight />
          </Button>
        </Link>
      </Content>
    </Card>
  )
}

export default Banner
