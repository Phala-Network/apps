import {LoadingButton, LoadingButtonProps} from '@mui/lab'
import {FC, useState} from 'react'

const PromiseButton: FC<
  Omit<LoadingButtonProps, 'onClick'> & {
    onClick?: (
      ...args: Parameters<Exclude<LoadingButtonProps['onClick'], undefined>>
    ) => Promise<unknown>
  }
> = ({onClick, ...props}) => {
  const [loading, setLoading] = useState(false)

  const handleClick: LoadingButtonProps['onClick'] = async (e) => {
    if (onClick) {
      setLoading(true)
      onClick(e).finally(() => {
        setLoading(false)
      })
    }
  }

  return <LoadingButton {...props} loading={loading} onClick={handleClick} />
}

export default PromiseButton
