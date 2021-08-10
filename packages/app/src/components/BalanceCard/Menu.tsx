import { navigate } from 'gatsby'
import { forwardRef, useState } from 'react'
import { up, down } from 'styled-breakpoints'
import styled from 'styled-components'
import BridgeModal from '../BridgeModal'
import ClaimModal from '../ClaimModal'
import ConvertModal from '../ConvertModal'
import TransferModal from '../TransferModal'
import ActionArrow from '../../icons/action_arrow.svg'

const MenuWrap = styled.div<{ active: boolean }>`
  position: absolute;
  border: 3px solid #202020;
  box-sizing: border-box;
  left: -12px;
  top: -12px;
  right: -12px;
  bottom: -12px;
  border-width: ${(props) => (props.active ? 3 : 0)}px;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: all 0.15s linear 0.05s;
  box-sizing: border-box;

  ${down('sm')} {
    display: none;
  }
`

const Buttons = styled.div<{ active: boolean }>`
  padding: 0 8px;
  position: absolute;
  top: -11px;
  left: 9px;
  max-width: 144px;
  display: flex;
  align-items: center;
  background-color: #ececec;

  ${down('sm')} {
    display: none;
  }
`

const Button = styled.div<{ active: boolean }>`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  color: #202020;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity 0.2s linear;
  cursor: pointer;

  & + & {
    margin-left: 12px;
  }
`

const ButtonBottomBorder = styled.div<{ active: boolean }>`
  margin-top: 1px;
  width: ${(props) => (props.active ? '100%' : 0)};
  height: 1px;
  background-color: #202020;
  transition: width 0.15s linear 0.05s;
`

const MobileActions = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  flex-direction: column;
  justify-content: flex-end;
  display: flex;
  user-select: none;

  ${up('md')} {
    display: none;
  }
`

const MobileAction = styled.div`
  font-family: Lato;
  font-weight: bold;
  font-size: 12px;
  text-decoration: underline;
  display: flex;
  align-items: center;

  svg {
    margin-left: 3px;
  }
`

export type MenuProps = {
  disableTransfer?: boolean
  disableBridge?: boolean
  disableConvert?: boolean
  disableClaim?: boolean
}

type Props = {
  active: boolean
} & MenuProps

const Menu = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    active,
    disableTransfer = false,
    disableBridge = false,
    disableConvert = false,
    disableClaim = false,
  } = props
  const [visibleBridge, setVisibleBridge] = useState(false)
  const [visibleTransferModal, setVisibleTransferModal] = useState(false)
  const [visibleConvertModal, setVisibleConvertModal] = useState(false)
  const [claimModalVisible, setClaimModalVisible] = useState(false)

  return (
    <>
      <MenuWrap active={active} ref={ref}>
        <Buttons active={active}>
          {!disableTransfer && (
            <Button
              onClick={() => setVisibleTransferModal(true)}
              active={active}>
              <span>Transfer</span>
              <ButtonBottomBorder active={active}></ButtonBottomBorder>
            </Button>
          )}
          {!disableBridge && (
            // TODO: specify bridge target in url query
            <Button onClick={() => navigate('/')} active={active}>
              <span>Bridge</span>
              <ButtonBottomBorder active={active}></ButtonBottomBorder>
            </Button>
          )}
          {!disableConvert && (
            <Button
              onClick={() => setVisibleConvertModal(true)}
              active={active}>
              <span>Convert</span>
              <ButtonBottomBorder active={active}></ButtonBottomBorder>
            </Button>
          )}
          {!disableClaim && (
            <Button onClick={() => setClaimModalVisible(true)} active={active}>
              <span>Claim</span>
              <ButtonBottomBorder active={active}></ButtonBottomBorder>
            </Button>
          )}
        </Buttons>
      </MenuWrap>

      <MobileActions>
        {!disableClaim && (
          <MobileAction onClick={() => setClaimModalVisible(true)}>
            Claim<ActionArrow></ActionArrow>
          </MobileAction>
        )}
      </MobileActions>

      <ConvertModal
        visible={visibleConvertModal}
        onClose={() => setVisibleConvertModal(false)}></ConvertModal>

      <TransferModal
        visible={visibleTransferModal}
        onClose={() => setVisibleTransferModal(false)}></TransferModal>

      <BridgeModal
        visible={visibleBridge}
        onClose={() => setVisibleBridge(false)}></BridgeModal>

      {/* FIXME: hooks running should be prevented when modal is invisible */}
      {/* FIXME: modal should be load asynchronously */}
      {claimModalVisible && (
        <ClaimModal
          visible={true}
          onClose={() => setClaimModalVisible(false)}></ClaimModal>
      )}
    </>
  )
})

export default Menu
