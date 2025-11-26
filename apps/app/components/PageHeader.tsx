import {Stack, Typography} from '@mui/material'
import type {FC, ReactNode} from 'react'

const PageHeader: FC<{
  pageTitle: ReactNode
  children?: ReactNode
}> = ({pageTitle, children}) => {
  return (
    <Stack
      direction={{sm: 'row'}}
      alignItems={{sm: 'center'}}
      justifyContent="space-between"
      spacing={2}
      my={2}
    >
      <Typography
        variant="h3"
        component="h1"
        display={{xs: 'none', sm: 'block'}}
        py={{sm: 2, md: 3}}
      >
        {pageTitle}
      </Typography>
      <Typography variant="h4" component="h1" display={{sm: 'none'}} my={3}>
        {pageTitle}
      </Typography>
      {children}
    </Stack>
  )
}

export default PageHeader
