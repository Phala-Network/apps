export type BridgeError =
  | 'InvalidAmount'
  | 'InvalidAccount'
  | 'InsufficientBalance'
  | 'InsufficientReserve'
  | 'AmountTooSmall'

export const BRIDGE_ERROR_MESSAGES: Record<BridgeError, string> = {
  InvalidAmount: 'Enter an amount',
  InvalidAccount: 'Enter destination account',
  InsufficientBalance: 'Insufficient balance',
  InsufficientReserve: 'Insufficient Reserve',
  AmountTooSmall: 'Amount too small',
}
