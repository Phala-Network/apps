import {type SerializedStyles} from '@emotion/react'
import {
  GlobalStyles,
  alpha,
  css,
  darken,
  lighten,
  type Theme,
} from '@mui/material'
import {type FC} from 'react'

const talismanConnectStyles = (theme: Theme): SerializedStyles => css`
  :root {
    --talisman-connect-modal-z-index: ${theme.zIndex.modal};
    --talisman-connect-control-background: ${theme.palette.action.hover};
    --talisman-connect-control-foreground: ${theme.palette.text.primary};
    --talisman-connect-active-background: ${theme.palette.action.selected};
    --talisman-connect-active-foreground: ${theme.palette.text.primary};
    --talisman-connect-modal-background: ${theme.palette.background.default};
    --talisman-connect-modal-foreground: ${theme.palette.text.primary};
    --talisman-connect-modal-gutter: ${theme.spacing(3)};
    --talisman-connect-font-family: ${theme.typography.fontFamily};
    --talisman-connect-border-radius: ${theme.shape.borderRadius}px;
    --talisman-connect-modal-min-width: calc(100% - 2 * ${theme.spacing(2)});
  }
`

const commonStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const background = (theme: Theme): SerializedStyles => {
  const defaultBackground = theme.palette.background.default
  const line = alpha(theme.palette.action.disabled, 0.15)
  const verticalGap = 80
  const horizontalGap = 120
  return css`
    body {
      overflow-x: hidden;
      background: linear-gradient(
          to bottom,
          ${alpha(defaultBackground, 1)},
          ${alpha(defaultBackground, 1)} 300px,
          ${alpha(defaultBackground, 0)}
        ),
        repeating-linear-gradient(
          to top,
          transparent,
          transparent ${verticalGap - 1}px,
          ${line} ${verticalGap - 1}px,
          ${line} ${verticalGap}px
        ),
        repeating-linear-gradient(
          to left,
          transparent,
          transparent ${horizontalGap - 1}px,
          ${line} ${horizontalGap - 1}px,
          ${line} ${horizontalGap}px
        ),
        ${defaultBackground};

      ${theme.breakpoints.up('md')} {
        overflow: hidden;
        height: 100vh;
        background: linear-gradient(
            to right,
            ${alpha(defaultBackground, 1)},
            ${alpha(defaultBackground, 1)} 30%,
            ${alpha(defaultBackground, 0)}
          ),
          repeating-linear-gradient(
            to bottom,
            transparent,
            transparent ${verticalGap - 1}px,
            ${line} ${verticalGap - 1}px,
            ${line} ${verticalGap}px
          ),
          repeating-linear-gradient(
            to left,
            transparent,
            transparent ${horizontalGap - 1}px,
            ${line} ${horizontalGap - 1}px,
            ${line} ${horizontalGap}px
          ),
          ${theme.palette.mode === 'dark'
            ? lighten(defaultBackground, 0.08)
            : darken(defaultBackground, 0.08)};
      }
    }
  `
}

const snackbarStyles = css`
  .SnackbarContent-root.SnackbarItem-contentRoot {
    box-shadow: none !important;
  }
`

const CustomGlobalStyles: FC = () => {
  return (
    <GlobalStyles
      styles={(theme) => [
        commonStyles,
        talismanConnectStyles(theme),
        snackbarStyles,
        background(theme),
      ]}
    />
  )
}

export default CustomGlobalStyles
