import Decimal from 'decimal.js'
import {useMemo} from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'
import AccountBanner from './components/AccountBanner'
import AssetList from './components/AssetList'
import useTableData from './hooks/tableData/useTableData'

const Wrapper = styled.div``

const Index = () => {
  const tableData = useTableData()

  const totalValue = useMemo(() => {
    const sum = tableData.reduce((prev, curr) => {
      if (curr.value) {
        return prev.add(new Decimal(curr.value))
      }
      return prev.add(new Decimal(0))
    }, new Decimal(0))
    return sum.toString()
  }, [tableData])

  return (
    <Wrapper>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <AccountBanner totalValue={totalValue} />
      <AssetList tableData={tableData} />
    </Wrapper>
  )
}

export default Index
