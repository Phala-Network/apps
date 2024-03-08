import type {Chain} from '@/store/common'
import type {BasePoolKind} from './subsquidQuery'

const getPoolPath = (chain: Chain, kind: BasePoolKind, pid: string): string =>
  `/${chain}/${kind === 'Vault' ? 'vault' : 'stake-pool'}/${pid}`

export default getPoolPath
