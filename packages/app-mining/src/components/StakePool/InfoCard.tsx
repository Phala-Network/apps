import {Block} from 'baseui/block'
import {Card} from 'baseui/card'
import {Skeleton} from 'baseui/skeleton'
import {HeadingXSmall, ParagraphSmall} from 'baseui/typography'
import {FC, ReactNode} from 'react'

const InfoCard: FC<{label: string; action?: ReactNode; extra?: ReactNode}> = ({
  label,
  action,
  extra,
  children,
}) => {
  return (
    <Card
      overrides={{
        Root: {
          style: ({$theme}) => ({
            borderRadius: '0',
            ...$theme.borders.border200,
            ...(label === 'Owner' && {
              [$theme.mediaQuery.medium]: {
                gridColumn: 'span 2',
              },
            }),
          }),
        },
        Body: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '72px',
          },
        },
      }}
    >
      <Block display="flex">
        <Block flex="1">
          {children === undefined ? (
            <>
              <Skeleton animation height="32px" width="100%" />
            </>
          ) : (
            <Block>
              <HeadingXSmall as="div">{children}</HeadingXSmall>
              {extra}
            </Block>
          )}
        </Block>
        {action && <Block>{action}</Block>}
      </Block>
      <ParagraphSmall as="div" color="contentTertiary">
        {label}
      </ParagraphSmall>
    </Card>
  )
}

export default InfoCard
