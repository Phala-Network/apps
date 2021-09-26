import ReactECharts from 'echarts-for-react'
import React, {useEffect} from 'react'

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
    splitNumber: 20,
    // axisLabel: {
    //   formatter(value) {
    //     const date = new Date(value)

    //     return [date.getMonth() + 1, date.getDate()].join('.')
    //   },
    // },
  },
  grid: [
    {
      left: '0px',
      right: '0px',
      bottom: '20px',
      top: '20px',
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Amount',
      splitLine: {show: false},
      axisPointer: {show: false},
      show: false,
    },
    {
      type: 'value',
      name: 'PHA',
      splitLine: {show: false},
      axisPointer: {show: false},
      show: false,
    },
  ],
  series: [
    {
      name: 'KSM',
      type: 'line',
      itemStyle: {color: '#eb5757'},
      showSymbol: false,
      yAxisIndex: 0,
      data: [],
    },
    {
      name: 'PHA',
      type: 'line',
      itemStyle: {color: '#03FFFF'},
      showSymbol: false,
      yAxisIndex: 1,
      data: [],
    },
  ],
}

export const Chart2: React.FC = () => {
  const [PHA, setPHA] = React.useState<any>({})
  const [KSM, setKSM] = React.useState<any>({})

  useEffect(() => {
    fetch('https://crowdloan-api.phala.network/coin_market_charts/PHA')
      .then((response) => response.json())
      .then((res) => {
        setPHA(res)
      })
  }, [])

  useEffect(() => {
    fetch('https://crowdloan-api.phala.network/coin_market_charts/KSM')
      .then((response) => response.json())
      .then((res) => {
        setKSM(res)
      })
  }, [])

  const chartOptions = React.useMemo(() => {
    const formatData = (item: [string, number]) => [item[0], item[1].toFixed(2)]

    return Object.assign({}, defaultChartOptions, {
      series: [
        {
          ...defaultChartOptions.series[0],
          data: KSM?.data?.map?.(formatData),
        },
        {
          ...defaultChartOptions.series[1],
          data: PHA?.data?.map?.(formatData),
        },
      ],
    })
  }, [PHA, KSM])

  return (
    <ReactECharts
      opts={{locale: 'en'}}
      option={chartOptions}
      style={{
        backgroundColor: 'black',
        height: 'auto',
        minHeight: '300px',
        flex: 1,
        width: '100%',
        margin: '0 auto 0',
      }}
    />
  )
}
