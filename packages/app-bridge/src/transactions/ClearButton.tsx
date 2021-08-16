import styled from 'styled-components'

const ClearButton = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  color: #000000;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;

  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 50px;

  position: absolute;
  right: 30px;
  top: 8px;

  cursor: pointer;

  &:hover {
    background-color: #e9e9e9;
  }
`

export default ClearButton
