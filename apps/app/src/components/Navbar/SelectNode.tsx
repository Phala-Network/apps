import styled from 'styled-components'
import {down} from 'styled-breakpoints'
import {StatefulPopover, PLACEMENT} from 'baseui/popover'
import DropdownIcon from '../../icons/dropdown.svg'
import CheckIcon from '../../icons/check.svg'
import {LineWrap} from './styledComponent'
import {NETWORK_NODES} from '../../config/networkNode'
import {useCurrentNetworkNode} from '../../store/networkNode'

const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  height: 36px;
  padding: 10px 10px 10px 16px;
  background: #eeeeee;
  border: none;
  font-family: Montserrat;
  font-style: normal;
  font-size: 16px;
  line-height: 16px;
  transition: all 0.2s;
  margin-right: 20px;

  & > span {
    margin-right: 12px;
  }

  :hover,
  :focus {
    background: #d1ff52;
  }

  ${down('lg')} {
    padding: 10px 8px 10px 12px;
    font-size: 14px;
    line-height: 14px;
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
            outline: `1px #aad829 solid`,
            backgroundColor: '#aad829',
          },
        },
        Body: {
          style: {
            outline: `1px #aad829 solid`,
            backgroundColor: '#eeeeee',
            boxShadow: 'none',
          },
        },
      }}
    >
      <Button>
        <span>
          {currentNetworkNode.id === 'phala-rewards-demo' ? 'Phala' : 'Khala'}
        </span>
        <DropdownIcon />
      </Button>
    </StatefulPopover>
  )
}

export default SelectNode
