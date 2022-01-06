import styled from 'styled-components'
import PhalaApp from '../../../icons/phala_app.svg'

const Wrapper = styled.div`
  padding-left: 4px;
  flex: 1;
`

const Logo: React.FC = () => {
  return (
    <Wrapper>
      <PhalaApp width="96" height="17.75" />
    </Wrapper>
  )
}

export default Logo
