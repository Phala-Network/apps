import Decimal from 'decimal.js'

// NOTE: This is a workaround for a bug on-chain events bug
const fixBasePoolFree = (basePool: {freeValue: string}): void => {
  if (new Decimal(basePool.freeValue).lt(0)) {
    basePool.freeValue = '0'
  }
}

export default fixBasePoolFree
