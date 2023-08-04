export type Hex = `0x${string}`
export interface GeneralKey {
  length: number
  data: Hex
}

const getGeneralKey = (hex: Hex): {length: number; data: Hex} => {
  return {
    length: (hex.length - 2) / 2,
    data: `${hex}${'0'.repeat(66 - hex.length)}`,
  }
}

export default getGeneralKey
