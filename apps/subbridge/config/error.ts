export type BridgeError =
  | 'InvalidAmount'
  | 'InvalidAccount'
  | 'InsufficientBalance'
  | 'InsufficientReserve'
  | 'AmountTooSmall'
  | 'Disabled'
  | 'MinBalanceLimit'

export const BRIDGE_ERROR_MESSAGES: Record<BridgeError, string> = {
  InvalidAmount: 'Enter an amount',
  InvalidAccount: 'Enter destination account',
  InsufficientBalance: 'Insufficient balance',
  InsufficientReserve: 'Insufficient reserve',
  AmountTooSmall: 'Amount too small',
  Disabled: 'Temporarily disabled',
  MinBalanceLimit: 'Minimum balance limit not met',
}
