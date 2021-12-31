import {css} from 'styled-components'

export default css`
  ::-webkit-scrollbar {
    width: 24px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 4px 4px #cecece;
    border-left: solid 20px transparent;
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 4px 4px #111111;
    border-left: solid 20px transparent;
  }
`
