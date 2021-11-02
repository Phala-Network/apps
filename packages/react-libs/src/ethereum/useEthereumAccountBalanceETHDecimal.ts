import {Decimal} from 'decimal.js'
import {ethers} from 'ethers'
import {useEffect, useState} from 'react'
import {useEthersNetworkQuery} from './queries/useEthersNetworkQuery'

let flag = 0

export function useEthereumAccountBalanceETHDecimal(address: string): {
  value: Decimal
  error: Error | null | undefined
} {
  const [balanceDecimal, setBalanceDecimal] = useState<Decimal>(new Decimal(-1))
  const {data: network} = useEthersNetworkQuery()
  const [error, setError] = useState<Error | null | undefined>()

  const handleError = (error: Error) => {
    console.error(error)
    setError(error)
  }

  useEffect(() => {
    if (!address || !network) return

    const promiseFlag = ++flag

    setError(null)

    try {
      ethers
        .getDefaultProvider(network)
        .getBalance(address)
        .then((balance) => {
          const balanceInEth = ethers.utils.formatEther(balance)

          if (promiseFlag >= flag) {
            setBalanceDecimal(new Decimal(balanceInEth))
          }
        })
        .catch((error) => {
          handleError(error)
        })
    } catch (error) {
      if (error instanceof Error) {
        handleError(error)
      }
    }
  }, [address, network])

  return {
    error,
    value: balanceDecimal,
  }
}
