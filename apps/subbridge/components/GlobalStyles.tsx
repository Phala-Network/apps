import backgroundWaves from '@/assets/background_waves.svg'
import {Global, type SerializedStyles, css} from '@emotion/react'
import {type Theme, useTheme} from '@mui/material'
import {type FC, useEffect, useState} from 'react'

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
    --talisman-connect-modal-max-height: 100vh;
  }
`

const commonStyles = css`
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const background = (theme: Theme): SerializedStyles => css`
  body {
    background-image: url('${backgroundWaves}');
    background-position: bottom center;
    background-size: 100% auto;
    background-attachment: fixed;
    background-repeat: no-repeat;

    ${theme.breakpoints.down('md')} {
      background-size: 200% auto;
    }

    ${theme.breakpoints.up('xl')} {
      background-position: bottom -100px center;
    }
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
        mounted && background(theme),
      ]}
    />
  )
}

export default GlobalStyles
