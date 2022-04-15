import React, {useMemo, useState} from 'react'
import styled from 'styled-components'
import {down} from 'styled-breakpoints'
import {useBreakpoint} from 'styled-breakpoints/react-styled'
import {navigate} from 'gatsby'
import {DataType} from './index'
import Button from '../Button'
import Popover from '../Popover'
import TransferModal from '../TransferModal'
import ClaimModal from '../ClaimModal'
import {useCurrentNetworkNode} from '../../../store/networkNode'

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

  ${down('sm')} {
    padding: 8px 12px;
  }
`

const ButtonCell: React.FC<Pick<DataType, 'name'>> = ({name}) => {
  const [currentNetworkNode] = useCurrentNetworkNode()
  const [visibleTransferModal, setVisibleTransferModal] = useState(false)
  const [claimModalVisible, setClaimModalVisible] = useState(false)
  const isMobile = useBreakpoint(down('sm'))
  const isPHA = useMemo(() => {
    return name === 'K-PHA'
  }, [name])

  const handleBridge = () => {
    navigate('/bridge/')
    window.open('//subbridge.phala.network')
  }
  return (
    <Wrapper>
      {!isMobile && currentNetworkNode.id !== 'phala-rewards-demo' && (
        <Button onClick={() => setVisibleTransferModal(true)}>Transfer</Button>
      )}
      <Spacer />
      <Popover
        content={({close}) => (
          <div>
            {isMobile && currentNetworkNode.id !== 'phala-rewards-demo' && (
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
            {isPHA && currentNetworkNode.id !== 'phala-rewards-demo' && (
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
