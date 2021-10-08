import ReactECharts from 'echarts-for-react'
import React from 'react'
import {AnalyticsData} from '../AppAnalytics'

export const BlockWorkerChart: React.FC<{blockData: AnalyticsData}> = (
  props
) => {
  const {blockData} = props

  const chartOptions = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderColor: 'rgba(255, 255, 255, 0.4)',
      textStyle: {
        color: 'white',
      },
    },
    grid: [
      {
        left: '20px',
        right: '20px',
        bottom: '20px',
        top: '20px',
      },
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: blockData.map((item) => item.block),
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        name: 'onlineWorkers',
        type: 'line',
        stack: 'Total',
        itemStyle: {color: '#bae445'},
        showSymbol: false,
        data: blockData.map((item) => item.onlineWorkers),
      },
      {
        name: 'workers',
        type: 'line',
        stack: 'Total',
        itemStyle: {color: '#03FFFF'},
        showSymbol: false,
        data: blockData.map((item) => item.workers),
      },
    ],
  }

  return (
    <ReactECharts
      opts={{locale: 'en'}}
      option={chartOptions}
      style={{
        backgroundColor: 'white',
        height: 'auto',
        minHeight: '300px',
        flex: 1,
        width: '100%',
        margin: '0 auto 0',
      }}
    />
  )
}
