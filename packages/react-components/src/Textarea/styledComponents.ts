import styled from 'styled-components'

export const Wrapper = styled.div<{
  active: boolean
}>`
  background: white;
  border-radius: 0;
  display: flex;
  align-items: center;
  padding: 12px;
  background: #ececec;
  border: 3px solid transparent;
  border-color: ${(props) => (props.active ? '#494949' : 'transparent')};

  &:active {
    border-color: #494949;
  }

  textarea {
    font-family: Lato;
    border: none;
    font-size: 20px;
    line-height: 24px;
    background-color: transparent;
    outline: none;
    width: 100%;
    font-weight: bold;
    color: #202020;
    resize: none;

    &::placeholder {
      color: #bbbbbb;
    }
  }
`
