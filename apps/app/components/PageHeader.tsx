import {Stack, Typography} from '@mui/material'
import {FC, ReactNode} from 'react'

const PageHeader: FC<{title: string; children?: ReactNode}> = ({
  title,
  children,
}) => {
  return (
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
        {title}
      </Typography>
      <Typography variant="h4" component="h1" display={{sm: 'none'}} my={3}>
        {title}
      </Typography>
      {children}
    </Stack>
  )
}

export default PageHeader
