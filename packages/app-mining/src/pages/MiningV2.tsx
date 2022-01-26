import {Block} from 'baseui/block'
import {Card} from 'baseui/card'
import {HeadingMedium} from 'baseui/typography'
import Helmet from 'react-helmet'
import CreatePoolButton from '../components/CreatePoolButton'
import StakePoolTableV2 from '../components/StakePoolTableV2'
import WorkerTableV2 from '../components/WorkerTableV2'
import StatusBarV2 from '../components/StatusBarV2'
import ClaimAll from '../components/ClaimAll'

export const MiningV2 = (): JSX.Element => {
  return (
    <Block
      maxWidth="1700px"
      margin="0 auto"
      paddingLeft="scale650"
      paddingRight="scale650"
      paddingBottom="scale2400"
    >
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
          <Block display="flex">
            <ClaimAll marginRight="scale400" />
            <CreatePoolButton />
          </Block>
        </Block>
        <StakePoolTableV2 kind="mining" />
      </Card>

      <Card
        overrides={{
          Root: {
            style: ({$theme}) => ({
              borderRadius: '0',
              border: 'none',
              boxShadow: $theme.lighting.shallowBelow,
              marginTop: $theme.sizing.scale950,
            }),
          },
        }}
      >
        <Block
          marginBottom="scale400"
          height="scale1200"
          display="flex"
          alignItems="center"
        >
          <HeadingMedium as="div">Worker</HeadingMedium>
        </Block>
        <WorkerTableV2 />
      </Card>
    </Block>
  )
}
