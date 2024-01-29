export const format = new Intl.NumberFormat('en-US').format
export const formatPercentage = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 2,
}).format
