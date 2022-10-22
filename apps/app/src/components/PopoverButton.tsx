import {Button, ButtonProps} from 'baseui/button'
import {forwardRef} from 'react'
import {MoreHorizontal} from 'react-feather'

const PopoverButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <Button
        kind="tertiary"
        size="mini"
        shape="circle"
        overrides={{Root: {props: {ref}}}}
        {...props}
      >
        <MoreHorizontal />
      </Button>
    )
  }
)

PopoverButton.displayName = 'PopoverButton'

export default PopoverButton
