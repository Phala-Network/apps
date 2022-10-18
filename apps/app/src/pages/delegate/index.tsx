import {Block} from 'baseui/block'
import {Card} from 'baseui/card'
// import {useState} from 'react'
import DelegateBanner from '../../components/DelegateBanner'
import Head from '../../components/Head'
import StakePoolTableV2 from '../../components/StakePoolTableV2'
import StatusBar from '../../components/StatusBarV2'

const Delegate = (): JSX.Element => {
  return (
    <Block
      maxWidth="1700px"
      margin="0 auto"
      paddingLeft={[0, 'scale650']}
      paddingRight={[0, 'scale650']}
      paddingBottom="scale2400"
    >
      <Head title="Delegate" />

      <StatusBar />

      <Card
        overrides={{
          Root: {
            style: ({$theme}) => ({
              borderRadius: '4px',
              ...$theme.borders.border200,
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

export default Delegate
