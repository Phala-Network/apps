import {formatCurrency} from '@phala/utils'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {Skeleton} from 'baseui/skeleton'
import {HeadingMedium, LabelMedium} from 'baseui/typography'
import {Link} from 'gatsby'
import {ChevronRight} from 'react-feather'
import {useGlobalStateQuery} from '../hooks/subsquid'
import {subsquidClient} from '../utils/GraphQLClient'

const DelegateBanner = (): JSX.Element => {
  const {data} = useGlobalStateQuery(subsquidClient, {})

  const value = data?.globalStateById?.totalStake

  return (
    <Block
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap
    >
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
        <Button kind="tertiary">
          My Delegate
          <ChevronRight />
        </Button>
      </Link>
    </Block>
  )
}

export default DelegateBanner
