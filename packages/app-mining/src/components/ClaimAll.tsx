import {useCallback, useEffect, useMemo, useState} from 'react'
import {Input} from 'baseui/input'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal'
import {HeadingSmall, LabelSmall, ParagraphSmall} from 'baseui/typography'
import {FormControl} from 'baseui/form-control'
import {SortOrder, useStakePoolsQuery} from '../hooks/graphql'
import {formatCurrency, validateAddress} from '@phala/utils'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {Button} from 'baseui/button'
import {client} from '../utils/GraphQLClient'
import {Skeleton} from 'baseui/skeleton'
import {Block, BlockProps} from 'baseui/block'
import Decimal from 'decimal.js'

const ClaimAll = (props: BlockProps) => {
  const [polkadotAccount] = usePolkadotAccountAtom()
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
    {enabled: Boolean(polkadotAccount?.address), refetchOnMount: true}
  )

  const closeModal = useCallback(() => setIsModalOpen(false), [])

  const totalclaimableReward = useMemo<Decimal | null>(() => {
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

  const onConfirm = () => {
    if (api && decimals) {
      waitSignAndSend(
        api.tx.utility.batchAll?.(
          claimableStakePoolPids.map(
            (pid) => api.tx.phalaStakePool?.claimRewards?.(pid, address) as any
          )
        ),
        (status) => {
          if (status.isReady) {
            closeModal()
          }
        }
      )
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      setAddress('')
    }
  }, [isModalOpen])

  return (
    <>
      <Block display="flex" alignItems="center" {...props}>
        {polkadotAccount?.address && (
          <Block marginRight="20px">
            <LabelSmall as="div">Claimable Rewards</LabelSmall>
            <HeadingSmall as="div">
              {isLoading || !totalclaimableReward ? (
                <Skeleton animation height="32px" width="200px" />
              ) : (
                `${formatCurrency(totalclaimableReward)} PHA`
              )}
            </HeadingSmall>
          </Block>
        )}

        <Button
          onClick={() => setIsModalOpen(true)}
          kind="secondary"
          disabled={!totalclaimableReward || totalclaimableReward.eq(0)}
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

          <FormControl label="Rewards">
            <ParagraphSmall as="div">
              {totalclaimableReward && formatCurrency(totalclaimableReward)} PHA
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
          <ModalButton
            disabled={!address || isAddressError}
            onClick={onConfirm}
          >
            Confirm
          </ModalButton>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ClaimAll
