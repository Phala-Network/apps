import {Block} from 'baseui/block'
import {Tag} from 'baseui/tag'
import {FC} from 'react'
import {useGlobalStateQuery} from '../hooks/subsquid'
import {subsquidClient} from '../utils/GraphQLClient'

const BlockHeight: FC = () => {
  const {data} = useGlobalStateQuery(subsquidClient, {})

  return (
    <Block
      display={['none', 'flex']}
      alignItems="center"
      height="34px"
      marginRight={['0', '0', 'scale400']}
    >
      {Boolean(data?.globalStateById?.height) && (
        <Tag closeable={false} size="small">
          #{data?.globalStateById?.height}
        </Tag>
      )}
    </Block>
  )
}

export default BlockHeight
