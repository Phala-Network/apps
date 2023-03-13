import Decimal from 'decimal.js'
import {type BasePool} from './subsquidQuery'

// NOTE: This is a workaround for a bug on-chain events bug
const fixBasePoolFree = <T extends Pick<BasePool, 'freeValue'>>(
  basePool: T
): T => {
  if (new Decimal(basePool.freeValue).lt(0)) {
    return {
      ...basePool,
      freeValue: '0',
    }
  }
  return basePool
}

export default fixBasePoolFree
