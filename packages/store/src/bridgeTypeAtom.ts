import {atom, useAtom} from 'jotai'

export type bridgeType = 'fromEthToKhala' | 'fromKhalaToEth'

export enum BridgeTypeAtomEnum {
  fromEthToKhala = 'fromEthToKhala',
  fromKhalaToEth = 'fromKhalaToEth',
}

export const bridgeTypeAtom = atom<bridgeType>(
  BridgeTypeAtomEnum.fromEthToKhala
)

export function useBridgeTypeAtom() {
  return useAtom(bridgeTypeAtom)
}
