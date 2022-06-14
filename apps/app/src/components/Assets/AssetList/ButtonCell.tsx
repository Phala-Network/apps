import React, {useMemo, useState} from 'react'
import {down} from 'styled-breakpoints'
import {useBreakpoint} from 'styled-breakpoints/react-styled'
import styled from 'styled-components'
import {useCurrentNetworkNode} from '../../../store/networkNode'
import Button from '../Button'
import ClaimModal from '../ClaimModal'
import Popover from '../Popover'
import TransferModal from '../TransferModal'
import {DataType} from './index'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  const [visibleTransferModal, setVisibleTransferModal] = useState(false)
  const [claimModalVisible, setClaimModalVisible] = useState(false)
  const isMobile = useBreakpoint(down('md'))
  const isPHA = useMemo(() => {
    return name === 'K-PHA'
  }, [name])

  const handleBridge = () => {
    window.open('https://subbridge.io')
  }
  return (
    <Wrapper>
      {!isMobile && currentNetworkNode.id !== 'phala-via-phala' && (
        <Button onClick={() => setVisibleTransferModal(true)}>Transfer</Button>
      )}
      <Spacer />
      <Popover
        content={({close}) => (
          <div>
            {isMobile && currentNetworkNode.id !== 'phala-via-phala' && (
              <LineWrap
                onClick={() => {
                  close()
                  setVisibleTransferModal(true)
                }}
              >
                Transfer
              </LineWrap>
            )}
            <LineWrap
              onClick={() => {
                close()
                setClaimModalVisible(true)
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
      {claimModalVisible && (
        <ClaimModal
          visible={true}
          onClose={() => setClaimModalVisible(false)}
        ></ClaimModal>
      )}
      {visibleTransferModal && (
        <TransferModal
          visible={true}
          onClose={() => setVisibleTransferModal(false)}
        ></TransferModal>
      )}
    </Wrapper>
  )
}

export default ButtonCell
