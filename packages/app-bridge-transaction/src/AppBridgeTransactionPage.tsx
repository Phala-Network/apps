import {PageHeader} from '@phala/react-components'
import {FC, Fragment} from 'react'
import {Helmet} from 'react-helmet'
import styled from 'styled-components'
import {TransactionTable} from './TransactionTable'

const Root = styled.div`
  background-color: #ffffff;
  padding: 20px;
`

export interface AppBridgeTransactionPageProps {
  children: React.ReactNode
}

export const AppBridgeTransactionPage: FC<
  AppBridgeTransactionPageProps
> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Bridge Transaction</title>
      </Helmet>

      <div
        style={{
          margin: '20px 0',
        }}
      >
        <PageHeader title="Bridge Transaction" />
      </div>

      <Root>
        <TransactionTable />
      </Root>
    </Fragment>
  )
}
