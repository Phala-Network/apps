import Decimal from 'decimal.js'

export const weightedAverage = (input: Array<[Decimal, Decimal]>): Decimal => {
  const [sum, weightSum] = input.reduce(
    (acc, [num, weight]) => {
      acc[0] = acc[0].plus(num.times(weight))
      acc[1] = acc[1].plus(weight)
      return acc
    },
    [new Decimal(0), new Decimal(0)],
  )
  return sum.div(weightSum)
}
