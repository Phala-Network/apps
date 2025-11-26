'use client'

import {useNotice} from '@/hooks/useNotice'
import {Container} from '@mui/material'
import type {FC, ReactNode} from 'react'
import ScrollTop from './ScrollTop'
import TopBar from './TopBar'

const Layout: FC<{children: ReactNode}> = ({children}) => {
  useNotice()

  return (
    <>
      <TopBar />
      <Container maxWidth="lg" sx={{pb: 4, px: {xs: 1, sm: 2, lg: 3}}}>
        {children}
      </Container>
      <ScrollTop />
    </>
  )
}

export default Layout
