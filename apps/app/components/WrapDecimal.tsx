import {Box} from '@mui/material'
import {type FC, type ReactNode, useMemo} from 'react'

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
        ? parts.map((part) => {
            if (part.match(regex) != null) {
              const [integer, decimal] = part.split('.')
              return (
                <>
                  {integer}.
                  <Box
                    component="span"
                    sx={(theme) => ({
                      filter: 'brightness(0.5)',
                    })}
                  >
                    {decimal}
                  </Box>
                </>
              )
            }
            return part
          })
        : children}
    </>
  )
}

export default WrapDecimal
