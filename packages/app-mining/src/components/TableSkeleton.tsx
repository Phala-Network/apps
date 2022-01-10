import {Skeleton} from 'baseui/skeleton'

const TableSkeleton = ({rows = 3}: {rows?: number}) => (
  <Skeleton
    rows={rows}
    animation
    overrides={{
      Row: {
        style: {
          height: '43px',
        },
      },
    }}
  />
)

export default TableSkeleton
