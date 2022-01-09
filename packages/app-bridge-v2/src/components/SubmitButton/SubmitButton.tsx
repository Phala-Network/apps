import {ComponentProps, FC} from 'react'
import {Button} from '../Button'

interface SubmitButtonProps extends ComponentProps<typeof Button> {
  onSubmit: () => void
}

export const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const {onSubmit} = props

  const onSubmitCheck = () => {
    onSubmit()
  }

  return (
    <Button {...props} onClick={onSubmitCheck}>
      Submit
    </Button>
  )
}
