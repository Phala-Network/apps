import styled from 'styled-components'
import PhalaApp from '../../../icons/phala_app.svg'

const Wrapper = styled.div`
  padding-left: 4px;
  flex: 1;
  display: flex;
  align-items: center;
`

const Logo: React.FC = () => {
  return (
    <Wrapper>
      <PhalaApp width="115" height="21" />
    </Wrapper>
  )
}

export default Logo
