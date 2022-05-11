import {ASSETS} from '@/config/asset'
import {useBalance} from '@/hooks/useBalance'
import {
  amountAtom,
  assetAtom,
  decimalsAtom,
  fromChainAtom,
} from '@/store/bridge'
import {isWalletConnectAtom} from '@/store/common'
import {isNetworkWrongAtom} from '@/store/ethers'
import {Box, Link, Skeleton, TextField, Typography} from '@mui/material'
import {BoxProps} from '@mui/system'
import {formatCurrency} from '@phala/utils'
import {useAtom} from 'jotai'
import {FC} from 'react'
import AssetSelect from './AssetSelect'

const getDecimalPattern = (decimals: number) =>
  `^[0-9]+\\.?[0-9]{0,${decimals}}$`

const AmountInput: FC<BoxProps> = (props) => {
  const [asset] = useAtom(assetAtom)
  const [fromChain] = useAtom(fromChainAtom)
  const [amount, setAmount] = useAtom(amountAtom)
  const balance = useBalance()
  const [decimals] = useAtom(decimalsAtom)
  const [isWalletConnected] = useAtom(isWalletConnectAtom)
  const [isNetworkWrong] = useAtom(isNetworkWrongAtom)

  const showMax = Boolean(
    balance && !balance.eq(0) && (!amount || !balance.eq(amount))
  )

  const fromNativeChain =
    fromChain.kind === 'polkadot' && asset.nativeChain.includes(fromChain.id)

  return (
    <Box {...props}>
      <TextField
        spellCheck={false}
        label="Amount"
        fullWidth
        placeholder="0.0"
        value={amount}
        inputProps={{
          inputMode: 'decimal',
          pattern: getDecimalPattern(decimals),
          sx: {fontWeight: 600},
        }}
        InputProps={{
          endAdornment: (
            <AssetSelect
              sx={{flex: 'none'}}
              assetIds={[ASSETS.pha.id]}
              value={ASSETS.pha.id}
            />
          ),
        }}
        onChange={(e) => {
          if (!e.target.validity.patternMismatch) {
            setAmount(e.target.value)
          }
        }}
      />

      {isWalletConnected && !isNetworkWrong && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 1,
            height: 24,
            mb: -4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'pre',
              cursor: showMax ? 'pointer' : 'default',
            }}
            onClick={() => {
              if (showMax && balance) {
                setAmount(balance.toString())
              }
            }}
          >
            <Typography variant="caption" sx={{fontWeight: 500}}>
              {fromNativeChain ? 'Transferrable' : 'Balance'}:{' '}
            </Typography>
            {balance ? (
              <Typography variant="caption" sx={{fontWeight: 500}}>
                {`${formatCurrency(balance)} ${asset.symbol}`}
              </Typography>
            ) : (
              <Skeleton width={64} />
            )}

            {showMax && (
              <Link
                variant="caption"
                component="button"
                sx={{ml: 1, fontWeight: 700}}
              >
                Max
              </Link>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default AmountInput
