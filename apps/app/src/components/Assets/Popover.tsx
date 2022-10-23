import {Button, KIND} from 'baseui/button'
import {StatefulPopover, StatefulPopoverProps} from 'baseui/popover'
import {MoreVertical} from 'react-feather'

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
        <MoreVertical width={24} height={24} />
      </Button>
    </StatefulPopover>
  )
}

export default Popover
