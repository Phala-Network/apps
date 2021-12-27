import {useEffect, useMemo} from 'react'
import styled from 'styled-components'
import {useCustomEndpointAtom} from '@phala/app-store'
import {StatefulPopover, PLACEMENT} from 'baseui/popover'
import DropdownIcon from '../../icons/dropdown.svg'
import useCustomEndpoint from '../../hooks/useCustomEndpoint'

const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 200px;
  padding: 10px;
  background: #eeeeee;
  border: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  transition: all 0.2s;

  :hover,
  :focus {
    background: #cecece;
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

type NodeType = {name: string; address: string}
const NODES: NodeType[] = [
  {name: 'Khala via Phala', address: 'wss://khala-api.phala.network/ws'},
  {
    name: 'Khala via Onfinality',
    address: 'wss://khala.api.onfinality.io/public-ws',
  },
]

const SelectNode = (): JSX.Element => {
  const urlEndpoint = useCustomEndpoint()
  const [customEndpoint, setCustomEndpoint] = useCustomEndpointAtom()

  useEffect(() => {
    if (urlEndpoint) {
      setCustomEndpoint(urlEndpoint)
    }
  }, [urlEndpoint, setCustomEndpoint])

  const nodeName = useMemo(() => {
    const selectedNode = NODES.find((item) => item.address === customEndpoint)
    if (selectedNode) return selectedNode.name
    return ''
  }, [customEndpoint])

  const handleClick = (item: NodeType) => {
    setCustomEndpoint(item.address)
  }

  return (
    <div>
      <StatefulPopover
        content={({close}) => (
          <>
            {NODES.map((item) => (
              <LineWrap
                key={item.name}
                onClick={() => {
                  handleClick(item)
                  close()
                }}
              >
                {item.name}
              </LineWrap>
            ))}
          </>
        )}
        placement={PLACEMENT.bottom}
        showArrow
        overrides={{
          Arrow: {
            style: {
              outline: `#aad829 solid`,
              backgroundColor: '#aad829',
            },
          },
          Body: {
            style: {
              outline: `1px #aad829 solid`,
              backgroundColor: '#eeeeee',
              boxShadow: 'none',
              zIndex: 200,
            },
          },
        }}
      >
        <Button>
          <span>{nodeName}</span>
          <DropdownIcon />
        </Button>
      </StatefulPopover>
    </div>
  )
}

export default SelectNode
