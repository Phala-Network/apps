import {PropsWithChildren} from 'react'
import styled from 'styled-components'

const Label = styled.label`
  display: flex;
  align-items: center;
`

const Controller = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #999;
  width: 20px;
  height: 20px;

  svg {
    width: 10px;
    display: none;
  }
`

const Input = styled.input.attrs({type: 'checkbox'})`
  display: none;

  &:checked + svg {
    display: block;
  }
`

const Text = styled.span`
  margin-left: 5px;
`

type Props = PropsWithChildren<{
  checked?: boolean
  onChange?: (checked: boolean) => void
}>

export const Checkbox = (props: Props): JSX.Element => {
  const {checked, onChange} = props

  return (
    <Label>
      <Controller>
        <Input
          onChange={(e) => onChange?.(e.target.checked)}
          {...(typeof checked === 'boolean' && {checked})}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            d="M1.73 12.91l6.37 6.37L22.79 4.59"
          />
        </svg>
      </Controller>

      <Text>{props.children}</Text>
    </Label>
  )
}
