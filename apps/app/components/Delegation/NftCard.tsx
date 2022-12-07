import Property from '@/components/Property'
import useGetApr from '@/hooks/useGetApr'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import aprToApy from '@/lib/aprToApy'
import getPoolPath from '@/lib/getPoolPath'
import {DelegationCommonFragment} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {MoreVert} from '@mui/icons-material'
import {
  alpha,
  Box,
  Chip,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import {toCurrency, toPercentage} from '@phala/util'
import {FC, useRef, useState} from 'react'
import {OnAction} from './List'
import NftCover from './NftCover'

const NftCard: FC<{
  compact?: boolean
  delegation: DelegationCommonFragment
  onAction?: OnAction
  isOwner?: boolean
}> = ({compact = false, delegation, onAction, isOwner = false}) => {
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const [menuOpen, setMenuOpen] = useState(false)
  const moreRef = useRef(null)
  const {value, shares, basePool, delegationNft} = delegation
  const isVault = basePool.kind === 'Vault'
  const color = isVault ? 'secondary' : 'primary'
  const theme = useTheme()
  const getApr = useGetApr()
  const apr = getApr(basePool.aprMultiplier)
  const poolHasWithdrawal = delegation.basePool.withdrawingShares !== '0'
  const reclaim = async () => {
    if (!api) return
    return signAndSend(
      isVault
        ? api.tx.phalaVault.checkAndMaybeForceWithdraw(basePool.id)
        : api.tx.phalaStakePoolv2.checkAndMaybeForceWithdraw(basePool.id)
    )
  }

  // TODO: handle withdrawal nft
  if (!delegationNft) return null

  return (
    <Paper
      sx={{
        height: 240,
        background: compact ? 'transparent' : colors.cardBackground,
        display: 'flex',
        overflow: 'hidden',
        ...(compact && {border: 'none'}),
      }}
    >
      <Box width={160} flexShrink="0" borderRadius="6px" overflow="hidden">
        <NftCover />
      </Box>
      <Stack flex="1" py={compact ? 0 : 2} px={2.5} position="relative">
        <Box width={140}>
          <Chip
            label={`NO.${delegationNft.nftId}`}
            color={color}
            size="small"
          />
          <Link
            display="block"
            color="inherit"
            variant="subtitle1"
            target="_blank"
            rel="noopener"
            href={getPoolPath(basePool.kind, basePool.id)}
            fontWeight="500"
            mt={1}
            sx={{textDecorationColor: alpha(theme.palette.text.primary, 0.4)}}
          >{`${isVault ? 'Vault' : 'Stake Pool'} #${basePool.id}`}</Link>
        </Box>
        <Typography variant="num3" mt={1}>
          {toCurrency(value)}
          <sub>PHA</sub>
        </Typography>
        <Typography variant="caption" color={theme.palette.success.main}>
          {`+ PHA / 7d`}
        </Typography>

        <Stack spacing={0.5} mt="auto">
          {!compact && (
            <Property
              size="small"
              label={`Est. ${isVault ? 'APY' : 'APR'}`}
              sx={{justifyContent: 'space-between'}}
            >
              {apr ? (
                toPercentage(isVault ? aprToApy(apr) : apr)
              ) : (
                <Skeleton width={32} />
              )}
            </Property>
          )}
          <Property
            size="small"
            label="Shares"
            sx={{justifyContent: 'space-between'}}
          >
            {toCurrency(shares)}
          </Property>
        </Stack>
        {!compact && isOwner && (
          <>
            <IconButton
              ref={moreRef}
              onClick={() => setMenuOpen(true)}
              sx={{position: 'absolute', top: 5, right: 5}}
            >
              <MoreVert />
            </IconButton>
            <Menu
              open={menuOpen}
              anchorEl={moreRef.current}
              onClose={() => setMenuOpen(false)}
            >
              <MenuItem
                onClick={() => {
                  onAction && onAction(delegation, 'withdraw')
                  setMenuOpen(false)
                }}
              >
                Withdraw
              </MenuItem>
              <MenuItem
                disabled={!poolHasWithdrawal}
                onClick={() => {
                  reclaim()
                  setMenuOpen(false)
                }}
              >
                Reclaim
              </MenuItem>
            </Menu>
          </>
        )}
      </Stack>
    </Paper>
  )
}

export default NftCard
