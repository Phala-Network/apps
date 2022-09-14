import {PolkadotTransactionFeeLabel} from '@phala/react-components'
import {usePolkadotAccountTransferrableBalanceDecimal} from '@phala/react-hooks'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
  waitSignAndSend,
} from '@phala/react-libs'
import {useCurrentAccount} from '@phala/store'
import {toFixed, validateAddress} from '@phala/utils'
import {Block} from 'baseui/block'
import {FormControl} from 'baseui/form-control'
import {Input} from 'baseui/input'
import {ModalBody, ModalButton, ModalFooter, ModalHeader} from 'baseui/modal'
import {Notification} from 'baseui/notification'
import {toaster} from 'baseui/toast'
import Decimal from 'decimal.js'
import React, {useMemo, useState} from 'react'
import {useCurrentNetworkNode} from '../../store/networkNode'
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
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [currentNetworkNode] = useCurrentNetworkNode()

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

  const submit = async () => {
    if (api && polkadotAccount && polkadotAccount.wallet?.signer && decimals) {
      let amountString: string

      if (!validateAddress(address)) {
        toaster.negative('Invalid address', {})
        return
      }

      try {
        amountString = new Decimal(amount).mul(decimals).toString()
      } catch (err) {
        toaster.negative('Invalid amount', {})
        return
      }

      try {
        await waitSignAndSend({
          account: polkadotAccount.address,
          api,
          extrinsic: api.tx.balances.transfer(address, amountString),
          signer: polkadotAccount.wallet.signer,
        })

        toaster.positive('Success', {})
        onClose()
      } catch (err) {
        toaster.negative((err as Error)?.message, {})
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
          <PolkadotTransactionFeeLabel
            key="PolkadotTransactionFeeLabel"
            sender={polkadotAccount?.address}
            recipient={address}
            amount={amount}
          />
          <ModalButton
            disabled={loading}
            onClick={() => {
              setLoading(true)
              submit().finally(() => setLoading(false))
            }}
          >
            {loading ? 'Submitting' : 'Submit'}
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default TransferModal
