export type voidFn = () => void

export type Account = { name?: string; address: string }

export type TransactionInfoItem = {
  address: string
  amount: number
  network: string
  type: string
}

export type TransactionInfo = {
  from: TransactionInfoItem
  to: TransactionInfoItem
  hash?: string
}
