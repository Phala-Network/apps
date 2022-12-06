import AssetIcon from '@/assets/asset.svg'
import useAssetBalance from '@/hooks/useAssetBalance'
import useAssetsMetadata, {
  AssetMetadata,
  phaMetadata,
} from '@/hooks/useAssetsMetadata'
import useWrapAsset from '@/hooks/useWrapAsset'
import {hideSmallBalanceAtom} from '@/store/ui'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  FormControlLabel,
  NoSsr,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {toCurrency} from '@phala/util'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import Image from 'next/image'
import {FC, useCallback, useState} from 'react'
import AssetTransfer from './AssetTransfer'
import SectionHeader from './SectionHeader'

export type Asset = AssetMetadata & {balance: Decimal | undefined}
type OnTransfer = (asset: Asset) => void

const Asset: FC<{asset: Asset; onTransfer: OnTransfer}> = ({
  asset,
  onTransfer,
}) => {
  const wrapAsset = useWrapAsset()
  return (
    <Stack direction="row" py={2} px={{xs: 1, sm: 2}} alignItems="center">
      <Box
        width="28px"
        height="28px"
        borderRadius="14px"
        overflow="hidden"
        flexShrink="0"
      >
        {asset.iconSrc ? (
          <Image src={asset.iconSrc} width={28} height={28} alt={asset.name} />
        ) : (
          <></>
        )}
      </Box>
      <Typography
        variant="subtitle1"
        ml={{xs: 1, sm: 2}}
        fontWeight={500}
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        {asset.name}
      </Typography>
      <Typography variant="num6" ml="auto" flexShrink={0}>
        {asset.balance ? (
          `${wrapAsset(toCurrency(asset.balance))} ${asset.symbol}`
        ) : (
          <Skeleton width={32} />
        )}
      </Typography>
      <Button
        size="small"
        variant="text"
        sx={{ml: 2}}
        disabled={!asset.balance || asset.balance.eq(0)}
        onClick={() => onTransfer(asset)}
      >
        Transfer
      </Button>
      <Button size="small" variant="text">
        Bridge
      </Button>
    </Stack>
  )
}

const Assets: FC<{
  assetsMetadata: Record<number, AssetMetadata>
}> = ({assetsMetadata}) => {
  const [hideSmallBalance] = useAtom(hideSmallBalanceAtom)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [operatingAsset, setOperatingAsset] = useState<Asset>()
  const [account] = useAtom(polkadotAccountAtom)
  const phaBalance = useAssetBalance(account?.address)
  const allAssets: Record<number, Asset> = {}
  for (const stringAssetId in assetsMetadata) {
    const assetId = Number(stringAssetId)
    // MEMO: because assetsMetadata is immutable, we can safely disable the rule
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const balance = useAssetBalance(account?.address, assetId)
    allAssets[assetId] = {...assetsMetadata[assetId], balance}
  }

  const getAssets = () => {
    let assets = Object.values(allAssets)
    if (hideSmallBalance) {
      assets = assets.filter((asset) => {
        return asset.balance && asset.balance.gt(0)
      })
    }
    return assets.sort((a, b) =>
      a.balance && b.balance && a.balance.greaterThan(b.balance) ? -1 : 1
    )
  }
  const onTransfer: OnTransfer = useCallback((asset) => {
    setDialogOpen(true)
    setOperatingAsset(asset)
  }, [])
  const onClose = useCallback(() => {
    setDialogOpen(false)
  }, [])

  return (
    <>
      <Stack divider={<Divider flexItem />}>
        <Asset
          asset={{...phaMetadata, balance: phaBalance}}
          onTransfer={onTransfer}
        />
        {getAssets().map((asset) => (
          <Asset asset={asset} key={asset.assetId} onTransfer={onTransfer} />
        ))}
      </Stack>
      <Dialog open={dialogOpen} onClose={onClose}>
        {operatingAsset && (
          <AssetTransfer asset={operatingAsset} onClose={onClose} />
        )}
      </Dialog>
    </>
  )
}

const DashboardAssetList: FC = () => {
  const assetsMetadata = useAssetsMetadata()
  const [hideSmallBalance, setHideSmallBalance] = useAtom(hideSmallBalanceAtom)

  return (
    <>
      <SectionHeader title="Assets" icon={<AssetIcon />}>
        <NoSsr>
          <FormControlLabel
            sx={{ml: 'auto'}}
            label="Hide Small Balances"
            control={
              <Checkbox
                checked={hideSmallBalance}
                onChange={(e) => {
                  setHideSmallBalance(e.target.checked)
                }}
              />
            }
          />
        </NoSsr>
      </SectionHeader>
      <Paper sx={{background: 'transparent', overflow: 'hidden'}}>
        {assetsMetadata ? (
          <Assets assetsMetadata={assetsMetadata} />
        ) : (
          <Skeleton variant="rectangular" height={240} />
        )}
      </Paper>
    </>
  )
}

export default DashboardAssetList
