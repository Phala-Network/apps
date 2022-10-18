import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {formatCurrency, trimAddress} from '@phala/utils'
import {Block} from 'baseui/block'
import {FormControl} from 'baseui/form-control'
import {
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from 'baseui/modal'
import {StatefulTooltip} from 'baseui/tooltip'
import {ParagraphSmall} from 'baseui/typography'
import Decimal from 'decimal.js'
import {FC, useMemo, useState} from 'react'
import {StakePool} from '../../hooks/subsquid'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'

const ReclaimAllModalBody: FC<
  {
    stakePool: Pick<StakePool, 'pid'> & Partial<Pick<StakePool, 'miners'>>
  } & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid, miners} = stakePool
  const {api} = useApiPromise()
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
  const reclaimableStake = useMemo(
    () =>
      miners
        ? `${formatCurrency(
            miners.reduce(
              (acc, cur) => acc.add(new Decimal(cur.stake)),
              new Decimal(0)
            )
          )} PHA`
        : '',
    [miners]
  )

  const extrinsic = useMemo(() => {
    if (api && decimals && miners) {
      return api.tx.utility.batch(
        miners.map(({worker}) =>
          api.tx.phalaStakePool?.reclaimPoolWorker?.(pid, worker?.id)
        ) as any // FIXME: remove any when polkadot types is ready
      )
    }
  }, [api, decimals, miners, pid])

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
                  content={miner.worker?.id}
                  key={miner.worker?.id}
                >
                  {trimAddress(miner.worker?.id || '')}
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
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <PhalaStakePoolTransactionFeeLabel action={extrinsic} />
          <ModalButton disabled={confirmLock} onClick={onConfirm}>
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default ReclaimAllModalBody
