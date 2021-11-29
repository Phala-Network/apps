import ReactECharts from 'echarts-for-react'
import React from 'react'
import {AnalyticsData} from '../AppAnalytics'

const defaultChartOptions = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    textStyle: {
      color: 'white',
    },
  },
  xAxis: {
    type: 'time',
    splitLine: {
      show: true,
      lineStyle: {
        opacity: 0.1,
        type: 'dashed',
      },
    },
  },
  grid: [
    {
      left: '0px',
      right: '0px',
      bottom: '20px',
      top: '20px',
    },
  ],
  yAxis: {
    type: 'value',
    show: false,
    min: 0,
  },
  series: [
    {
      name: 'onlineWorkers',
      itemStyle: {color: '#bae445'},
      type: 'line',
      showSymbol: false,
      data: [],
    },
    {
      name: 'workers',
      type: 'line',
      itemStyle: {color: '#03FFFF'},
      showSymbol: false,
      data: [],
    },
  ],
}

export const DateWorkerChart: React.FC<{data: AnalyticsData}> = (props) => {
  const {data} = props
  const data2 = data.filter((item) => item.reward > 0)

  const chartOptions = React.useMemo(() => {
    const formatData = (item: number) => item.toFixed(2)

    return Object.assign({}, defaultChartOptions, {
      series: [
        {
          ...defaultChartOptions.series[1],
          data: data2
            ?.map?.((item) => [
              item.date + 'T00:00:00.000Z',
              formatData(item.workers),
            ])
            .slice(-30),
        },
        {
          ...defaultChartOptions.series[0],
          data: data2
            ?.map?.((item) => [
              item.date + 'T00:00:00.000Z',
              formatData(item.onlineWorkers),
            ])
            .slice(-30),
        },
      ],
    })
  }, [data2])

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
