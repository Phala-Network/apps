import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
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
        The nodes of some PRB stake pools are affected by unknown reasons and
        cannot operate normally. The APR of these pools are also effected. This
        is not an isolated case, our developers are fixing it.
      </ParagraphSmall>
      <ParagraphSmall as="div">
        <b>
          It is recommended that: before your withdrawing, please contact the
          stake pool owner in time to avoid unnecessary withdrawal queues.
        </b>
      </ParagraphSmall>
    </Block>
  )
}

export default EmergencyNotification
