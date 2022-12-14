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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

type AssetDialogAction = 'transfer' | 'buy'
export type Asset = AssetMetadata & {balance: Decimal | undefined}
type OnAction = (asset: Asset, action: AssetDialogAction) => void

const BuyConfirmation: FC<{onClose: () => void}> = ({onClose}) => {
  return (
    <>
      <DialogTitle>Buy PHA</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The service is powered by Bifinity (Binance Connect).
        </DialogContentText>
        <br />
        <DialogContentText>
          Please note that tokens you purchase on Binance will not be
          automatically transferred to the Phala/Khala network. Pay attention to
          the security of your funds.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          href={`https://www.binancecnt.com/en/pre-connect?merchantCode=pha&timestamp=${Date.now()}&fiatCurrency=EUR`}
          target="_blank"
          onClick={onClose}
          variant="text"
        >
          I understand
        </Button>
      </DialogActions>
    </>
  )
}

const Asset: FC<{asset: Asset; onAction: OnAction}> = ({asset, onAction}) => {
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
      {asset.symbol === 'PHA' && (
        <Button
          variant="text"
          size="small"
          sx={{ml: 0.5}}
          onClick={() => onAction(asset, 'buy')}
        >
          Buy
        </Button>
      )}
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
        onClick={() => onAction(asset, 'transfer')}
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
  const [dialogAction, setDialogAction] = useState<AssetDialogAction>()
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
        return asset.balance && asset.balance.gt('0.01')
      })
    }
    return assets.sort((a, b) =>
      a.balance && b.balance && a.balance.greaterThan(b.balance) ? -1 : 1
    )
  }
  const onAction: OnAction = useCallback((asset, action) => {
    setDialogAction(action)
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
          onAction={onAction}
        />
        {getAssets().map((asset) => (
          <Asset asset={asset} key={asset.assetId} onAction={onAction} />
        ))}
      </Stack>
      <Dialog open={dialogOpen} onClose={onClose}>
        {operatingAsset && dialogAction === 'transfer' && (
          <AssetTransfer asset={operatingAsset} onClose={onClose} />
        )}
        {dialogAction === 'buy' && <BuyConfirmation onClose={onClose} />}
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
            label="Hide small balances"
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
