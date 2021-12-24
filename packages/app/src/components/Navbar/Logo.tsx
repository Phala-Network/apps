import styled from 'styled-components'
import PhalaApp from '../../icons/phala_app.svg'

const Wrapper = styled.div`
  width: 150px;
  margin-left: 40px;
`

const Logo: React.FC = () => {
  return (
    <Wrapper>
      <PhalaApp />
    </Wrapper>
  )
}

export default Logo
