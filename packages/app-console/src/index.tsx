import {Helmet} from 'react-helmet'
import styled from 'styled-components'
import StakePoolTable from './components/StakePoolTable'
import WorkerTable from './components/WorkerTable'

const Wrapper = styled.div`
  font-family: Lato;
  flex: 1;
  overflow-x: auto;
  margin: 0 30px;
`

const Block = styled.div`
  background-color: #fff;
  padding: 30px;
  margin: 40px 0;
`

const Console: React.FC = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Console</title>
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

export default Console
