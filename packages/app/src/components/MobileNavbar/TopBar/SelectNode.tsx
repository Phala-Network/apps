import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useCustomEndpointAtom} from '@phala/app-store'
import {Drawer, ANCHOR, SIZE} from 'baseui/drawer'
import CheckIcon from '../../../icons/check.svg'
import Khala from '../../../icons/khala_new.svg'
import useCustomEndpoint from '../../../hooks/useCustomEndpoint'
import {LineWrap} from '../../Navbar/styledComponent'

const NodeName = styled.span`
  flex: 1;
  text-align: center;
`

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 7px;
  width: 36px;
  height: 36px;
  background-color: #000;
`

type NodeType = {name: string; address: string}
const NODES: NodeType[] = [
  {name: 'Khala via Phala', address: 'wss://khala-api.phala.network/ws'},
  {
    name: 'Khala via Onfinality',
    address: 'wss://khala.api.onfinality.io/public-ws',
  },
]

const SelectNode: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const urlEndpoint = useCustomEndpoint()
  const [customEndpoint, setCustomEndpoint] = useCustomEndpointAtom()

  useEffect(() => {
    if (urlEndpoint) {
      setCustomEndpoint(urlEndpoint)
    }
  }, [urlEndpoint, setCustomEndpoint])

  const handleClick = (item: NodeType) => {
    setCustomEndpoint(item.address)
    setIsOpen(false)
  }

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        <Khala width="36" height="36" viewBox="1190 1190 80 80" />
      </Button>
      <Drawer
        isOpen={isOpen}
        autoFocus
        animate={true}
        anchor={ANCHOR.bottom}
        size={SIZE.auto}
        closeable={false}
        onBackdropClick={() => setIsOpen(false)}
        overrides={{
          Root: {
            style: () => ({
              zIndex: 999999,
            }),
          },
          DrawerBody: {
            style: () => ({
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }),
          },
        }}
      >
        {NODES.map((item) => (
          <LineWrap
            key={item.name}
            onClick={() => {
              handleClick(item)
            }}
          >
            <NodeName>{item.name}</NodeName>
            {customEndpoint === item.address ? <CheckIcon /> : null}
          </LineWrap>
        ))}
      </Drawer>
    </div>
  )
}

export default SelectNode