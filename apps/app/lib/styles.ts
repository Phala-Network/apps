import type {SerializedStyles} from '@emotion/react'
import {type Theme, css} from '@mui/material'
import {barlow} from './theme'

export const globalStyles = (theme: Theme): SerializedStyles => css`
  * {
    min-width: 0;
  }

  body {
    min-height: 100vh;
    background-image: linear-gradient(
      to bottom,
      #1f222e 0%,
      #1f222e 200px,
      ${theme.palette.background.default} 580px
    );
    /* background-attachment: fixed; */

    ${theme.breakpoints.down('sm')} {
      background-image: linear-gradient(
        to bottom,
        #1f222e 0%,
        #1f222e 100px,
        ${theme.palette.background.default} 300px
      );
    }
  }

  .notistack-containerAnchorOriginTopRight {
    top: 112px !important;
  }

  sub {
    font-size: 62.5%;
    vertical-align: baseline;
    margin-left: 0.25em;
  }

  .recharts-cartesian-axis-tick-value {
    font-size: 0.75rem;
    font-family: ${barlow.style.fontFamily};
  }

  .recharts-tooltip-wrapper:focus-visible {
    outline: none;
  }
`
