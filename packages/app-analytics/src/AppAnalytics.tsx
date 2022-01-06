import {useCallback, useEffect, useState} from 'react'
import {Helmet} from 'react-helmet'
import {down} from 'styled-breakpoints'
import styled, {createGlobalStyle} from 'styled-components'
import {BlackCard, Chart, Info} from './components'
import {BlockRewardChart} from './components/BlockRewardChart'
import {BlockWorkerChart} from './components/BlockWorkerChart'
import {DateWorkerChart} from './components/DateWorkerChart'

const Root = styled.div`
  width: 100%;
  padding: 48px;
  box-sizing: border-box;

  ${down('md')} {
    padding: 20px 8px;
  }
`

const Title = styled.div`
  font-size: 16px;
  line-height: 50px;
`

const Charts = styled.div`
  display: flex;
  gap: 12px;
  max-width: 960px;

  & > {
    margin-bottom: 80px;
  }

  ${down('lg')} {
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
        <Helmet>
          <title>Analytics</title>
        </Helmet>
        <Info></Info>

        <h2>Chart</h2>

        <Charts>
          <BlackCard>
            <Title>Online Worker/Worker (24h)</Title>
            <DateWorkerChart data={analyticsData}></DateWorkerChart>
          </BlackCard>
          <BlackCard>
            <Title>Reward/Average Reward (24h)</Title>
            <Chart data={analyticsData}></Chart>
          </BlackCard>
        </Charts>
        {blockData.length > 0 && (
          <Charts>
            <BlackCard>
              <Title>Online Worker/Worker (7200block)</Title>
              <BlockWorkerChart blockData={blockData}></BlockWorkerChart>
            </BlackCard>
            <BlackCard>
              <Title>Reward/Average Reward (7200block)</Title>
              <BlockRewardChart blockData={blockData}></BlockRewardChart>
            </BlackCard>
          </Charts>
        )}
      </Root>
    </>
  )
}
