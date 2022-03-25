import {FC} from 'react'
import {Label, Root} from './styledComponents'

interface TransferPanelProps {
  label: string
}

export const TransferPanel: FC<TransferPanelProps> = (props) => {
  const {label, children} = props

  return (
    <Root>
      <Label>{label}</Label>

      {children}
    </Root>
  )
}
