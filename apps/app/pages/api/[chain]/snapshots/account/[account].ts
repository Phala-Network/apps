import {subsquidClient} from '@/config'
import {getSdk} from '@/lib/subsquidSdk'
import {Parser} from '@json2csv/plainjs'
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {chain, account} = req.query
  if ((chain !== 'phala' && chain !== 'khala') || typeof account !== 'string') {
    res.status(500).send('Invalid params')
  } else {
    const sdk = getSdk(subsquidClient)
    const data = await sdk.AccountSnapshotsConnection({
      orderBy: 'updatedTime_DESC',
      first: 2000,
      where: {account_eq: account},
      withDelegationValue: true,
      withCumulativeStakePoolOwnerRewards: true,
      withCumulativeVaultOwnerRewards: true,
    })

    const result = data.accountSnapshotsConnection.edges.map(({node}) => node)
    const csv = new Parser().parse(result)
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader(
      'Content-Disposition',
      `attachment;filename=snapshots_account_${account}_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`,
    )
    res.status(200).send(csv)
  }
}
