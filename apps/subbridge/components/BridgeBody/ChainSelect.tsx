import {ChainId, CHAINS} from '@/config/chain'
import {
  Box,
  MenuItem,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material'
import {FC, useEffect} from 'react'

const ChainSelect: FC<
  {
    chainIds: ChainId[]
  } & TextFieldProps
> = ({chainIds, ...props}) => {
  useEffect(() => {
    // Preload chain icons
    chainIds.forEach((chainId) => {
      const {icon} = CHAINS[chainId]
      const image = new Image()
      image.src = icon.src
    })
  }, [chainIds])

  return (
    <TextField
      select
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        inputProps: {
          sx: {display: 'flex', alignItems: 'center'},
        },
      }}
      {...props}
    >
      {chainIds.map((chainId) => {
        const {icon, name, isTest} = CHAINS[chainId]

        if (
          !(
            process.env.NODE_ENV === 'development' ||
            process.env.CONTEXT === 'branch-deploy' ||
            process.env.CONTEXT === 'deploy-preview'
          ) &&
          isTest
        ) {
          return null
        }

        return (
          <MenuItem key={chainId} value={chainId} sx={{py: 2}}>
            <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
              <img css={{flex: 'none', width: 20, height: 20}} src={icon.src} />
              <Typography
                variant="body1"
                component="span"
                sx={{ml: 1, lineHeight: 1}}
              >
                {name}
              </Typography>
            </Box>
          </MenuItem>
        )
      })}
    </TextField>
  )
}

export default ChainSelect
