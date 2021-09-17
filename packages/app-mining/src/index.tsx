import {Helmet} from 'react-helmet'
import styled from 'styled-components'
import StakePoolTable from './components/StakePoolTable'
import WorkerTable from './components/WorkerTable'

const Wrapper = styled.div`
  flex: 1;
  overflow-x: auto;
  margin: 48px 30px;
`

const Block = styled.div`
  background-color: #fff;
  padding: 16px 32px;

  & + & {
    margin-top: 16px;
  }
`

const Mining: React.FC = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Mining</title>
      </Helmet>
      <Block>
        <StakePoolTable />
      </Block>

      <Block>
        <WorkerTable />
      </Block>
    </Wrapper>
  )
}

export default Mining
