import {Button as BaseuiButton} from 'baseui/button'
import {ComponentProps, FC} from 'react'

type ButtonProps = ComponentProps<typeof BaseuiButton>

export const Button: FC<ButtonProps> = (props) => {
  return (
    <BaseuiButton
      overrides={{
        BaseButton: {
          style: () => ({
            width: '100%',
            /* Gn 001 */
            backgroundColor: '#D1FF52',
            /* Bk 001 */
            color: '#111111',

            ':hover': {
              backgroundColor: '#dcff7b',
              color: '#111111',
            },
          }),
        },
      }}
      {...props}
    />
  )
}
