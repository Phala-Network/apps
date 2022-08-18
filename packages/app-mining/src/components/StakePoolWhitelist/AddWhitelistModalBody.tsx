import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import {Block} from 'baseui/block'
import {FormControl} from 'baseui/form-control'
import {
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from 'baseui/modal'
import {Textarea} from 'baseui/textarea'
import {ParagraphSmall} from 'baseui/typography'
import {FC, useMemo, useState} from 'react'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'

const AddWhitelistModalBody: FC<
  {
    pid?: string | number
  } & Pick<ModalProps, 'onClose'>
> = ({pid, onClose}) => {
  const {api} = useApiPromise()
  const [newAddresses, setNewAddresses] = useState('')
  const waitSignAndSend = useWaitSignAndSend()
  const [confirmLock, setConfirmLock] = useState(false)

  const onConfirm = async () => {
    setConfirmLock(true)
    try {
      await waitSignAndSend(extrinsic, (status) => {
        if (status.isReady) {
          onClose?.({closeSource: 'closeButton'})
          setConfirmLock(false)
        }
      })
    } catch (err) {
      // setConfirmLock(false)
    } finally {
      setConfirmLock(false)
    }
  }

  const extrinsic = useMemo(() => {
    if (api && newAddresses) {
      const getExtrinsic = (address: string) =>
        api.tx.phalaStakePool?.addStakerToWhitelist?.(pid, address)
      try {
        const addressesArray = newAddresses.split('\n').filter(Boolean)
        if (addressesArray.length > 1) {
          return api.tx.utility.batchAll?.(addressesArray.map(getExtrinsic))
        }
        return getExtrinsic(addressesArray[0])
      } catch (e) {
        // noop
      }
    }
  }, [api, pid, newAddresses])

  return (
    <>
      <ModalHeader>Add Stakers to Whitelist</ModalHeader>
      <ModalBody>
        <FormControl label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormControl>
        <FormControl label="Addresses" caption="One address per line">
          <Textarea
            size="compact"
            autoFocus
            onChange={(e) => setNewAddresses(e.target.value)}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <PhalaStakePoolTransactionFeeLabel action={extrinsic} />
          <ModalButton
            disabled={!newAddresses || confirmLock}
            onClick={onConfirm}
          >
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default AddWhitelistModalBody
