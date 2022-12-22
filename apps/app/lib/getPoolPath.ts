import type {BasePoolKind} from './subsquidQuery'

const getPoolPath = (kind: BasePoolKind, pid: string) =>
  `/${kind === 'Vault' ? 'vault' : 'stake-pool'}/${pid}`

export default getPoolPath
