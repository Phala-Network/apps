export type BridgeError =
  | 'InvalidAmount'
  | 'InvalidAccount'
  | 'InsufficientBalance'
  | 'AmountTooSmall'

export const BRIDGE_ERROR_MESSAGES: Record<BridgeError, string> = {
  InvalidAmount: 'Enter an amount',
  InvalidAccount: 'Enter destination account',
  InsufficientBalance: 'Insufficient balance',
  AmountTooSmall: 'Amount too small',
}
