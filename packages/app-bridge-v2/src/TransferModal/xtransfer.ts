import {ApiPromise, WsProvider} from '@polkadot/api'
import BN from 'bn.js'
import ethers, {Contract} from 'ethers'

const khalaChainId = 1
const karuraParaId = 2000
// const bridgeAddressOnRinkeby = '0x0712Cf53B9fA1A33018d180a4AbcC7f1803F55f4'
const phaResourceId =
  '0x41ab283b2b268c9c99ddfe96ed5dfbfa3dcc1a2f5551a30049fea8484186f2eb'

// simulate EVM => Khala, call Bridge.Deposit()
export async function transferPhaFromEvmToKhala(
  khalaApi: ApiPromise,
  bridge: Contract,
  // sender: any,
  _: any,
  recipient: any,
  amount: BN
) {
  // dest is not Account public key any more.
  const dest = khalaApi
    .createType('XcmV1MultiLocation', {
      // parents = 0 means we send to xcm local network(e.g. Khala network here)
      parents: 0,
      interior: khalaApi.createType('Junctions', {
        X1: khalaApi.createType('XcmV1Junction', {
          AccountId32: {
            network: khalaApi.createType('XcmV0JunctionNetworkId', 'Any'),
            id: '0x' + Buffer.from(recipient.publicKey).toString('hex'),
          },
        }),
      }),
    })
    .toHex()

  const data =
    '0x' +
    ethers.utils
      .hexZeroPad(ethers.BigNumber.from(amount.toString()).toHexString(), 32)
      .substr(2) +
    ethers.utils
      .hexZeroPad(ethers.utils.hexlify((dest.length - 2) / 2), 32)
      .substr(2) +
    dest.substr(2)

  await bridge.deposit(khalaChainId, phaResourceId, data)
}

// simulate EVM => Khala => Karura, call Bridge.Deposit()
export async function transferPhaFromEvmToKarura(
  khalaApi: ApiPromise,
  bridge: Contract,
  _: any,
  // sender: any,
  recipient: any,
  amount: BN
) {
  const dest = khalaApi
    .createType('XcmV1MultiLocation', {
      // parents = 1 means we wanna send to other parachains or relaychain
      parents: 1,
      interior: khalaApi.createType('Junctions', {
        X2: [
          khalaApi.createType('XcmV1Junction', {
            Parachain: khalaApi.createType('Compact<U32>', karuraParaId),
          }),
          khalaApi.createType('XcmV1Junction', {
            AccountId32: {
              network: khalaApi.createType('XcmV0JunctionNetworkId', 'Any'),
              id: '0x' + Buffer.from(recipient.publicKey).toString('hex'),
            },
          }),
        ],
      }),
    })
    .toHex()
  const data =
    '0x' +
    ethers.utils
      .hexZeroPad(ethers.BigNumber.from(amount.toString()).toHexString(), 32)
      .substr(2) +
    ethers.utils
      .hexZeroPad(ethers.utils.hexlify((dest.length - 2) / 2), 32)
      .substr(2) +
    dest.substr(2)

  await bridge.deposit(khalaChainId, phaResourceId, data)
}

export async function getBaseInfo() {
  const khalaEndpoint = 'ws://35.215.162.102:9944'
  const khalaProvider = new WsProvider(khalaEndpoint)
  const khalaApi = await ApiPromise.create({
    provider: khalaProvider,
  })

  const karuraEndpoint = 'ws://35.215.162.102:9955'
  const karuraProvider = new WsProvider(karuraEndpoint)
  const karuraApi = await ApiPromise.create({
    provider: karuraProvider,
  })

  // const privateKey = process.env.KEY || '0x'
  // const provider = new ethers.providers.JsonRpcProvider(
  //   'https://rinkeby.infura.io/v3/6d61e7957c1c489ea8141e947447405b'
  // )
  // const ethereumWallet = new ethers.Wallet(privateKey, provider)
  // const bridge = new ethers.Contract(
  //   bridgeAddressOnRinkeby,
  //   BridgeJson.abi,
  //   ethereumWallet
  // )

  return {
    // bridge,
    khalaApi,
    karuraApi,
  }
}
