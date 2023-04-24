import {type Chain} from '@/lib/fetchConfig'
import {MenuItem, TextField, type TextFieldProps} from '@mui/material'
import {type FC} from 'react'

// const shouldShowTest =
//   process.env.NODE_ENV === 'development' ||
//   process.env.CONTEXT === 'branch-deploy' ||
//   process.env.CONTEXT === 'deploy-preview'

const ChainSelect: FC<
  {
    chain: Chain
    chains: Chain[]
  } & TextFieldProps
> = ({chain, chains, ...props}) => {
  return (
    <TextField
      value={chain.id}
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
      {chains.map(({id, name}) => {
        return (
          <MenuItem key={id} value={id} sx={{py: 2}}>
            {/* <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
              <Typography
                variant="body1"
                component="span"
                sx={{ml: 1, lineHeight: 1}}
              > */}
            {name}
            {/* </Typography> */}
            {/* </Box> */}
          </MenuItem>
        )
      })}
    </TextField>
  )
}

export default ChainSelect
