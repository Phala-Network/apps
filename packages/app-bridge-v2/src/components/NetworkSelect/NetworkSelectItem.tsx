import {Block} from 'baseui/block'
import {FC} from 'react'
import styled from 'styled-components'

const Root = styled.div``

type Props = {
  id: string
}

export const NetworkSelectItem: FC<Props> = (props) => {
  const {id} = props

  return (
    <Root>
      <Block display="flex">
        <div>{id}</div>
      </Block>
    </Root>
  )
}
