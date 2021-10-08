import ReactECharts from 'echarts-for-react'
import React from 'react'
import {mockData} from './data/mockData'

// const defaultChartOptions = {
//   tooltip: {
//     trigger: 'axis',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     borderColor: 'rgba(255, 255, 255, 0.4)',
//     textStyle: {
//       color: 'white',
//     },
//   },
//   xAxis: {
//     type: 'time',
//     splitLine: {
//       show: true,
//       lineStyle: {
//         opacity: 0.1,
//         type: 'dashed',
//       },
//     },
//     // splitNumber: 20,
//     // axisLabel: {
//     //   formatter(value) {
//     //     const date = new Date(value)

//     //     return [date.getMonth() + 1, date.getDate()].join('.')
//     //   },
//     // },
//   },

//   yAxis: [
//     {
//       type: 'value',
//       name: 'Amount',
//       splitLine: {show: false},
//       axisPointer: {show: false},
//       show: false,
//     },
//     {
//       type: 'value',
//       name: 'PHA',
//       splitLine: {show: false},
//       axisPointer: {show: false},
//       show: false,
//     },
//   ],
// }

export const BlockWorkerChart: React.FC = () => {
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
      data: mockData.map((item) => item.block),
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
        data: mockData.map((item) => item.onlineWorkers),
      },
      {
        name: 'workers',
        type: 'line',
        stack: 'Total',
        itemStyle: {color: '#03FFFF'},
        showSymbol: false,
        data: mockData.map((item) => item.workers),
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
