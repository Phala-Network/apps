import {NumberedStep, ProgressSteps} from 'baseui/progress-steps'
import {FC} from 'react'
import styled from 'styled-components'
import {TimeIcon} from './TimeIcon'

const Root = styled.div`
  margin: 16px 0;
`

const ProgressItem = styled.div<{isActive: boolean}>`
  color: ${({isActive}) => (isActive ? '#AAD829' : '#494949')};
`

const Link = styled.a`
  text-decoration: underline;
  color: inherit;

  &:hover {
    color: #aad829;
  }
`

const Icon = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
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
      <ProgressSteps current={progressIndex}>
        {items.map((item, index) => {
          const isCurrent = progressIndex === index
          const isActive = progressIndex >= index
          const isLast = index === items.length - 1
          const titleNode = (
            <ProgressItem isActive={isCurrent}>
              {item.link ? (
                <Link href={item.link} target="_blank">
                  {item.text}
                </Link>
              ) : (
                item.text
              )}
            </ProgressItem>
          )

          return (
            <NumberedStep
              overrides={{
                Root: {
                  style: {
                    margin: 0,
                    padding: 0,
                  },
                },
              }}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              title={titleNode}
              isActive={isActive}
              key={item.text}
            >
              {isCurrent && !isLast && (
                <Icon>
                  <TimeIcon />
                </Icon>
              )}
            </NumberedStep>
          )
        })}
      </ProgressSteps>
    </Root>
  )
}
