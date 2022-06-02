import {ChainId, CHAINS} from '@/config/chain'
import {
  Box,
  MenuItem,
  TextField,
  TextFieldProps,
  Typography,
  useTheme,
} from '@mui/material'
import {FC, useEffect} from 'react'

const shouldShowTest =
  process.env.NODE_ENV === 'development' ||
  process.env.CONTEXT === 'branch-deploy' ||
  process.env.CONTEXT === 'deploy-preview'

const ChainSelect: FC<
  {
    chainIds: ChainId[]
  } & TextFieldProps
> = ({chainIds, ...props}) => {
  const theme = useTheme()

  useEffect(() => {
    // Preload chain icons
    chainIds.forEach((chainId) => {
      const {icon, isTest} = CHAINS[chainId]
      if (!shouldShowTest && isTest) return
      const image = new Image()
      image.src = icon
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

        if (!shouldShowTest && isTest) {
          return null
        }

        return (
          <MenuItem key={chainId} value={chainId} sx={{py: 2}}>
            <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
              <img
                css={{flex: 'none', width: 20, height: 20, display: 'block'}}
                src={icon}
              />
              <Typography
                variant="body1"
                component="span"
                sx={{
                  ml: 1,
                  lineHeight: 1,
                  ...(isTest && {color: theme.palette.warning.main}),
                }}
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
