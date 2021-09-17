import {Dropdown} from '@phala/react-components'
import styled from 'styled-components'
import MoreIcon from '../icons/more.svg'

const MoreButton = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 8px;
`

type Props = {
  items: Array<{key: string; item: string; disabled?: boolean}>
  onClick: (key: string) => void
}

const ItemMenu = (props: Props): JSX.Element => (
  <Dropdown
    items={props.items}
    onClick={(key) => {
      props.onClick(key)
    }}
  >
    <MoreButton>
      <MoreIcon></MoreIcon>
    </MoreButton>
  </Dropdown>
)

export default ItemMenu
