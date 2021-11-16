import {ethers} from 'ethers'
import {isHexString} from 'ethers/lib/utils'
import {useCallback, useEffect, useState} from 'react'
import {useEthers} from '..'
import {useNetworkContext} from '../polkadot/hooks/useSubstrateNetwork'
import {useBridgeContract} from './bridge/useBridgeContract'
import {useEthereumNetworkOptions} from './queries/useEthereumNetworkOptions'
import {useEthersNetworkQuery} from './queries/useEthersNetworkQuery'

export const useEthereumBridgeFee = () => {
  const recipient = '0x4b510EDb1f076f1664a1416Eb34a1a7880D2DAA7'
  const {contract} = useBridgeContract()
  const {network: substrateName} = useNetworkContext()
  const {options: config} = useEthereumNetworkOptions()
  const {data: network} = useEthersNetworkQuery()
  const [fee, setFee] = useState<number | undefined>()
  const [gasPrice, setGasPrice] = useState<number | undefined>()
  const {provider} = useEthers()

  provider?.getGasPrice().then((gasPrice) => {
    setGasPrice(parseFloat(ethers.utils.formatUnits(gasPrice, 'gwei')))
  })

  const estimateGas = useCallback(async () => {
    const amount = ethers.utils.parseUnits('1', 18)

    if (
      gasPrice === undefined ||
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

    if (result) {
      setFee((result?.toNumber() * gasPrice * 1e9) / 1e18)
    }

    return result
  }, [
    config,
    contract?.estimateGas,
    network,
    recipient,
    substrateName,
    gasPrice,
  ])

  useEffect(() => {
    estimateGas()
  }, [estimateGas])

  return fee
}
