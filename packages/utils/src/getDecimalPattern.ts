const getDecimalPattern = (decimals: number): string =>
  `^[0-9]+\\.?[0-9]{0,${decimals}}$`

export default getDecimalPattern
