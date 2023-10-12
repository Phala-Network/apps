import {type Asset} from '@/config/common'
import {
  destinationAccountAtom,
  fromAccountAtom,
  fromAmountAtom,
  fromAssetAtom,
  fromChainAtom,
  toAssetAtom,
  toChainAtom,
} from '@/store/core'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import {
  Box,
  Paper,
  Stack,
  Typography,
  useTheme,
  type PaperProps,
} from '@mui/material'
import {type BoxProps} from '@mui/system'
import {type Chain} from '@phala/index'
import {useAtom} from 'jotai'
import {type FC, type ReactNode} from 'react'

const Info: FC<{label: ReactNode; children: ReactNode} & BoxProps> = ({
  label,
  children,
  ...boxProps
}) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      {...boxProps}
    >
      {typeof label === 'string' ? (
        <Typography
          variant="body2"
          component="span"
          sx={{
            flex: 'none',
            mr: 2,
            color: theme.palette.text.secondary,
          }}
        >
          {label}
        </Typography>
      ) : (
        label
      )}

      {children}
    </Box>
  )
}

const Detail: FC<
  PaperProps & {
    kind: 'From' | 'To'
    chain: Chain
    account: string
    asset: Asset
    amount?: string
  }
> = ({kind, chain, account, asset, amount, ...paperProps}) => {
  return (
    <Paper sx={{p: 2, width: 1}} {...paperProps}>
      <Stack spacing={2}>
        <Info label={kind}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <img
              css={{width: 16, height: 16}}
              src={`/icons/${chain.name.toLowerCase()}_chain_icon.png`}
              alt={chain.name}
            />
            <Typography variant="body2" component="span" sx={{ml: 1}}>
              {chain.name}
            </Typography>
          </Box>
        </Info>
        <Info label="Account">
          <Typography
            variant="caption"
            sx={{
              maxWidth: 200,
              wordBreak: 'break-all',
              textAlign: 'right',
              lineHeight: 1.2,
            }}
          >
            {account}
          </Typography>
        </Info>
        <Info label="Asset">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
            }}
          >
            {amount != null && (
              <Typography variant="body2" sx={{fontWeight: 600}}>
                {amount}
              </Typography>
            )}
            <Box sx={{display: 'flex', alignItems: 'center', ml: 1}}>
              <source></source>
              <img
                css={{width: 16, height: 16}}
                src={`/icons/${asset.symbol.toLowerCase()}_asset_icon.png`}
                alt={asset.symbol}
              />
              <Typography variant="body2" sx={{ml: 1}}>
                {asset.symbol}
              </Typography>
            </Box>
          </Box>
        </Info>
      </Stack>
    </Paper>
  )
}

const Confirmation: FC<BoxProps> = (props) => {
  const [fromChain] = useAtom(fromChainAtom)
  const [toChain] = useAtom(toChainAtom)
  const [fromAccount] = useAtom(fromAccountAtom)
  const [fromAmount] = useAtom(fromAmountAtom)
  const [fromAsset] = useAtom(fromAssetAtom)
  const [toAsset] = useAtom(toAssetAtom)
  const [destinationAccount] = useAtom(destinationAccountAtom)

  if (
    fromAccount == null ||
    fromChain == null ||
    fromAsset == null ||
    toChain == null ||
    toAsset == null
  )
    return null

  return (
    <Box {...props}>
      <Stack spacing={2} sx={{alignItems: 'center'}}>
        <Detail
          kind="From"
          chain={fromChain}
          account={fromAccount}
          amount={fromAmount}
          asset={fromAsset}
        />
        <ArrowDownward color="action" />
        <Detail
          kind="To"
          chain={toChain}
          account={destinationAccount}
          asset={toAsset}
        />
      </Stack>
    </Box>
  )
}

export default Confirmation
