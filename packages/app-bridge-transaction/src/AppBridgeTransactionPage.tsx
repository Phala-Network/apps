import {FC} from 'react'
import {TransactionTable} from './TransactionTable'

export interface AppBridgeTransactionPageProps {
  children: React.ReactNode
}

export const AppBridgeTransactionPage: FC<
  AppBridgeTransactionPageProps
> = () => {
  return (
    <div>
      <TransactionTable />
    </div>
  )
}
