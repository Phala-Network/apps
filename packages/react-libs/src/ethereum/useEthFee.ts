import {ethers} from 'ethers'
import {isHexString} from 'ethers/lib/utils'
import {useCallback, useEffect, useState} from 'react'
import {useNetworkContext} from '../polkadot/hooks/useSubstrateNetwork'
import {useBridgeContract} from './bridge/useBridgeContract'
import {useEthereumNetworkOptions} from './queries/useEthereumNetworkOptions'
import {useEthersNetworkQuery} from './queries/useEthersNetworkQuery'

export const useEthFee = (recipient?: string) => {
  const {contract} = useBridgeContract()
  const {network: substrateName} = useNetworkContext()
  const {options: config} = useEthereumNetworkOptions()
  const {data: network} = useEthersNetworkQuery()
  const [fee, setFee] = useState<number | undefined>()

  const estimateGas = useCallback(async () => {
    const amount = ethers.utils.parseUnits('1', 18)

    if (
      config === undefined ||
      network === undefined ||
      substrateName === undefined
    ) {
      return undefined
    }

    const destChainId = config.peerChainIds[substrateName as string] as
      | number
      | undefined

    if (destChainId === undefined) {
      throw new Error(
        `Unsupported Ethereum network: ${network.name} (${network.chainId})`
      )
    }

    if (!isHexString(recipient) || !recipient) {
      throw new Error('Validation failed: recipient should be hex string')
    }

    const amountPayload = ethers.utils
      .hexZeroPad(amount.toHexString(), 32)
      .substr(2)
    const recipientPayload = recipient.substr(2)
    const recipientSize = ethers.utils
      .hexZeroPad(ethers.utils.hexlify(recipientPayload.length / 2), 32)
      .substr(2)

    const payload = `0x${amountPayload}${recipientSize}${recipientPayload}`

    const result = await contract?.estimateGas?.deposit?.(
      destChainId,
      config.erc20ResourceId,
      payload
    )

    setFee(result?.toNumber())

    console.error('fee', result?.toNumber())

    return result
  }, [config, contract?.estimateGas, network, recipient, substrateName])

  useEffect(() => {
    estimateGas()
  }, [estimateGas])

  return fee
}
