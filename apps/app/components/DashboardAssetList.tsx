import AssetIcon from '@/assets/asset.svg'
import {WPHA_ASSET_ID} from '@/config'
import useAssetBalance from '@/hooks/useAssetBalance'
import useAssetsMetadata, {
  phaMetadata,
  type AssetMetadata,
} from '@/hooks/useAssetsMetadata'
import useWrapAsset from '@/hooks/useWrapAsset'
import {chainAtom} from '@/store/common'
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
import {toCurrency} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import type Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import Image from 'next/image'
import {type FC, useCallback, useState} from 'react'
import AssetTransfer from './AssetTransfer'
import SectionHeader from './SectionHeader'
import Vest from './Vest'
import WrapDecimal from './WrapDecimal'

type AssetDialogAction = 'transfer' | 'buy' | 'claim'
export type Asset = AssetMetadata & {balance: Decimal | undefined | null}
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

const AssetLine: FC<{asset: Asset; onAction: OnAction}> = ({
  asset,
  onAction,
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
        {asset.iconSrc !== undefined && (
          <Image src={asset.iconSrc} width={28} height={28} alt={asset.name} />
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
        <>
          <Button
            variant="text"
            size="small"
            sx={{ml: 0.5}}
            onClick={() => {
              onAction(asset, 'buy')
            }}
          >
            Buy
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              onAction(asset, 'claim')
            }}
          >
            Claim
          </Button>
        </>
      )}
      <Typography variant="num5" ml="auto" flexShrink={0}>
        {asset.balance != null ? (
          <WrapDecimal>
            {`${wrapAsset(toCurrency(asset.balance))} ${asset.symbol}`}
          </WrapDecimal>
        ) : (
          <Skeleton width={32} />
        )}
      </Typography>
      <Button
        size="small"
        variant="text"
        sx={{ml: 2}}
        disabled={asset.balance == null || asset.balance.eq(0)}
        onClick={() => {
          onAction(asset, 'transfer')
        }}
      >
        Transfer
      </Button>
      <Button
        size="small"
        variant="text"
        href="https://subbridge.io"
        target="_blank"
      >
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
  const phaBalance = useAssetBalance(account?.address, 'free')
  const allAssets: Record<number, Asset> = {}
  for (const stringAssetId in assetsMetadata) {
    const assetId = Number(stringAssetId)
    if (assetId === WPHA_ASSET_ID) continue
    // MEMO: because assetsMetadata is immutable, we can safely disable the rule
    const balance = useAssetBalance(account?.address, assetId)
    allAssets[assetId] = {...assetsMetadata[assetId], balance}
  }

  const getAssets = (): Asset[] => {
    let assets = Object.values(allAssets)
    if (hideSmallBalance) {
      assets = assets.filter((asset) => {
        return asset.balance?.gt('0.01')
      })
    }
    return assets.sort((a, b) =>
      a.balance != null && b.balance != null && a.balance.greaterThan(b.balance)
        ? -1
        : 1,
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
        <AssetLine
          asset={{...phaMetadata, balance: phaBalance}}
          onAction={onAction}
        />
        {getAssets().map((asset) => (
          <AssetLine asset={asset} key={asset.assetId} onAction={onAction} />
        ))}
      </Stack>
      <Dialog open={dialogOpen} onClose={onClose}>
        {operatingAsset != null && dialogAction === 'transfer' && (
          <AssetTransfer asset={operatingAsset} onClose={onClose} />
        )}
        {dialogAction === 'buy' && <BuyConfirmation onClose={onClose} />}
        {dialogAction === 'claim' && <Vest onClose={onClose} />}
      </Dialog>
    </>
  )
}

const DashboardAssetList: FC = () => {
  const [chain] = useAtom(chainAtom)
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
        {assetsMetadata != null ? (
          <Assets assetsMetadata={assetsMetadata} key={chain} />
        ) : (
          <Skeleton variant="rectangular" height={240} />
        )}
      </Paper>
    </>
  )
}

export default DashboardAssetList
