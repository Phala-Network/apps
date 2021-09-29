import {useCallback, useEffect, useState} from 'react'
import {down} from 'styled-breakpoints'
import styled, {createGlobalStyle} from 'styled-components'
import {BlackCard, Chart, Chart2, Info} from './components'

const Root = styled.div`
  width: 100%;
  margin: 30px;
  box-sizing: border-box;
`

const Charts = styled.div`
  display: flex;
  gap: 12px;

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
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>([])
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

        <Charts>
          <BlackCard>
            <Chart2 data={analyticsData}></Chart2>
          </BlackCard>
          <BlackCard>
            <Chart data={analyticsData}></Chart>
          </BlackCard>
        </Charts>
      </Root>
    </>
  )
}
