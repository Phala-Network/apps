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
`

export default GlobalStyle
