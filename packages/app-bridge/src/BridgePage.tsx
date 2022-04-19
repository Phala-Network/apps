import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {StyledLink} from 'baseui/link'
import {Notification} from 'baseui/notification'
import {FC, useState} from 'react'
import {Info} from 'react-feather'
import {Helmet} from 'react-helmet'
import {ExchangeIcon} from './components/ExchangeIcon'
import {ExtraInfoPanel} from './components/ExtraInfoPanel'
import {Header} from './components/Header'
import {SubmitButton} from './components/SubmitButton'
import {TransferFromPanel} from './components/TransferFromPanel'
import {TransferModal} from './components/TransferModal'
import {TransferToPanel} from './components/TransferToPanel'
import {useExtraInfo} from './hooks/useExtraInfo'
import {useAllTransferData} from './store'
import {BlockItem, MainContent, Root} from './styledComponents'

export const BridgePage: FC = () => {
  const [css] = useStyletron()
  const transactionInfo = useAllTransferData()
  const [isOpenTransferModal, setIsOpenTransferModal] = useState(false)
  const extraInfo = useExtraInfo()

  const submit = () => {
    setIsOpenTransferModal(true)
  }

  return (
    <>
      <Root>
        <Helmet>
          <title>SubBridge</title>
        </Helmet>

        <Notification
          closeable
          overrides={{
            Body: {
              style: {
                borderRadius: 0,
                backgroundColor: '#f3ffd3',
                width: 'auto',
              },
            },
          }}
        >
          <Block display="flex" alignItems="center">
            <Info
              size={16}
              className={css({marginRight: '12px', flex: 'none'})}
            />
            <span>
              After you submit your transaction. Please go to{' '}
              <StyledLink
                href="https://khala.subscan.io/"
                target="_blank"
                rel="noreferrer"
              >
                Subscan
              </StyledLink>{' '}
              and{' '}
              <StyledLink
                href="https://etherscan.io/"
                target="_blank"
                rel="noreferrer"
              >
                Etherscan
              </StyledLink>{' '}
              to check the progress of your transaction. Or you can check this{' '}
              <StyledLink href="/bridge/track" target="_blank" rel="noreferrer">
                page
              </StyledLink>
              . If you have any questions. Please come to our{' '}
              <StyledLink
                href="https://discord.com/invite/phala"
                target="_blank"
                rel="noreferrer"
              >
                discord
              </StyledLink>{' '}
              channel for support.
            </span>
          </Block>
        </Notification>

        <MainContent>
          <Header />

          <BlockItem>
            <TransferFromPanel />

            <ExchangeIcon />

            <TransferToPanel />
          </BlockItem>

          <BlockItem>
            <ExtraInfoPanel infos={extraInfo} />
          </BlockItem>

          <BlockItem>
            <SubmitButton onSubmit={submit} />
          </BlockItem>
        </MainContent>

        <TransferModal
          transactionInfo={transactionInfo}
          onClose={() => {
            setIsOpenTransferModal(false)
          }}
          isOpen={isOpenTransferModal}
        />
      </Root>
    </>
  )
}
