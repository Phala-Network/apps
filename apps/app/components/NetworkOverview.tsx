import {subsquidClient} from '@/lib/graphql'
import {useGlobalStateQuery} from '@/lib/subsquidQuery'
import {Box, Divider, Stack, Typography} from '@mui/material'
import Decimal from 'decimal.js'
import {FC, useMemo} from 'react'

const NetworkOverview: FC = () => {
  const {data} = useGlobalStateQuery(subsquidClient)
  const {totalValue} = data?.globalStateById || {}
  const items = useMemo<[string, string | undefined][]>(() => {
    return [
      [
        'Total Value',
        totalValue &&
          Intl.NumberFormat('en-US', {
            notation: 'compact',
            maximumFractionDigits: 2,
          }).format(BigInt(new Decimal(totalValue).floor().toString())),
      ],
      ['Stake Ratio', ''],
      ['Daily Rewards', ''],
      ['Avg APR', ''],
    ]
  }, [totalValue])

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
