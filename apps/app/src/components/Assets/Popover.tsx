import {Button, KIND} from 'baseui/button'
import {StatefulPopover, StatefulPopoverProps} from 'baseui/popover'
import MoreIcon from './Icons/MoreIcon.svg'

const Popover: React.FC<Pick<StatefulPopoverProps, 'content'>> = (props) => {
  return (
    <StatefulPopover
      showArrow
      overrides={{
        Arrow: {
          style: {
            border: `1px #aad829 solid`,
          },
        },
        Body: {
          style: {
            border: `1px #aad829 solid`,
            boxShadow: 'none',
          },
        },
      }}
      {...props}
    >
      <Button
        kind={KIND.tertiary}
        overrides={{
          BaseButton: {
            style: () => ({padding: 0}),
          },
        }}
      >
        <MoreIcon />
      </Button>
    </StatefulPopover>
  )
}

export default Popover
