import {KHALA_SUBSQUID_URL, PHALA_SUBSQUID_URL} from '@/config'
import {sleep} from '@phala/util'
import {GraphQLClient} from 'graphql-request'
import {type GetServerSideProps} from 'next'
import {type BasePoolByIdQuery, type BasePoolKind} from './subsquidQuery'
import {getSdk} from './subsquidSdk'

export interface BasePoolServerSideProps {
  pid: string
  initialData: BasePoolByIdQuery | null
  initialDataUpdatedAt: number
}

const getBasePoolServerSideProps =
  (kind: BasePoolKind): GetServerSideProps<BasePoolServerSideProps> =>
  async (ctx) => {
    const {pid, chain} = ctx.params ?? {}
    if (typeof pid !== 'string' || (chain !== 'khala' && chain !== 'phala')) {
      throw new Error('Invalid params')
    }
    const subsquidSdk = getSdk(
      new GraphQLClient(
        chain === 'phala' ? PHALA_SUBSQUID_URL : KHALA_SUBSQUID_URL
      )
    )
    const initialData = await Promise.race([
      subsquidSdk.BasePoolById({id: pid}),
      sleep(3000),
    ])

    if (initialData != null && initialData.basePoolById?.kind !== kind) {
      return {notFound: true}
    }
    return {
      props: {
        pid,
        initialData: initialData ?? null,
        initialDataUpdatedAt: new Date().getTime(),
      },
    }
  }

export default getBasePoolServerSideProps
