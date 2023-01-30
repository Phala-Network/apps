import {Stack, Typography} from '@mui/material'
import {type FC, type ReactNode} from 'react'
import Title from './Title'

const PageHeader: FC<{
  title: string
  pageTitle?: string
  children?: ReactNode
}> = ({title, pageTitle, children}) => {
  return (
    <>
      <Title>{title}</Title>
      <Stack
        direction={{md: 'row'}}
        alignItems={{md: 'center'}}
        justifyContent="space-between"
        spacing={2}
        my={2}
      >
        <Typography
          variant="h3"
          component="h1"
          display={{xs: 'none', sm: 'block'}}
          my={{sm: 3, md: 5}}
        >
          {pageTitle ?? title}
        </Typography>
        <Typography variant="h4" component="h1" display={{sm: 'none'}} my={3}>
          {pageTitle ?? title}
        </Typography>
        {children}
      </Stack>
    </>
  )
}

export default PageHeader
