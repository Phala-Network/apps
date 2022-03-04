import {useInterval} from '@phala/react-hooks'
import {Block} from 'baseui/block'
import {Skeleton} from 'baseui/skeleton'
import {Tag} from 'baseui/tag'
import {StatefulTooltip} from 'baseui/tooltip'
import {LabelSmall} from 'baseui/typography'
import {formatDistanceToNow} from 'date-fns'
import {useEffect, useState} from 'react'
import {Info} from 'react-feather'
import {useStatesQuery} from '../../hooks/graphql'
import {client} from '../../utils/GraphQLClient'

const UpdateInfo = (): JSX.Element => {
  const {data, isLoading} = useStatesQuery(client)
  const [distance, setDistance] = useState('')
  const updateTime = data?.findManyStates[3]?.datetimeValue
  const blockNumber = data?.findManyStates[4]?.integerValue

  useEffect(() => {
    if (updateTime) {
      setDistance(formatDistanceToNow(new Date(updateTime)))
    }
  }, [updateTime])

  useInterval(
    () => {
      if (updateTime) {
        setDistance(formatDistanceToNow(new Date(updateTime)))
      }
    },
    updateTime ? 10000 : null
  )

  return (
    <Block display="flex" alignItems="center" height="34px">
      <StatefulTooltip
        content="Usually updated every 15 mins"
        placement="bottomLeft"
      >
        <Info size={16} />
      </StatefulTooltip>
      <LabelSmall $style={{marginLeft: '5px'}}>
        Last Update: {distance && `${distance} ago`}
      </LabelSmall>
      {isLoading && <Skeleton animation height="34px" width="200px" />}
      {blockNumber && <Tag closeable={false}>#{blockNumber}</Tag>}
    </Block>
  )
}

export default UpdateInfo
