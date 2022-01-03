import {useState} from 'react'
import {ExchangeIcon} from './ExchangeIcon'
import {ExtraInfoPanel} from './ExtraInfoPanel'
import {Header} from './Header'
import {BlockItem, Root} from './styledComponents'
import {SubmitButton} from './SubmitButton'
import {TransferModal} from './TransferModal'
import {TransferPanel} from './TransferPanel'

export const BridgePage = () => {
  const [isOpenTransferModal, setIsOpenTransferModal] = useState(false)

  const submit = () => {
    setIsOpenTransferModal(true)
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
          <TransferPanel label="From" />

          <ExchangeIcon />

          <TransferPanel label="To" />
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
          <SubmitButton onClick={submit} />
        </BlockItem>
      </Root>

      <TransferModal
        onClose={() => {
          setIsOpenTransferModal(false)
        }}
        isOpen={isOpenTransferModal}
      />
    </div>
  )
}
