import Decimal from 'decimal.js'
import {useMemo} from 'react'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'
import AccountBanner from './AccountBanner'
import AssetList, {DataType} from './AssetList'
import useKPhaData from '../../hooks/useKPhaData'

const Wrapper = styled.div``

const Index = () => {
  const kphaData = useKPhaData()

  const tableData: DataType[] = useMemo(() => {
    if (kphaData.value !== '') return [kphaData]
    return []
  }, [kphaData])

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
