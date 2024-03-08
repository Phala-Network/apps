import {useBalance} from '@/hooks/useBalance'
import {useBridgeLimit} from '@/hooks/useBridgeLimit'
import {
  amountAtom,
  assetAtom,
  decimalsAtom,
  fromChainAtom,
} from '@/store/bridge'
import {isWalletConnectAtom} from '@/store/common'
import {isNetworkWrongAtom} from '@/store/ethers'
import {
  Box,
  type InputProps,
  Link,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material'
import type {BoxProps} from '@mui/system'
import {toCurrency} from '@phala/lib'
import {useAtom} from 'jotai'
import type {FC} from 'react'

const getDecimalPattern = (decimals: number): string =>
  `^[0-9]+\\.?[0-9]{0,${decimals}}$`

const AmountInput: FC<BoxProps & Pick<InputProps, 'endAdornment'>> = ({
  endAdornment,
  ...props
}) => {
  const [asset] = useAtom(assetAtom)
  const [fromChain] = useAtom(fromChainAtom)
  const [amount, setAmount] = useAtom(amountAtom)
  const balance = useBalance()
  const [decimals] = useAtom(decimalsAtom)
  const [isWalletConnected] = useAtom(isWalletConnectAtom)
  const [isNetworkWrong] = useAtom(isNetworkWrongAtom)
  const bridgeLimit = useBridgeLimit()

  const showMax = Boolean(
    balance != null &&
      !balance.eq(0) &&
      (amount.length === 0 || !balance.eq(amount)),
  )

  const fromNativeChain =
    fromChain.kind === 'substrate' && fromChain.nativeAsset === asset.id

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
          endAdornment,
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
            alignItems: 'center',
            mt: 1,
            height: 24,
            mb: -4,
          }}
        >
          {(bridgeLimit == null || bridgeLimit.isFinite()) && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'pre',
                mr: 2,
              }}
            >
              <Typography variant="caption" sx={{fontWeight: 500}}>
                Limit:{' '}
              </Typography>
              {bridgeLimit != null ? (
                <Typography variant="caption" sx={{fontWeight: 500}}>
                  {`${toCurrency(bridgeLimit, 1)} ${asset.symbol}`}
                </Typography>
              ) : (
                <Skeleton width={64} />
              )}
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'pre',
              cursor: showMax ? 'pointer' : 'default',
            }}
            onClick={() => {
              if (showMax && balance != null) {
                setAmount(balance.toString())
              }
            }}
          >
            <Typography variant="caption" sx={{fontWeight: 500}}>
              {fromNativeChain ? 'Transferrable' : 'Balance'}:{' '}
            </Typography>
            {balance != null ? (
              <Typography variant="caption" sx={{fontWeight: 500}}>
                {`${toCurrency(balance)} ${asset.symbol}`}
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
