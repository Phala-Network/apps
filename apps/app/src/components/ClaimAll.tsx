import {useApiPromise} from '@phala/react-libs'
import {useCurrentAccount} from '@phala/store'
import {formatCurrency, validateAddress} from '@phala/utils'
import {SubmittableExtrinsic} from '@polkadot/api/types'
import {useStyletron} from 'baseui'
import {Block, BlockProps} from 'baseui/block'
import {Button} from 'baseui/button'
import {Checkbox} from 'baseui/checkbox'
import {FormControl} from 'baseui/form-control'
import {Input} from 'baseui/input'
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
} from 'baseui/modal'
import {Skeleton} from 'baseui/skeleton'
import {HeadingSmall, LabelSmall, ParagraphSmall} from 'baseui/typography'
import Decimal from 'decimal.js'
import {FC, useCallback, useEffect, useMemo, useState} from 'react'
import {
  StakePoolOrderByInput,
  StakePoolStakeOrderByInput,
  useAccountRewardsQuery,
  useStakePoolsConnectionQuery,
  useStakePoolStakesConnectionQuery,
} from '../hooks/subsquid'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'
import {subsquidClient} from '../lib/graphqlClient'
import FormDisplay from './FormDisplay'
import {TransactionFeeLabel} from './TransactionFeeLabel'

const CLAIM_THRESHOLD = '0'

const ClaimAll: FC<{kind: 'delegate' | 'mining'} & BlockProps> = ({
  kind,
  ...props
}) => {
  const [css, theme] = useStyletron()
  const [polkadotAccount] = useCurrentAccount()
  const {api} = useApiPromise()
  const [address, setAddress] = useState('')
  const [confirmLock, setConfirmLock] = useState(false)
  const [isAddressError, setIsAddressError] = useState(false)
  const waitSignAndSend = useWaitSignAndSend()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [shouldClaimDelegatorRewards, setShouldClaimDelegatorRewards] =
    useState(kind === 'delegate')
  const [shouldClaimOwnerRewards, setShouldClaimOwnerRewards] = useState(
    kind === 'mining'
  )

  const {data, isInitialLoading: isLoading} = useAccountRewardsQuery(
    subsquidClient,
    {accountId: polkadotAccount?.address || ''},
    {enabled: Boolean(polkadotAccount?.address)}
  )

  const totalStakeReward = useMemo(
    () =>
      data?.accountById?.totalStakeReward
        ? new Decimal(data.accountById.totalStakeReward)
        : new Decimal(0),
    [data?.accountById?.totalStakeReward]
  )
  const totalOwnerReward = useMemo(
    () =>
      data?.accountById?.totalOwnerReward
        ? new Decimal(data.accountById.totalOwnerReward)
        : new Decimal(0),
    [data?.accountById?.totalOwnerReward]
  )

  const {data: stakePoolsData, isInitialLoading: isStakePoolsLoading} =
    useStakePoolsConnectionQuery(
      subsquidClient,
      {
        orderBy: StakePoolOrderByInput.PidAsc,
        where: {
          owner: {id_eq: polkadotAccount?.address},
          ownerReward_gt: CLAIM_THRESHOLD,
        },
      },
      {
        enabled: Boolean(polkadotAccount?.address) && isModalOpen,
        refetchOnWindowFocus: false,
      }
    )

  const {data: stakesData, isInitialLoading: isStakesLoading} =
    useStakePoolStakesConnectionQuery(
      subsquidClient,
      {
        orderBy: StakePoolStakeOrderByInput.StakePoolPidAsc,
        where: {
          reward_gt: CLAIM_THRESHOLD,
          account: {id_eq: polkadotAccount?.address},
        },
      },
      {
        enabled: Boolean(polkadotAccount?.address) && isModalOpen,
        refetchOnWindowFocus: false,
      }
    )

  const isModalLoading = isStakePoolsLoading || isStakesLoading

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setConfirmLock(false)
  }, [])

  const delegatedPids: string[] = useMemo(
    () =>
      stakesData?.stakePoolStakesConnection.edges.map(
        (s) => s.node.stakePool.pid
      ) || [],
    [stakesData?.stakePoolStakesConnection.edges]
  )

  const ownedPids: string[] = useMemo(
    () =>
      stakePoolsData?.stakePoolsConnection.edges.map((s) => s.node.pid) || [],
    [stakePoolsData?.stakePoolsConnection.edges]
  )

  const displayRewards =
    kind === 'delegate' ? totalStakeReward : totalOwnerReward

  const onConfirm = async () => {
    setConfirmLock(true)
    try {
      await waitSignAndSend(extrinsic, (status) => {
        if (status.isReady) {
          closeModal()
        }
      })
    } finally {
      setConfirmLock(false)
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      setAddress('')
    }
  }, [isModalOpen])

  const selectedRewards = useMemo(() => {
    let rewards = new Decimal(0)
    if (shouldClaimDelegatorRewards) {
      rewards = rewards.add(totalStakeReward)
    }

    if (shouldClaimOwnerRewards) {
      rewards = rewards.add(totalOwnerReward)
    }

    return rewards
  }, [
    shouldClaimDelegatorRewards,
    shouldClaimOwnerRewards,
    totalOwnerReward,
    totalStakeReward,
  ])

  const extrinsic = useMemo(() => {
    if (api) {
      const batchParams: SubmittableExtrinsic<'promise'>[] = []
      try {
        if (shouldClaimDelegatorRewards) {
          for (const pid of delegatedPids) {
            batchParams.push(
              api.tx.phalaStakePool.claimStakerRewards(pid, address)
            )
          }
        }
        if (shouldClaimOwnerRewards) {
          for (const pid of ownedPids) {
            batchParams.push(
              api.tx.phalaStakePool.claimOwnerRewards(pid, address)
            )
          }
        }

        return api.tx.utility.batchAll(batchParams)
      } catch (err) {
        // noop
      }
    }
  }, [
    address,
    api,
    delegatedPids,
    ownedPids,
    shouldClaimDelegatorRewards,
    shouldClaimOwnerRewards,
  ])

  return (
    <>
      <Block display="flex" alignItems="center" flexWrap {...props}>
        {polkadotAccount?.address && (
          <Block marginRight="20px">
            <LabelSmall as="div">
              {kind === 'delegate' ? 'Delegator Rewards' : 'Owner Rewards'}
            </LabelSmall>
            <HeadingSmall as="div">
              {isLoading ? (
                <Skeleton animation height="36px" width="200px" />
              ) : (
                <>
                  {formatCurrency(displayRewards)}{' '}
                  <span className={css({fontSize: '16px'})}>PHA</span>
                </>
              )}
            </HeadingSmall>
          </Block>
        )}

        <Button
          onClick={() => setIsModalOpen(true)}
          kind="secondary"
          disabled={displayRewards.isZero()}
        >
          Claim
        </Button>
      </Block>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
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
        <ModalHeader>Claim Rewards</ModalHeader>

        <ModalBody>
          {isModalLoading ? (
            <Skeleton animation height="400px" />
          ) : (
            <>
              <Block
                $style={{
                  borderRadius: '8px',
                  background: theme.colors.backgroundSecondary,
                }}
                padding="scale600"
                marginBottom="scale600"
              >
                <Checkbox
                  disabled={!delegatedPids.length}
                  checked={shouldClaimDelegatorRewards}
                  onChange={(e) =>
                    setShouldClaimDelegatorRewards(e.currentTarget.checked)
                  }
                >
                  <Block>
                    <Block>Delegator Rewards</Block>
                    {Boolean(delegatedPids.length) && (
                      <>
                        <ParagraphSmall as="div" marginTop="scale100">
                          Rewards: {formatCurrency(totalStakeReward)} PHA
                        </ParagraphSmall>
                        <ParagraphSmall as="div" marginTop="scale100">
                          Pids: {delegatedPids.join(', ')}
                        </ParagraphSmall>
                      </>
                    )}
                  </Block>
                </Checkbox>
              </Block>

              <Block
                $style={{
                  borderRadius: '8px',
                  background: theme.colors.backgroundSecondary,
                }}
                padding="scale600"
                marginBottom="scale600"
              >
                <Checkbox
                  disabled={!ownedPids.length}
                  checked={shouldClaimOwnerRewards}
                  onChange={(e) =>
                    setShouldClaimOwnerRewards(e.currentTarget.checked)
                  }
                >
                  <Block>
                    <Block>Owner Rewards</Block>
                    {Boolean(ownedPids.length) && (
                      <>
                        <ParagraphSmall as="div" marginTop="scale100">
                          Rewards: {formatCurrency(totalOwnerReward)} PHA
                        </ParagraphSmall>
                        <ParagraphSmall as="div" marginTop="scale100">
                          Pids: {ownedPids.join(', ')}
                        </ParagraphSmall>
                      </>
                    )}
                  </Block>
                </Checkbox>
              </Block>

              <FormDisplay label="Selected Rewards">
                <ParagraphSmall as="div">
                  {formatCurrency(selectedRewards)} PHA
                </ParagraphSmall>
              </FormDisplay>

              <FormControl
                label="Target Address"
                error={isAddressError ? 'Invalid address' : null}
              >
                <Input
                  size="compact"
                  value={address}
                  autoFocus
                  overrides={{
                    Input: {style: {textOverflow: 'ellipsis'}},
                    EndEnhancer: {style: {whiteSpace: 'pre'}},
                  }}
                  endEnhancer={
                    polkadotAccount &&
                    !address &&
                    address !== polkadotAccount.address && (
                      <Button
                        kind="tertiary"
                        size="mini"
                        onClick={() => {
                          setAddress(polkadotAccount.address)
                          setIsAddressError(
                            !validateAddress(polkadotAccount.address)
                          )
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
            </>
          )}
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
                (!shouldClaimDelegatorRewards && !shouldClaimOwnerRewards)
              }
              isLoading={confirmLock}
              onClick={onConfirm}
            >
              Confirm
            </ModalButton>
          </Block>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ClaimAll
