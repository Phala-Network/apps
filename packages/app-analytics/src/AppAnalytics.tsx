import styled from 'styled-components'
import {BlackCard} from './components/BlackCard'
import Chart from './components/Chart'

const Root = styled.div`
  width: 100%;
  margin: 30px;
  box-sizing: border-box;
`

export const AppAnalytics = () => {
  return (
    <Root>
      <h2>Chart</h2>
      <BlackCard>
        <Chart></Chart>
      </BlackCard>
    </Root>
  )
}
