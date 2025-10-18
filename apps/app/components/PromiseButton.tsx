import {LoadingButton, type LoadingButtonProps} from '@mui/lab'
import type {MouseEvent} from 'react'
import {type FC, useState} from 'react'

const PromiseButton: FC<
  Omit<LoadingButtonProps, 'onClick' | 'loading'> & {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => Promise<unknown>
  }
> = ({onClick, ...props}) => {
  const [loading, setLoading] = useState(false)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick != null) {
      setLoading(true)
      void onClick(e).finally(() => {
        setLoading(false)
      })
    }
  }

  return <LoadingButton {...props} loading={loading} onClick={handleClick} />
}

export default PromiseButton
