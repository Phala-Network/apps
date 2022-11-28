import {FC, ReactNode, useEffect, useState} from 'react'

const ClientOnly: FC<{children: ReactNode; fallback?: ReactNode}> = ({
  children,
  fallback,
}) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return <>{(hasMounted && children) || fallback}</>
}

export default ClientOnly
