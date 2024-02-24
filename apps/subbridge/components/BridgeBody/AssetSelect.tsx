import {ASSETS, type AssetId} from '@/config/asset'
import {assetAtom} from '@/store/bridge'
import {
  Box,
  MenuItem,
  TextField,
  type TextFieldProps,
  Typography,
} from '@mui/material'
import {useAtom} from 'jotai'
import {type FC, useEffect} from 'react'

const AssetSelect: FC<TextFieldProps & {assetIds: AssetId[]}> = ({
  assetIds,
  ...props
}) => {
  const [asset, setAsset] = useAtom(assetAtom)
  useEffect(() => {
    // Preload asset icons
    for (const assetId of assetIds) {
      const {icon} = ASSETS[assetId]
      const image = new Image()
      image.src = icon
    }
  }, [assetIds])

  return (
    <TextField
      value={asset.id}
      onChange={(e) => {
        setAsset(e.target.value as AssetId)
      }}
      select
      variant="standard"
      inputProps={{sx: {pl: 1, py: 1}}}
      {...props}
    >
      {assetIds.map((assetId) => {
        const {icon, symbol} = ASSETS[assetId]
        return (
          <MenuItem key={assetId} value={assetId} sx={{py: 1}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <img
                css={{width: 22, height: 22, flex: 'none', borderRadius: '50%'}}
                src={icon}
                alt={symbol}
              />
              <Typography variant="body1" component="span" sx={{ml: 1}}>
                {symbol}
              </Typography>
            </Box>
          </MenuItem>
        )
      })}
    </TextField>
  )
}

export default AssetSelect
