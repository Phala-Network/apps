import {useQueryTransactionsByRecipient} from './hooks/useQueryTransactionsByRecipient'
import {useQueryTransactionsBySigner} from './hooks/useQueryTransactionsBySigner'

export const khalaChainbridgeGraphqlQuery = {
  useQueryTransactionsByRecipient,
  useQueryTransactionsBySigner,
}
