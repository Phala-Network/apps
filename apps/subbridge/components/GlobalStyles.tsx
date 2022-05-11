import {css, Global} from '@emotion/react'
import {Theme, useTheme} from '@mui/material'
import '@talisman-connect/components/talisman-connect-components.esm.css'
import '@talisman-connect/ui/talisman-connect-ui.esm.css'
import {FC, useEffect, useState} from 'react'

const talismanConnectStyles = (theme: Theme) => css`
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
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const background = css`
  body {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1394' height='167.3' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23BABABA' stroke-width='0.8' stroke-opacity='0.2'%3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E");
    background-position: center;
  }
`

const snackbarStyles = css`
  .SnackbarContent-root.SnackbarItem-contentRoot {
    box-shadow: none !important;
  }
`

const GlobalStyles: FC = () => {
  const theme = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Global
      styles={[
        talismanConnectStyles(theme),
        commonStyles,
        snackbarStyles,
        mounted && background,
      ]}
    />
  )
}

export default GlobalStyles
