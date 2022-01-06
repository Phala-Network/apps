import {Block} from 'baseui/block'
import {Card} from 'baseui/card'
import {HeadingMedium} from 'baseui/typography'
import StakePoolTableV2 from '../components/StakePoolTableV2'
import StatusBarV2 from '../components/StatusBarV2'

export const MiningV2 = (): JSX.Element => {
  return (
    <Block>
      <StatusBarV2 />
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
        <Block marginBottom="scale400">
          <HeadingMedium as="div">StakePool</HeadingMedium>
        </Block>
        <StakePoolTableV2 kind="mining" />
      </Card>
    </Block>
  )
}
