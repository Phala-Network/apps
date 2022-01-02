interface TransferModalProps {
  type: string
}

export const TransferModal: React.FC<TransferModalProps> = (props) => {
  const {children} = props

  return <div>{children}</div>
}
