import { Decimal } from 'decimal.js'
import { ethers } from 'ethers'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import ethereumAccountAtom from '../atoms/ethereumAccountAtom'
import { useErc20BalanceQuery } from '../libs/ethereum/queries/useErc20BalanceQuery'

export default function useEthereumAccountBalanceDecimal(): Decimal {
  const [ethereumAccount] = useAtom(ethereumAccountAtom)
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
