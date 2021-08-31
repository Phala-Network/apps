import {Button} from '@phala/react-components'
import styled from 'styled-components'

const ActionButton = styled(Button).attrs({size: 'small'})`
  display: inline-block;

  & + & {
    margin-left: 5px;
  }
`

export default ActionButton
