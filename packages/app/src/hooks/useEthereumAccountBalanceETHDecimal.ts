import { useEthereumAccountAtom } from '@phala/app-store'
import { useEthersNetworkQuery } from '@phala/react-libs'
import { captureException } from '@sentry/react'
import { Decimal } from 'decimal.js'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

let flag = 0

export default function useEthereumAccountBalanceETHDecimal(): {
  value: Decimal
  error: Error | null | undefined
} {
  const [balanceDecimal, setBalanceDecimal] = useState<Decimal>(new Decimal(-1))
  const [ethereumAccount] = useEthereumAccountAtom()
  const { data: network } = useEthersNetworkQuery()
  const [error, setError] = useState<Error | null | undefined>()
  const address = ethereumAccount?.address

  const handleError = (error: Error) => {
    console.error(error)
    setError(error)
    captureException(error)
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
      handleError(error)
    }
  }, [address, network])

  return {
    error,
    value: balanceDecimal,
  }
}
