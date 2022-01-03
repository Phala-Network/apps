import {Button} from 'baseui/button'
import {ExtraInfoPanel} from './ExtraInfoPanel'
import {Header} from './Header'
import {Root} from './styledComponents'
import {TransferPanel} from './TransferPanel'

export const BridgePage = () => {
  return (
    <div style={{padding: 20, margin: 20, flex: 1}}>
      <Root
        style={{
          width: 672,
          margin: '0 auto',
        }}
      >
        <Header />

        <TransferPanel />

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

        <Button>Done</Button>
      </Root>
    </div>
  )
}
