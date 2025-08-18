import {khalaSubsquidClient, subsquidClient} from '@/config'
import {getSdk} from '@/lib/subsquidSdk'
import {Parser} from '@json2csv/plainjs'
import {type NextRequest, NextResponse} from 'next/server'

export async function GET(
  _request: NextRequest,
  {params}: {params: Promise<{chain: string; id: string}>},
) {
  const {chain, id} = await params

  if ((chain !== 'phala' && chain !== 'khala') || typeof id !== 'string') {
    return NextResponse.json('Invalid params', {status: 500})
  }

  const client = chain === 'phala' ? subsquidClient : khalaSubsquidClient
  const sdk = getSdk(client)
  const data = await sdk.DelegationSnapshotsConnection({
    orderBy: 'updatedTime_DESC',
    first: 2000,
    where: {delegation_eq: id},
  })

  const result = data.delegationSnapshotsConnection.edges.map(({node}) => node)
  const csv = new Parser().parse(result)

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment;filename=snapshots_delegation_${id}_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`,
    },
  })
}
