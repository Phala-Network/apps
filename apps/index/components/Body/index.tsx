import {useBalance} from '@/hooks/useBalance'
import {isWalletConnectAtom} from '@/store/common'
import {
  clientAtom,
  fromAmountAtom,
  fromAssetAtom,
  fromAssetsAtom,
  fromChainAtom,
  toAmountAtom,
  toAssetAtom,
  toAssetsAtom,
  toChainAtom,
} from '@/store/core'
import {isNetworkWrongAtom} from '@/store/ethers'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import ArrowForward from '@mui/icons-material/ArrowForward'
import {
  Box,
  Collapse,
  IconButton,
  Link,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import {type BoxProps} from '@mui/system'
import {toCurrency} from '@phala/util'
import {useAtom} from 'jotai'
import {type FC} from 'react'
import Action from './Action'
import AssetInput from './AssetInput'
import ChainSelect from './ChainSelect'
import DestinationAccountInput from './DestinationAccountInput'
import Progress from './Progress'
import SolutionInput from './SolutionInput'

const Body: FC<BoxProps> = (props) => {
  const theme = useTheme()
  const [client] = useAtom(clientAtom)
  const [fromChain, setFromChain] = useAtom(fromChainAtom)
  const [fromAmount, setFromAmount] = useAtom(fromAmountAtom)
  const [fromAsset, setFromAsset] = useAtom(fromAssetAtom)
  const [fromAssets] = useAtom(fromAssetsAtom)
  const [toChain, setToChain] = useAtom(toChainAtom)
  const [toAmount] = useAtom(toAmountAtom)
  const [toAsset, setToAsset] = useAtom(toAssetAtom)
  const [toAssets] = useAtom(toAssetsAtom)

  const balance = useBalance()
  const [isWalletConnected] = useAtom(isWalletConnectAtom)
  const [isNetworkWrong] = useAtom(isNetworkWrongAtom)

  const showMax = Boolean(
    balance != null &&
      !balance.eq(0) &&
      (fromAmount.length === 0 || !balance.eq(fromAmount)),
  )

  if (
    client == null ||
    fromChain == null ||
    toChain == null ||
    fromAsset == null ||
    toAsset == null
  ) {
    return null
  }

  const fromNativeChain =
    fromChain.chainType === 'Sub' &&
    fromChain.nativeAsset === fromAsset.location

  const handleSwitchChain = (): void => {
    setFromChain(toChain.name)
    setToChain(fromChain.name)
    setFromAsset(toAsset.id)
    setToAsset(fromAsset.id)
    // setFromAmount(toAmount)
  }

  return (
    <Box {...props}>
      <Paper
        sx={{
          mx: 'auto',
          p: 3,
          pt: 4,
        }}
      >
        <Stack direction="column" spacing={6}>
          <Stack
            direction={{xs: 'column', sm: 'row'}}
            spacing={{xs: 1, sm: 0}}
            sx={{width: 1, alignItems: 'center'}}
          >
            <Stack spacing={3} flex={1}>
              <ChainSelect
                fullWidth
                label="From"
                chain={fromChain}
                chains={client.chains}
                onChange={(e) => {
                  setFromChain(e.target.value)
                }}
              />
              <Box>
                <AssetInput
                  amount={fromAmount}
                  setAmount={setFromAmount}
                  asset={fromAsset}
                  assets={fromAssets}
                  setAsset={setFromAsset}
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
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        whiteSpace: 'pre',
                        cursor: showMax ? 'pointer' : 'default',
                      }}
                      onClick={() => {
                        if (showMax && balance != null) {
                          setFromAmount(balance.toString())
                        }
                      }}
                    >
                      <Typography variant="caption" sx={{fontWeight: 500}}>
                        {fromNativeChain ? 'Transferrable' : 'Balance'}:{' '}
                      </Typography>
                      {balance != null ? (
                        <Typography variant="caption" sx={{fontWeight: 500}}>
                          {`${toCurrency(balance)} ${fromAsset.symbol}`}
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
            </Stack>

            <IconButton onClick={handleSwitchChain}>
              <ArrowForward
                sx={{[theme.breakpoints.down('sm')]: {display: 'none'}}}
              />
              <ArrowDownward
                sx={{[theme.breakpoints.up('sm')]: {display: 'none'}}}
              />
            </IconButton>

            <Stack spacing={3} flex={1}>
              <ChainSelect
                fullWidth
                label="To"
                chain={toChain}
                chains={client.chains}
                onChange={(e) => {
                  setToChain(e.target.value)
                }}
              />
              <AssetInput
                amount={toAmount}
                asset={toAsset}
                assets={toAssets}
                setAsset={setToAsset}
                disabled
              />
            </Stack>
          </Stack>

          <DestinationAccountInput />

          <SolutionInput />

          <Box sx={{width: 1}}>
            <Action />
            <Collapse in={Boolean(fromAmount)}>
              <Progress sx={{mt: 3}} />
            </Collapse>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}

export default Body
