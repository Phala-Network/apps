import type {WritableAtom} from 'jotai'
import {useHydrateAtoms} from 'jotai/utils'
import type {FC, ReactNode} from 'react'

const HydrateAtoms: FC<{
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  initialValues: Map<WritableAtom<unknown, any[], any>, any>
  children: ReactNode
}> = ({initialValues, children}) => {
  useHydrateAtoms(initialValues)
  return <>{children}</>
}

export default HydrateAtoms
