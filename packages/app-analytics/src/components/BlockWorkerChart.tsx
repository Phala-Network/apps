import ReactECharts from 'echarts-for-react'
import React from 'react'
import {AnalyticsData} from '../AppAnalytics'

export const BlockWorkerChart: React.FC<{blockData: AnalyticsData}> = (
  props
) => {
  const {blockData} = props
  const data = blockData.filter((_, index) => index % 2 === 0)

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
      data: data.map((item) => item.block),
    },
    yAxis: [
      {
        type: 'value',
        name: 'OnlineWorkers',
        splitLine: {show: false},
        axisPointer: {show: false},
        show: false,
      },
      {
        type: 'value',
        name: 'Workers',
        splitLine: {show: false},
        axisPointer: {show: false},
        show: false,
      },
    ],
    series: [
      {
        name: 'OnlineWorkers',
        type: 'line',
        itemStyle: {color: '#bae445'},
        showSymbol: false,
        yAxisIndex: 0,
        data: data.map((item) => item.onlineWorkers),
      },
      {
        name: 'Workers',
        type: 'line',
        itemStyle: {color: '#03FFFF'},
        showSymbol: false,
        yAxisIndex: 1,
        data: data.map((item) => item.workers),
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
