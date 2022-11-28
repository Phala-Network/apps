import StakePoolIcon from '@/assets/stake_pool_detailed.svg'
import VaultIcon from '@/assets/vault_detailed.svg'
import DelegateInput from '@/components/DelegateInput'
import DelegatorSelect from '@/components/DelegatorSelect'
import PageHeader from '@/components/PageHeader'
import useGetApr from '@/hooks/useGetApr'
import getApy from '@/lib/getApy'
import {subsquidClient} from '@/lib/graphql'
import {BasePoolKind, IdentityLevel, useBasePoolByIdQuery} from '@/lib/subsquid'
import {colors} from '@/lib/theme'
import {
  RemoveCircleOutline,
  Settings,
  VerifiedOutlined,
} from '@mui/icons-material'
import {
  alpha,
  Box,
  Chip,
  IconButton,
  Link,
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import {formatCurrency, trimAddress} from '@phala/util'
import type {ParsedUrlQuery} from 'querystring'
import {FC} from 'react'
import ExtraProperties from './ExtraProperties'
import Property from './Property'

const DetailPage: FC<{kind: BasePoolKind; pid: ParsedUrlQuery[string]}> = ({
  kind,
  pid,
}) => {
  const getApr = useGetApr()
  const theme = useTheme()
  const isPidValid = typeof pid === 'string' && pid.length > 0
  const isVault = kind === BasePoolKind.Vault
  const color = isVault ? 'secondary' : 'primary'
  const {data} = useBasePoolByIdQuery(
    subsquidClient,
    {id: isPidValid ? pid : ''},
    {
      enabled: isPidValid,
    }
  )
  const basePool = data?.basePoolById
  const {vault, stakePool, owner} = basePool || {}
  const ownerVerified =
    !!owner &&
    (owner.identityLevel === IdentityLevel.KnownGood ||
      owner.identityLevel === IdentityLevel.Reasonable)
  const actions = (
    <>
      <IconButton>
        <Settings />
      </IconButton>
    </>
  )
  if (isVault === !vault) return null
  return (
    <>
      <PageHeader
        title={`${isVault ? 'Vault' : 'Stake Pool'}${
          isPidValid ? ` #${pid}` : ''
        }`}
        pageTitle={isVault ? 'Vault' : 'Stake Pool'}
      />
      <Stack spacing={{xs: 2, md: 2.5}}>
        <Paper sx={{background: 'transparent'}}>
          <Stack
            spacing={2}
            direction={{xs: 'column', lg: 'row'}}
            alignItems={{xs: 'flex-start', lg: 'center'}}
            sx={{p: {xs: 2, md: 2.5}}}
          >
            <Stack
              flex="1 0"
              spacing={2}
              direction={{xs: 'column', sm: 'row'}}
              alignItems={{xs: 'flex-start', sm: 'center'}}
              width={{xs: 1, lg: 'initial'}}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                width={{xs: 1, sm: 'initial'}}
              >
                {stakePool && (
                  <StakePoolIcon width={48} color={colors.main[300]} />
                )}
                {vault && <VaultIcon width={48} color={colors.vault[400]} />}
                <Box flex="1 0" width={108}>
                  <Typography variant="num2">{`#${pid}`}</Typography>
                </Box>
                <Box display={{xs: 'block', sm: 'none'}}>{actions}</Box>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center" flex="1 0">
                {stakePool && (
                  <Property label="Est. APR" sx={{width: 64, flexShrink: '0'}}>
                    {(
                      <span css={{color: colors.main[300]}}>
                        {getApr(stakePool.aprMultiplier)}
                      </span>
                    ) || <Skeleton />}
                  </Property>
                )}
                {stakePool && (
                  <Property label="Delegable" sx={{width: 120}}>
                    {stakePool.delegable
                      ? `${formatCurrency(stakePool.delegable)} PHA`
                      : '∞'}
                  </Property>
                )}
                {vault && (
                  <Property label="Est. APY" sx={{width: 64, flexShrink: '0'}}>
                    {(
                      <span css={{color: colors.vault[400]}}>
                        {getApy(vault.apr)}
                      </span>
                    ) || <Skeleton />}
                  </Property>
                )}
                {vault && (
                  <Property label="TVL" sx={{width: 120}}>
                    {basePool && `${formatCurrency(basePool.totalValue)} PHA`}
                  </Property>
                )}
                <Stack flex="1 0" direction="row">
                  {basePool?.withdrawalValue !== '0' && (
                    <Chip
                      size="small"
                      label="Insufficient Stake"
                      sx={{color: theme.palette.warning.dark}}
                    />
                  )}
                </Stack>
              </Stack>
              <Box ml="auto" display={{xs: 'none', sm: 'block', lg: 'none'}}>
                {actions}
              </Box>
            </Stack>
            {basePool && (
              <ExtraProperties
                basePool={basePool}
                sx={{width: {xs: 1, lg: 350}}}
              />
            )}
            <Box display={{xs: 'none', lg: 'block'}}>{actions}</Box>
          </Stack>
        </Paper>

        <Paper
          sx={{
            p: {xs: 1, md: 2},
            pt: {xs: 0.5, md: 1},
            background: 'transparent',
          }}
        >
          <Tabs value="intergrated" indicatorColor={color} textColor={color}>
            <Tab label="Intergrated" value="intergrated" />
            <Tab label="Delegation" value="delegation" />
            <Tab label="Commission" value="commission" />
          </Tabs>
        </Paper>

        <Stack direction={{xs: 'column', md: 'row'}} spacing={{xs: 2, md: 2.5}}>
          <Paper sx={{p: 3, pt: 2, background: 'transparent', flex: '1 0'}}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Link
                variant="h6"
                color="inherit"
                href={`https://khala.subscan.io/account/${owner?.id}`}
                target="_blank"
                rel="noopener"
                sx={{
                  textDecorationColor: alpha(theme.palette.text.primary, 0.4),
                }}
              >
                {owner ? (
                  owner.identityDisplay || trimAddress(owner.id)
                ) : (
                  <Skeleton width={100} />
                )}
              </Link>
              {owner?.identityDisplay && (
                <>
                  <Tooltip
                    title={owner.identityLevel ?? 'No Judgement'}
                    placement="top"
                  >
                    {ownerVerified ? (
                      <VerifiedOutlined
                        color="success"
                        sx={{width: 22, flexShrink: 0}}
                      />
                    ) : (
                      <RemoveCircleOutline
                        color="disabled"
                        sx={{width: 22, flexShrink: 0}}
                      />
                    )}
                  </Tooltip>
                  <Tooltip title={owner.id} placement="top">
                    <Typography
                      variant="subtitle2"
                      component="div"
                      color={theme.palette.text.secondary}
                    >
                      {trimAddress(owner.id)}
                    </Typography>
                  </Tooltip>
                </>
              )}
            </Stack>
          </Paper>
          <Paper sx={{p: 3, pt: 2, background: 'transparent', flex: '1 0'}}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6" component="div">
                Delegation
              </Typography>
              <DelegatorSelect />
            </Stack>
            <Stack></Stack>
            {basePool && <DelegateInput basePool={basePool} />}
          </Paper>
        </Stack>
      </Stack>
    </>
  )
}

export default DetailPage
