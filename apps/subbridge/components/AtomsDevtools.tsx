import {useAtomsDevtools} from 'jotai-devtools'
import {FC, ReactElement} from 'react'

const AtomsDevtools: FC<{children: ReactElement}> = ({children}) => {
  useAtomsDevtools('SubBridge')
  return children
}

export default AtomsDevtools
