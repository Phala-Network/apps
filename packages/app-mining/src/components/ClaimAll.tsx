import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {useCurrentAccount} from '@phala/store'
import {formatCurrency, validateAddress} from '@phala/utils'
import {Block, BlockProps} from 'baseui/block'
import {Button} from 'baseui/button'
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
import {useCallback, useEffect, useMemo, useState} from 'react'
import {SortOrder, useStakePoolsQuery} from '../hooks/graphql'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'
import {client} from '../utils/GraphQLClient'

const ClaimAll = (
  props: {
    kind?: string | undefined
  } & BlockProps
) => {
  const [polkadotAccount] = useCurrentAccount()
  const {api} = useApiPromise()
  const [address, setAddress] = useState('')
  const [isAddressError, setIsAddressError] = useState(false)
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {data, isLoading} = useStakePoolsQuery(
    client,
    {
      orderBy: {pid: SortOrder.Asc},
      withStakePoolStakers: true,
      stakePoolStakersWhere: {
        address: {
          equals: polkadotAccount?.address,
        },
        claimableReward: {
          gte: '0.0001',
        },
      },
      where: {
        OR: [
          {
            stakePoolStakers: {
              some: {
                address: {
                  equals: polkadotAccount?.address,
                },
                claimableReward: {
                  gte: '0.0001',
                },
              },
            },
          },
          {
            ownerReward: {
              gte: '0.0001',
            },
            ownerAddress: {
              equals: polkadotAccount?.address,
            },
          },
        ],
      },
    },
    {
      enabled: Boolean(polkadotAccount?.address),
      refetchOnMount: true,
      refetchInterval: 60 * 10 * 1000,
    }
  )

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setConfirmLock(false)
  }, [])

  const totalClaimableReward = useMemo<Decimal | null>(() => {
    if (!data) return null

    return data.findManyStakePools.reduce((acc, cur) => {
      let curRewards = new Decimal(0)
      const claimableReward = cur.stakePoolStakers?.[0]?.claimableReward
      if (claimableReward) {
        curRewards = curRewards.add(new Decimal(claimableReward))
      }

      if (cur.ownerAddress === polkadotAccount?.address) {
        curRewards = curRewards.add(new Decimal(cur.ownerReward))
      }

      return acc.add(curRewards)
    }, new Decimal(0))
  }, [data, polkadotAccount?.address])

  const claimableStakePoolPids = useMemo<number[]>(() => {
    return data?.findManyStakePools.map((stakePool) => stakePool.pid) || []
  }, [data])
  const [confirmLock, setConfirmLock] = useState(false)

  const onConfirm = async () => {
    setConfirmLock(true)
    try {
      await waitSignAndSend(extrinsic, (status) => {
        if (status.isReady) {
          closeModal()
        }
      })
    } catch (err) {
      // setConfirmLock(false)
    } finally {
      setConfirmLock(false)
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      setAddress('')
    }
  }, [isModalOpen])

  const extrinsic = useMemo(() => {
    if (api && decimals) {
      return api.tx.utility.batchAll?.(
        claimableStakePoolPids.map(
          (pid) => api.tx.phalaStakePool?.claimRewards?.(pid, address) as any
        )
      )
    }
  }, [address, api, claimableStakePoolPids, decimals])
  return (
    <>
      <Block display="flex" alignItems="center" flexWrap {...props}>
        {polkadotAccount?.address && (
          <Block marginRight="20px">
            <LabelSmall as="div">{'Claimable Rewards'}</LabelSmall>
            <HeadingSmall as="div">
              {isLoading || !totalClaimableReward ? (
                <Skeleton animation height="32px" width="200px" />
              ) : (
                `${formatCurrency(totalClaimableReward)} PHA`
              )}
            </HeadingSmall>
          </Block>
        )}

        <Button
          onClick={() => setIsModalOpen(true)}
          kind="secondary"
          disabled={!totalClaimableReward || totalClaimableReward.eq(0)}
        >
          Claim All
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
        <ModalHeader>Claim All</ModalHeader>
        <ModalBody>
          <ParagraphSmall>
            Claim all the pending rewards of the sender and send to the target
          </ParagraphSmall>
          <FormControl label="Pids">
            <ParagraphSmall as="div">
              {claimableStakePoolPids.join(', ')}
            </ParagraphSmall>
          </FormControl>

          <FormControl label={'Rewards'}>
            <Block display={'flex'} flexDirection={'row'}>
              <ParagraphSmall as="div">
                {totalClaimableReward && formatCurrency(totalClaimableReward)}{' '}
                PHA
              </ParagraphSmall>
            </Block>
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
              disabled={!address || isAddressError || confirmLock}
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
