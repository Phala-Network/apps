const getDecimalPattern = (decimals: number) =>
  `^[0-9]+\\.?[0-9]{0,${decimals}}$`

export default getDecimalPattern
