import {useState, VFC} from 'react'
import {useCurrencyDepositsQuery} from './hooks/karuraSubquery'
import {GraphQLClient} from 'graphql-request'
import {Block} from 'baseui/block'
import {StatefulInput} from 'baseui/input'
import {Search} from 'baseui/icon'

export const TrackPage: VFC = () => {
  // const [searchString, setSearchString] = useState('')
  const [karuraClient] = useState(
    () =>
      new GraphQLClient(
        'https://api.subquery.network/sq/Phala-Network/acala-subbridge-subquery'
      )
  )
  const {data} = useCurrencyDepositsQuery(karuraClient, {
    filter: {
      currencyId: {
        equalTo: '{"token":"PHA"}',
      },
      // recipient: {
      //   equalTo: encodeAddress(''),
      // },
    },
  })

  return (
    <Block>
      <StatefulInput endEnhancer={<Search />} />
      {data?.currencyDeposits?.nodes[0]?.id}
    </Block>
  )
}
