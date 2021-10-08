import ReactECharts from 'echarts-for-react'
import React from 'react'
import {mockData} from './data/mockData'

const formatData = (item: number) => item.toFixed(2)

export const BlockRewardChart: React.FC = () => {
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
        name: 'Reward',
        type: 'line',
        itemStyle: {color: '#bae445'},
        showSymbol: false,
        data: mockData.map((item) => formatData(item.reward)),
      },
      {
        name: 'Average Reward',
        type: 'line',
        itemStyle: {color: '#03FFFF'},
        showSymbol: false,
        data: mockData.map((item) =>
          formatData(item.workers === 0 ? 0 : item.reward / item.onlineWorkers)
        ),
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
