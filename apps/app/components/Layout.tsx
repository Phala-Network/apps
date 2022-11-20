import {Container} from '@mui/material'
import {useAtomsDevtools} from 'jotai/devtools'
import {FC, ReactNode} from 'react'
import TopBar from './TopBar'

const Layout: FC<{children: ReactNode}> = ({children}) => {
  useAtomsDevtools('Phala App')

  return (
    <>
      <TopBar />
      <Container maxWidth="xl">{children}</Container>
    </>
  )
}

export default Layout
