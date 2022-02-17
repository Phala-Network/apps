import {FC} from 'react'
import styled from 'styled-components'
import {CoinIcon, CoinIconProps} from '../CoinIcon'

type Props = {
  id: string
  isValue?: boolean
}

const Root = styled.div<{isValue?: boolean}>`
  display: flex;
  align-items: center;
  color: white;

  &:hover {
    color: ${(props) => (props.isValue ? 'white' : 'black')};
  }
`

const Name = styled.div`
  text-align: center;
  margin-left: 10px;
  flex: 1;
  font-weight: normal;
`

export const CoinSelectItem: FC<Props> = (props) => {
  const {id, isValue} = props

  return (
    <Root isValue={isValue}>
      <CoinIcon coin={id as CoinIconProps['coin']} />
      <Name>{id}</Name>
    </Root>
  )
}
