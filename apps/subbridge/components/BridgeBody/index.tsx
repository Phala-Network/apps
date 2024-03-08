import type {AssetId} from '@/config/asset'
import {ALL_FROM_CHAINS, BRIDGES} from '@/config/bridge'
import type {ChainId} from '@/config/chain'
import {
  amountAtom,
  assetAtom,
  bridgeInfoAtom,
  destinationAccountAtom,
  fromChainAtom,
  toChainAtom,
} from '@/store/bridge'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import ArrowForward from '@mui/icons-material/ArrowForward'
import {Box, Collapse, IconButton, Paper, Stack, useTheme} from '@mui/material'
import type {BoxProps} from '@mui/system'
import {useAtom, useAtomValue} from 'jotai'
import {type FC, useState} from 'react'
import Action from './Action'
import AmountInput from './AmountInput'
import AssetSelect from './AssetSelect'
import ChainSelect from './ChainSelect'
import DestinationAccountInput from './DestinationAccountInput'
import DestinationAccountWarning from './DestinationAccountWarning'
import ExtraInfo from './Extra'
import PoweredBySygma from './PoweredBySygma'

const getToChainIds = (fromChainId: ChainId): ChainId[] =>
  BRIDGES.find((bridge) => bridge.fromChain === fromChainId)
    ?.toChains.filter((x) => x.assets.length > 0)
    .map((x) => x.id) ?? []

const getAssetIds = (fromChainId: ChainId, toChainId: ChainId): AssetId[] =>
  BRIDGES.find((bridge) => bridge.fromChain === fromChainId)
    ?.toChains.find((x) => x.id === toChainId)
    ?.assets.map(({assetId}) => assetId) ?? []

const BridgeBody: FC<BoxProps> = (props) => {
  const theme = useTheme()
  const [amount, setAmount] = useAtom(amountAtom)
  const [asset, setAsset] = useAtom(assetAtom)
  const [fromChain, setFromChain] = useAtom(fromChainAtom)
  const [toChain, setToChain] = useAtom(toChainAtom)
  const [toChainIds, setToChainIds] = useState<ChainId[]>(
    getToChainIds(fromChain.id),
  )
  const [assetIds, setAssetIds] = useState<AssetId[]>(
    getAssetIds(fromChain.id, toChain.id),
  )
  const destinationAccount = useAtomValue(destinationAccountAtom)
  const bridge = useAtomValue(bridgeInfoAtom)

  const handleSelectFromChain = (newFromChainId: ChainId): void => {
    setFromChain(newFromChainId)
    setAmount('')
    const newToChainIds = getToChainIds(newFromChainId)
    setToChainIds(newToChainIds)
    let newToChainId = toChain.id
    if (!newToChainIds.includes(toChain.id)) {
      if (
        newFromChainId === toChain.id &&
        newToChainIds.includes(fromChain.id)
      ) {
        newToChainId = fromChain.id
      } else {
        newToChainId = newToChainIds[0]
      }
    }
    setToChain(newToChainId)
    const newAssetIds = getAssetIds(newFromChainId, newToChainId)
    if (!newAssetIds.includes(asset.id)) {
      setAsset(newAssetIds[0])
    }
    setAssetIds(newAssetIds)
  }

  const handleSelectToChain = (newToChainId: ChainId): void => {
    setToChain(newToChainId)
    const newAssetIds = getAssetIds(fromChain.id, newToChainId)
    if (!newAssetIds.includes(asset.id)) {
      setAsset(newAssetIds[0])
    }
    setAssetIds(newAssetIds)
  }

  const handleSwitchChain = (): void => {
    if (ALL_FROM_CHAINS.includes(toChain.id)) {
      handleSelectFromChain(toChain.id)
    }
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
            spacing={1}
            sx={{width: 1, alignItems: 'center'}}
          >
            <ChainSelect
              fullWidth
              label="From"
              value={fromChain.id}
              chainIds={ALL_FROM_CHAINS}
              onChange={(e) => {
                handleSelectFromChain(e.target.value as ChainId)
              }}
            />

            <IconButton onClick={handleSwitchChain}>
              <ArrowForward
                sx={{[theme.breakpoints.down('sm')]: {display: 'none'}}}
              />
              <ArrowDownward
                sx={{[theme.breakpoints.up('sm')]: {display: 'none'}}}
              />
            </IconButton>

            <ChainSelect
              fullWidth
              label="To"
              chainIds={toChainIds}
              value={toChain.id}
              onChange={(e) => {
                handleSelectToChain(e.target.value as ChainId)
              }}
            />
          </Stack>

          <AmountInput
            endAdornment={
              <AssetSelect sx={{flex: 'none'}} assetIds={assetIds} />
            }
          />

          <DestinationAccountInput />

          <Box sx={{width: 1}}>
            <Collapse in={Boolean(amount) && Boolean(destinationAccount)}>
              {toChain.kind !== 'evm' && (
                <DestinationAccountWarning sx={{mb: 3}} />
              )}
              <ExtraInfo sx={{mb: 3}} />
            </Collapse>

            {(bridge.kind === 'evmSygma' ||
              bridge.kind === 'phalaSygma' ||
              ((bridge.proxy === 'phala' || bridge.proxy === 'khala') &&
                toChain.id === 'ethereum')) && <PoweredBySygma sx={{mb: 3}} />}

            <Action />
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}

export default BridgeBody
