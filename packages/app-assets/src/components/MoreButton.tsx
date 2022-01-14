import {Button, KIND} from 'baseui/button'
import {MoreIcon} from './Icons/MoreIcon'

const MoreButton: React.FC = () => {
  return (
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
  )
}

export default MoreButton
