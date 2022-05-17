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
import {useMemo, useState, VFC} from 'react'
import {StakePool} from '.'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'

const ReclaimAllModalBody: VFC<
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
              (acc, cur) => acc.add(new Decimal(cur.stakes)),
              new Decimal(0)
            )
          )} PHA`
        : '',
    [miners]
  )

  const extrinsic = useMemo(() => {
    if (api && decimals && miners) {
      return api.tx.utility.batch(
        miners.map(({workerPublicKey}) =>
          api.tx.phalaStakePool?.reclaimPoolWorker?.(pid, workerPublicKey)
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
