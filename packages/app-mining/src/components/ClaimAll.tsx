import {useCallback, useEffect, useMemo, useState} from 'react'
import {Input} from 'baseui/input'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal'
import {
  HeadingSmall,
  LabelSmall,
  ParagraphLarge,
  ParagraphSmall,
} from 'baseui/typography'
import {FormControl} from 'baseui/form-control'
import {useStakePoolsQuery} from '../hooks/graphql'
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
import {Block} from 'baseui/block'
import Decimal from 'decimal.js'

const ClaimAll = (): JSX.Element => {
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
      withStakePoolStakers: true,
      stakePoolStakersWhere: {
        address: {
          equals: polkadotAccount?.address,
        },
        claimableRewards: {
          gte: '0.01',
        },
      },
      where: {
        stakePoolStakers: {
          some: {
            address: {
              equals: polkadotAccount?.address,
            },
            claimableRewards: {
              gte: '0.01',
            },
          },
        },
      },
    },
    {enabled: Boolean(polkadotAccount?.address)}
  )

  const closeModal = useCallback(() => setIsModalOpen(false), [])

  const totalClaimableRewards = useMemo<Decimal | null>(() => {
    if (!data) return null

    return data.findManyStakePools.reduce((acc, cur) => {
      const claimableRewards = cur.stakePoolStakers?.[0]?.claimableRewards
      if (claimableRewards) {
        return acc.add(new Decimal(claimableRewards))
      }

      return acc
    }, new Decimal(0))
  }, [data])

  const claimableStakePoolPids = useMemo<string[]>(() => {
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
      <Block display="flex" alignItems="center">
        {polkadotAccount?.address && (
          <Block marginRight="20px">
            <LabelSmall as="div">Claimable Rewards</LabelSmall>
            <HeadingSmall as="div">
              {isLoading || !totalClaimableRewards ? (
                <Skeleton animation height="32px" width="200px" />
              ) : (
                `${formatCurrency(totalClaimableRewards)} PHA`
              )}
            </HeadingSmall>
          </Block>
        )}

        <Button
          onClick={() => setIsModalOpen(true)}
          kind="secondary"
          disabled={!totalClaimableRewards || totalClaimableRewards.eq(0)}
        >
          Claim All
        </Button>
      </Block>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Claim All</ModalHeader>
        <ModalBody>
          <ParagraphSmall>
            Claim all the pending rewards of the sender and send to the target
          </ParagraphSmall>
          <FormControl label="Pids">
            <ParagraphLarge as="div">
              {claimableStakePoolPids.join(', ')}
            </ParagraphLarge>
          </FormControl>

          <FormControl label="Rewards">
            <ParagraphLarge as="div">
              {totalClaimableRewards && formatCurrency(totalClaimableRewards)}{' '}
              PHA
            </ParagraphLarge>
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
