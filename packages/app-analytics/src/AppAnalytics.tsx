import {useCallback, useEffect, useState} from 'react'
import {down} from 'styled-breakpoints'
import styled, {createGlobalStyle} from 'styled-components'
import {BlackCard, Chart, Info} from './components'
import {BlockRewardChart} from './components/BlockRewardChart'
import {BlockWorkerChart} from './components/BlockWorkerChart'
import {DateWorkerChart} from './components/DateWorkerChart'

const Root = styled.div`
  width: 100%;
  margin: 48px;
  box-sizing: border-box;
`

const Charts = styled.div`
  display: flex;
  gap: 12px;
  max-width: 960px;

  & > {
    margin-bottom: 80px;
  }

  ${down('md')} {
    flex-direction: column;
  }
`

const HideBMapIcon = createGlobalStyle`
  .BMap_cpyCtrl,
  .anchorBL {
    display: none;
  }
`

export type AnalyticsData = {
  block: number
  date: string
  onlineWorkers: number
  reward: number
  vCPU: number
  workers: number
}[]

function useData(url: string) {
  const [data, setAnalyticsData] = useState<AnalyticsData>([])
  const getData = useCallback(
    async function getData() {
      const response = await fetch(url)
      const data = await response.json()

      setAnalyticsData(data)
    },
    [url]
  )

  useEffect(() => {
    getData()
  }, [getData])

  return data
}

export const AppAnalytics = () => {
  const blockData = useData(
    'https://app-analytics-data.netlify.app/chart/blockChartData.json'
  )

  const analyticsData = useData(
    'https://app-analytics-data.netlify.app/chart/chartData.json'
  )

  return (
    <>
      <HideBMapIcon></HideBMapIcon>
      <Root>
        <Info></Info>

        <h2>Chart</h2>

        <Charts>
          <BlackCard>
            <h3>Online Worker/Worker (date)</h3>
            <DateWorkerChart data={analyticsData}></DateWorkerChart>
          </BlackCard>
          <BlackCard>
            <h3>Reward/Average Reward (date)</h3>
            <Chart data={analyticsData}></Chart>
          </BlackCard>
        </Charts>

        <Charts>
          <BlackCard>
            <h3>Online Worker/Worker (block)</h3>
            <BlockWorkerChart blockData={blockData}></BlockWorkerChart>
          </BlackCard>
          <BlackCard>
            <h3>Reward/Average Reward (block)</h3>
            <BlockRewardChart blockData={blockData}></BlockRewardChart>
          </BlackCard>
        </Charts>
      </Root>
    </>
  )
}
