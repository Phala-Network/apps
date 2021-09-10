import {useSSR} from '@phala/react-hooks'
import {Property} from 'csstype'
import React, {useMemo} from 'react'
import {Inner, Root} from './styledComponents'

export type BlockStripeProps = {
  color?: Property.BackgroundColor
  backgroundColor?: Property.BackgroundColor
  row?: number
  column?: number
  random?: number
  blockSize?: number
  colorCheck?: (status: number, index: number) => boolean
  blockStyle?: React.CSSProperties
}

export type RootProps = Required<
  Pick<BlockStripeProps, 'column' | 'row' | 'blockSize'>
>

export const BlockStripe: React.FC<BlockStripeProps> = (props) => {
  const {
    children,
    row = 8,
    column = 8,
    color = 'black',
    backgroundColor = 'transparent',
    random = 0.6,
    colorCheck = (status: number) => status > random,
    blockSize = 10,
    blockStyle = {},
    ...others
  } = props

  const {isServer} = useSSR()

  const data = useMemo(
    () => new Array(row * column).fill(0).map(Math.random),
    [row, column]
  )

  if (isServer) return null

  return (
    <Root column={column} blockSize={blockSize} row={row} {...others}>
      {data.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              width: blockSize,
              height: blockSize,
              backgroundColor: colorCheck(item, index)
                ? color
                : backgroundColor,
              ...blockStyle,
            }}
          />
        )
      })}

      <Inner>{children}</Inner>
    </Root>
  )
}
