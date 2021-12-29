import styled from 'styled-components'
import PhalaApp from '../../icons/phala_app.svg'

const Wrapper = styled.div`
  width: 146px;
  margin-right: 3px;
`

const Logo: React.FC = () => {
  return (
    <Wrapper>
      <PhalaApp />
    </Wrapper>
  )
}

export default Logo
