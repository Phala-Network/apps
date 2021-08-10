import { Property } from 'csstype'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import useSSR from '../hooks/useSSR'

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

type RootProps = Required<
  Pick<BlockStripeProps, 'column' | 'row' | 'blockSize'>
>

const Root = styled.div<RootProps>`
  position: relative;
  width: ${(props) => props.blockSize * props.column}px;
  height: ${(props) => props.blockSize * props.row}px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.column > props.row ? 'column' : 'row')};
`

const Inner = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`

const BlockStripe: React.FC<BlockStripeProps> = (props) => {
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

  const { isServer } = useSSR()

  const data = useMemo(() => new Array(row * column).fill(0).map(Math.random), [
    row,
    column,
  ])

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

export default BlockStripe
