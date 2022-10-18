import {FC, ReactNode} from 'react'

const Head: FC<{title: string; children?: ReactNode}> = ({title, children}) => (
  <>
    <title>{title} | Phala App</title>
    {children}
  </>
)

export default Head
