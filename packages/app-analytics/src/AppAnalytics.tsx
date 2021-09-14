import {down} from 'styled-breakpoints'
import styled, {createGlobalStyle} from 'styled-components'
import {BlackCard, Chart, Chart2, Info, Map} from './components'

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

export const AppAnalytics = () => (
  <>
    <HideBMapIcon></HideBMapIcon>
    <Root>
      <Info></Info>

      <h2>Map</h2>

      <Map></Map>

      <h2>Chart</h2>

      <Charts>
        <BlackCard>
          <Chart></Chart>
        </BlackCard>
        <BlackCard>
          <Chart2></Chart2>
        </BlackCard>
      </Charts>
    </Root>
  </>
)
