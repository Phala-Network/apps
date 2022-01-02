import styled from 'styled-components'
import {HeadingMedium, LabelMedium} from 'baseui/typography'
import {Link} from 'gatsby'
import {Button} from 'baseui/button'
import {Skeleton} from 'baseui/skeleton'
import {useTotalStakeQuery} from '../hooks/graphql'
import {client} from '../utils/GraphQLClient'
import {formatCurrency} from '@phala/utils'
import {ChevronRight} from 'react-feather'
import {Card} from 'baseui/card'

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
`

const DelegateBanner = (): JSX.Element => {
  const {data} = useTotalStakeQuery(client)

  const value = data?.aggregateStakePools._sum?.totalStake

  return (
    <Card overrides={{Root: {style: {borderRadius: '0'}}}}>
      <Content>
        <div>
          <LabelMedium>Total Delegated</LabelMedium>
          <HeadingMedium as="div">
            {value ? (
              `${formatCurrency(value)} PHA`
            ) : (
              <Skeleton animation height="36px" width="300px" />
            )}
          </HeadingMedium>
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

export default DelegateBanner
