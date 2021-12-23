import {Skeleton, SkeletonPropsT} from 'baseui/skeleton'
import {forwardRef} from 'react'

const ValueSkeleton = forwardRef<HTMLDivElement, SkeletonPropsT>(
  (props, ref) => {
    return (
      <Skeleton
        overrides={{
          Root: {
            props: {ref},
            style: {display: 'inline-block', verticalAlign: 'middle'},
          },
        }}
        width="50px"
        animation
        rows={1}
        {...props}
      />
    )
  }
)

export default ValueSkeleton
