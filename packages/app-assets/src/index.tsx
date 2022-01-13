import {useMemo} from 'react'
import styled from 'styled-components'
import AccountBanner from './components/AccountBanner'
import AssetList, {DataType} from './components/AssetList'
import useKPhaData from './hooks/useKPhaData'

const Wrapper = styled.div``

const Index = () => {
  const kphaData = useKPhaData()

  const tableData: DataType[] = useMemo(() => {
    return [kphaData]
  }, [kphaData])

  return (
    <Wrapper>
      <AccountBanner totalValue={'1.34'} />
      <AssetList tableData={tableData} />
    </Wrapper>
  )
}

export default Index
