import {useApiPromise} from '@phala/react-libs'
import {Block} from 'baseui/block'
import {
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from 'baseui/modal'
import {ParagraphSmall} from 'baseui/typography'
import {FC, useMemo, useState} from 'react'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import FormDisplay from '../FormDisplay'
import {TransactionFeeLabel} from '../TransactionFeeLabel'

const RemoveWhitelistModalBody: FC<
  {
    pid?: string | number
    addresses: string[]
  } & Pick<ModalProps, 'onClose'>
> = ({pid, addresses, onClose}) => {
  const {api} = useApiPromise()
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
    if (api) {
      const getExtrinsic = (address: string) =>
        api.tx.phalaStakePool.removeStakerFromWhitelist(pid, address)
      try {
        if (addresses.length > 1) {
          return api.tx.utility.batchAll(addresses.map(getExtrinsic))
        }
        return getExtrinsic(addresses[0])
      } catch (e) {
        // noop
      }
    }
  }, [api, pid, addresses])

  return (
    <>
      <ModalHeader>Remove Stakers from Whitelist</ModalHeader>
      <ModalBody>
        <FormDisplay label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormDisplay>
        <FormDisplay label="Addresses">
          <ParagraphSmall>
            {addresses.map((address) => (
              <>
                {address}
                <br />
              </>
            ))}
          </ParagraphSmall>
        </FormDisplay>
      </ModalBody>
      <ModalFooter>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <TransactionFeeLabel action={extrinsic} />
          <ModalButton disabled={confirmLock} onClick={onConfirm}>
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default RemoveWhitelistModalBody
