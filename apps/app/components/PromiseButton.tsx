import {LoadingButton, type LoadingButtonProps} from '@mui/lab'
import {type FC, useState} from 'react'

const PromiseButton: FC<
  Omit<LoadingButtonProps, 'onClick'> & {
    onClick?: (
      ...args: Parameters<Exclude<LoadingButtonProps['onClick'], undefined>>
    ) => Promise<unknown>
  }
> = ({onClick, ...props}) => {
  const [loading, setLoading] = useState(false)

  const handleClick: LoadingButtonProps['onClick'] = (e) => {
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
