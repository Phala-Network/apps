import {useErc20BalanceQuery} from '@phala/react-libs'
import {Decimal} from 'decimal.js'
import {ethers} from 'ethers'
import {useMemo} from 'react'

export default function useEthereumAccountBalanceDecimal(
  ethereumAccountAddress?: string
): Decimal {
  const {data: ethereumAccountBalance} = useErc20BalanceQuery(
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
