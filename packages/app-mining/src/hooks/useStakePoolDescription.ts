import {useApiPromise} from '@phala/react-libs'
import {hexToString} from '@polkadot/util'
import {useQuery} from '@tanstack/react-query'
import Ajv, {JSONSchemaType} from 'ajv'

export interface StakePoolDescription {
  telegram?: string
  discord?: string
  wechat?: string
  twitter?: string
  email?: string
  forum?: string
  basic?: string
  ann?: string
  version: 1
}

const schema: JSONSchemaType<StakePoolDescription> = {
  type: 'object',
  properties: {
    telegram: {type: 'string', nullable: true},
    discord: {type: 'string', nullable: true},
    wechat: {type: 'string', nullable: true},
    twitter: {type: 'string', nullable: true},
    email: {type: 'string', nullable: true},
    forum: {type: 'string', nullable: true},
    basic: {type: 'string', nullable: true},
    ann: {type: 'string', nullable: true},
    version: {type: 'integer'},
  },
  required: ['version'],
}

const ajv = new Ajv()
const validate = ajv.compile(schema)

const useStakePoolDescription = (pid?: string) => {
  const {api, initialized} = useApiPromise()

  const query = useQuery(
    ['stakePoolDescription', pid, initialized],
    async (): Promise<StakePoolDescription | null> => {
      if (!api || !pid) return null
      const hex = (
        await api.query.phalaStakePool.poolDescriptions(pid)
      ).toJSON() as string
      try {
        const string = hexToString(hex)
        const json = JSON.parse(string)
        if (validate(json)) {
          return json
        }
      } catch (err) {
        // noop
      }

      return {
        telegram: '',
        discord: '',
        wechat: '',
        twitter: '',
        email: '',
        forum: '',
        basic: '',
        ann: '',
        version: 1,
      }
    },
    {refetchInterval: 6000, enabled: Boolean(api && pid)}
  )

  return query
}

export default useStakePoolDescription
