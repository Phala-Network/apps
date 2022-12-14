import usePolkadotApi from './usePolkadotApi'

import {ApiPromise} from '@polkadot/api'
import {hexToString} from '@polkadot/util'
import Ajv, {JSONSchemaType} from 'ajv'
import useSWR from 'swr'

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

const poolIntroFetcher = async ([api, pid]: [ApiPromise, string]) => {
  return api.query.phalaBasePool.poolDescriptions(pid).then((bytes) => {
    try {
      const hex = bytes.unwrap().toHex()
      const string = hexToString(hex)
      const json = JSON.parse(string)
      if (validate(json)) {
        return json
      }
    } catch (err) {
      return {version: 1} as PoolIntro
      // noop
    }
  })
}

const usePoolIntro = (pid: string) => {
  const api = usePolkadotApi()
  const {data} = useSWR(
    api ? [api, pid, 'poolIntro'] : null,
    poolIntroFetcher,
    {
      refreshInterval: 12000,
    }
  )

  return data
}

export default usePoolIntro
