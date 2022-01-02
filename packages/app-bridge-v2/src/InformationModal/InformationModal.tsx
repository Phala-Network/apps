import {FC} from 'react'

interface InformationModalProps {
  type: string
}

export const InformationModal: FC<InformationModalProps> = (props) => {
  const {children} = props

  return <div>{children}</div>
}
