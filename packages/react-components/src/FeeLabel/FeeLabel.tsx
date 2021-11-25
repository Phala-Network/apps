import {ComponentPropsWithoutRef, FC} from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  font-size: 14px;
`

const Label = styled.span`
  font-weight: bold;
  margin-right: 5px;
  display: block;
`

export type FeeLabelProps = ComponentPropsWithoutRef<typeof Root> & {
  fee: string
  label?: string
}

export const FeeLabel: FC<FeeLabelProps> = (props) => {
  const {children, label, fee} = props

  return (
    <Root {...props}>
      <Label>{label}:</Label> {fee}
      {children}
    </Root>
  )
}
