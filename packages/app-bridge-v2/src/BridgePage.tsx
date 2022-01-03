import {Button} from 'baseui/button'
import {ExchangeIcon} from './ExchangeIcon'
import {ExtraInfoPanel} from './ExtraInfoPanel'
import {Header} from './Header'
import {BlockItem, Root} from './styledComponents'
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

        <BlockItem>
          <TransferPanel />

          <ExchangeIcon />

          <TransferPanel />
        </BlockItem>

        <BlockItem>
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
        </BlockItem>

        <BlockItem>
          <Button
            overrides={{
              BaseButton: {
                style: () => ({
                  width: '100%',
                }),
              },
            }}
            onClick={() => {
              submit()
            }}
          >
            Submit 2
          </Button>
        </BlockItem>
      </Root>
    </div>
  )
}
