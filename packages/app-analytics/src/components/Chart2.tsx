import ReactECharts from 'echarts-for-react'
import React, {useEffect, useMemo} from 'react'

export const Chart2: React.FC = () => {
  const [campaignData, setCampaignData] = React.useState<any>({})

  useEffect(() => {
    fetch('https://crowdloan-api.phala.network/campaigns/1')
      .then((response) => response.json())
      .then((res) => {
        setCampaignData(res)
      })
  }, [])

  const contributionChart = useMemo(
    () => campaignData?.meta?.contribution_chart || [],
    [campaignData?.meta?.contribution_chart]
  )

  const chartOptions = React.useMemo(() => {
    if (!contributionChart || contributionChart.length === 0) {
      return {}
    }

    let [, maxValue] = contributionChart[contributionChart.length - 1]
    maxValue = maxValue > 30000 ? maxValue : 30000

    return {
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
          top: '5px',
          right: '45px',
          left: '0px',
          bottom: '24px',
        },
      ],
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
      yAxis: [
        {
          show: true,
          splitLine: {
            show: true,
            lineStyle: {
              opacity: 0.1,
              type: 'dashed',
            },
          },
          axisLabel: {
            formatter(value: number) {
              if (value === 30000) {
                return '\n30,000\n1:150'
              } else if (value === 0) {
                return '1:120'
              } else {
                return ''
              }
            },
          },
          max: maxValue,
          position: 'right',
          name: 'PHA',
          interval: 30000,
          type: 'value',
        },
      ],
      series: [
        {
          yAxisIndex: 0,
          name: 'PHA',
          type: 'line',
          itemStyle: {color: '#03FFFF'},
          showSymbol: false,
          data: contributionChart,
          markLine: {
            silent: true,
            label: {
              color: 'rgba(255, 255, 255, 0.4)',
              borderWidth: 0,
              formatter: () => '',
            },
            symbol: ['none', 'none'],
            data: [
              {
                yAxis: 30000,
              },
            ],
          },
        },
      ],
    }
  }, [contributionChart])

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
