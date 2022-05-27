import {Block} from 'baseui/block'
import {Card} from 'baseui/card'
// import {useState} from 'react'
import {Helmet} from 'react-helmet'
import DelegateBanner from '../components/DelegateBanner'
import StakePoolTableV2 from '../components/StakePoolTableV2'
import StatusBar from '../components/StatusBarV2'

export const DelegateV2 = (): JSX.Element => {
  return (
    <Block
      maxWidth="1700px"
      margin="0 auto"
      paddingLeft={[0, 'scale650']}
      paddingRight={[0, 'scale650']}
      paddingBottom="scale2400"
    >
      <Helmet>
        <title>Delegate</title>
      </Helmet>

      <StatusBar />

      <Card
        overrides={{
          Root: {
            style: ({$theme}) => ({
              borderRadius: '0',
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
