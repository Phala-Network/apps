import {Block} from 'baseui/block'
import {Card} from 'baseui/card'
import {HeadingMedium} from 'baseui/typography'
import Helmet from 'react-helmet'
import CreatePoolButton from '../components/CreatePoolButton'
import StakePoolTableV2 from '../components/StakePoolTableV2'
import StatusBarV2 from '../components/StatusBarV2'

export const MiningV2 = (): JSX.Element => {
  return (
    <Block>
      <Helmet>
        <title>Mining</title>
      </Helmet>
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
        <Block
          marginBottom="scale400"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <HeadingMedium as="div">Stake Pool</HeadingMedium>
          <CreatePoolButton />
        </Block>
        <StakePoolTableV2 kind="mining" />
      </Card>
    </Block>
  )
}