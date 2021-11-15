import {isDev, isTest} from '.'

export function isProduction() {
  return !isDev() && !isTest()
}
