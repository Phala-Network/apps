import {Block} from 'baseui/block'
import {Skeleton} from 'baseui/skeleton'
import {Tag} from 'baseui/tag'
import {useGlobalStateQuery} from '../../hooks/subsquid'
import {subsquidClient} from '../../utils/GraphQLClient'

const UpdateInfo = (): JSX.Element => {
  const {data, isLoading} = useGlobalStateQuery(subsquidClient, {})

  return (
    <Block display="flex" alignItems="center" height="34px">
      {isLoading && <Skeleton animation height="34px" width="200px" />}
      {Boolean(data?.globalStateById?.height) && (
        <Tag closeable={false}>#{data?.globalStateById?.height}</Tag>
      )}
    </Block>
  )
}

export default UpdateInfo
