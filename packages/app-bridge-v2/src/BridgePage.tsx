import {ToasterContainer} from '@phala/react-components'
import {PLACEMENT} from 'baseui/toast'
import {FC, useState} from 'react'
import {Helmet} from 'react-helmet'
import {EthereumConnectWallet} from './components/EthereumConnectWallet'
import {ExchangeIcon} from './components/ExchangeIcon'
import {ExtraInfoPanel} from './components/ExtraInfoPanel'
import {Header} from './components/Header'
import {InformationModal} from './components/InformationModal'
import {SubmitButton} from './components/SubmitButton'
import {TransferFromPanel} from './components/TransferFromPanel'
import {TransferModal} from './components/TransferModal'
import {TransferToPanel} from './components/TransferToPanel'
import {useExtraInfo} from './hooks/useExtraInfo'
import {useAllTransferData, useSwitchToAndFormData} from './store'
import {BlockItem, Root} from './styledComponents'

export const BridgePage: FC = () => {
  const transactionInfo = useAllTransferData()
  const [isOpenTransferModal, setIsOpenTransferModal] = useState(false)
  const switchData = useSwitchToAndFormData()
  const extraInfo = useExtraInfo()

  const submit = () => {
    setIsOpenTransferModal(true)
  }

  return (
    <div style={{padding: 20, margin: 20, flex: 1}}>
      <Helmet>
        <title>Bridge</title>
      </Helmet>

      <Root style={{}}>
        <Header />

        <BlockItem>
          <TransferFromPanel />

          <ExchangeIcon onClick={switchData} />

          <TransferToPanel />
        </BlockItem>

        <BlockItem>
          <ExtraInfoPanel infos={extraInfo} />
        </BlockItem>

        <BlockItem>
          <SubmitButton onSubmit={submit} />
        </BlockItem>

        {/* todo */}
        <EthereumConnectWallet />
      </Root>
      <TransferModal
        transactionInfo={transactionInfo}
        onClose={() => {
          setIsOpenTransferModal(false)
        }}
        isOpen={isOpenTransferModal}
      />
      <InformationModal />

      {/* <BridgePageTest /> */}
      <ToasterContainer placement={PLACEMENT.topRight} />
    </div>
  )
}
