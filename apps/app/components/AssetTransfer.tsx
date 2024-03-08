import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {barlow} from '@/lib/theme'
import {chainAtom} from '@/store/common'
import {LoadingButton} from '@mui/lab'
import {
  Alert,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import {getDecimalPattern, toCurrency, validateAddress} from '@phala/lib'
import type {SubmittableExtrinsic} from '@polkadot/api/types'
import type {ISubmittableResult} from '@polkadot/types/types'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {type FC, useMemo, useState} from 'react'
import type {Asset} from './DashboardAssetList'
import Property from './Property'

const AssetTransfer: FC<{asset: Asset; onClose: () => void}> = ({
  asset,
  onClose,
}) => {
  const [chain] = useAtom(chainAtom)
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState('')
  const [amountString, setAmountString] = useState('')
  const transfer = (): void => {
    if (api == null) return
    const amount = new Decimal(amountString)
      .times(Decimal.pow(10, asset.decimals))
      .toHex()
    let extrinsic:
      | SubmittableExtrinsic<'promise', ISubmittableResult>
      | undefined
    if (asset.symbol === 'PHA') {
      extrinsic = api.tx.balances.transferKeepAlive(address, amount)
    } else {
      extrinsic = api.tx.assets.transferKeepAlive(
        asset.assetId,
        address,
        amount,
      )
    }
    setLoading(true)
    signAndSend(extrinsic)
      .then(onClose)
      .catch(() => {
        setLoading(false)
      })
  }
  const isValid: boolean = useMemo(() => {
    try {
      if (asset.balance == null) return false
      const amount = new Decimal(amountString)
      return (
        validateAddress(address) && amount.gt(0) && amount.lte(asset.balance)
      )
    } catch {
      return false
    }
  }, [amountString, address, asset])

  return (
    <>
      <DialogTitle>Transfer {asset.symbol}</DialogTitle>
      <DialogContent>
        <TextField
          label="Target Address"
          autoFocus
          disabled={loading}
          fullWidth
          multiline
          rows={2}
          value={address}
          size="small"
          onChange={(e) => {
            setAddress(e.target.value)
          }}
        />
        <TextField
          sx={{mt: 2}}
          label="Amount"
          disabled={loading}
          fullWidth
          placeholder="0.00"
          value={amountString}
          InputProps={{
            endAdornment: asset.symbol,
            sx: {fontFamily: barlow.style.fontFamily, fontWeight: 600},
          }}
          inputProps={{
            inputMode: 'decimal',
            pattern: getDecimalPattern(asset.decimals),
          }}
          size="small"
          onChange={(e) => {
            if (!e.target.validity.patternMismatch) {
              setAmountString(e.target.value)
            }
          }}
        />
        <Property label="Transferable" size="small" sx={{mt: 2}}>
          {asset.balance != null &&
            `${toCurrency(asset.balance)} ${asset.symbol}`}
        </Property>
        <Alert severity="warning" sx={{mt: 2}} icon={false}>
          You are transferring on{' '}
          <b>{chain === 'khala' ? 'Khala' : 'Phala'} Network</b>. Do not
          transfer to <b>hardware wallets</b>.
        </Alert>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="text"
          loading={loading}
          disabled={!isValid}
          onClick={transfer}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default AssetTransfer
