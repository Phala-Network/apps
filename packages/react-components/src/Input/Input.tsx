import {useClickAway} from '@phala/react-hooks'
import RcInputNumber from 'rc-input-number'
import React, {useRef, useState} from 'react'
import {After, Before, InputWrapper, Wrapper} from './styledComponents'

type InputType = {
  type?: 'text' | 'number'
  size?: 'default' | 'large'
  textAlign?: 'left' | 'right'
  before?: React.ReactNode
  after?: React.ReactNode
  width?: number
  height?: number
  placeholder?: string
  onChange?: (value: string) => void
}

export type InputProps = React.ComponentProps<typeof InputWrapper> & InputType

export const Input: React.FC<InputProps> = (props) => {
  const {
    size,
    width = 60,
    height: heightProp,
    textAlign = 'left',
    type = 'text',
    onChange = () => null,
    ...others
  } = props

  const height = heightProp || (size === 'large' ? 56 : 28)
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useClickAway(ref, () => {
    setActive(false)
  })

  const fontSize = React.useMemo(() => size, [size]) === 'large' ? 25 : 18

  return (
    <Wrapper active={active} ref={ref} height={height} fontSize={fontSize}>
      {props.before && <Before>{props.before}</Before>}
      <InputWrapper height={height} width={width} textAlign={textAlign}>
        {type === 'text' && (
          <input
            type="text"
            onClick={() => setActive(true)}
            onBlur={() => setActive(false)}
            onChange={(e) => onChange(e.target.value)}
            {...others}
          />
        )}

        {type === 'number' && (
          <RcInputNumber
            upHandler={null}
            downHandler={null}
            onClick={() => setActive(true)}
            onBlur={() => setActive(false)}
            onChange={onChange}
            {...others}
          />
        )}
      </InputWrapper>
      {props.after && <After>{props.after}</After>}
    </Wrapper>
  )
}
