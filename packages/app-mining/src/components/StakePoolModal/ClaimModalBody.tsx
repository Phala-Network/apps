import {useState, VFC} from 'react'
import {Input} from 'baseui/input'
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ModalProps,
} from 'baseui/modal'
import {ParagraphSmall} from 'baseui/typography'
import {FormControl} from 'baseui/form-control'
import {formatCurrency, validateAddress} from '@phala/utils'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {Button} from 'baseui/button'
import {StakePool} from '.'

const ClaimModalBody: VFC<
  {
    stakePool: Pick<StakePool, 'pid'> &
      Partial<Pick<StakePool, 'stakePoolStakers'>>
  } & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid, stakePoolStakers} = stakePool
  const [polkadotAccount] = usePolkadotAccountAtom()
  const {api} = useApiPromise()
  const [address, setAddress] = useState('')
  const [isAddressError, setIsAddressError] = useState(false)
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const onConfirm = () => {
    if (api && decimals) {
      waitSignAndSend(
        api.tx.phalaStakePool?.claimRewards?.(pid, address),
        (status) => {
          if (status.isReady) {
            onClose?.({closeSource: 'closeButton'})
          }
        }
      )
    }
  }

  if (!stakePoolStakers) return null

  return (
    <>
      <ModalHeader>Claim</ModalHeader>
      <ModalBody>
        <ParagraphSmall>
          Claim all the pending rewards of the sender and send to the target
        </ParagraphSmall>
        <FormControl label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormControl>

        <FormControl label="Rewards">
          <ParagraphSmall as="div">
            {stakePoolStakers[0] &&
              formatCurrency(
                stakePoolStakers[0].claimableRewards as string
              )}{' '}
            PHA
          </ParagraphSmall>
        </FormControl>

        <FormControl
          label="Target Address"
          error={isAddressError ? 'Invalid address' : null}
        >
          <Input
            size="compact"
            value={address}
            autoFocus
            placeholder="Target Address"
            overrides={{
              EndEnhancer: {
                style: {
                  whiteSpace: 'pre',
                },
              },
            }}
            endEnhancer={
              polkadotAccount && (
                <Button
                  kind="minimal"
                  size="mini"
                  onClick={() => {
                    setAddress(polkadotAccount.address)
                    setIsAddressError(!validateAddress(polkadotAccount.address))
                  }}
                >
                  My Address
                </Button>
              )
            }
            onChange={(e) => setAddress(e.currentTarget.value)}
            onBlur={() => {
              if (address) {
                setIsAddressError(!validateAddress(address))
              }
            }}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton disabled={!address || isAddressError} onClick={onConfirm}>
          Confirm
        </ModalButton>
      </ModalFooter>
    </>
  )
}

export default ClaimModalBody
