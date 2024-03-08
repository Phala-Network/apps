import type {Account} from '@/lib/subsquidQuery'
import {chainAtom} from '@/store/common'
import ErrorOutline from '@mui/icons-material/ErrorOutline'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import VerifiedOutlined from '@mui/icons-material/VerifiedOutlined'
import {Link, Stack, Tooltip, Typography, alpha, useTheme} from '@mui/material'
import {trimAddress} from '@phala/lib'
import {useAtom} from 'jotai'
import type {FC} from 'react'

const Identity: FC<
  Pick<Account, 'id' | 'identityDisplay' | 'identityLevel'> & {
    detail?: boolean
  }
> = ({id, identityDisplay, identityLevel, detail = false}) => {
  const theme = useTheme()
  const [chain] = useAtom(chainAtom)
  const verified =
    identityLevel === 'KnownGood' || identityLevel === 'Reasonable'

  const lowQuality = identityLevel === 'LowQuality'
  const link = (
    <Link
      variant={detail ? 'h6' : 'caption'}
      color={detail ? 'inherit' : 'text.secondary'}
      href={`https://${chain}.subscan.io/account/${id}`}
      target="_blank"
      rel="noopener"
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
      sx={{
        textDecorationColor: alpha(theme.palette.text.primary, 0.4),
      }}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      {identityDisplay ?? trimAddress(id)}
    </Link>
  )
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {detail ? (
        link
      ) : (
        <Tooltip
          title={id}
          PopperProps={{
            onClick: (e) => {
              e.stopPropagation()
            },
          }}
        >
          {link}
        </Tooltip>
      )}

      {identityDisplay != null && (
        <>
          <Tooltip
            title={identityLevel ?? 'No Judgement'}
            PopperProps={{
              onClick: (e) => {
                e.stopPropagation()
              },
            }}
          >
            {verified ? (
              <VerifiedOutlined
                color="success"
                sx={{width: detail ? 22 : 16, flexShrink: 0}}
              />
            ) : lowQuality ? (
              <ErrorOutline
                color="error"
                sx={{width: detail ? 22 : 16, flexShrink: 0}}
              />
            ) : (
              <RemoveCircleOutline
                color="disabled"
                sx={{width: detail ? 22 : 16, flexShrink: 0}}
              />
            )}
          </Tooltip>
          {detail && (
            <Tooltip title={id}>
              <Typography
                flexShrink="0"
                variant="subtitle2"
                component="div"
                color="text.secondary"
              >
                {trimAddress(id)}
              </Typography>
            </Tooltip>
          )}
        </>
      )}
    </Stack>
  )
}

export default Identity
