import React from 'react'
// import styled from 'styled-components'
import {DataType} from './Table'

const AssetCell: React.FC<DataType> = ({name}) => {
  return <div>{name}</div>
}

export default AssetCell
