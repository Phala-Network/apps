export {useKhalaChainbridgeTransactions} from './hooks/useKhalaChainbridgeTransactions'
export {useSubquery} from './hooks/useSubquery'
import {useQueryTransactionsByRecipient} from './hooks/useQueryTransactionsByRecipient'
import {useQueryTransactionsBySigner} from './hooks/useQueryTransactionsBySigner'

export const khalaChainbridgeGraphqlQuery = {
  useQueryTransactionsByRecipient,
  useQueryTransactionsBySigner,
}
