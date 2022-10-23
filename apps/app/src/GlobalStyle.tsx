import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: system-ui, sans-serif;
    margin: 0;
    padding: 0;
    background: #EFEFEF;
    -webkit-tap-highlight-color: transparent;
  }

  a {
    text-decoration: none;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  // HACK: baseui form label does not use font preset in theme
  label[data-baseweb=form-control-label] {
    font-weight: 600;
  }

  div[data-baseweb=table-builder-semantic] {
    th {
      font-weight: 600;
    }
  }
`

export default GlobalStyle
