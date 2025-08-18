import {khalaSubsquidClient, subsquidClient} from '@/config'
import {getSdk} from '@/lib/subsquidSdk'
import {Parser} from '@json2csv/plainjs'
import {type NextRequest, NextResponse} from 'next/server'

export async function GET(
  request: NextRequest,
  {params}: {params: {chain: string; account: string}},
) {
  const {chain, account} = params

  if ((chain !== 'phala' && chain !== 'khala') || typeof account !== 'string') {
    return NextResponse.json('Invalid params', {status: 500})
  }

  const client = chain === 'phala' ? subsquidClient : khalaSubsquidClient
  const sdk = getSdk(client)
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

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment;filename=snapshots_account_${account}_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`,
    },
  })
}
