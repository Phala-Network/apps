import {usePolkadotAccountAtom} from '@phala/app-store'
import {Alert, Button, Modal} from '@phala/react-components'
import {useAllBalances} from '@phala/react-hooks'
import {useTranslation} from '@phala/react-i18n'
import {
  bnToDecimal,
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
  vest,
} from '@phala/react-libs'
import {BN} from '@polkadot/util'
import React, {useCallback, useState} from 'react'
import {toast} from 'react-toastify'
import styled from 'styled-components'

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

const ClaimModal: React.FC<Props> = ({visible, onClose}) => {
  const {t} = useTranslation()
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

  // NOTE: Temporarily disable claim
  const canClaim = false
  // const canClaim = Boolean(vestedClaimable) && vestedClaimable !== '0'

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={t('assets.claim_pha')}
      actions={[
        <Button onClick={onClose} key="reject">
          {t('assets.cancel')}
        </Button>,
        <Button
          disabled={loading || !canClaim}
          onClick={confirm}
          key="confirm"
          type="primary"
        >
          {loading ? t('assets.confirming') : t('assets.confirm')}
        </Button>,
      ]}
    >
      <Text>
        {t('assets.unlocked', {
          vestedClaimable: format(
            vestedClaimable && vestedBalance?.sub(vestedClaimable)
          ),
          vestingLocked: format(vestingLocked),
        })}
      </Text>
      <Alert>{t('assets.sorry')}</Alert>
      {canClaim && (
        <Info>
          <span>Claim now:</span> {format(vestedClaimable)} PHA
        </Info>
      )}
    </Modal>
  )
}

export default ClaimModal
