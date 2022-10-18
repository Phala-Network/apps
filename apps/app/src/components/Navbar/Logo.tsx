import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import PhalaApp from '../../icons/phala_app.svg'

const Wrapper = styled.div`
  width: 146px;

  svg {
    width: 100%;
  }

  ${down('lg')} {
    width: 96px;
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
