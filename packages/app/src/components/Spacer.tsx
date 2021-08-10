import React from 'react'

interface Props {
  x?: number
  y?: number
  inline?: boolean
  className?: string
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>

export type SpacerProps = Props & NativeAttrs

export const getMargin = (num: number): string => {
  return `calc(${num * 15.25}pt + 1px * ${num - 1})`
}

const Spacer: React.FC<SpacerProps> = ({
  x = 1,
  y = 1,
  inline = false,
  className = '',
  ...props
}) => {
  const left = getMargin(x)
  const top = getMargin(y)

  return (
    <span
      style={{
        display: inline ? 'inline-block' : 'block',
        height: 1,
        width: 1,
        marginLeft: left,
        marginTop: top,
      }}
      className={className}
      {...props}></span>
  )
}

export default React.memo(Spacer)
