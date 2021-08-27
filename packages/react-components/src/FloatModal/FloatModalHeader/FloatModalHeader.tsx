import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import Spacer from '../../Spacer'
import { ActiveIcon, InactiveIcon } from './icons'

/* #region  style */
const FloatModalHeaderRoot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 8px 16px;
  background: #ffffff;
  z-index: 1;
  cursor: pointer;
  width: fit-content;

  &:hover {
    opacity: 0.8;
  }
`

const Title = styled.div`
  color: #000000;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
`
/* #endregion */

/* #region  props */
type Props = ComponentProps<typeof FloatModalHeaderRoot> & {
  active: boolean
  onClickHeader(): void
}
/* #endregion */

export const FloatModalHeader: React.FC<Props> = (props) => {
  const { onClickHeader, active, children, ...others } = props

  return (
    <FloatModalHeaderRoot onClick={onClickHeader} {...others}>
      {active ? <ActiveIcon /> : <InactiveIcon />}

      <Spacer x={0.6}></Spacer>

      <Title>{children}</Title>
    </FloatModalHeaderRoot>
  )
}
