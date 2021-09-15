import {Helmet} from 'react-helmet'
import styled from 'styled-components'
import MainTable from '../components/MainTable'
import Banner from '../components/Banner'

const Wrapper = styled.div`
  overflow-x: auto;
  margin: 30px;
  flex: 1;
`

const Block = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #fff;
`

const Delegate = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Delegate</title>
      </Helmet>

      <Wrapper>
        <Banner></Banner>

        <Block>
          <MainTable></MainTable>
        </Block>
      </Wrapper>
    </>
  )
}

export {default as MyDelegate} from './MyDelegate'
export default Delegate
