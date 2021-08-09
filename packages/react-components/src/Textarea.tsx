import React, { ComponentProps, useRef } from 'react'
import styled from 'styled-components'
import useClickAway from '../hooks/useClickAway'

const Wrapper = styled.div<{
  active: boolean
}>`
  background: white;
  border-radius: 0;
  display: flex;
  align-items: center;
  padding: 12px;
  background: #ececec;
  border: 3px solid transparent;
  border-color: ${(props) => (props.active ? '#494949' : 'transparent')};

  &:active {
    border-color: #494949;
  }

  textarea {
    font-family: Lato;
    border: none;
    font-size: 20px;
    line-height: 24px;
    background-color: transparent;
    outline: none;
    width: 100%;
    font-weight: bold;
    color: #202020;
    resize: none;

    &::placeholder {
      color: #bbbbbb;
    }
  }
`

type Props = {
  onChange?: (value: string) => void
} & Omit<ComponentProps<'textarea'>, 'onChange'>

const Textarea: React.FC<Props> = (props) => {
  const { onChange, ...otherProps } = props
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
        onBlur={() => setActive(false)}></textarea>
    </Wrapper>
  )
}

export default Textarea
