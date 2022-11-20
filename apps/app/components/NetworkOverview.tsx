import {Box, Divider, Stack, Typography} from '@mui/material'
import {FC, useMemo} from 'react'

const NetworkOverview: FC = () => {
  const items = useMemo<[string, string][]>(() => {
    return [
      ['Total Delegation', '131M'],
      ['Stake Ratio', '44.3%'],
      ['Daily Rewards', '563K'],
      ['Avg APR', '61.4%'],
    ]
  }, [])

  return (
    // <Box>
    //   <Stack
    //     direction={{sm: 'row'}}
    //     spacing={{xs: 1, md: 5}}
    //     alignItems={{sm: 'center'}}
    //   >
    //     <Typography
    //       variant="body1"
    //       component="div"
    //       color="primary"
    //       fontWeight="500"
    //       borderRadius={1}
    //       flexShrink="0"
    //       px={{xs: 1, md: 2.5}}
    //       py={{xs: 1, md: 2}}
    //       sx={{background: alpha(theme.palette.primary.main, 0.2)}}
    //     >
    //       Network Overview
    //     </Typography>
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
    //   </Stack>
    // </Box>
  )
}

export default NetworkOverview
