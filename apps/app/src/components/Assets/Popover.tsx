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
            outline: `1px #aad829 solid`,
            backgroundColor: '#aad829',
          },
        },
        Body: {
          style: {
            outline: `1px #aad829 solid`,
            backgroundColor: '#eeeeee',
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
            style: () => ({
              padding: 0,
              ':hover': {
                backgroundColor: '#D1FF52',
              },
            }),
          },
        }}
      >
        <MoreIcon />
      </Button>
    </StatefulPopover>
  )
}

export default Popover
