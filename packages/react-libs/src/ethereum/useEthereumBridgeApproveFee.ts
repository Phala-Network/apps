import {ethereums} from '@phala/app-config'
import {ethers} from 'ethers'
import {useEffect, useState} from 'react'
import {useErc20Contract, useEthers} from '..'

export function useEthereumBridgeApproveFee() {
  const {provider, signer} = useEthers()
  const [gasPrice, setGasPrice] = useState<number | undefined>()
  const {contract} = useErc20Contract()
  const [fee, setFee] = useState<number | undefined>()

  provider?.getGasPrice().then((gasPrice) => {
    setGasPrice(parseFloat(ethers.utils.formatUnits(gasPrice, 'gwei')))
  })

  useEffect(() => {
    const network = ethereums[provider?.network.chainId as number]

    if (
      contract === undefined ||
      network === undefined ||
      signer === undefined
    ) {
      return
    }

    const contractSigned = contract.connect(signer)

    contractSigned.estimateGas
      .approve?.(
        network.erc20AssetHandler,
        ethers.utils.parseUnits('11451419810', 18)
      )
      .then((result) =>
        setFee((result?.toNumber() * (gasPrice ?? 150) * 1e9) / 1e18)
      )
  }, [contract, gasPrice, provider?.network.chainId, signer])

  return fee
}
