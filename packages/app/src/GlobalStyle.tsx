import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Lato;
    margin: 0;
    padding: 0;
    background: #ECECEC;
    -webkit-tap-highlight-color: transparent;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    outline: none;
  }
`

export default GlobalStyle
