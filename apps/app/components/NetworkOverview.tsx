import {Box, Divider, Stack, Typography} from '@mui/material'
import {FC, useMemo} from 'react'

const NetworkOverview: FC = () => {
  const items = useMemo<[string, string][]>(() => {
    return [
      ['Total Value', '131M'],
      ['Stake Ratio', '44.3%'],
      ['Daily Rewards', '563K'],
      ['Avg APR', '61.4%'],
    ]
  }, [])

  return (
    <Stack
      direction="row"
      spacing={{xs: 1.5, sm: 3}}
      divider={<Divider orientation="vertical" flexItem />}
    >
      {items.map(([label, value]) => (
        <Box key={label} flexShrink={0}>
          <Typography
            variant="subtitle2"
            display={{xs: 'none', sm: 'block'}}
            component="div"
          >
            {label}
          </Typography>
          <Typography variant="caption" display={{sm: 'none'}} component="div">
            {label}
          </Typography>
          <Typography
            variant="num3"
            display={{xs: 'none', sm: 'block'}}
            component="div"
            color="primary"
          >
            {value}
          </Typography>
          <Typography
            variant="num6"
            display={{sm: 'none'}}
            component="div"
            color="primary"
          >
            {value}
          </Typography>
        </Box>
      ))}
    </Stack>
  )
}

export default NetworkOverview
