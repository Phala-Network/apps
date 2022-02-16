import {Block} from 'baseui/block'
import {NumberedStep, ProgressSteps} from 'baseui/progress-steps'
import {FC} from 'react'
import styled from 'styled-components'
import {TimeIcon} from './TimeIcon'

const Root = styled.div`
  margin: 16px 0;
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
    second?: number
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
          const isFinished = progressIndex > index
          const isLast = index === items.length - 1
          let color = '#CECECE'

          if (isCurrent) {
            color = '#000000'
          } else if (isFinished) {
            color = '#AAD829'
          }

          const titleNode = (
            <div
              style={{
                color,
              }}
            >
              {item.link ? (
                <Link href={item.link} target="_blank">
                  {item.text}
                </Link>
              ) : (
                item.text
              )}

              {isFinished && item.second && <span> ... {item.second}s</span>}
            </div>
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
                Description: {
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
                <Block marginTop={['-12px']}>
                  <Icon>
                    <TimeIcon />
                  </Icon>
                </Block>
              )}
            </NumberedStep>
          )
        })}
      </ProgressSteps>
    </Root>
  )
}
