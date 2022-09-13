import {ModalBody, ModalButton, ModalFooter, ModalHeader} from 'baseui/modal'
import {FC} from 'react'

type Props = {
  onClose: () => void
}

const BuyAlertModal: FC<Props> = ({onClose}) => {
  const onClick = () => {
    onClose()
    window.open(
      `https://www.binancecnt.com/en/pre-connect?merchantCode=pha&timestamp=${new Date().getTime()}&fiatCurrency=EUR`
    )
  }
  return (
    <>
      <ModalHeader>Notice</ModalHeader>
      <ModalBody>
        The service is powered by Bifinity (Binance Connect). <br />
        <br />
        Please note that tokens you purchase on Binance will not be
        automatically transferred to the Phala/Khala network. Pay attention to
        the security of your funds.
      </ModalBody>

      <ModalFooter>
        <ModalButton onClick={onClick}>I Understand</ModalButton>
      </ModalFooter>
    </>
  )
}

export default BuyAlertModal
