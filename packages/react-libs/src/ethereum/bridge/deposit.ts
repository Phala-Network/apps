import {BigNumber, ethers} from 'ethers'
import {isHexString} from 'ethers/lib/utils'
import {useMemo} from 'react'
import {useApiPromise} from '../..'
import {useNetworkContext} from '../../polkadot/hooks/useSubstrateNetwork'
import {useEthers} from '../contexts/useEthers'
import {useEthereumNetworkOptions} from '../queries/useEthereumNetworkOptions'
import {useEthersNetworkQuery} from '../queries/useEthersNetworkQuery'
import {useBridgeContract} from './useBridgeContract'

type DepositSubmitFn = (
  amount: BigNumber,
  recipient: string
) => Promise<ethers.providers.TransactionResponse> // TODO: use HexString

/**
 * Submits a transfer of ERC-20 tokens from Ethereum to Substrate
 */
export const useErc20Deposit = (
  sender?: string
): DepositSubmitFn | undefined => {
  const {contract} = useBridgeContract()
  const {network: substrateName} = useNetworkContext()
  const {options: config} = useEthereumNetworkOptions()
  const {data: network} = useEthersNetworkQuery()
  const {provider} = useEthers()
  const {api} = useApiPromise()

  const bridge = useMemo(() => {
    return contract !== undefined && provider !== undefined
      ? contract.connect(provider.getSigner(sender))
      : undefined
  }, [contract, provider, sender])

  return useMemo(() => {
    if (
      api === undefined ||
      bridge === undefined ||
      config === undefined ||
      network === undefined ||
      sender === undefined ||
      substrateName === undefined
    ) {
      return undefined
    }

    const destChainId = config.peerChainIds[substrateName as string] as
      | number
      | undefined

    return async (amount, recipient) => {
      if (destChainId === undefined) {
        throw new Error(
          `Unsupported Ethereum network: ${network.name} (${network.chainId})`
        )
      }

      if (typeof bridge.functions['deposit'] !== 'function') {
        throw new Error(
          'Assertion failed: deposit should be available on the bridge contract'
        )
      }

      if (!isHexString(recipient)) {
        throw new Error('Validation failed: recipient should be hex string')
      }

      const dest = api
        .createType('XcmV1MultiLocation', {
          parents: 0,
          interior: api.createType('Junctions', {
            X1: api.createType('XcmV1Junction', {
              AccountId32: {
                network: api.createType('XcmV0JunctionNetworkId', 'Any'),
                id: recipient,
              },
            }),
          }),
        })
        .toHex()

      const data =
        '0x' +
        ethers.utils
          .hexZeroPad(
            ethers.BigNumber.from(amount.toString()).toHexString(),
            32
          )
          .substr(2) +
        ethers.utils
          .hexZeroPad(ethers.utils.hexlify((dest.length - 2) / 2), 32)
          .substr(2) +
        dest.substr(2)

      return await (bridge.functions['deposit'](
        destChainId,
        config.erc20ResourceId,
        data,
        {
          gasLimit: 350000,
        }
      ) as Promise<ethers.providers.TransactionResponse>)
    }
  }, [bridge, config, network, sender, substrateName])
}
