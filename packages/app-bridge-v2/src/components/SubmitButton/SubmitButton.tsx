import {Button} from 'baseui/button'
import {ComponentProps, FC} from 'react'

interface SubmitButtonProps extends ComponentProps<typeof Button> {
  onSubmit: () => void
}

export const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const {onSubmit} = props

  const onSubmitCheck = () => {
    onSubmit()
  }

  return (
    <Button
      overrides={{
        BaseButton: {
          style: () => ({
            width: '100%',
            /* Gn 001 */
            background: '#D1FF52',
            /* Bk 001 */
            color: '#111111',
          }),
        },
      }}
      {...props}
      onClick={onSubmitCheck}
    >
      Submit
    </Button>
  )
}
