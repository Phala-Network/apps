import {Box} from '@mui/material'
import {uniqueId} from 'lodash-es'
import {type FC, Fragment, type ReactNode, useMemo} from 'react'

const regex = /(\d+\.\d+)/g
const WrapDecimal: FC<{children: ReactNode}> = ({children}) => {
  const parts = useMemo(() => {
    if (typeof children === 'string') {
      return children.split(regex).map((part) => [part, uniqueId()])
    }
    return []
  }, [children])

  return (
    <>
      {typeof children === 'string'
        ? parts.map(([part, id]) => {
            if (part.match(regex) != null) {
              const [integer, decimal] = part.split('.')
              return (
                <Fragment key={id}>
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
