import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {StyledLink} from 'baseui/link'
import {Notification} from 'baseui/notification'
import {FC} from 'react'
import {Info} from 'react-feather'

const MyDelegateNotification: FC = () => {
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
          After you delegate, claim or withdraw, you can go to the{' '}
          <StyledLink
            href="https://khala.subscan.io/"
            target="_blank"
            rel="noreferrer"
          >
            explorer
          </StyledLink>{' '}
          to check whether your transaction has been submitted successfully, or
          refresh this page after waiting for the data to be updated (the last
          update time of the data is in the upper right corner of this page,
          usually every 20 minutes)
        </span>
      </Block>
    </Notification>
  )
}

export default MyDelegateNotification
