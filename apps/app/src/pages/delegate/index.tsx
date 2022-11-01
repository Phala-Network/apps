import {Block} from 'baseui/block'
import {Card} from 'baseui/card'
import {FC} from 'react'
import DelegateBanner from '../../components/DelegateBanner'
import Head from '../../components/Head'
import StakePoolTableV2 from '../../components/StakePoolTableV2'

const Delegate: FC = () => {
  return (
    <Block maxWidth="1700px" margin="16px auto 0" paddingBottom="scale2400">
      <Head title="Delegate" />

      <Card overrides={{Root: {style: {borderRadius: 0, border: 'none'}}}}>
        <Block marginBottom="scale600">
          <DelegateBanner />
        </Block>
        <StakePoolTableV2 kind="delegate" />
      </Card>
    </Block>
  )
}

export default Delegate
