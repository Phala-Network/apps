import RcInputNumber from 'rc-input-number'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import useClickAway from '../hooks/useClickAway'

type InputType = {
  type?: 'text' | 'number'
  size?: 'default' | 'large'
  textAlign?: 'left' | 'right'
  before?: React.ReactNode
  after?: React.ReactNode
  width?: number
  placeholder?: string
  onChange?: (value: string) => void
}

export type InputProps = React.ComponentProps<typeof InputWrapper> & InputType

const Wrapper = styled.div<{
  height: number
  fontSize: number
  active: boolean
}>`
  background: white;
  border-radius: 0;
  color: #494949;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  font-family: Lato;
  display: flex;
  align-items: center;
  padding: 0 12px;
  line-height: ${(props) => props.height}px;
  height: ${(props) => props.height}px;
  font-size: ${(props) => props.fontSize}px;
  background: #ececec;
  border: 3px solid transparent;
  border-color: ${(props) => (props.active ? '#494949' : 'transparent')};

  &:active {
    border-color: #494949;
  }
`

const InputWrapper = styled.div<{
  height: number
  width: number
  textAlign: 'left' | 'right'
}>`
  width: ${(props) => props.width}px;
  flex: 1;

  & input {
    font-size: 16px;
    font-weight: 600;
    background: transparent;
    border: none;
    font-size: 20px;
    font-family: Lato;
    line-height: 24px;
    outline: none;
    text-align: ${(props) => props.textAlign};
    margin: 0;
    width: 100%;
    color: #202020;

    &::placeholder {
      color: #bbbbbb;
    }
  }
`

const Before = styled.span`
  margin-right: 6px;
`

const After = styled.span`
  margin-left: 6px;
`

const Input: React.FC<InputProps> = (props) => {
  const {
    size,
    width = 60,
    textAlign = 'left',
    type = 'text',
    onChange = () => null,
    ...others
  } = props

  const height = React.useMemo(() => size, [size]) === 'large' ? 56 : 28
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

export default Input
