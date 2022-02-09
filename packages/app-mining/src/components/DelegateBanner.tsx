import {HeadingMedium, LabelMedium} from 'baseui/typography'
import {Link} from 'gatsby'
import {Button} from 'baseui/button'
import {Skeleton} from 'baseui/skeleton'
import {useTotalStakeQuery} from '../hooks/graphql'
import {client} from '../utils/GraphQLClient'
import {formatCurrency} from '@phala/utils'
import {ChevronRight} from 'react-feather'
import {Block} from 'baseui/block'

const DelegateBanner = (): JSX.Element => {
  const {data} = useTotalStakeQuery(client)

  const value = data?.aggregateStakePools._sum?.totalStake

  return (
    <Block display="flex" justifyContent="space-between" alignItems="center">
      <div>
        <LabelMedium>Total Delegated</LabelMedium>
        <HeadingMedium as="div">
          {value ? (
            `${formatCurrency(value, 0)} PHA`
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
    </Block>
  )
}

export default DelegateBanner
