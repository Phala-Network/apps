export type Error =
  | 'InvalidAmount'
  | 'InvalidAccount'
  | 'InsufficientBalance'
  | 'InsufficientReserve'
  | 'AmountTooSmall'
  | 'Disabled'
  | 'MinBalanceLimit'
  | 'NoSolutions'
  | 'InvalidRoute'

export const ERROR_MESSAGES: Record<Error, string> = {
  InvalidAmount: 'Enter an amount',
  InvalidAccount: 'Enter destination account',
  InsufficientBalance: 'Insufficient balance',
  InsufficientReserve: 'Insufficient reserve',
  AmountTooSmall: 'Amount too small',
  Disabled: 'Temporarily disabled',
  MinBalanceLimit: 'Minimum balance limit not met',
  NoSolutions: 'No solution found',
  InvalidRoute: 'Invalid route',
}
