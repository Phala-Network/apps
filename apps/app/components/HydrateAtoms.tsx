import {type WritableAtom} from 'jotai'
import {useHydrateAtoms} from 'jotai/utils'
import {type FC, type ReactNode} from 'react'

const HydrateAtoms: FC<{
  initialValues: Map<WritableAtom<unknown, any[], any>, any>
  children: ReactNode
}> = ({initialValues, children}) => {
  useHydrateAtoms(initialValues)
  return <>{children}</>
}

export default HydrateAtoms
