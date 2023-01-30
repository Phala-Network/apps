import {sleep} from '@phala/util'
import {type GetServerSideProps} from 'next'
import {subsquidSdk} from './graphql'
import {type BasePoolByIdQuery, type BasePoolKind} from './subsquidQuery'

export interface BasePoolServerSideProps {
  pid: string
  initialData: BasePoolByIdQuery | null
  initialDataUpdatedAt: number
}

const getBasePoolServerSideProps =
  (kind: BasePoolKind): GetServerSideProps<BasePoolServerSideProps> =>
  async (ctx) => {
    const pid = ctx.params?.pid
    if (typeof pid !== 'string') {
      throw new Error('Invalid pid')
    }
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
