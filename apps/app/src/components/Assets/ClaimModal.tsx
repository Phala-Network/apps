import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {useAllBalances} from '@phala/react-hooks'
import {
  bnToDecimal,
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
  waitSignAndSend,
} from '@phala/react-libs'
import {useCurrentAccount} from '@phala/store'
import {BN} from '@polkadot/util'
import {Block} from 'baseui/block'
import {ModalBody, ModalButton, ModalFooter, ModalHeader} from 'baseui/modal'
import {toaster} from 'baseui/toast'
import React, {useCallback, useMemo, useState} from 'react'

type Props = {
  onClose: () => void
}

const ClaimModal: React.FC<Props> = ({onClose}) => {
  const [loading, setLoading] = useState(false)
  const {api} = useApiPromise()
  const [currentAccount] = useCurrentAccount()
  const allBalances = useAllBalances(currentAccount?.address)
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const {vestingLocked, vestedClaimable, vestedBalance} = allBalances || {}

  const format = useCallback<(bn: BN | undefined) => string>(
    (bn) => {
      // HACK: derived vestedClaimable may be negative
      if (bn?.isNeg()) return '0'

      if (bn && decimals) {
        return bnToDecimal(bn, decimals).toString()
      }
      return '-'
    },
    [decimals]
  )

  const extrinsic = useMemo(() => {
    if (!api) return

    return api.tx.vesting?.vest?.()
  }, [api])

  const submit = () => {
    if (api && extrinsic && currentAccount?.wallet?.signer) {
      setLoading(true)

      waitSignAndSend({
        account: currentAccount.address,
        api,
        extrinsic,
        signer: currentAccount.wallet.signer,
      })
        .then(() => {
          toaster.positive('Success', {})
          onClose()
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }

  const canClaim = Boolean(vestedClaimable) && !vestedClaimable?.isZero()

  return (
    <>
      <ModalHeader>Claim PHA</ModalHeader>
      <ModalBody>
        You have unlocked{' '}
        {format(vestedClaimable && vestedBalance?.sub(vestedClaimable))} PHA,
        you still have {format(vestingLocked)} PHA to be unlocked.
        {!canClaim && (
          <Block marginTop="scale800">
            Claim now: {format(vestedClaimable)} PHA
          </Block>
        )}
      </ModalBody>

      <ModalFooter>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <PhalaStakePoolTransactionFeeLabel action={extrinsic} />
          <ModalButton disabled={loading || !canClaim} onClick={submit}>
            Claim
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default ClaimModal
