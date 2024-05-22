import {Box} from '@mui/material'
import {type FC, Fragment, type ReactNode, useMemo} from 'react'

const regex = /(\d+\.\d+)/g
const WrapDecimal: FC<{children: ReactNode}> = ({children}) => {
  const parts = useMemo(() => {
    if (typeof children === 'string') {
      return children.split(regex)
    }
    return []
  }, [children])

  return (
    <>
      {typeof children === 'string'
        ? parts.map((part, index) => {
            if (part.match(regex) != null) {
              const [integer, decimal] = part.split('.')
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: the order of parts will not change
                <Fragment key={index}>
                  {integer}.
                  <Box component="span" sx={{filter: 'brightness(0.5)'}}>
                    {decimal}
                  </Box>
                </Fragment>
              )
            }
            return part
          })
        : children}
    </>
  )
}

export default WrapDecimal
