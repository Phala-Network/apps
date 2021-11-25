import {usePolkadotAccountAtom} from '@phala/app-store'
import {Button, Input, Modal} from '@phala/react-components'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
  waitSignAndSend,
} from '@phala/react-libs'
import {validateAddress} from '@phala/utils'
import Decimal from 'decimal.js'
import React, {useCallback, useState} from 'react'
import {toast} from 'react-toastify'
import styled from 'styled-components'

type Props = {
  visible: boolean
  onClose: () => void
}

const Spacer = styled.div`
  margin-top: 20px;
`

const TransferModal: React.FC<Props> = ({visible, onClose}) => {
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const {api} = useApiPromise()
  const [polkadotAccount] = usePolkadotAccountAtom()
  // const allBalances = useAllBalances(polkadotAccount)
  const decimals = useDecimalJsTokenDecimalMultiplier(api)

  const confirm = useCallback(async () => {
    if (api && polkadotAccount && decimals) {
      let amountString: string
      if (!validateAddress(address)) {
        toast.error('Invalid address')
        return
      }
      try {
        amountString = new Decimal(amount).mul(decimals).toString()
      } catch (err) {
        toast.error('Invalid amount')
        return
      }

      try {
        const {web3FromAddress} = await import('@polkadot/extension-dapp')

        const signer = (await web3FromAddress(polkadotAccount.address)).signer
        await waitSignAndSend({
          account: polkadotAccount.address,
          api,
          extrinsic: api.tx.balances.transfer(address, amountString),
          signer,
        })
        toast.success('Success')
        onClose()
      } catch (err) {
        toast.error((err as Error)?.message)
      }
    }
  }, [api, polkadotAccount, onClose, address, amount, decimals])

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Transfer"
      actions={[
        <Button onClick={onClose} key="reject">
          Cancel
        </Button>,
        <Button
          disabled={loading}
          onClick={() => {
            setLoading(true)
            confirm().finally(() => setLoading(false))
          }}
          key="confirm"
          type="primary">
          {loading ? 'Confirming' : 'Confirm'}
        </Button>,
      ]}>
      <Input
        size="large"
        placeholder="Address"
        value={address}
        onChange={setAddress}></Input>
      <Spacer></Spacer>
      <Input
        size="large"
        after="PHA"
        placeholder="Amount"
        value={amount}
        onChange={setAmount}></Input>
    </Modal>
  )
}

export default TransferModal
