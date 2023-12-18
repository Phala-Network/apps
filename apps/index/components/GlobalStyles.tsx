import {type SerializedStyles} from '@emotion/react'
import {GlobalStyles, css, type Theme} from '@mui/material'
import '@typeform/embed/build/css/popup.css'
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
      ]}
    />
  )
}

export default CustomGlobalStyles
