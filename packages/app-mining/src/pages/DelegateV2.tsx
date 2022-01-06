import {Helmet} from 'react-helmet'
import {Card} from 'baseui/card'
import DelegateBanner from '../components/DelegateBanner'
import StakePoolTableV2 from '../components/StakePoolTableV2'
import StatusBar from '../components/StatusBarV2'
import {Block} from 'baseui/block'

export const DelegateV2 = (): JSX.Element => {
  return (
    <Block>
      <Helmet>
        <title>Delegate</title>
      </Helmet>

      <StatusBar />

      <Card
        overrides={{
          Root: {
            style: ({$theme}) => ({
              borderRadius: '0',
              border: 'none',
              boxShadow: $theme.lighting.shallowBelow,
            }),
          },
        }}
      >
        <Block marginBottom="scale600">
          <DelegateBanner />
        </Block>
        <StakePoolTableV2 kind="delegate" />
      </Card>
    </Block>
  )
}
