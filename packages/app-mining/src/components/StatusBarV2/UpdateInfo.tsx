import {Block} from 'baseui/block'
import {Skeleton} from 'baseui/skeleton'
import {Tag} from 'baseui/tag'
import {useGlobalStateQuery} from '../../hooks/subsquid'
import {subsquidClient} from '../../utils/GraphQLClient'

const UpdateInfo = (): JSX.Element => {
  const {data, isLoading} = useGlobalStateQuery(
    subsquidClient,
    {},
    {refetchInterval: 12 * 1000}
  )

  return (
    <Block display="flex" alignItems="center" height="34px">
      {isLoading && <Skeleton animation height="34px" width="200px" />}
      {Boolean(data?.squidStatus?.height) && (
        <Tag closeable={false}>#{data?.squidStatus?.height}</Tag>
      )}
    </Block>
  )
}

export default UpdateInfo
