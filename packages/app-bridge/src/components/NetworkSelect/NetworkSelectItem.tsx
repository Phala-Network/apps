import {FC} from 'react'
import styled from 'styled-components'
import {NetworkIcon, NetworkIconProps} from '../NetworkIcon'

type Props = {
  id: string
  isValue?: boolean
}

const Root = styled.div<{isValue?: boolean}>`
  display: flex;
  align-items: center;
  color: white;
  user-select: none;

  &:hover {
    color: ${(props) => (props.isValue ? 'white' : 'black')};
  }
`

const Name = styled.div`
  text-align: center;
  font-weight: normal;
  margin-left: 10px;
  flex: 1;
`

export const NetworkSelectItem: FC<Props> = (props) => {
  const {id, isValue} = props

  return (
    <Root isValue={isValue}>
      <NetworkIcon network={id as NetworkIconProps['network']} />
      <Name>{id}</Name>
    </Root>
  )
}
