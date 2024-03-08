import Empty from '@/components/Empty'
import usePoolIntro from '@/hooks/usePoolIntro'
import type {BasePoolCommonFragment} from '@/lib/subsquidQuery'
import type {IconProp} from '@fortawesome/fontawesome-svg-core'
import {
  faDiscord,
  faTelegram,
  faWeixin,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import {faEnvelope, faMessage} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Box, Chip, Stack, type SxProps, Typography} from '@mui/material'
import {useSnackbar} from 'notistack'
import {type FC, useMemo} from 'react'
import TextSkeleton from '../TextSkeleton'
import Identity from './Identity'

const iconMap = {
  discord: faDiscord,
  telegram: faTelegram,
  twitter: faXTwitter,
  wechat: faWeixin,
  email: faEnvelope,
  forum: faMessage,
} satisfies Record<string, IconProp>

const Intro: FC<{
  basePool: BasePoolCommonFragment
  sx?: SxProps
  variant: 'detail' | 'card'
}> = ({basePool, sx, variant}) => {
  const {enqueueSnackbar} = useSnackbar()
  const {owner} = basePool
  const poolIntro = usePoolIntro(basePool.id)

  const chips = useMemo<Array<[string, string]>>(() => {
    if (poolIntro == null || variant === 'card') return []
    return Object.entries(poolIntro).filter(
      ([label, value]) =>
        label !== 'ann' && typeof value === 'string' && value.length > 0,
    )
  }, [poolIntro, variant])

  return (
    <Stack sx={sx}>
      {variant === 'detail' && <Identity {...owner} detail />}

      {chips.length > 0 && variant === 'detail' && (
        <Box ml={-1}>
          {chips.map(([label, value]) => {
            const hasIcon = (x: string): x is keyof typeof iconMap =>
              x in iconMap
            const icon = hasIcon(label) && iconMap[label]
            let href: string | undefined
            if (label === 'telegram') {
              href = `https://t.me/${value.replace(/^@/, '')}`
            } else if (label === 'twitter') {
              href = `https://x.com/${value}`
            } else if (label === 'email') {
              href = `mailto:${value}`
            } else if (label === 'forum') {
              href = `https://forum.phala.network/u/${value}`
            }
            return (
              <Chip
                {...(icon !== false && {
                  icon: <FontAwesomeIcon icon={icon} width={16} />,
                })}
                label={value}
                key={label}
                size="small"
                {...(href !== undefined
                  ? {
                      clickable: true,
                      href,
                      component: 'a',
                      target: '_blank',
                    }
                  : {
                      onClick: () => {
                        void navigator.clipboard.writeText(value)
                        enqueueSnackbar('Copied to clipboard')
                      },
                    })}
                sx={{mt: 1, ml: 1, pl: 0.5}}
              />
            )
          })}
        </Box>
      )}

      {poolIntro != null ? (
        poolIntro.ann !== undefined && poolIntro.ann.length > 0 ? (
          <Typography
            mt={variant === 'detail' ? 2 : 0}
            minHeight={0}
            display="block"
            variant="body2"
            color="text.secondary"
            whiteSpace="pre-wrap"
            overflow="auto"
            flex="1"
          >
            {poolIntro?.ann}
          </Typography>
        ) : (
          <Empty message="No Announcement" />
        )
      ) : (
        <TextSkeleton mt={1} />
      )}
    </Stack>
  )
}

export default Intro
