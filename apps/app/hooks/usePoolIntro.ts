import type {ApiPromise} from '@polkadot/api'
import {hexToString} from '@polkadot/util'
import Ajv, {type JSONSchemaType} from 'ajv'
import useSWR from 'swr'
import usePolkadotApi from './usePolkadotApi'

export interface PoolIntro {
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

const schema: JSONSchemaType<PoolIntro> = {
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

const poolIntroFetcher = async ([api, pid, _]: [
  ApiPromise,
  string,
  string,
]): Promise<PoolIntro> => {
  return await api.query.phalaBasePool.poolDescriptions(pid).then((bytes) => {
    try {
      const hex = bytes.unwrap().toHex()
      const string = hexToString(hex)
      const json = JSON.parse(string)
      if (validate(json)) {
        return json
      }
      return {version: 1}
    } catch (err) {
      return {version: 1}
    }
  })
}

const usePoolIntro = (pid: string): PoolIntro | undefined => {
  const api = usePolkadotApi()
  const {data} = useSWR(
    api != null && [api, pid, 'poolIntro'],
    poolIntroFetcher,
  )

  return data
}

export default usePoolIntro
