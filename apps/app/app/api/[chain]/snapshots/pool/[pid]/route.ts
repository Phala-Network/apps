import {khalaSubsquidClient, subsquidClient} from '@/config'
import {getSdk} from '@/lib/subsquidSdk'
import {Parser} from '@json2csv/plainjs'
import {type NextRequest, NextResponse} from 'next/server'

export async function GET(
  _request: NextRequest,
  {params}: {params: Promise<{chain: string; pid: string}>},
) {
  const {chain, pid} = await params

  if (
    (chain !== 'phala' && chain !== 'khala') ||
    typeof pid !== 'string' ||
    Number.isNaN(Number.parseInt(pid))
  ) {
    return NextResponse.json('Invalid params', {status: 500})
  }

  const client = chain === 'phala' ? subsquidClient : khalaSubsquidClient
  const sdk = getSdk(client)
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

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment;filename=snapshots_pool_${pid}_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`,
    },
  })
}
