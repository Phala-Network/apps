import {FC} from 'react'
import styled from 'styled-components'
import {TimeIcon} from './TimeIcon'

const Root = styled.div`
  margin: 16px 0;
`

const ProgressItem = styled.div<{isActive: boolean}>`
  font-family: Montserrat;
  font-size: 20px;
  line-height: 20px;
  font-weight: 400;

  color: ${({isActive}) => (isActive ? '#AAD829' : '#494949')};
  margin: 4px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 16px 0;
`

const Link = styled.a`
  text-decoration: underline;
  color: inherit;
`

const Icon = styled.div`
  margin-top: 16px;
`

export interface ProgressProps {
  steps: {
    text: string
    link?: string
  }[]
  progressIndex: number
}

export const Progress: FC<ProgressProps> = (props) => {
  const {steps, progressIndex = 0} = props
  const items = steps || []

  return (
    <Root>
      {items.map((item, index) => {
        const isCurrent = progressIndex === index
        const isActive = progressIndex >= index
        const isLast = index === items.length - 1

        return (
          <ProgressItem isActive={isActive} key={item.text}>
            {item.link ? (
              <Link href={item.link} target="_blank">
                {item.text}
              </Link>
            ) : (
              item.text
            )}
            {isCurrent && !isLast && (
              <Icon>
                <TimeIcon />
              </Icon>
            )}
          </ProgressItem>
        )
      })}
    </Root>
  )
}
