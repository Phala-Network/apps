import {FC, ReactNode, useEffect, useState} from 'react'

// MEMO: different from MUI <NoSsr />, fallback content will be also rendered when children is falsy
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
