import {useErc20AssetHandlerAllowanceQuery} from '@phala/react-libs'
import {ethers} from 'ethers'
import React, {cloneElement, FC, useMemo, useState} from 'react'
import {ApproveDialog} from '../ApproveDialog'

type Props = {
  account?: string
  placeholder: React.ReactElement
  children: React.ReactElement
}

export const EthereumAllowance: FC<Props> = (props: Props) => {
  const {account, placeholder, children} = props
  const {data: allowance} = useErc20AssetHandlerAllowanceQuery(account)
  const [modalVisible, setModalVisible] = useState(false)

  const allowanceText = useMemo(
    () => allowance !== undefined && ethers.utils.formatUnits(allowance, 18),
    [allowance]
  )

  return allowanceText && allowanceText !== '0.0' ? (
    children
  ) : (
    <>
      {cloneElement(placeholder, {
        onClick: () => setModalVisible(true),
      })}
      <ApproveDialog
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  )
}
