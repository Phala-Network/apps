import styled from 'styled-components'
import AccountBanner from './components/AccountBanner'
import AssetList from './components/AssetList'

const Wrapper = styled.div``

const Index = () => {
  return (
    <Wrapper>
      <AccountBanner />
      <AssetList />
    </Wrapper>
  )
}

export default Index
