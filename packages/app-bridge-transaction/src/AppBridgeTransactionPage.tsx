import {FC} from 'react'

export interface AppBridgeTransactionPageProps {
  children: React.ReactNode
}

export const AppBridgeTransactionPage: FC<AppBridgeTransactionPageProps> = (
  props
) => {
  return <div>{props.children}</div>
}
