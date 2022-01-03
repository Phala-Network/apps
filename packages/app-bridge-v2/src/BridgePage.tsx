import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {ExchangeIcon} from './ExchangeIcon'
import {ExtraInfoPanel} from './ExtraInfoPanel'
import {Header} from './Header'
import {Root} from './styledComponents'
import {TransferPanel} from './TransferPanel'

export const BridgePage = () => {
  const submit = () => {
    return
  }

  return (
    <div style={{padding: 20, margin: 20, flex: 1}}>
      <Root
        style={{
          width: 672,
          margin: '0 auto',
        }}
      >
        <Header />

        <Block marginTop={['20px']}>
          <TransferPanel />

          <ExchangeIcon />

          <TransferPanel />
        </Block>

        <ExtraInfoPanel
          infos={[
            {label: 'Bridge Fee', value: '375 PHA'},
            {label: 'Transaction Fee', value: '0.002123 PHA'},
            {
              label: 'Estimated time',
              value: '30mins',
            },
          ]}
        />

        <Block marginTop={['20px']}>
          <Button
            onClick={() => {
              submit()
            }}
          >
            Submit 2
          </Button>
        </Block>
      </Root>
    </div>
  )
}
