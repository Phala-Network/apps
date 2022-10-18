import {PLACEMENT, StatefulPopover} from 'baseui/popover'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import {NETWORK_NODES} from '../../config/networkNode'
import CheckIcon from '../../icons/check.svg'
import DropdownIcon from '../../icons/dropdown.svg'
import {useCurrentNetworkNode} from '../../store/networkNode'
import {LineWrap} from './styledComponent'

const Button = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  padding: 0 6px 0 10px;
  background: #eeeeee;
  font-family: Montserrat;
  font-size: 16px;
  margin-right: 20px;

  & > span {
    margin-right: 4px;
  }

  :hover,
  :focus {
    background: #d1ff52;
  }

  ${down('xl')} {
    font-size: 14px;
    margin-right: 10px;
  }
`

const NodeName = styled.span`
  margin-right: 25px;
`

const SelectNode: React.FC = () => {
  const [currentNetworkNode, setCurrentNetworkNode] = useCurrentNetworkNode()

  return (
    <StatefulPopover
      content={({close}) => (
        <>
          {NETWORK_NODES.map(({id, name}) => (
            <LineWrap
              key={id}
              onClick={() => {
                setCurrentNetworkNode(id)
                close()
              }}
            >
              <NodeName>{name}</NodeName>
              {currentNetworkNode.id === id ? <CheckIcon /> : null}
            </LineWrap>
          ))}
        </>
      )}
      placement={PLACEMENT.bottom}
      showArrow
      overrides={{
        Arrow: {
          style: {
            border: `1px #aad829 solid`,
          },
        },
        Body: {
          style: {
            border: `1px #aad829 solid`,
            boxShadow: 'none',
          },
        },
      }}
    >
      <Button>
        <span>{currentNetworkNode.kind === 'phala' ? 'Phala' : 'Khala'}</span>
        <DropdownIcon />
      </Button>
    </StatefulPopover>
  )
}

export default SelectNode
