'use client'

import type {Theme} from '@mui/material'

export const globalStyles = (theme: Theme) => ({
  '*': {
    minWidth: 0,
  },
  body: {
    minHeight: '100vh',
    backgroundImage: `linear-gradient(
      to bottom,
      #1f222e 0%,
      #1f222e 200px,
      ${theme.palette.background.default} 580px
    )`,
    [theme.breakpoints.down('sm')]: {
      backgroundImage: `linear-gradient(
        to bottom,
        #1f222e 0%,
        #1f222e 100px,
        ${theme.palette.background.default} 300px
      )`,
    },
  },
  '.notistack-containerAnchorOriginTopRight': {
    top: '90px !important',
  },
  sub: {
    fontSize: '62.5%',
    verticalAlign: 'baseline',
    marginLeft: '0.25em',
  },
  '.recharts-cartesian-axis-tick-value': {
    fontSize: '0.75rem',
  },
  '.recharts-tooltip-wrapper:focus-visible': {
    outline: 'none',
  },
})
