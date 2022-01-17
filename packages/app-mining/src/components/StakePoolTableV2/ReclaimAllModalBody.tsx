import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ModalProps,
} from 'baseui/modal'
import {ParagraphSmall} from 'baseui/typography'
import {FormControl} from 'baseui/form-control'
import type {StakePools} from '../../hooks/graphql'
import {formatCurrency, trimAddress} from '@phala/utils'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {useMemo} from 'react'
import Decimal from 'decimal.js'
import {StatefulTooltip} from 'baseui/tooltip'

const ReclaimAllModalBody = ({
  stakePool,
  onClose,
}: {stakePool: StakePools} & Pick<ModalProps, 'onClose'>): JSX.Element => {
  const {pid, miners} = stakePool
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const onConfirm = () => {
    if (api && decimals) {
      waitSignAndSend(
        api.tx.utility.batch(
          miners.map(({workerPublicKey}) =>
            api.tx.phalaStakePool?.reclaimPoolWorker?.(pid, workerPublicKey)
          ) as any // FIXME: remove any when polkadot types is ready
        ),
        (status) => {
          if (status.isReady) {
            onClose?.({closeSource: 'closeButton'})
          }
        }
      )
    }
  }
  const reclaimableStake = useMemo(
    () =>
      `${formatCurrency(
        miners.reduce(
          (acc, cur) => acc.add(new Decimal(cur.stakes)),
          new Decimal(0)
        )
      )} PHA`,
    [miners]
  )

  return (
    <>
      <ModalHeader>Reclaim All Workers</ModalHeader>
      <ModalBody>
        <ParagraphSmall>
          Reclaim the releasing stake of miners in a pool
        </ParagraphSmall>
        <FormControl label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormControl>

        <FormControl label="Worker Public Keys">
          <ParagraphSmall as="div">
            {miners.map((miner, index) => (
              <>
                <StatefulTooltip
                  content={miner.workerPublicKey}
                  key={miner.workerPublicKey}
                >
                  {trimAddress(miner.workerPublicKey)}
                </StatefulTooltip>
                {index !== miners.length - 1 && ', '}
              </>
            ))}
          </ParagraphSmall>
        </FormControl>

        <FormControl label="Reclaimable Stake">
          <ParagraphSmall as="div">{reclaimableStake}</ParagraphSmall>
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={onConfirm}>Confirm</ModalButton>
      </ModalFooter>
    </>
  )
}

export default ReclaimAllModalBody
