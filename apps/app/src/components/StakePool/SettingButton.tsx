import {useStyletron} from 'baseui'
import {Button, ButtonProps} from 'baseui/button'
import {FC} from 'react'
import {Settings} from 'react-feather'

const SettingButton: FC<Pick<ButtonProps, 'onClick'>> = ({onClick}) => {
  const [, theme] = useStyletron()
  return (
    <Button
      disabled
      kind="tertiary"
      size="mini"
      shape="circle"
      onClick={onClick}
      color={theme.colors.contentSecondary}
    >
      <Settings size={16} />
    </Button>
  )
}

export default SettingButton
