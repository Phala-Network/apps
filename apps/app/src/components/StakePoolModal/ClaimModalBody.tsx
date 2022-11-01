import {TransactionFeeLabel} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import {useCurrentAccount} from '@phala/store'
import {formatCurrency, validateAddress} from '@phala/utils'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {Checkbox} from 'baseui/checkbox'
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
import Decimal from 'decimal.js'
import {FC, useMemo, useState} from 'react'
import {StakePool} from '../../hooks/subsquid'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import FormDisplay from '../FormDisplay'

const ClaimModalBody: FC<
  {
    stakePool: Pick<StakePool, 'pid' | 'ownerReward' | 'owner'> &
      Partial<Pick<StakePool, 'stakes'>>
  } & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid, stakes, ownerReward, owner} = stakePool
  const stake = stakes?.[0]
  const [polkadotAccount] = useCurrentAccount()
  const isOwner = polkadotAccount?.address === owner.id
  const {api} = useApiPromise()
  const [address, setAddress] = useState('')
  const [isAddressError, setIsAddressError] = useState(false)
  const waitSignAndSend = useWaitSignAndSend()
  const [confirmLock, setConfirmLock] = useState(false)
  const [delegatorRewardSelected, setDelegatorRewardSelected] = useState(true)
  const [ownerRewardSelected, setOwnerRewardSelected] = useState(isOwner)

  const onConfirm = async () => {
    setConfirmLock(true)
    try {
      await waitSignAndSend(extrinsic, (status) => {
        if (status.isReady) {
          onClose?.({closeSource: 'closeButton'})
        }
      })
    } catch (err) {
      setConfirmLock(false)
    }
  }

  const extrinsic = useMemo(() => {
    if (api && !isAddressError) {
      if (delegatorRewardSelected && ownerRewardSelected) {
        return api.tx.phalaStakePool.claimRewards(pid, address)
      } else if (delegatorRewardSelected) {
        return api.tx.phalaStakePool.claimStakerRewards(pid, address)
      } else if (ownerRewardSelected) {
        return api.tx.phalaStakePool.claimOwnerRewards(pid, address)
      }
    }
  }, [
    api,
    pid,
    address,
    isAddressError,
    delegatorRewardSelected,
    ownerRewardSelected,
  ])

  const selectedRewards = useMemo(() => {
    let rewards = new Decimal(0)
    if (delegatorRewardSelected && stake) {
      rewards = rewards.plus(stake.reward)
    }
    if (ownerRewardSelected) {
      rewards = rewards.plus(ownerReward)
    }
    return rewards
  }, [delegatorRewardSelected, ownerReward, ownerRewardSelected, stake])

  return (
    <>
      <ModalHeader>Claim Reward</ModalHeader>
      <ModalBody>
        <ParagraphSmall>
          Claim all rewards of the sender and send to the target
        </ParagraphSmall>
        <FormDisplay label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormDisplay>

        {isOwner && (
          <>
            {stake && (
              <Checkbox
                overrides={{Root: {style: {margin: '16px 0'}}}}
                checked={delegatorRewardSelected}
                onChange={(e) => setDelegatorRewardSelected(e.target.checked)}
              >
                Delegator Reward: {formatCurrency(stake.reward)} PHA
              </Checkbox>
            )}

            <Checkbox
              overrides={{Root: {style: {margin: '16px 0'}}}}
              checked={ownerRewardSelected}
              onChange={(e) => setOwnerRewardSelected(e.target.checked)}
            >
              Owner Reward: {formatCurrency(ownerReward)} PHA
            </Checkbox>
          </>
        )}

        <FormDisplay label={isOwner ? 'Selected Rewards' : 'Reward'}>
          <ParagraphSmall as="div">
            {formatCurrency(selectedRewards)} PHA
          </ParagraphSmall>
        </FormDisplay>

        <FormControl
          label="Target Address"
          error={isAddressError ? 'Invalid address' : null}
        >
          <Input
            value={address}
            autoFocus
            overrides={{
              Input: {style: {textOverflow: 'ellipsis'}},
              EndEnhancer: {style: {whiteSpace: 'pre'}},
            }}
            size="compact"
            endEnhancer={
              polkadotAccount &&
              !address &&
              address !== polkadotAccount.address && (
                <Button
                  kind="tertiary"
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
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <TransactionFeeLabel action={extrinsic} />
          <ModalButton
            disabled={
              !address ||
              isAddressError ||
              confirmLock ||
              !(delegatorRewardSelected || ownerRewardSelected)
            }
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
