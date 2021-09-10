import React from 'react'
import {ButtonWrap, Loading} from './styledComponents'

export type ButtonProps = {
  type?: 'normal' | 'primary' | 'plain'
  shape?: 'round' | 'circle'
  size?: 'normal' | 'small'
  loading?: boolean
  disabled?: boolean
}

type Props = ButtonProps & React.ComponentProps<typeof ButtonWrap>

export const Button: React.FC<Props> = (props) => {
  const {
    loading = false,
    children,
    type = 'normal',
    shape,
    disabled,
    ...others
  } = props

  return (
    <ButtonWrap
      type={type}
      disabled={loading || disabled}
      shape={shape}
      {...others}
    >
      {children}

      {loading && <Loading></Loading>}
    </ButtonWrap>
  )
}
