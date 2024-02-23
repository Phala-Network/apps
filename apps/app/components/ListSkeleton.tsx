import {Skeleton, type SkeletonProps} from '@mui/material'
import {forwardRef} from 'react'

const ListSkeleton = forwardRef<
  HTMLSpanElement,
  SkeletonProps & {count?: number}
>(({count = 5, ...props}, ref) => (
  <>
    {Array.from({length: count}).map((_, index) => (
      <Skeleton
        variant="rounded"
        // biome-ignore lint/suspicious/noArrayIndexKey: static list
        key={index}
        {...(index === 0 && {ref})}
        {...props}
      />
    ))}
  </>
))

ListSkeleton.displayName = 'ListSkeleton'

export default ListSkeleton
