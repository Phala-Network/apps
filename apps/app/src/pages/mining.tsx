import {Block} from 'baseui/block'
import {Card} from 'baseui/card'
import {HeadingMedium} from 'baseui/typography'
import {FC} from 'react'
import ClaimAll from '../components/ClaimAll'
import CreatePoolButton from '../components/CreatePoolButton'
import Head from '../components/Head'
import StakePoolTableV2 from '../components/StakePoolTableV2'
import StatusBarV2 from '../components/StatusBarV2'
import WorkerTableV2 from '../components/WorkerTableV2'

const Mining: FC = () => {
  return (
    <Block maxWidth="1700px" margin="0 auto" paddingBottom="scale2400">
      <Head title="Mining" />

      <StatusBarV2 />
      <Card overrides={{Root: {style: {borderRadius: '4px', border: 'none'}}}}>
        <Block
          marginBottom="scale400"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap
        >
          <HeadingMedium as="div">Stake Pool</HeadingMedium>
          <Block display="flex" flexWrap>
            <ClaimAll marginRight="scale400" kind="mining" />
            <CreatePoolButton />
          </Block>
        </Block>
        <StakePoolTableV2 kind="mining" />
      </Card>

      <Card
        overrides={{
          Root: {
            style: ({$theme}) => ({
              borderRadius: '4px',
              border: 'none',
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
        <WorkerTableV2 kind="mining" />
      </Card>
    </Block>
  )
}

export default Mining
