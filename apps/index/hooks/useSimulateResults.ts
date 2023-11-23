import {clientAtom, destinationAccountAtom, solutionAtom} from '@/store/core'
import {type TaskSimulateResult} from '@phala/index'
import {isHex, u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import {useAtom} from 'jotai'
import {useMemo} from 'react'
import useSWR, {type SWRResponse} from 'swr'

const useSimulateResults = (): SWRResponse<
  TaskSimulateResult[] | undefined
> => {
  const [client] = useAtom(clientAtom)
  const [solution] = useAtom(solutionAtom)
  const [destinationAccount] = useAtom(destinationAccountAtom)
  const hexAddress = useMemo(
    () =>
      destinationAccount === ''
        ? ''
        : isHex(destinationAccount)
          ? destinationAccount
          : u8aToHex(decodeAddress(destinationAccount)),
    [destinationAccount],
  )
  const swr = useSWR(
    solution != null &&
      client != null &&
      hexAddress !== '' && [client, solution, hexAddress, 'simulationResults'],
    async ([client, solution, destinationAccount]) => {
      return await client.simulateSolution(solution, destinationAccount)
    },
  )

  return swr
}

export default useSimulateResults
