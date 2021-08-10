import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { useAtom } from 'jotai'
import Alert from './Alert'
import Modal from './Modal'
import Button from './Button'
import useAllBalances from '../hooks/useAllBalances'
import { useApiPromise } from '../libs/polkadot/hooks/useApiPromise'
import { useDecimalJsTokenDecimalMultiplier } from '../libs/polkadot/useTokenDecimals'
import { bnToDecimal } from '../libs/polkadot/utils/balances'
import { vest } from '../libs/polkadot/extrinsics/vest'
import polkadotAccountAtom from '../atoms/polkadotAccountAtom'
import { BN } from '@polkadot/util'

type Props = {
  visible: boolean
  onClose: () => void
}

const Text = styled.div`
  font-family: Lato;
  font-size: 12px;
  color: #878787;
  margin-bottom: 20px;
`

const Info = styled.div`
  font-size: 12px;
  margin-top: 32px;
  font-family: PT Mono;

  span {
    font-family: Lato;
    font-weight: bold;
  }
`

const ClaimModal: React.FC<Props> = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false)
  const allBalances = useAllBalances()
  const { api } = useApiPromise()
  const polkadotAccount = useAtom(polkadotAccountAtom)[0]?.address
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const { vestingLocked, vestedClaimable, vestedBalance } = allBalances || {}

  const format = useCallback<(bn: BN | undefined) => string>(
    (bn) => {
      if (bn && decimals) {
        return bnToDecimal(bn, decimals).toString()
      }
      return '-'
    },
    [decimals]
  )

  const confirm = useCallback(() => {
    if (api && polkadotAccount) {
      setLoading(true)
      vest({ api, sender: polkadotAccount })
        .then(() => {
          toast('Success')
          onClose()
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [api, polkadotAccount, onClose])

  // NOTE: Temporarily disable claim
  const canClaim = false
  // const canClaim = Boolean(vestedClaimable) && vestedClaimable !== '0'

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Claim PHA"
      actions={[
        <Button onClick={onClose} key="reject">
          Cancel
        </Button>,
        <Button
          disabled={loading || !canClaim}
          onClick={confirm}
          key="confirm"
          type="primary">
          {loading ? 'Confirming' : 'Confirm'}
        </Button>,
      ]}>
      <Text>
        You have unlocked{' '}
        {format(vestedClaimable && vestedBalance?.sub(vestedClaimable))} PHA,
        you still have {format(vestingLocked)} PHA to be unlocked.
      </Text>
      <Alert>
        Sorry, the claim module is disabled until Khala enables transfer
        function.
      </Alert>
      {canClaim && (
        <Info>
          <span>Claim now:</span> {format(vestedClaimable)} PHA
        </Info>
      )}
    </Modal>
  )
}

export default ClaimModal
