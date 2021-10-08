import {useCallback, useEffect, useState} from 'react'
import {down} from 'styled-breakpoints'
import styled, {createGlobalStyle} from 'styled-components'
import {BlackCard, Info} from './components'
import {BlockRewardChart} from './components/BlockRewardChart'
import {BlockWorkerChart} from './components/BlockWorkerChart'

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
  date: string
  onlineWorkers: number
  reward: number
  vCPU: number
  workers: number
}[]

export const AppAnalytics = () => {
  const [, setAnalyticsData] = useState<AnalyticsData>([])
  const getData = useCallback(async function getData() {
    const response = await fetch(
      'https://app-analytics-data.netlify.app/chart/chartData.json'
    )
    const data = await response.json()

    setAnalyticsData(data)
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <>
      <HideBMapIcon></HideBMapIcon>
      <Root>
        <Info></Info>

        <h2>Chart</h2>

        {/* <Charts>
          <BlackCard>
            <h3>Online Worker/Worker</h3>
            <DateWorkerChart data={analyticsData}></DateWorkerChart>
          </BlackCard>
          <BlackCard>
            <h3>Reward/Average Reward</h3>
            <Chart data={analyticsData}></Chart>
          </BlackCard>
        </Charts> */}

        <Charts>
          <BlackCard>
            <h3>Online Worker/Worker</h3>
            <BlockWorkerChart></BlockWorkerChart>
          </BlackCard>
          <BlackCard>
            <h3>Reward/Average Reward</h3>
            <BlockRewardChart></BlockRewardChart>
          </BlackCard>
        </Charts>
      </Root>
    </>
  )
}
