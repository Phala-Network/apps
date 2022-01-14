import {usePolkadotAccountAtom} from '@phala/app-store'
import {
  PhalaStakePoolTransactionFeeLabel,
  ModalWrapper,
  ModalTitleWrapper,
  ModalFooterWrapper,
  ModalButtonWrapper,
} from '@phala/react-components'
import {useAllBalances} from '@phala/react-hooks'
import {
  bnToDecimal,
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
  vest,
} from '@phala/react-libs'
import {BN} from '@polkadot/util'
import React, {useCallback, useMemo, useState} from 'react'
import {toast} from 'react-toastify'
import styled from 'styled-components'

type Props = {
  visible: boolean
  onClose: () => void
}

const Text = styled.div`
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
const Spacer = styled.div`
  margin-top: 20px;
`
const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
`

const ClaimModal: React.FC<Props> = ({visible, onClose}) => {
  const [loading, setLoading] = useState(false)
  const {api} = useApiPromise()
  const polkadotAccount = usePolkadotAccountAtom()[0]?.address
  const allBalances = useAllBalances(polkadotAccount)
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const {vestingLocked, vestedClaimable, vestedBalance} = allBalances || {}

  const format = useCallback<(bn: BN | undefined) => string>(
    (bn) => {
      if (bn && decimals) {
        return bnToDecimal(bn, decimals).toString()
      }
      return '-'
    },
    [decimals]
  )

  const action = useMemo(() => {
    if (!api) return

    return api.tx.vesting.vest()
  }, [api])

  const confirm = useCallback(() => {
    if (api && polkadotAccount) {
      setLoading(true)

      vest({api, sender: polkadotAccount})
        .then(() => {
          toast('Success')
          onClose()
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [api, polkadotAccount, onClose])

  const canClaim = Boolean(vestedClaimable) && !vestedClaimable?.isZero()

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <ModalTitleWrapper>Claim PHA</ModalTitleWrapper>
      <Text>
        You have unlocked{' '}
        {format(vestedClaimable && vestedBalance?.sub(vestedClaimable))} PHA,
        you still have {format(vestingLocked)} PHA to be unlocked.
      </Text>

      {canClaim && (
        <Info>
          <span>Claim now:</span> {format(vestedClaimable)} PHA
        </Info>
      )}
      <Spacer></Spacer>
      <PhalaStakePoolTransactionFeeLabel action={action} />
      <ModalFooterWrapper>
        <ButtonContainer>
          <ModalButtonWrapper onClick={onClose}>Cancel</ModalButtonWrapper>
          <ModalButtonWrapper
            disabled={loading || !canClaim}
            onClick={confirm}
            type="submit"
          >
            {loading ? 'Confirming' : 'Confirm'}
          </ModalButtonWrapper>
        </ButtonContainer>
      </ModalFooterWrapper>
    </ModalWrapper>
  )
}

export default ClaimModal
