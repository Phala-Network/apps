import { ethers } from 'ethers'
import React, { cloneElement, FC, useEffect, useMemo, useState } from 'react'
import { ethereums } from '../../config'
import { useEthers } from '../../libs/ethereum/contexts/useEthers'
import { useErc20Contract } from '../../libs/ethereum/erc20/useErc20Contract'
import { useErc20AssetHandlerAllowanceQuery } from '../../libs/ethereum/queries/useErc20AllowanceQuery'
import { useTransactionReceiptQuery } from '../../libs/ethereum/queries/useTransactionReceiptQuery'

type Props = {
  account?: string
  placeholder: React.ReactElement
  children: React.ReactElement
}

const EthereumAllowance: FC<Props> = (props: Props) => {
  const [transactionsInfoSuccess, setTransactionsInfoSuccess] = useState(false)
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const { account, placeholder, children } = props
  const { data: allowance } = useErc20AssetHandlerAllowanceQuery(account)
  const { contract } = useErc20Contract()
  const { provider, signer } = useEthers()
  const [approveHash, setApproveHash] = useState('')
  const { data: receipt } = useTransactionReceiptQuery(approveHash)

  const allowanceText = useMemo(
    () => allowance !== undefined && ethers.utils.formatUnits(allowance, 18),
    [allowance]
  )

  useEffect(() => {
    if (receipt && receipt?.confirmations > 0) {
      setTransactionsInfoSuccess(true)
      setSubmitting(false)
    }
  }, [receipt, setTransactionsInfoSuccess])

  const startApprove = async () => {
    try {
      const network = ethereums[provider?.network.chainId as number]

      if (
        contract === undefined ||
        network === undefined ||
        signer === undefined
      ) {
        return
      }

      const contractSigned = contract.connect(signer)

      const approveResult = await contractSigned.functions['approve']?.(
        network.erc20AssetHandler,
        ethers.utils.parseUnits('11451419810', 18)
      )

      setApproveHash(approveResult.hash)
      setSubmitting(true)
    } catch (e) {
      console.error(e)
    }
  }

  return (allowanceText && allowanceText !== '0.0') || transactionsInfoSuccess
    ? children
    : cloneElement(placeholder, {
        onClick: startApprove,
        loading: isSubmitting,
      })
}

export default EthereumAllowance
