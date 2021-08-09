import { ApiPromise } from '@polkadot/api'
import { ExtrinsicStatus, Hash } from '@polkadot/types/interfaces'
import { waitSignAndSend } from '../utils/signAndSend'

interface VestProps {
  api: ApiPromise
  sender: string

  onstatus?: (status: ExtrinsicStatus) => void
}

export const vest = async ({
  api,
  onstatus,
  sender,
}: VestProps): Promise<Hash> => {
  const web3FromAddress = (await import('@polkadot/extension-dapp'))
    .web3FromAddress

  const signer = (await web3FromAddress(sender)).signer
  const extrinsic = api.tx.vesting.vest()

  return await waitSignAndSend({
    account: sender,
    api,
    extrinsic,
    onstatus,
    signer,
  })
}
