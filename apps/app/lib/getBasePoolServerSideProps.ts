import {khalaSubsquidClient, phalaSubsquidClient} from '@/config'
import {sleep} from '@phala/lib'
import type {GetServerSideProps} from 'next'
import type {BasePoolByIdQuery, BasePoolKind} from './subsquidQuery'
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
      chain === 'phala' ? phalaSubsquidClient : khalaSubsquidClient,
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
