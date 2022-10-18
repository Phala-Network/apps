import Decimal from 'decimal.js'
import {useMemo} from 'react'
import usePHAData from '../../hooks/usePHAData'
import Head from '../Head'
import AccountBanner from './AccountBanner'
import AssetList, {DataType} from './AssetList'

const Index = () => {
  const phaData = usePHAData()

  const tableData: DataType[] = useMemo(() => {
    return [phaData]
  }, [phaData])

  const totalValue = useMemo<Decimal | null>(() => {
    if (!tableData.length) return null
    const sum = tableData.reduce((prev, curr) => {
      if (curr.value) {
        return prev.add(new Decimal(curr.value))
      }
      return prev.add(new Decimal(0))
    }, new Decimal(0))
    return sum
  }, [tableData])

  return (
    <>
      <Head title="Dashboard" />
      <AccountBanner totalValue={totalValue} />
      <AssetList tableData={tableData} />
    </>
  )
}

export default Index
