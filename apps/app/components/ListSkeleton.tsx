import {Skeleton, SkeletonProps} from '@mui/material'
import {FC} from 'react'

const ListSkeleton: FC<SkeletonProps & {count?: number}> = ({
  count = 5,
  ...props
}) => (
  <>
    {[...Array(count)].map((_, index) => (
      <Skeleton variant="rounded" key={index} {...props} />
    ))}
  </>
)

export default ListSkeleton
