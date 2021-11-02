import {ethers} from 'ethers'
import {useState} from 'react'
import {useBridgeContract} from '..'
import {useEthereumNetworkOptions} from './queries/useEthereumNetworkOptions'

export async function useEthFee() {
  const amount = ethers.utils.parseUnits('10', 18)
  const recipient = '0xC84456ecA286194A201F844993C220150Cf22C63'
  const [ethFee] = useState(0)
  // const {provider} = useEthers()
  const bridgeContract = useBridgeContract()
  const {options: config} = useEthereumNetworkOptions()
  // const {options} = useNetworkContext()
  const destChainId = 1

  const amountPayload = ethers.utils
    .hexZeroPad(amount.toHexString(), 32)
    .substr(2)
  const recipientPayload = recipient.substr(2)
  const recipientSize = ethers.utils
    .hexZeroPad(ethers.utils.hexlify(recipientPayload.length / 2), 32)
    .substr(2)

  const payload = `0x${amountPayload}${recipientSize}${recipientPayload}`

  bridgeContract.contract?.estimateGas
    ?.deposit?.(destChainId, config?.erc20ResourceId, payload)
    .then((gasLimit) => {
      console.error(gasLimit)
    })

  return ethFee
}
