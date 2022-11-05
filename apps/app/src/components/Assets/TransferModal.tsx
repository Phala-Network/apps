import {usePolkadotAccountTransferrableBalanceDecimal} from '@phala/react-hooks'
import {useApiPromise} from '@phala/react-libs'
import {useCurrentAccount} from '@phala/store'
import {toFixed, validateAddress} from '@phala/utils'
import {Block} from 'baseui/block'
import {FormControl} from 'baseui/form-control'
import {Input} from 'baseui/input'
import {ModalBody, ModalButton, ModalFooter, ModalHeader} from 'baseui/modal'
import {Notification} from 'baseui/notification'
import Decimal from 'decimal.js'
import React, {useMemo, useState} from 'react'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {useCurrentNetworkNode} from '../../store/networkNode'
import {TransactionFeeLabel} from '../TransactionFeeLabel'
import {MaxButton} from './styledComponents'

type Props = {
  onClose: () => void
}

const TransferModal: React.FC<Props> = ({onClose}) => {
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const {api} = useApiPromise()
  const [polkadotAccount] = useCurrentAccount()
  const [currentNetworkNode] = useCurrentNetworkNode()
  const waitSignAndSend = useWaitSignAndSend()

  const polkadotAccountAddress = polkadotAccount?.address
  const polkadotTransferBalanceDecimal =
    usePolkadotAccountTransferrableBalanceDecimal(polkadotAccountAddress)
  const isShowMaxButton = polkadotTransferBalanceDecimal?.greaterThan('0.003')

  const transferrableValue = useMemo(() => {
    if (!polkadotTransferBalanceDecimal) return '-'
    return `${toFixed(polkadotTransferBalanceDecimal)} PHA`
  }, [polkadotTransferBalanceDecimal])

  const handleMax = () => {
    if (!polkadotTransferBalanceDecimal) return
    const maxValue = polkadotTransferBalanceDecimal.sub('0.003').toString()
    setAmount(maxValue)
  }

  const extrinsic = useMemo(() => {
    try {
      if (validateAddress(address) && api) {
        const amountString = new Decimal(amount).mul(1e12).toString()
        return api.tx.balances.transferKeepAlive(address, amountString)
      }
    } catch (error) {
      // noop
    }
  }, [address, amount, api])

  const submit = async () => {
    if (extrinsic) {
      try {
        await waitSignAndSend(extrinsic, (status) => {
          if (status.isReady) {
            onClose()
          }
        })
      } catch (e) {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <ModalHeader>Transfer PHA</ModalHeader>
      <ModalBody>
        <FormControl label="Wallet address">
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </FormControl>
        <FormControl label="Amount" caption={`Balance: ${transferrableValue}`}>
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            endEnhancer={() =>
              isShowMaxButton ? (
                <MaxButton onClick={handleMax}>Max</MaxButton>
              ) : null
            }
          />
        </FormControl>

        <Notification
          kind="warning"
          overrides={{
            Body: {style: {margin: 0, width: 'auto', fontSize: '14px'}},
          }}
        >
          You are transferring on{' '}
          <b>
            {currentNetworkNode.kind === 'khala' ? 'Khala' : 'Phala'} Network
          </b>
          . Do not transfer to <b>hardware wallets</b>.
        </Notification>
      </ModalBody>

      <ModalFooter>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <TransactionFeeLabel action={extrinsic} />
          <ModalButton
            disabled={loading || !extrinsic}
            onClick={() => {
              setLoading(true)
              submit()
            }}
          >
            Submit
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default TransferModal
