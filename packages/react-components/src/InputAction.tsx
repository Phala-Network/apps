import styled from 'styled-components'

export default styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  border: none;
  height: 26px;
  line-height: 26px;
  background: #ffffff;
  border-radius: 50px;
  cursor: pointer;
  color: #202020;

  &:hover {
    background: ${(props) => props.theme.colors.phala};
  }

  &:active {
    opacity: 0.8;
  }
`
