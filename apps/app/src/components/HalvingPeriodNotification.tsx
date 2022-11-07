import {Block} from 'baseui/block'
import {StyledLink} from 'baseui/link'
import {ParagraphSmall} from 'baseui/typography'
import {addMilliseconds} from 'date-fns'
import {FC, useMemo} from 'react'
import {useGlobalStateQuery} from '../hooks/subsquid'
import {subsquidClient} from '../lib/graphqlClient'

const TARGET_BLOCK_HEIGHT = 2763069

const HalvingPeriodNotification: FC = () => {
  const {data} = useGlobalStateQuery(subsquidClient)
  const {height, averageBlockTime} = data?.globalStateById || {}

  const date = useMemo(() => {
    if (!height || !averageBlockTime) return ''
    const now = new Date()
    return addMilliseconds(
      now,
      (TARGET_BLOCK_HEIGHT - height) * averageBlockTime
    ).toUTCString()
  }, [height, averageBlockTime])

  if (!height || height >= TARGET_BLOCK_HEIGHT) return null
  return (
    <Block
      padding="scale500"
      backgroundColor="#d1ff52"
      display="flex"
      justifyContent="center"
    >
      <ParagraphSmall as="div">
        Phala will enter next halving period on <b>#{TARGET_BLOCK_HEIGHT}</b>{' '}
        Khala Network block height! ETA: <b>{date}</b>
        <StyledLink
          href="https://medium.com/phala-network/1st-halving-period-will-happen-on-2-763-069-khala-block-height-since-gemini-upgrade-cb9bcdf81b49"
          target="_blank"
          $style={{marginLeft: '12px'}}
        >
          Learn More
        </StyledLink>
      </ParagraphSmall>
    </Block>
  )
}

export default HalvingPeriodNotification
