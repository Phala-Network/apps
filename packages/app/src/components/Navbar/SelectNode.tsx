import {useEffect} from 'react'
import styled from 'styled-components'
import {down} from 'styled-breakpoints'
import {useCustomEndpointAtom} from '@phala/app-store'
import {StatefulPopover, PLACEMENT} from 'baseui/popover'
import DropdownIcon from '../../icons/dropdown.svg'
import CheckIcon from '../../icons/check.svg'
import useCustomEndpoint from '../../hooks/useCustomEndpoint'
import {LineWrap} from './styledComponent'

const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 119px;
  height: 36px;
  padding: 10px 16px 10px 26px;
  background: #eeeeee;
  border: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  transition: all 0.2s;
  margin-right: 20px;

  :hover,
  :focus {
    background: #d1ff52;
  }

  ${down('lg')} {
    width: 100px;
    padding: 10px 8px 10px 13px;
    font-size: 14px;
    line-height: 14px;
    margin-right: 10px;
  }
`

const NodeName = styled.span`
  margin-right: 25px;
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

  const handleClick = (item: NodeType) => {
    setCustomEndpoint(item.address)
  }

  return (
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
              <NodeName>{item.name}</NodeName>
              {customEndpoint === item.address ? <CheckIcon /> : null}
            </LineWrap>
          ))}
        </>
      )}
      placement={PLACEMENT.bottom}
      showArrow
      overrides={{
        Arrow: {
          style: {
            outline: `1px #aad829 solid`,
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
        <span>Khala</span>
        <DropdownIcon />
      </Button>
    </StatefulPopover>
  )
}

export default SelectNode
