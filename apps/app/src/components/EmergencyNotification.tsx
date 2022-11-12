import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {StyledLink} from 'baseui/link'
import {ParagraphSmall} from 'baseui/typography'
import {FC} from 'react'

const EmergencyNotification: FC = () => {
  const [, theme] = useStyletron()

  return (
    <Block
      flexDirection="column"
      alignItems="center"
      padding="scale500"
      backgroundColor={theme.colors.warning}
      display="flex"
      justifyContent="center"
    >
      <ParagraphSmall as="div">
        The nodes of some PRB stake pools encountered a critical bug with Kusama
        node which caused database corruption on certain height. The APR of
        these pools are also effected. This is not an isolated case and now it
        has been fixed.{' '}
        <StyledLink
          href="https://discord.com/channels/697726436211163147/891912723447832617/1041040854153957457"
          target="_blank"
        >
          More Detail
        </StyledLink>
      </ParagraphSmall>
      <ParagraphSmall as="div">
        Pool owners can update by the solution above, and for Delegators, It is
        recommended that:
        <b>
          Before your withdrawing, please contact the stake pool owner in time
          to avoid unnecessary withdrawal queues.
        </b>
      </ParagraphSmall>
    </Block>
  )
}

export default EmergencyNotification
