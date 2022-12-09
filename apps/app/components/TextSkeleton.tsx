import {Skeleton, Stack} from '@mui/material'
import {StackProps} from '@mui/system'
import {FC} from 'react'

const TextSkeleton: FC<StackProps> = (props) => {
  return (
    <Stack spacing={0.5} {...props}>
      <Skeleton />
      <Skeleton />
      <Skeleton width="70%" />
    </Stack>
  )
}

export default TextSkeleton
