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
    const network = ethereums[provider?.network?.chainId as number]

    if (
      provider === undefined ||
      contract === undefined ||
      network === undefined ||
      network.erc20AssetHandler === undefined ||
      signer === undefined
    ) {
      return
    }

    const contractSigned = contract.connect(signer)

    try {
      contractSigned.estimateGas
        .approve?.(
          network.erc20AssetHandler,
          ethers.utils.parseUnits('11451419810', 18)
        )
        .then((result) =>
          setFee((result?.toNumber() * (gasPrice ?? 150) * 1e9) / 1e18)
        )
    } catch (e) {
      console.error(e)
    }
  }, [contract, provider, gasPrice, signer])

  return fee
}
