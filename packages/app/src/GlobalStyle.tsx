import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Lato;
    margin: 0;
    padding: 0;
    background: #ECECEC;
    -webkit-tap-highlight-color: transparent;
  }

  a {
    text-decoration: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export default GlobalStyle
