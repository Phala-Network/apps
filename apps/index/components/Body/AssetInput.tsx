import {type Asset} from '@/config/common'
import {TextField, type TextFieldProps} from '@mui/material'
import {type FC} from 'react'
import AssetSelect from './AssetSelect'

const getDecimalPattern = (decimals: number): string =>
  `^[0-9]+\\.?[0-9]{0,${decimals}}$`

const AssetInput: FC<
  TextFieldProps & {
    assets: Asset[]
    asset: Asset
    amount: string
    setAmount?: (value: string) => void
    setAsset: (id: string) => void
  }
> = ({assets, asset, amount, setAmount, setAsset, ...props}) => {
  return (
    <TextField
      spellCheck={false}
      fullWidth
      placeholder="0.0"
      value={amount}
      inputProps={{
        inputMode: 'decimal',
        pattern: getDecimalPattern(asset.decimals),
        sx: {fontWeight: 600},
      }}
      InputProps={{
        endAdornment: (
          <AssetSelect
            sx={{flex: 'none'}}
            assets={assets}
            asset={asset}
            setAsset={setAsset}
          />
        ),
      }}
      onChange={(e) => {
        if (!e.target.validity.patternMismatch) {
          setAmount?.(e.target.value)
        }
      }}
      {...props}
    />
  )
}

export default AssetInput
