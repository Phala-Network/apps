import type {EvmChain} from '@/config/chain'
import {useBridgeFee} from '@/hooks/useBridgeFee'
import {useEstimatedGasFee} from '@/hooks/useEstimatedGasFee'
import {useCurrentPolkadotApi} from '@/hooks/usePolkadotApi'
import {
  assetAtom,
  bridgeInfoAtom,
  destChainTransactionFeeAtom,
  fromChainAtom,
} from '@/store/bridge'
import {
  Box,
  type BoxProps,
  Divider,
  Paper,
  type PaperProps,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import {toCurrency} from '@phala/lib'
import {useAtomValue} from 'jotai'
import type {FC, ReactNode} from 'react'

const Info: FC<
  {label: string; tooltip?: string; children: ReactNode} & BoxProps
> = ({label, tooltip, children, ...boxProps}) => {
  const theme = useTheme()
  const labelNode = (
    <Typography
      variant="body2"
      component="span"
      sx={{
        flex: 'none',
        mr: 2,
        color: theme.palette.text.secondary,
        ...(tooltip != null && {
          textDecoration: 'dotted underline',
          cursor: 'help',
        }),
      }}
    >
      {label}
    </Typography>
  )
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      {...boxProps}
    >
      {tooltip != null ? (
        <Tooltip title={tooltip} placement="bottom-start">
          {labelNode}
        </Tooltip>
      ) : (
        labelNode
      )}
      <Typography
        variant="body2"
        component="span"
        sx={{fontWeight: 500, textAlign: 'right'}}
      >
        {children}
      </Typography>
    </Box>
  )
}

const ExtraInfo: FC<PaperProps> = ({sx, ...props}) => {
  const theme = useTheme()
  const fromChain = useAtomValue(fromChainAtom)
  const polkadotApi = useCurrentPolkadotApi()
  const estimatedGas = useEstimatedGasFee()
  const bridgeFee = useBridgeFee()
  const bridge = useAtomValue(bridgeInfoAtom)
  const asset = useAtomValue(assetAtom)
  const destChainTransactionFee = useAtomValue(destChainTransactionFeeAtom)
  const {estimatedTime} = useAtomValue(bridgeInfoAtom)

  return (
    <Paper
      sx={[
        {
          p: 2,
          background: theme.palette.action.hover,
          border: 'none',
        },
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        ...(Array.isArray(sx) ? (sx as any) : [sx]),
      ]}
      {...props}
    >
      <Stack spacing={1}>
        <Info
          label="Bridge Fee"
          tooltip="This transaction will charge a bridge fee to cover the destination chain’s gas fee."
        >
          {bridgeFee != null ? (
            `${toCurrency(bridgeFee, 8)} ${
              bridge.kind === 'evmSygma'
                ? (fromChain as EvmChain).currencySymbol
                : asset.symbol
            }`
          ) : (
            <Skeleton width={80} />
          )}
        </Info>

        <Info
          label="Destination Chain Fee"
          tooltip=" This fee is used to pay the XCM fee of the destination chain."
        >
          {`${toCurrency(destChainTransactionFee, 12)} ${asset.symbol}`}
        </Info>

        <Divider />

        <Info label="Estimated time">{estimatedTime}</Info>

        <Info label="Estimated gas fee">
          {estimatedGas != null ? (
            `${toCurrency(estimatedGas, 8)} ${
              fromChain.kind === 'evm'
                ? fromChain.currencySymbol
                : polkadotApi?.registry.chainTokens[0] ?? ''
            }`
          ) : (
            <Skeleton width={80} />
          )}
        </Info>
      </Stack>
    </Paper>
  )
}

export default ExtraInfo
