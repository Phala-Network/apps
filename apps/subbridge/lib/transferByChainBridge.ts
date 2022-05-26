import {AssetId, ASSETS} from '@/config/asset'
import {ChainId, CHAINS} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import type {ethers} from 'ethers'

export const createChainBridgeData = async (
  khalaApi: ApiPromise,
  destinationAccount: string,
  amount: string,
  toChainId: ChainId
): Promise<string> => {
  const {ethers, BigNumber} = await import('ethers')
  const isToKhala = toChainId === 'khala' || toChainId === 'thala'
  const toChain = CHAINS[toChainId]
  const accountId = u8aToHex(decodeAddress(destinationAccount))
  const dest = khalaApi
    .createType('XcmV1MultiLocation', {
      // parents = 1 means we wanna send to other parachains or relaychain
      parents: isToKhala ? 0 : 1,
      interior: isToKhala
        ? {
            X1: {
              AccountId32: {
                network: 'Any',
                id: accountId,
              },
            },
          }
        : {
            X2: [
              {Parachain: toChain.paraId},
              {
                AccountId32: {
                  network: 'Any',
                  id: accountId,
                },
              },
            ],
          },
    })
    .toHex()

  const data = ethers.utils.hexConcat([
    ethers.utils.hexZeroPad(BigNumber.from(amount).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.utils.hexlify((dest.length - 2) / 2), 32),
    dest,
  ])

  return data
}

export const transferByChainBridge = async ({
  contract,
  khalaApi,
  destinationAccount,
  amount,
  toChainId,
  assetId,
}: {
  contract: ethers.Contract
  khalaApi: ApiPromise
  destinationAccount: string
  assetId: AssetId
  amount: string
  toChainId: ChainId
}): Promise<{hash: string}> => {
  const {chainBridgeResourceId} = ASSETS[assetId]
  if (!chainBridgeResourceId) {
    throw new Error('Transfer missing required parameters')
  }
  return contract.deposit(
    1,
    chainBridgeResourceId,
    await createChainBridgeData(khalaApi, destinationAccount, amount, toChainId)
  )
}
