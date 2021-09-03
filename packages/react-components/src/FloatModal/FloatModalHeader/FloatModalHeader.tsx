import React, {ComponentProps} from 'react'
import styled from 'styled-components'
import {Spacer} from '../../Spacer'
import {ActiveIcon, InactiveIcon} from './icons'

const FloatModalHeaderRoot = styled.div<{active: boolean}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 8px 16px;
  background: ${(props) => (props.active ? 'white' : 'black')};
  color: ${(props) => (props.active ? 'black' : 'white')};
  z-index: 1;
  cursor: pointer;
  width: fit-content;

  &:hover {
    opacity: 0.8;
  }
`

const Title = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
`

type Props = ComponentProps<typeof FloatModalHeaderRoot> & {
  active: boolean
  onClickHeader(): void
}

export const FloatModalHeader: React.FC<Props> = (props) => {
  const {onClickHeader, active, children, ...others} = props

  return (
    <FloatModalHeaderRoot active={active} onClick={onClickHeader} {...others}>
      {active ? <ActiveIcon /> : <InactiveIcon />}

      <Spacer x={0.6}></Spacer>

      <Title>{children}</Title>
    </FloatModalHeaderRoot>
  )
}
