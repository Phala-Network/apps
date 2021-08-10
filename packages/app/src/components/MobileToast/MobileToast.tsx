import { forwardRef, useEffect, useState } from 'react'
import Icon from './Icon'
import { Root, Text } from './styled'

export interface MobileToastProps {
  duration?: number
  text?: string
}

const MobileToast = forwardRef<HTMLDivElement, MobileToastProps>(
  (props, ref) => {
    const { text } = props
    const [visitable, setVisitable] = useState(true)

    useEffect(() => {
      setTimeout(() => {
        setVisitable(false)
      }, 3000)
    }, [])

    if (!visitable) return null

    return (
      <Root ref={ref}>
        <Icon></Icon>
        <Text>{text}</Text>
      </Root>
    )
  }
)

export default MobileToast
