import styled from 'styled-components'
import {down} from 'styled-breakpoints'
import PhalaApp from '../../icons/phala_app.svg'

const Wrapper = styled.div`
  width: 146px;
  margin-right: 19px;

  ${down('lg')} {
    width: 96px;
    svg {
      width: 96px;
      height: auto;
    }
  }
`

const Logo: React.FC = () => {
  return (
    <Wrapper>
      <PhalaApp />
    </Wrapper>
  )
}

export default Logo
