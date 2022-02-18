import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ModalProps,
} from 'baseui/modal'
import {ParagraphSmall} from 'baseui/typography'
import {FormControl} from 'baseui/form-control'
import {formatCurrency, trimAddress} from '@phala/utils'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {useMemo, VFC} from 'react'
import Decimal from 'decimal.js'
import {StatefulTooltip} from 'baseui/tooltip'
import {StakePool} from '.'

const ReclaimAllModalBody: VFC<
  {
    stakePool: Pick<StakePool, 'pid'> & Partial<Pick<StakePool, 'miners'>>
  } & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid, miners} = stakePool
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const onConfirm = () => {
    if (api && decimals && miners) {
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
      miners
        ? `${formatCurrency(
            miners.reduce(
              (acc, cur) => acc.add(new Decimal(cur.stakes)),
              new Decimal(0)
            )
          )} PHA`
        : '',
    [miners]
  )

  if (!miners) return null

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
