import {type Asset} from '@/lib/fetchConfig'
import {MenuItem, TextField, type TextFieldProps} from '@mui/material'
import {type FC} from 'react'

const AssetSelect: FC<
  TextFieldProps & {
    asset: Asset
    setAsset: (id: number | string) => void
    assets: Asset[]
  }
> = ({asset, setAsset, assets, ...props}) => {
  return (
    <TextField
      value={asset.id}
      onChange={(e) => {
        setAsset(e.target.value)
      }}
      select
      variant="standard"
      inputProps={{sx: {pl: 1, py: 1}}}
      {...props}
    >
      {assets.map(({id, symbol}) => {
        return (
          <MenuItem key={id} value={id} sx={{py: 1}}>
            {/* <Box sx={{display: 'flex', alignItems: 'center'}}> */}
            {/* <Typography variant="body1" component="span" sx={{ml: 1}}> */}
            {symbol}
            {/* </Typography> */}
            {/* </Box> */}
          </MenuItem>
        )
      })}
    </TextField>
  )
}

export default AssetSelect
