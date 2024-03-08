import {Paper, Typography} from '@mui/material'
import {toCurrency} from '@phala/lib'
import type {ReactElement} from 'react'
import Property from './Property'

const RechartsTooltip = ({
  label,
  payload,
}: {
  label?: string
  payload?: Array<{
    name: string
    value: number | string
    payload: {name: string}
    unit: string
  }>
}): ReactElement | null => {
  if (payload?.[0] != null) {
    return (
      <Paper sx={{p: 1}}>
        <Typography variant="subtitle2">
          {label ?? payload[0].payload.name}
        </Typography>
        {payload.map(({name, value, unit}) => (
          <Property fullWidth size="small" label={name} key={name}>{`${
            unit === '%' ? value : toCurrency(value)
          }${unit ?? ''}`}</Property>
        ))}
      </Paper>
    )
  }

  return null
}

export default RechartsTooltip
