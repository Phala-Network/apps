import {ComponentProps, FC} from 'react'
import styled from 'styled-components'

const Root = styled.div`
  background-color: black;
  padding: 12px;
`

export type BlackCardProps = ComponentProps<typeof Root>

export const BlackCard: FC<BlackCardProps> = (props) => {
  const {children, ...omittedProps} = props

  return <Root {...omittedProps}>{children}</Root>
}
