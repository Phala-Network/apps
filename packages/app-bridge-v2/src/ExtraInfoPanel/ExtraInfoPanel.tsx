import {FC, ReactNode} from 'react'
import {Item, Root} from './styledComponents'

interface ExtraInfoPanelProps {
  infos: {
    label: string
    value: ReactNode
  }[]
}

export const ExtraInfoPanel: FC<ExtraInfoPanelProps> = (props) => {
  const {infos} = props

  return (
    <div>
      <Root>
        {infos.map((info, index) => (
          <Item key={index}>
            <div>{info.label}</div>
            <div>{info.value}</div>
          </Item>
        ))}
      </Root>
    </div>
  )
}
