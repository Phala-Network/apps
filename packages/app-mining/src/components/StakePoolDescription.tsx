import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {
  faDiscord,
  faTelegram,
  faTwitter,
  faWeixin,
} from '@fortawesome/free-brands-svg-icons'
import {faEnvelope, faMessage} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {Skeleton} from 'baseui/skeleton'
import {toaster} from 'baseui/toast'
import {HeadingXSmall, ParagraphSmall} from 'baseui/typography'
import {FC} from 'react'
import styled from 'styled-components'
import useStakePoolDescription from '../hooks/useStakePoolDescription'

const StyledBlock = styled(Block)`
  overflow: hidden;
  & > div + div {
    border-top: 1px dashed hsla(0, 0%, 0%, 0.08);
  }
`

// TODO: move to utils
const copy = (text: string) =>
  navigator.clipboard.writeText(text).then(() => {
    toaster.positive('Copied', {})
  })

const Item: FC<{
  icon: IconProp
  children?: string
  href?: string
  copyOnly?: boolean
}> = ({icon, children, href, copyOnly}) => {
  const [css, theme] = useStyletron()
  return (
    <Block
      display="flex"
      paddingTop="scale400"
      paddingBottom="scale400"
      color="contentTertiary"
      alignItems="center"
    >
      <FontAwesomeIcon
        width={20}
        icon={icon}
        className={css({marginRight: theme.sizing.scale400})}
      />
      {typeof children === 'string' ? (
        <ParagraphSmall
          as="div"
          color="contentSecondary"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {children ? (
            copyOnly ? (
              <Block
                $style={{cursor: 'pointer'}}
                overflow="hidden"
                textOverflow="ellipsis"
                onClick={() => copy(children)}
              >
                {children}
              </Block>
            ) : (
              <a
                className={css({color: 'inherit'})}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            )
          ) : (
            '-'
          )}
        </ParagraphSmall>
      ) : (
        <Skeleton
          rows={1}
          animation
          width="128px"
          overrides={{
            Row: {
              style: {
                height: '20px',
              },
            },
          }}
        />
      )}
    </Block>
  )
}

const StakePoolDescription: FC<{pid?: string}> = ({pid}) => {
  const {data: descriptionData} = useStakePoolDescription(pid)

  return (
    <>
      <Block>
        <HeadingXSmall
          marginTop="0"
          marginBottom="scale400"
          $style={{fontSize: '16px'}}
        >
          Announcement
        </HeadingXSmall>
        {typeof descriptionData?.ann === 'string' ? (
          <ParagraphSmall whiteSpace="pre-wrap">
            {descriptionData?.ann ?? '-'}
          </ParagraphSmall>
        ) : (
          <Skeleton
            rows={3}
            animation
            overrides={{
              Row: {
                style: {
                  height: '20px',
                },
              },
            }}
          />
        )}
      </Block>

      <StyledBlock>
        <Item
          icon={faTelegram}
          href={`https://t.me/${descriptionData?.telegram}`}
        >
          {descriptionData?.telegram}
        </Item>
        <Item icon={faDiscord} copyOnly>
          {descriptionData?.discord}
        </Item>
        <Item icon={faWeixin} copyOnly>
          {descriptionData?.wechat}
        </Item>
        <Item
          icon={faTwitter}
          href={`https://twitter.com/${descriptionData?.twitter}`}
        >
          {descriptionData?.twitter}
        </Item>
        <Item icon={faEnvelope} href={`mailto:${descriptionData?.email}`}>
          {descriptionData?.email}
        </Item>
        <Item
          icon={faMessage}
          href={`https://forum.phala.network/u/${descriptionData?.forum}`}
        >
          {descriptionData?.forum}
        </Item>
      </StyledBlock>
    </>
  )
}

export default StakePoolDescription
