import styled from 'styled-components'

const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 200px;
  padding: 10px;
  background: #d1ff52;
  border: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  margin-left: 20px;
`

const Account = (): JSX.Element => {
  return <Button>Account</Button>
}

export default Account
