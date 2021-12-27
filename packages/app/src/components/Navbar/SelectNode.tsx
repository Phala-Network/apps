import {useState} from 'react'
import styled from 'styled-components'
import {useCustomEndpointAtom} from '@phala/app-store'
import Arrow from '../../icons/top_point.png'
import DropdownIcon from '../../icons/dropdown.svg'

const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 200px;
  padding: 10px;
  background: #cecece;
  border: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;

  &:after {
    content: '';
    height: 10px;
    width: 100%;
    background-color: transparent;
    position: absolute;
    top: 100%;
    left: 0;
  }

  span {
    flex: 1;
  }
`

const LineWrap = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 20px;
  white-space: nowrap;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  color: #111111;

  :not(:last-of-type) {
    border-bottom: 1px solid #cecece;
  }

  :hover {
    background-color: #d1ff52;
  }
`
const Popover = styled.div`
  display: inline-block;
  position: relative;

  .popover-container {
    opacity: 0;
    position: absolute;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.2s;
    z-index: 300;
    left: 50%;
    top: 100%;
    background-color: #eeeeee;
    border: 1px solid #aad829;
    margin-top: 10px;

    &:before {
      content: url(${Arrow});
      display: inline-block;
      z-index: 9999;
      transform: scale(0.3);
      position: absolute;
      top: -22px;
      right: 55px;
    }
  }

  *:focus + .popover-container,
  :hover .popover-container {
    display: block;
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
`
type NodeType = {name: string; address: string}
const NODES: NodeType[] = [
  {name: 'Khala via Phala', address: 'wss://khala-api.phala.network/ws'},
  {
    name: 'Khala via Onfinality',
    address: 'wss://khala.api.onfinality.io/public-ws',
  },
]

const SelectNode = (): JSX.Element => {
  const [node, setNode] = useState('Khala via Phala')

  const [, setCustomEndpoint] = useCustomEndpointAtom()

  const handleClick = (item: NodeType) => {
    setNode(item.name)
    setCustomEndpoint(item.address)
  }

  return (
    <Popover>
      <Button>
        <span>{node}</span>
        <DropdownIcon />
      </Button>
      <div className="popover-container">
        {NODES.map((item) => (
          <LineWrap key={item.name} onClick={() => handleClick(item)}>
            {item.name}
          </LineWrap>
        ))}
      </div>
    </Popover>
  )
}

export default SelectNode
