import {Button} from 'baseui/button'
import {ComponentProps, FC} from 'react'

export const SubmitButton: FC<ComponentProps<typeof Button>> = (props) => {
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
    >
      Submit
    </Button>
  )
}
