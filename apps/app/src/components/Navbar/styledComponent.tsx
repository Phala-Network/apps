import styled from 'styled-components'

export const LineWrap = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 48px;
  padding: 16px 23px 16px 21px;
  font-size: 16px;
  line-height: 16px;
  color: #111111;

  :not(:last-of-type) {
    border-bottom: 1px solid #cecece;
  }
`
