import styled from 'styled-components'
import PhalaApp from '../../../icons/phala.svg'

const Wrapper = styled.div`
  padding-left: 4px;
  flex: 1;
  display: flex;
  align-items: center;
`

const Name = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
  margin-left: 6.5px;
`

const Logo: React.FC = () => {
  return (
    <Wrapper>
      <PhalaApp width="65" height="12" />
      <Name>App</Name>
    </Wrapper>
  )
}

export default Logo
