import {khalaSubsquidClient, subsquidClient} from '@/config'
import {getSdk} from '@/lib/subsquidSdk'
import {Parser} from '@json2csv/plainjs'
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {chain, id} = req.query
  if ((chain !== 'phala' && chain !== 'khala') || typeof id !== 'string') {
    res.status(500).send('Invalid params')
  } else {
    const client = chain === 'phala' ? subsquidClient : khalaSubsquidClient
    const sdk = getSdk(client)
    const data = await sdk.DelegationSnapshotsConnection({
      orderBy: 'updatedTime_DESC',
      first: 2000,
      where: {delegation_eq: id},
    })

    const result = data.delegationSnapshotsConnection.edges.map(
      ({node}) => node,
    )
    const csv = new Parser().parse(result)
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader(
      'Content-Disposition',
      `attachment;filename=snapshots_delegation_${id}_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`,
    )
    res.status(200).send(csv)
  }
}
