import {type ApiPromise} from '@polkadot/api'

const createPolkadotApi = async ([endpoint]: [
  string | string[]
]): Promise<ApiPromise> => {
  const {ApiPromise, WsProvider} = await import('@polkadot/api')
  const wsProvider = new WsProvider(endpoint)
  const api = await ApiPromise.create({
    provider: wsProvider,
    types: {
      AppBasePoolDescription: {
        telegram: 'Option<Text>',
        discord: 'Option<Text>',
        wechat: 'Option<Text>',
        twitter: 'Option<Text>',
        email: 'Option<Text>',
        forum: 'Option<Text>',
        announcement: 'Option<Text>',
      },
    },
  })

  return api
}

export default createPolkadotApi
