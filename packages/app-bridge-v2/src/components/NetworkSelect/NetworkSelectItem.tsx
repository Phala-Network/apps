import {Block} from 'baseui/block'
import {FC} from 'react'
import styled from 'styled-components'
import {NetworkIcon, NetworkIconProps} from '../NetworkIcon'

const Root = styled.div``

type Props = {
  id: string
}

export const NetworkSelectItem: FC<Props> = (props) => {
  const {id} = props

  return (
    <Root>
      <Block display="flex" alignItems="center">
        <NetworkIcon network={id as NetworkIconProps['network']} />
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
