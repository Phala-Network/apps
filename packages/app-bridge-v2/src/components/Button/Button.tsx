import {Button as BaseuiButton} from 'baseui/button'
import {ComponentProps, FC} from 'react'
import {buttonOverrides} from '../../style/buttonOverrides'

type ButtonProps = ComponentProps<typeof BaseuiButton>

export const Button: FC<ButtonProps> = (props) => {
  return <BaseuiButton overrides={buttonOverrides} {...props} />
}
