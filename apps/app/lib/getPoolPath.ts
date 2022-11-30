import {BasePoolKind} from './subsquid'

const getPoolPath = (kind: BasePoolKind, pid: string) =>
  `/${kind === BasePoolKind.Vault ? 'vault' : 'stake-pool'}/${pid}`

export default getPoolPath
