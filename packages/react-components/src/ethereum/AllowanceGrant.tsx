import { ethers } from 'ethers'
import React, { useMemo } from 'react'
import { ethereums } from '../../config'
import { useEthers } from '../../libs/ethereum/contexts/useEthers'
import { useErc20Contract } from '../../libs/ethereum/erc20/useErc20Contract'
import { useErc20AssetHandlerAllowanceQuery } from '../../libs/ethereum/queries/useErc20AllowanceQuery'

export const AllowanceApprove = ({ owner }: { owner: string }): JSX.Element => {
  const { contract } = useErc20Contract()
  const { data: allowance } = useErc20AssetHandlerAllowanceQuery(owner)
  const { provider, signer } = useEthers()

  const allowanceText = useMemo(
    () => allowance !== undefined && ethers.utils.formatUnits(allowance, 18),
    [allowance]
  ) // TODO: extract this hardcoded 18

  // TODO: add transaction progress indication

  const startApprove = () => {
    const network = ethereums[provider?.network.chainId as number]

    if (
      contract === undefined ||
      network === undefined ||
      signer === undefined
    ) {
      return
    }

    const contractSigned = contract.connect(signer)

    contractSigned.functions['approve']?.(
      network.erc20AssetHandler,
      ethers.utils.parseUnits('11451419810', 18)
    )
  }

  return <div onClick={() => startApprove()}>Approve</div>
}
