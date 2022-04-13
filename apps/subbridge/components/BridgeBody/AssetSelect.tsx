import {AssetId, ASSETS} from '@/config/asset'
import {
  Box,
  MenuItem,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material'
import {FC} from 'react'

const AssetSelect: FC<
  {
    assetIds: AssetId[]
  } & TextFieldProps
> = ({assetIds, ...props}) => {
  return (
    <TextField
      select
      variant="standard"
      InputProps={{
        disableUnderline: true,
      }}
      inputProps={{
        sx: {
          pl: 1,
          py: 1,
        },
      }}
      {...props}
    >
      {assetIds.map((assetId) => {
        const {icon, symbol} = ASSETS[assetId]
        return (
          <MenuItem key={assetId} value={assetId} sx={{py: 1}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <img
                css={{width: 22, height: 22, flex: 'none', borderRadius: '50%'}}
                src={icon.src}
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
