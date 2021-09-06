import styled from 'styled-components'

export const Wrapper = styled.div<{
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

export const InputWrapper = styled.div<{
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

export const Before = styled.span`
  margin-right: 6px;
`

export const After = styled.span`
  margin-left: 6px;
`
