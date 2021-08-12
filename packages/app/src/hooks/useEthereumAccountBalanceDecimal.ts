import { useEthereumAccountAtom } from '@phala/app-store'
import { Decimal } from 'decimal.js'
import { ethers } from 'ethers'
import { useMemo } from 'react'
import { useErc20BalanceQuery } from '../libs/ethereum/queries/useErc20BalanceQuery'

export default function useEthereumAccountBalanceDecimal(): Decimal {
  const [ethereumAccount] = useEthereumAccountAtom()
  const ethereumAccountAddress = ethereumAccount?.address
  const { data: ethereumAccountBalance } = useErc20BalanceQuery(
    ethereumAccountAddress
  )

  const ethereumAccountBalanceNumber = useMemo(() => {
    if (ethereumAccountBalance) {
      return new Decimal(
        ethers.utils.formatUnits(
          ethereumAccountBalance as ethers.BigNumberish,
          18
        )
      )
    } else {
      return new Decimal(-1)
    }
  }, [ethereumAccountBalance])

  return ethereumAccountBalanceNumber
}
