import EChartsReact from 'echarts-for-react'
import React from 'react'
import {AnalyticsData} from '../AppAnalytics'

const formatData = (item: number) => item.toFixed(2)

export const BlockRewardChart: React.FC<{blockData: AnalyticsData}> = (
  props
) => {
  const {blockData} = props
  const data = blockData
    .filter((item) => item.reward > 0)
    .filter((_, index) => index % 2 === 0)
    .map((item, index, items) => {
      if (index === 0) {
        return item
      } else {
        const lastOne = items[index - 1] ?? {
          reward: 0,
        }

        return {
          ...item,
          reward: item.reward - lastOne.reward,
        }
      }
    })

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
        name: 'Reward',
        splitLine: {show: false},
        axisPointer: {show: false},
        show: false,
      },
      {
        type: 'value',
        name: 'AverageReward',
        splitLine: {show: false},
        axisPointer: {show: false},
        show: false,
      },
    ],
    series: [
      {
        name: 'Reward',
        type: 'line',
        itemStyle: {color: '#bae445'},
        showSymbol: false,
        yAxisIndex: 0,
        data: data.map((item) => formatData(item.reward)),
      },
      {
        name: 'AverageReward',
        type: 'line',
        itemStyle: {color: '#03FFFF'},
        showSymbol: false,
        yAxisIndex: 1,
        data: data.map((item) => {
          return formatData(
            item.workers === 0 ? 0 : item.reward / item.onlineWorkers
          )
        }),
      },
    ],
  }

  return (
    <EChartsReact
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
