import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {useCurrentAccount} from '@phala/store'
import {formatCurrency, validateAddress} from '@phala/utils'
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
import {SortOrder, useStakePoolsQuery} from '../hooks/graphql'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'
import {client} from '../utils/GraphQLClient'

const CLAIM_THRESHOLD = '0'

const ClaimAll: FC<
  {
    kind: 'delegate' | 'mining'
  } & BlockProps
> = ({kind, ...props}) => {
  const [, theme] = useStyletron()
  const [polkadotAccount] = useCurrentAccount()
  const {api} = useApiPromise()
  const [address, setAddress] = useState('')
  const [confirmLock, setConfirmLock] = useState(false)
  const [isAddressError, setIsAddressError] = useState(false)
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [shouldClaimDelegatorRewards, setShouldClaimDelegatorRewards] =
    useState(kind === 'delegate')
  const [shouldClaimOwnerRewards, setShouldClaimOwnerRewards] = useState(
    kind === 'mining'
  )
  const {data, isLoading} = useStakePoolsQuery(
    client,
    {
      orderBy: {pid: SortOrder.Asc},
      withStakePoolStakers: true,
      stakePoolStakersWhere: {
        address: {equals: polkadotAccount?.address},
        claimableReward: {gte: CLAIM_THRESHOLD},
      },
      where: {
        OR: [
          {
            stakePoolStakers: {
              some: {
                address: {equals: polkadotAccount?.address},
                claimableReward: {gte: CLAIM_THRESHOLD},
              },
            },
          },
          {
            ownerReward: {gte: CLAIM_THRESHOLD},
            ownerAddress: {equals: polkadotAccount?.address},
          },
        ],
      },
    },
    {
      enabled: Boolean(polkadotAccount?.address),
      refetchOnMount: true,
      refetchInterval: 60 * 1000,
    }
  )

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setConfirmLock(false)
  }, [])

  const aggregatedData = useMemo(() => {
    const delegatorPids: number[] = []
    const ownerPids: number[] = []
    let delegatorRewards = new Decimal(0)
    let ownerRewards = new Decimal(0)

    data?.findManyStakePools.forEach((x) => {
      const stakeReward = x.stakePoolStakers?.[0]?.stakeReward
      if (stakeReward) {
        delegatorRewards = delegatorRewards.add(new Decimal(stakeReward))
        delegatorPids.push(x.pid)
      }

      const ownerReward = new Decimal(x.ownerReward)
      if (x.ownerAddress === polkadotAccount?.address && ownerReward.gt(0)) {
        ownerRewards = ownerRewards.add(ownerReward)
        ownerPids.push(x.pid)
      }
    })

    return {
      delegatorPids,
      delegatorRewards,
      ownerRewards,
      ownerPids,
    }
  }, [data, polkadotAccount?.address])

  const displayRewards =
    kind === 'delegate'
      ? aggregatedData.delegatorRewards
      : aggregatedData.ownerRewards

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
      rewards = rewards.add(aggregatedData.delegatorRewards)
    }

    if (shouldClaimOwnerRewards) {
      rewards = rewards.add(aggregatedData.ownerRewards)
    }

    return rewards
  }, [
    shouldClaimDelegatorRewards,
    shouldClaimOwnerRewards,
    aggregatedData.delegatorRewards,
    aggregatedData.ownerRewards,
  ])

  const extrinsic = useMemo(() => {
    if (api && decimals) {
      let batchParams: any[] = []
      try {
        if (shouldClaimDelegatorRewards) {
          batchParams = batchParams.concat(
            aggregatedData.delegatorPids.map((pid) =>
              api.tx.phalaStakePool?.claimStakerRewards?.(pid, address)
            )
          )
        }

        if (shouldClaimOwnerRewards) {
          batchParams = batchParams.concat(
            aggregatedData.ownerPids.map((pid) =>
              api.tx.phalaStakePool?.claimOwnerRewards?.(pid, address)
            )
          )
        }

        return api.tx.utility.batchAll?.(batchParams)
      } catch (err) {
        // noop
      }
    }
  }, [
    address,
    api,
    aggregatedData,
    decimals,
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
                <Skeleton animation height="32px" width="200px" />
              ) : (
                `${formatCurrency(displayRewards)} PHA`
              )}
            </HeadingSmall>
          </Block>
        )}

        <Button
          onClick={() => setIsModalOpen(true)}
          kind="secondary"
          disabled={displayRewards.eq(0)}
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
              borderRadius: 0,
              borderWidth: '2px',
              borderColor: $theme.colors.accent,
              borderStyle: 'solid',
            }),
          },
        }}
      >
        <ModalHeader>Claim Rewards</ModalHeader>
        <ModalBody>
          <Block
            $style={{...theme.borders.border600}}
            padding="scale500"
            marginBottom="scale600"
          >
            <Checkbox
              disabled={!aggregatedData.delegatorPids.length}
              checked={shouldClaimDelegatorRewards}
              onChange={(e) =>
                setShouldClaimDelegatorRewards(e.currentTarget.checked)
              }
            >
              <Block>
                <Block>Delegator Rewards</Block>
                {Boolean(aggregatedData.delegatorPids.length) && (
                  <>
                    <ParagraphSmall as="div" marginTop="scale100">
                      Rewards: {formatCurrency(aggregatedData.delegatorRewards)}{' '}
                      PHA
                    </ParagraphSmall>
                    <ParagraphSmall as="div" marginTop="scale100">
                      Pids: {aggregatedData.delegatorPids.join(', ')}
                    </ParagraphSmall>
                  </>
                )}
              </Block>
            </Checkbox>
          </Block>

          <Block
            $style={{...theme.borders.border600}}
            padding="scale500"
            marginBottom="scale600"
          >
            <Checkbox
              disabled={!aggregatedData.ownerPids.length}
              checked={shouldClaimOwnerRewards}
              onChange={(e) =>
                setShouldClaimOwnerRewards(e.currentTarget.checked)
              }
            >
              <Block>
                <Block>Owner Rewards</Block>
                {Boolean(aggregatedData.ownerPids.length) && (
                  <>
                    <ParagraphSmall as="div" marginTop="scale100">
                      Rewards: {formatCurrency(aggregatedData.ownerRewards)} PHA
                    </ParagraphSmall>
                    <ParagraphSmall as="div" marginTop="scale100">
                      Pids: {aggregatedData.ownerPids.join(', ')}
                    </ParagraphSmall>
                  </>
                )}
              </Block>
            </Checkbox>
          </Block>

          <FormControl label="Selected Rewards">
            <ParagraphSmall as="div">
              {formatCurrency(selectedRewards)} PHA
            </ParagraphSmall>
          </FormControl>

          <FormControl
            label="Target Address"
            error={isAddressError ? 'Invalid address' : null}
          >
            <Input
              value={address}
              autoFocus
              placeholder="Target Address"
              overrides={{
                Input: {
                  style: {textOverflow: 'ellipsis'},
                },
                EndEnhancer: {
                  style: {whiteSpace: 'pre'},
                },
              }}
              endEnhancer={
                polkadotAccount && (
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
        </ModalBody>
        <ModalFooter>
          <Block
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <PhalaStakePoolTransactionFeeLabel action={extrinsic} />
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
