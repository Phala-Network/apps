import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {useCurrentAccount} from '@phala/store'
import {formatCurrency, validateAddress} from '@phala/utils'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {FormControl} from 'baseui/form-control'
import {Input} from 'baseui/input'
import {
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from 'baseui/modal'
import {ParagraphSmall} from 'baseui/typography'
import {FC, useMemo, useState} from 'react'
import {StakePool} from '../../hooks/subsquid'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'

const ClaimModalBody: FC<
  {
    stakePool: Pick<StakePool, 'pid'> & Partial<Pick<StakePool, 'stakes'>>
  } & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid, stakes} = stakePool
  const [polkadotAccount] = useCurrentAccount()
  const {api} = useApiPromise()
  const [address, setAddress] = useState('')
  const isAddressError = !validateAddress(address)
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)

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
    if (api && decimals && !isAddressError) {
      return api.tx.phalaStakePool?.claimRewards?.(pid, address)
    }
  }, [api, decimals, pid, address, isAddressError])

  if (!stakes) return null

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
          <Block display={'flex'} flexDirection={'row'}>
            <ParagraphSmall as="div">
              {stakes[0] && formatCurrency(stakes[0].availableReward as string)}{' '}
              PHA
            </ParagraphSmall>
          </Block>
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
                  kind="tertiary"
                  size="mini"
                  onClick={() => {
                    setAddress(polkadotAccount.address)
                  }}
                >
                  My Address
                </Button>
              )
            }
            onChange={(e) => setAddress(e.currentTarget.value)}
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
            disabled={!address || isAddressError || confirmLock}
            onClick={onConfirm}
          >
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default ClaimModalBody
