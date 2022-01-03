import {FC} from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`

const ProgressItem = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #494949;
  margin: 4px;
  display: flex;
  align-items: center;
`

const Link = styled.a`
  text-decoration: underline;
  color: black;
`

export interface ProgressProps {
  steps: {
    text: string
    link?: string
  }[]
  progressIndex: number
}

export const Progress: FC<ProgressProps> = (props) => {
  const {steps} = props
  const items = steps || []

  return (
    <Root>
      {items.map((item) => (
        <ProgressItem key={item.text}>
          {item.link ? (
            <Link href={item.link} target="_blank">
              {item.text}
            </Link>
          ) : (
            item.text
          )}
        </ProgressItem>
      ))}
    </Root>
  )
}
