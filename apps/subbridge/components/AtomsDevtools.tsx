import {useAtomsDevtools} from 'jotai-devtools'
import {type FC, type ReactElement} from 'react'

const AtomsDevtools: FC<{children: ReactElement}> = ({children}) => {
  useAtomsDevtools('SubBridge')
  return children
}

export default AtomsDevtools
