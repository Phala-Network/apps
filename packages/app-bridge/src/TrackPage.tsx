import {FormEventHandler, useMemo, useState, VFC} from 'react'
import {GraphQLClient} from 'graphql-request'
import {StatefulInput} from 'baseui/input'
import {Card} from 'baseui/card'
import {TableBuilder, TableBuilderColumn} from 'baseui/table-semantic'
import Helmet from 'react-helmet'
import {Button} from 'baseui/button'
import {useStyletron} from 'baseui'
import {FormControl} from 'baseui/form-control'
import {HeadingLarge} from 'baseui/typography'
import {formatCurrency, validateAddress} from '@phala/utils'
// import {ethers} from 'ethers'
import {encodeAddress} from '@polkadot/util-crypto'
import {
  CurrencyDepositsOrderBy,
  useCurrencyDepositsQuery,
} from './hooks/karuraSubquery'
import {
  useXcmDepositedsQuery,
  XcmDepositedsOrderBy,
} from './hooks/khalaSubquery'
import Decimal from 'decimal.js'
import {Announcement} from '@phala/react-components'
import {Block} from 'baseui/block'

type DataT = {
  createdAt: string
  amount?: string | null
  recipient: string
}

const karuraClient = new GraphQLClient(
  'https://api.subquery.network/sq/Phala-Network/acala-subbridge-subquery'
)
const khalaClient = new GraphQLClient(
  'https://api.subquery.network/sq/Phala-Network/khala-subbridge-subquery'
)

export const TrackPage: VFC = () => {
  const [errorString, setErrorString] = useState('')
  const [karuraXcmRecipient, setKaruraXcmRecipient] = useState('')
  const [khalaXcmRecipient, setKhalaXcmRecipient] = useState('')
  // const [ethereumRecipient, setEthereumRecipient] = useState('')
  const [css] = useStyletron()

  const {data: karuraXcmData, isLoading: isKaruraXcmLoading} =
    useCurrencyDepositsQuery(
      karuraClient,
      {
        filter: {
          currencyId: {
            equalTo: '{"token":"PHA"}',
          },
          recipient: {
            equalTo: karuraXcmRecipient,
          },
        },
        orderBy: CurrencyDepositsOrderBy.CreatedAtDesc,
      },
      {
        enabled: Boolean(karuraXcmRecipient),
      }
    )

  const {data: khalaXcmData, isLoading: isKhalaXcmLoading} =
    useXcmDepositedsQuery(
      khalaClient,
      {
        filter: {
          asset: {
            equalTo: '{"parents":0,"interior":{"here":null}}', // PHA
          },
          recipient: {
            equalTo: khalaXcmRecipient,
          },
        },
        orderBy: XcmDepositedsOrderBy.CreatedAtDesc,
      },
      {
        enabled: Boolean(khalaXcmRecipient),
      }
    )

  const transformedData = useMemo<DataT[]>(() => {
    const data: DataT[] = []
    if (khalaXcmData?.xcmDepositeds?.nodes.length) {
      data.push(
        ...khalaXcmData.xcmDepositeds.nodes
          .filter(<T,>(node: T): node is NonNullable<T> => node !== null)
          .map((node) => ({
            createdAt: node.createdAt,
            amount: node.amount,
            recipient: node.recipient,
          }))
      )
    }

    if (karuraXcmData?.currencyDeposits?.nodes.length) {
      data.push(
        ...karuraXcmData.currencyDeposits.nodes
          .filter(<T,>(node: T): node is NonNullable<T> => node !== null)
          .map((node) => ({
            createdAt: node.createdAt,
            amount: node.amount,
            recipient: node.recipient,
          }))
      )
    }

    return data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }, [khalaXcmData, karuraXcmData])

  const isLoading = isKaruraXcmLoading || isKhalaXcmLoading

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setErrorString('')
    setKaruraXcmRecipient('')
    setKhalaXcmRecipient('')
    // setEthereumRecipient('')

    const value = (
      e.target as typeof e.target & {
        searchString: {value: string}
      }
    ).searchString.value

    if (
      // Substrate address
      validateAddress(value)
    ) {
      setKaruraXcmRecipient(encodeAddress(value, 8))
      setKhalaXcmRecipient(encodeAddress(value, 42)) // Khala subquery use 42 instead of 30
    }
    // else if (
    //   // Ethereum address
    //   //https://docs.ethers.io/v5/api/utils/address/#utils-getAddress
    //   value.startsWith('0x') &&
    //   ethers.utils.isAddress(value)
    // ) {
    //   setEthereumRecipient(value)
    // }
    else {
      setErrorString('Invalid recipient')
    }
  }

  return (
    <>
      <Helmet title="Bridge Records" />

      <Block marginTop="scale800">
        <Announcement>
          You can search for your bridge transfer transaction through the dest
          chain address. If there is no result, it is not received. Currently
          only Ethereum to Khala and Khala to Karura transactions are
          searchable. If you have any questions. Please come to our{' '}
          <a
            href="https://discord.com/invite/phala"
            target="_blank"
            rel="noreferrer"
          >
            discord
          </a>{' '}
          channel for support.
        </Announcement>
        <HeadingLarge>SubBridge Track</HeadingLarge>
        <Card
          overrides={{
            Root: {
              style: ({$theme}) => ({
                borderRadius: '0',
                marginTop: $theme.sizing.scale800,
                ...$theme.borders.border200,
              }),
            },
          }}
        >
          <form
            className={css({display: 'flex', alignItems: 'flex-start'})}
            onSubmit={onSubmit}
          >
            <FormControl error={errorString}>
              <StatefulInput
                autoFocus
                placeholder="Search by recipient"
                name="searchString"
              />
            </FormControl>
            <Button
              type="submit"
              $style={({$theme}: any) => ({
                marginLeft: $theme.sizing.scale400,
              })}
            >
              Search
            </Button>
          </form>

          <TableBuilder
            isLoading={isLoading}
            data={transformedData}
            emptyMessage="No Results"
          >
            <TableBuilderColumn id="recipient" header="Recipient">
              {(data: DataT) => data.recipient}
            </TableBuilderColumn>
            <TableBuilderColumn id="amount" header="Amount">
              {(data: DataT) => {
                if (!data.amount) return '-'
                return `${formatCurrency(
                  new Decimal(data.amount).div(10 ** 12),
                  12
                )} PHA` // Hardcoded currency
              }}
            </TableBuilderColumn>
            <TableBuilderColumn id="createdAt" header="Date">
              {(data: DataT) => {
                return new Date(data.createdAt).toLocaleString()
              }}
            </TableBuilderColumn>
          </TableBuilder>
        </Card>
      </Block>
    </>
  )
}
