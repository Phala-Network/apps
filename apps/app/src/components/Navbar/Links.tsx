import {Link} from 'gatsby'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import {useCurrentNetworkNode} from '../../store/networkNode'

const Wrapper = styled.div`
  display: flex;

  ${down('sm')} {
    display: none;
  }

  a {
    font-family: Montserrat;
    font-style: normal;
    font-size: 16px;
    line-height: 16px;
    color: #111111;
    text-decoration: none;
    margin-left: 28px;

    &:hover,
    &.active {
      color: #aad829;
    }

    ${down('lg')} {
      font-size: 14px;
      line-height: 14px;
      margin-left: 20px;
    }

    ${down('md')} {
      margin-left: 14px;
    }
  }
`

const Links: React.FC = () => {
  const [currentNetworkNode] = useCurrentNetworkNode()
  return (
    <Wrapper>
      <Link to="/">Dashboard</Link>
      <a href="https://subbridge.io" target="_blank" rel="noreferrer">
        SubBridge
      </a>
      {currentNetworkNode.id !== 'phala-rewards-demo' && (
        <>
          <Link to="/delegate/" partiallyActive>
            Delegate
          </Link>
          <Link to="/mining/" partiallyActive>
            Mining
          </Link>
        </>
      )}
    </Wrapper>
  )
}

export default Links
