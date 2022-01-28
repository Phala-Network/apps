import {useMemo} from 'react'
import {DataType} from '../../components/AssetList/index'
import useKPhaData from './useKPhaData'
import useBNCData from './useBNCData'
// import useZLKData from './useZLKData'

const useTableData = (): DataType[] => {
  const kphaData = useKPhaData()
  const BNCData = useBNCData()
  // const ZLKData = useZLKData()

  const tableData: DataType[] = useMemo(() => {
    let res: DataType[] = []
    if (kphaData.value !== '') res = [...res, kphaData]
    if (BNCData.value !== '') res = [...res, BNCData]
    // if (ZLKData.value !== '') res = [...res, ZLKData]
    return res
  }, [kphaData, BNCData])

  return tableData
}

export default useTableData
