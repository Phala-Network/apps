import VaultIcon from '@/assets/vault.svg'
import {WPHA_ASSET_ID} from '@/config'
import useAccountQuery from '@/hooks/useAccountQuery'
import useAssetBalance from '@/hooks/useAssetBalance'
import useSelectedVaultState from '@/hooks/useSelectedVaultState'
import {colors} from '@/lib/theme'
import {vaultIdAtom} from '@/store/common'
import {
  Box,
  MenuItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import {toCurrency} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import Image from 'next/image'
import {type FC, useMemo} from 'react'

const ACCOUNT = 'account'

const DelegatorSelect: FC<{isVault?: boolean}> = ({isVault = false}) => {
  const theme = useTheme()
  const [account] = useAtom(polkadotAccountAtom)
  const [, setVaultId] = useAtom(vaultIdAtom)
  const {data: accountData} = useAccountQuery()
  const vaultIds = useMemo(
    () => accountData?.ownedPools.map((x) => x.id) ?? [],
    [accountData?.ownedPools],
  )
  const selectedVaultState = useSelectedVaultState()
  const delegatorAddress =
    selectedVaultState === null
      ? account?.address
      : selectedVaultState?.account.id
  const balance = useAssetBalance(
    delegatorAddress,
    selectedVaultState != null ? WPHA_ASSET_ID : 'available',
  )
  if (account == null || accountData == null || account.wallet == null) {
    return null
  }
  // MEMO: vault cannot delegate to another vault
  const value =
    !isVault && selectedVaultState != null ? selectedVaultState.id : ACCOUNT

  return (
    <TextField
      value={value}
      select
      size="small"
      disabled={isVault || vaultIds.length === 0}
      FormHelperTextProps={{sx: {textAlign: 'right', mx: 0}}}
      onChange={(e) => {
        setVaultId(e.target.value === ACCOUNT ? null : e.target.value)
      }}
      helperText={
        <Typography variant="num6">
          {balance != null ? (
            `${toCurrency(balance)} PHA`
          ) : (
            <Skeleton width={55} sx={{marginLeft: 'auto'}} />
          )}
        </Typography>
      }
      SelectProps={{
        sx: {
          borderRadius: '20px',
          background: theme.palette.action.hover,
          fieldset: {border: 'none'},
          '.MuiSelect-select': {pl: 2, py: 1},
        },
      }}
    >
      <MenuItem value={ACCOUNT}>
        <Stack direction="row" spacing={1}>
          <Image
            src={account.wallet.logo.src}
            alt={account.wallet.logo.alt}
            width={22}
            height={22}
          />
          <Box
            sx={{
              maxWidth: '40px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {account.name}
          </Box>
        </Stack>
      </MenuItem>
      {vaultIds.map((pid) => (
        <MenuItem value={pid} key={pid}>
          <Stack direction="row" spacing={1}>
            <VaultIcon width={22} color={colors.vault[400]} />
            <Box>{`Vault #${pid}`}</Box>
          </Stack>
        </MenuItem>
      ))}
    </TextField>
  )
}

export default DelegatorSelect
