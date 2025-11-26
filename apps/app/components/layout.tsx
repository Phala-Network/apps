'use client'

import {Box, Container} from '@mui/material'
import type {FC, ReactNode} from 'react'

import {useNotice} from '@/hooks/use-notice'
import Footer from './footer'
import ScrollTop from './scroll-top'
import TopBar from './top-bar'

const Layout: FC<{children: ReactNode}> = ({children}) => {
  useNotice()

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <TopBar />
      <Container maxWidth="lg" sx={{pb: 4, px: {xs: 1, sm: 2, lg: 3}, flex: 1}}>
        {children}
      </Container>
      <Footer />
      <ScrollTop />
    </Box>
  )
}

export default Layout
