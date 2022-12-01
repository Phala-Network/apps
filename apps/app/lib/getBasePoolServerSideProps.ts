import {GetServerSideProps} from 'next'
import {subsquidSdk} from './graphql'
import {BasePoolByIdQuery, BasePoolKind} from './subsquidQuery'

export type BasePoolServerSideProps = {
  pid: string
  initialData: BasePoolByIdQuery
  initialDataUpdatedAt: number
}

const getBasePoolServerSideProps =
  (kind: BasePoolKind): GetServerSideProps<BasePoolServerSideProps> =>
  async (ctx) => {
    const pid = ctx.params?.pid
    if (typeof pid !== 'string') {
      throw new Error('Invalid pid')
    }
    const initialData = await subsquidSdk.BasePoolById({id: pid})
    if (initialData.basePoolById?.kind !== kind) {
      return {notFound: true}
    }
    return {
      props: {pid, initialData, initialDataUpdatedAt: new Date().getTime()},
    }
  }

export default getBasePoolServerSideProps
