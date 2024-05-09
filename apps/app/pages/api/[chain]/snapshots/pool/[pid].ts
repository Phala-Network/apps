import {subsquidClient} from '@/config'
import {getSdk} from '@/lib/subsquidSdk'
import {Parser} from '@json2csv/plainjs'
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {chain, pid} = req.query
  if (
    (chain !== 'phala' && chain !== 'khala') ||
    typeof pid !== 'string' ||
    Number.isNaN(Number.parseInt(pid))
  ) {
    res.status(500).send('Invalid params')
  } else {
    const sdk = getSdk(subsquidClient[chain])
    const data = await sdk.BasePoolSnapshotsConnection({
      orderBy: 'updatedTime_DESC',
      first: 2000,
      withCommission: true,
      withApr: true,
      withCumulativeOwnerRewards: true,
      withDelegatorCount: true,
      withStakePoolCount: true,
      withTotalValue: true,
      withWorkerCount: true,
      withSharePrice: true,
      withTotalShares: true,
      where: {basePool_eq: pid},
    })

    const result = data.basePoolSnapshotsConnection.edges.map(({node}) => node)
    const csv = new Parser().parse(result)
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader(
      'Content-Disposition',
      `attachment;filename=snapshots_pool_${pid}_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`,
    )
    res.status(200).send(csv)
  }
}
