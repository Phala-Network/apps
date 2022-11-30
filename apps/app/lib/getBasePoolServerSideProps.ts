import {GetServerSideProps} from 'next'
import {subsquidSdk} from './graphql'
import {BasePoolByIdQuery, BasePoolKind} from './subsquidQuery'

export type BasePoolServerSideProps = {
  pid: string
  basePoolQuery: BasePoolByIdQuery
}

const getBasePoolServerSideProps =
  (kind: BasePoolKind): GetServerSideProps<BasePoolServerSideProps> =>
  async (ctx) => {
    const pid = ctx.params?.pid
    if (typeof pid !== 'string') {
      throw new Error('Invalid pid')
    }
    const basePoolQuery = await subsquidSdk.BasePoolById({id: pid})
    if (basePoolQuery.basePoolById?.kind !== kind) {
      return {notFound: true}
    }
    return {props: {pid, basePoolQuery}}
  }

export default getBasePoolServerSideProps
