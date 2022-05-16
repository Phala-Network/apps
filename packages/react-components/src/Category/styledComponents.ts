import {down, up} from 'styled-breakpoints'
import styled from 'styled-components'

export const Point = styled.div`
  width: 12px;
  height: 12px;
  background: #202020;
  border: 10px solid #ececec;
  ${down('md')} {
    display: none;
  }
`

export const CategoryWrap = styled.div`
  position: relative;
  padding: 16px 48px 40px 160px;
  ${down('md')} {
    padding: 16px 24px;
  }
`

export const CategoryHeader = styled.div`
  display: flex;
  position: absolute;
  left: -16px;
  top: 0;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  color: #202020;
  ${down('md')} {
    font-size: 14px;
    position: unset;
  }
`

export const Title = styled.div`
  ${up('md')} {
    margin-top: 10px;
  }
`

export const Description = styled.div`
  margin-top: 8px;
  ${down('md')} {
    font-size: 12px;
  }
`

export const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${up('md')} {
    margin-top: -50px;
  }
`
