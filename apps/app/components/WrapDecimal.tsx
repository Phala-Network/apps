'use client'

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

  if (parts.length === 0) {
    return children
  }

  return (
    <>
      {parts.map((part, index) => {
        if (regex.test(part)) {
          const [integer, decimal] = part.split('.')
          return (
            <Fragment
              // biome-ignore lint/suspicious/noArrayIndexKey:
              key={`${part}-${index}`}
            >
              {integer}.
              <Box component="span" sx={{filter: 'brightness(0.5)'}}>
                {decimal}
              </Box>
            </Fragment>
          )
        }
        // biome-ignore lint/suspicious/noArrayIndexKey:
        return <Fragment key={`${part}-${index}`}>{part}</Fragment>
      })}
    </>
  )
}

export default WrapDecimal
