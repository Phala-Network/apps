import {Button, type ButtonProps} from '@mui/material'
import {type FC, useState} from 'react'

const PromiseButton: FC<
  Omit<ButtonProps, 'onClick'> & {
    onClick?: (
      ...args: Parameters<Exclude<ButtonProps['onClick'], undefined>>
    ) => Promise<unknown>
  }
> = ({onClick, ...props}) => {
  const [loading, setLoading] = useState(false)

  const handleClick: ButtonProps['onClick'] = (e) => {
    if (onClick != null) {
      setLoading(true)
      void onClick(e).finally(() => {
        setLoading(false)
      })
    }
  }

  return <Button {...props} loading={loading} onClick={handleClick} />
}

export default PromiseButton
