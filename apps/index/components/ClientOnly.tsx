import {type FC, type ReactNode, useEffect, useState} from 'react'

export const ClientOnly: FC<{children: ReactNode}> = ({children}) => {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) {
    return null
  }
  return <>{children}</>
}
