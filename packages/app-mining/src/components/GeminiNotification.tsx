import {VFC} from 'react'
import {Notification} from 'baseui/notification'
import {Info} from 'react-feather'
import {Block} from 'baseui/block'
import {useStyletron} from 'baseui'
import {StyledLink} from 'baseui/link'

const GeminiNotification: VFC = () => {
  const [css] = useStyletron()
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
          Gemini Tokenomics will launch at block height #1467000, it is
          estimated to be April 8.{' '}
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
