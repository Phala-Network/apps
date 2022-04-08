import {VFC} from 'react'
import {Notification} from 'baseui/notification'
import {Info} from 'react-feather'
import {Block} from 'baseui/block'
import {useStyletron} from 'baseui'
import {StyledLink} from 'baseui/link'
import {useApiPromise} from '@phala/react-libs'
import {useQuery} from 'react-query'

const GeminiNotification: VFC = () => {
  const [css] = useStyletron()
  const {api, initialized} = useApiPromise()

  const {data} = useQuery(
    ['geminiNotificationCurrentBlock', initialized],
    () => api?.rpc.chain.getBlock(),
    {
      refetchInterval: 20000,
    }
  )

  const blockNumber = data?.block.header.number.toJSON() as number

  return (
    <Notification
      overrides={{
        Body: {
          style: {
            borderRadius: 0,
            backgroundColor: '#f3ffd3',
            width: 'auto',
          },
        },
      }}
    >
      <Block display="flex" alignItems="center">
        <Info size={16} className={css({marginRight: '12px', flex: 'none'})} />
        <span>
          Gemini Tokenomics will launch at block height #1467050,{' '}
          {blockNumber && `${Math.max(1467050 - blockNumber, 0)} blocks left, `}
          it is estimated to be April 8.{' '}
          <StyledLink
            href="https://medium.com/phala-network/must-read-before-gemini-upgrade-580e0ea4b56b"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </StyledLink>
        </span>
      </Block>
    </Notification>
  )
}

export default GeminiNotification
