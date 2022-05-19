import {Button, ButtonProps} from 'baseui/button'
import {FC} from 'react'
import {Settings} from 'react-feather'

const SettingButton: FC<Pick<ButtonProps, 'onClick'>> = ({onClick}) => {
  return (
    <Button
      kind="tertiary"
      size="mini"
      shape="circle"
      onClick={onClick}
      $style={({$theme}: any) => ({
        color: $theme.colors.contentSecondary,
      })}
    >
      <Settings size={16} />
    </Button>
  )
}

export default SettingButton
