import {Block} from 'baseui/block'
import {FC} from 'react'
import styled from 'styled-components'
import {CoinIcon, CoinIconProps} from '../CoinIcon'

const Root = styled.div``

type Props = {
  id: string
}

export const CoinSelectItem: FC<Props> = (props) => {
  const {id} = props

  return (
    <Root>
      <Block display="flex" alignItems="center">
        <CoinIcon coin={id as CoinIconProps['coin']} />
        <Block
          marginLeft={['10px']}
          flex={1}
          $style={{
            textAlign: 'center',
          }}
        >
          {id}
        </Block>
      </Block>
    </Root>
  )
}
