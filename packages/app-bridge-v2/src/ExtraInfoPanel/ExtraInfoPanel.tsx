import {FC, ReactNode} from 'react'
import {Item, ItemTitle, ItemValue, Root} from './styledComponents'

interface ExtraInfoPanelProps {
  infos: {
    label: string
    value: ReactNode
  }[]
}

export const ExtraInfoPanel: FC<ExtraInfoPanelProps> = (props) => {
  const {infos} = props

  return (
    <Root>
      {infos.map((info, index) => (
        <Item key={index}>
          <ItemTitle>{info.label}</ItemTitle>
          <ItemValue>{info.value}</ItemValue>
        </Item>
      ))}
    </Root>
  )
}
