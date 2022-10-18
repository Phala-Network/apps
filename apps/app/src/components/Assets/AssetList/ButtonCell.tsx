import {Block} from 'baseui/block'
import {Modal} from 'baseui/modal'
import React, {useMemo, useState} from 'react'
import {down} from 'styled-breakpoints'
import {useBreakpoint} from 'styled-breakpoints/react-styled'
import styled from 'styled-components'
import {useCurrentNetworkNode} from '../../../store/networkNode'
import Button from '../Button'
import BuyAlertModal from '../BuyAlertModal'
import ClaimModal from '../ClaimModal'
import Popover from '../Popover'
import TransferModal from '../TransferModal'
import {DataType} from './index'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding-right: 40px;
`

const Spacer = styled.div`
  margin-right: 20px;
`

export const LineWrap = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 48px;
  padding: 16px 23px 16px 21px;
  font-family: Montserrat;
  font-style: normal;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
  outline: none;

  :not(:last-of-type) {
    border-bottom: 1px solid #cecece;
  }

  :hover {
    background-color: #d1ff52;
  }

  ${down('md')} {
    padding: 8px 12px;
  }
`

const ButtonCell: React.FC<Pick<DataType, 'name'>> = ({name}) => {
  const [currentNetworkNode] = useCurrentNetworkNode()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalKey, setModalKey] = useState<'claim' | 'transfer' | 'buy' | null>(
    null
  )
  const isMobile = useBreakpoint(down('md'))
  const isPHA = useMemo(() => {
    return name === 'K-PHA'
  }, [name])

  const handleBridge = () => {
    window.open('https://subbridge.io')
  }

  const onModalClose = () => setIsModalOpen(false)

  return (
    <Wrapper>
      <Block display="flex" flexDirection="column">
        {!isMobile && (
          <Button
            onClick={() => {
              setIsModalOpen(true)
              setModalKey('transfer')
            }}
          >
            Transfer
          </Button>
        )}
        {!isMobile && isPHA && (
          <Button
            onClick={() => {
              setIsModalOpen(true)
              setModalKey('buy')
            }}
          >
            Buy
          </Button>
        )}
      </Block>
      <Spacer />
      <Popover
        content={({close}) => (
          <div>
            {isMobile && (
              <LineWrap
                onClick={() => {
                  close()
                  setIsModalOpen(true)
                  setModalKey('transfer')
                }}
              >
                Transfer
              </LineWrap>
            )}
            {isMobile && isPHA && (
              <LineWrap
                onClick={() => {
                  close()
                  setIsModalOpen(true)
                  setModalKey('buy')
                }}
              >
                Buy
              </LineWrap>
            )}
            <LineWrap
              onClick={() => {
                close()
                setIsModalOpen(true)
                setModalKey('claim')
              }}
            >
              Claim
            </LineWrap>
            {isPHA && currentNetworkNode.id !== 'phala-via-phala' && (
              <LineWrap
                onClick={() => {
                  close()
                  handleBridge()
                }}
              >
                Bridge
              </LineWrap>
            )}
          </div>
        )}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={onModalClose}
        overrides={{
          Dialog: {
            style: ({$theme}) => ({
              borderRadius: '4px',
              borderWidth: '2px',
              borderColor: $theme.colors.accent,
              borderStyle: 'solid',
            }),
          },
        }}
      >
        {modalKey === 'claim' && <ClaimModal onClose={onModalClose} />}
        {modalKey === 'transfer' && <TransferModal onClose={onModalClose} />}
        {modalKey === 'buy' && <BuyAlertModal onClose={onModalClose} />}
      </Modal>
    </Wrapper>
  )
}

export default ButtonCell
