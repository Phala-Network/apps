import styled from 'styled-components'
import {BlackCard, Chart, Chart2} from './components'

const Root = styled.div`
  width: 100%;
  margin: 30px;
  box-sizing: border-box;
`

export const AppAnalytics = () => {
  return (
    <Root>
      <h2>Chart</h2>

      <div style={{display: 'flex', gap: 12}}>
        <BlackCard>
          <Chart></Chart>
        </BlackCard>
        <BlackCard>
          <Chart2></Chart2>
        </BlackCard>
      </div>
    </Root>
  )
}
