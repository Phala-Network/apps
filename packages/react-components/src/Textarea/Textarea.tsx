import {useClickAway} from '@phala/react-hooks'
import React, {ComponentProps, useRef} from 'react'
import {Wrapper} from './styledComponents'

type Props = {
  onChange?: (value: string) => void
} & Omit<ComponentProps<'textarea'>, 'onChange'>

export const Textarea: React.FC<Props> = (props) => {
  const {onChange, ...otherProps} = props
  const [active, setActive] = React.useState(false)
  const ref = useRef<HTMLTextAreaElement>(null)

  useClickAway(ref, () => {
    setActive(false)
  })

  return (
    <Wrapper active={active}>
      <textarea
        {...otherProps}
        onChange={(e) => onChange?.(e.target.value)}
        ref={ref}
        onClick={() => setActive(true)}
        onBlur={() => setActive(false)}
      ></textarea>
    </Wrapper>
  )
}
