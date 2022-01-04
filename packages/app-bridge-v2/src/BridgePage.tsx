import {FC, useState} from 'react'
import {Helmet} from 'react-helmet'
import {ExchangeIcon} from './components/ExchangeIcon'
import {ExtraInfoPanel} from './components/ExtraInfoPanel'
import {Header} from './components/Header'
import {InformationModal} from './components/InformationModal'
import {SubmitButton} from './components/SubmitButton'
import {TransferFromPanel} from './components/TransferFromPanel'
import {TransferModal} from './components/TransferModal'
import {TransferToPanel} from './components/TransferToPanel'
import {useSwitchToAndFormData} from './store'
import {BlockItem, Root} from './styledComponents'
import {TransactionInfo} from './types'

export const BridgePage: FC = () => {
  const [transactionInfo] = useState<TransactionInfo>()
  const [isOpenTransferModal, setIsOpenTransferModal] = useState(false)
  const switchData = useSwitchToAndFormData()

  const submit = () => {
    setIsOpenTransferModal(true)
  }

  return (
    <div style={{padding: 20, margin: 20, flex: 1}}>
      <Helmet>
        <title>Bridge</title>
      </Helmet>

      <Root
        style={{
          width: 672,
          margin: '0 auto',
        }}
      >
        <Header />

        <BlockItem>
          <TransferFromPanel />

          <ExchangeIcon onClick={switchData} />

          <TransferToPanel />
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
        transactionInfo={transactionInfo}
        onClose={() => {
          setIsOpenTransferModal(false)
        }}
        isOpen={isOpenTransferModal}
      />

      <InformationModal />
    </div>
  )
}
