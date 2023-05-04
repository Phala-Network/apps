import {useHydrateAtoms} from 'jotai/utils'
import {type FC, type ReactNode} from 'react'

const HydrateAtoms: FC<{
  initialValues: Parameters<typeof useHydrateAtoms>[0]
  children: ReactNode
}> = ({initialValues, children}) => {
  useHydrateAtoms(initialValues)
  return <>{children}</>
}

export default HydrateAtoms
