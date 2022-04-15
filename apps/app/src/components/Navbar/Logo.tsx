import styled from 'styled-components'
import {down} from 'styled-breakpoints'
import PhalaApp from '../../icons/phala_app.svg'

const Wrapper = styled.div`
  width: 146px;
  margin-right: 24px;

  svg {
    width: 100%;
  }

  ${down('lg')} {
    width: 96px;
    margin-right: 0;
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
