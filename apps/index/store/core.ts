import {ERROR_MESSAGES, type Error} from '@/config/error'
import {
  lookupAsset,
  type Client,
  type EvmChain,
  type Solution,
  type SubstrateChain,
} from '@phala/index'
import {polkadotAccountAtom} from '@phala/store'
import {createPopup} from '@typeform/embed'
import {atom} from 'jotai'
import {atomWithReset, atomWithStorage} from 'jotai/utils'
import {SURVEY_FORM_ID, WAITLIST_FORM_ID} from '../constants'
import {evmAccountAtom} from './ethers'

export const clientAtom = atom<Client | undefined>(undefined)
export const chainInstanceAtom = atom<EvmChain | SubstrateChain | undefined>(
  (get) => {
    const client = get(clientAtom)
    const fromChain = get(fromChainAtom)
    if (client != null && fromChain != null) {
      if (fromChain.chainType === 'Evm') {
        return client.createEvmChain(fromChain.name)
      } else if (fromChain.name === 'Phala' || fromChain.name === 'Khala') {
        return client.createPhalaChain(fromChain.name)
      }
    }
  },
)
export const currentTaskAtom = atom<
  {id: string; fromChainId: string; hash: string} | undefined
>(undefined)
export const solutionStringAtom = atomWithStorage('jotai:solution-v2', '')
export const solutionAtom = atom<Solution | undefined>((get) => {
  try {
    const value = JSON.parse(get(solutionStringAtom))
    if (get(clientAtom)?.validateSolution(value) === true) {
      return value
    }
  } catch (err) {
    // noop
  }
})
const fromChainIdAtom = atom('')
export const fromChainAtom = atom(
  (get) => get(clientAtom)?.chainMap.get(get(fromChainIdAtom)),
  (get, set, update: string) => {
    set(fromChainIdAtom, update)
  },
)

const fromAssetIdAtom = atom('')
export const fromAssetAtom = atom(
  (get) => {
    return lookupAsset(get(fromChainAtom)?.name ?? '', get(fromAssetIdAtom))
  },
  (get, set, update: string) => {
    set(fromAssetIdAtom, update)
  },
)

export const fromAmountAtom = atomWithReset('')

const toChainIdAtom = atom('')
export const toChainAtom = atom(
  (get) => get(clientAtom)?.chainMap.get(get(toChainIdAtom)),
  (get, set, update: string) => {
    set(toChainIdAtom, update)
  },
)

const toAssetIdAtom = atom('')
export const toAssetAtom = atom(
  (get) => {
    return lookupAsset(get(toChainAtom)?.name ?? '', get(toAssetIdAtom))
  },
  (get, set, update: string) => {
    set(toAssetIdAtom, update)
  },
)

export const toAmountAtom = atomWithReset('')

export const fromAccountAtom = atom<string | null>((get) => {
  const fromChain = get(fromChainAtom)
  const polkadotAccount = get(polkadotAccountAtom)
  const evmAccount = get(evmAccountAtom)
  if (fromChain?.chainType === 'Evm') {
    return evmAccount
  }
  if (fromChain?.chainType === 'Sub' && polkadotAccount != null) {
    return polkadotAccount.address
  }
  return null
})

export const destinationAccountAtom = atomWithReset('')

export const errorAtom = atom<Error | null>('InvalidAmount')

export const errorMessageAtom = atom<string | null>((get) => {
  const error = get(errorAtom)
  if (error === null) return null
  return ERROR_MESSAGES[error]
})

export const typeformAtom = atom({
  waitlist: createPopup(WAITLIST_FORM_ID, {size: 70}),
  survey: createPopup(SURVEY_FORM_ID, {size: 70}),
})
