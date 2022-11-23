import {css} from '@mui/material'
import {theme} from './theme'

export const globalStyles = css`
  body {
    min-height: 100vh;
    background-image: linear-gradient(
      to bottom,
      #1f222e 0%,
      ${theme.palette.background.default} 580px
    );
    background-attachment: fixed;

    ${theme.breakpoints.down('sm')} {
      background-image: linear-gradient(
        to bottom,
        #1f222e 0%,
        ${theme.palette.background.default} 300px
      );
    }
  }

  sub {
    font-size: 50%;
    vertical-align: baseline;
    margin-left: 0.25rem;
  }
`
