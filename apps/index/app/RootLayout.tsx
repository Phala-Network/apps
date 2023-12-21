'use client'
import {Box} from '@mui/material'
import {DevTools as JotaiDevTools} from 'jotai-devtools'
import {SnackbarProvider} from 'notistack'
import {type FC, type ReactNode} from 'react'
import {SWRConfig} from 'swr'

const RootLayout: FC<{children: ReactNode}> = ({children}) => {
  return (
    <>
      <SWRConfig
        value={{
          onSuccess(data, key) {
            if (process.env.NODE_ENV === 'development') {
              // eslint-disable-next-line no-console
              console.debug(key, data)
            }
          },
          onError: (error, key) => {
            if (process.env.NODE_ENV === 'development') {
              // eslint-disable-next-line no-console
              console.debug(key, error)
            }
          },
        }}
      >
        <SnackbarProvider
          preventDuplicate
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          {children}
          {process.env.NODE_ENV === 'development' && (
            <Box position="fixed" ml={1} mb={1} bottom={0} left={0}>
              <JotaiDevTools />
            </Box>
          )}
        </SnackbarProvider>
      </SWRConfig>
    </>
  )
}

export default RootLayout
