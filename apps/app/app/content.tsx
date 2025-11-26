'use client'

import {Box, Divider, Grid, Stack, Typography} from '@mui/material'
import {toCurrency} from '@phala/lib'
import phaIcon from '@phala/ui/icons/asset/pha.png'
import vphaIcon from '@phala/ui/icons/asset/vpha.png'
import {useAppKitAccount, useAppKitNetwork} from '@reown/appkit/react'
import Decimal from 'decimal.js'
import {useCallback, useMemo} from 'react'
import {erc20Abi, formatUnits} from 'viem'
import {mainnet} from 'viem/chains'
import {useReadContract} from 'wagmi'

import AssetCard from '@/components/asset-card'
import PortfolioSummary from '@/components/portfolio-summary'
import QuickActions from '@/components/quick-actions'
import {
  ethChain,
  L2_VPHA_CONTRACT_ADDRESS,
  PHA_CONTRACT_ADDRESS,
  VAULT_CONTRACT_ADDRESS,
} from '@/config'
import {useRewardRate, useSharePrice, useTotalAssets} from '@/hooks/staking'
import {useAddTokenToWallet} from '@/hooks/use-add-token-to-wallet'
import {phalaNetwork, toAddress} from '@/lib/wagmi'

export default function HomeContent() {
  const {address: rawAddress, isConnected} = useAppKitAccount()
  const {chainId} = useAppKitNetwork()
  const address = toAddress(rawAddress)
  const sharePrice = useSharePrice()
  const totalAssets = useTotalAssets()
  const rewardRate = useRewardRate()
  const {addTokenToWallet, addNetwork} = useAddTokenToWallet()

  const isValidConnection = isConnected && chainId === ethChain.id

  const stakingApr = useMemo(() => {
    if (rewardRate == null || !totalAssets) {
      return null
    }
    return Decimal.mul(rewardRate.toString(), 365 * 24 * 60 * 60).div(
      totalAssets.toString(),
    )
  }, [rewardRate, totalAssets])

  const {data: l1PhaBalance} = useReadContract({
    address: PHA_CONTRACT_ADDRESS,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address && [address],
    chainId: mainnet.id,
    query: {
      enabled: isValidConnection && Boolean(address),
      refetchInterval: 3_000,
    },
  })

  const {data: l1VphaBalance} = useReadContract({
    address: VAULT_CONTRACT_ADDRESS,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address && [address],
    chainId: mainnet.id,
    query: {
      enabled: isValidConnection && Boolean(address),
      refetchInterval: 3_000,
    },
  })

  const {data: l2VphaBalance} = useReadContract({
    address: L2_VPHA_CONTRACT_ADDRESS,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address && [address],
    chainId: phalaNetwork.id,
    query: {
      enabled: isValidConnection && Boolean(address),
      refetchInterval: 3_000,
    },
  })

  const l1VphaInPha = useMemo(() => {
    if (l1VphaBalance == null || sharePrice == null) return null
    return new Decimal(formatUnits(l1VphaBalance, 18)).mul(
      formatUnits(sharePrice, 18),
    )
  }, [l1VphaBalance, sharePrice])

  const l2VphaInPha = useMemo(() => {
    if (l2VphaBalance == null || sharePrice == null) return null
    return new Decimal(formatUnits(l2VphaBalance, 18)).mul(
      formatUnits(sharePrice, 18),
    )
  }, [l2VphaBalance, sharePrice])

  const totalVphaBalance = useMemo(() => {
    if (l1VphaBalance == null && l2VphaBalance == null) return null
    return (l1VphaBalance ?? 0n) + (l2VphaBalance ?? 0n)
  }, [l1VphaBalance, l2VphaBalance])

  const totalVphaInPha = useMemo(() => {
    if (l1VphaInPha == null && l2VphaInPha == null) return null
    return (l1VphaInPha ?? new Decimal(0)).add(l2VphaInPha ?? new Decimal(0))
  }, [l1VphaInPha, l2VphaInPha])

  const totalPhaValue = useMemo(() => {
    if (!isValidConnection) return null
    const pha = new Decimal(formatUnits(l1PhaBalance ?? 0n, 18))
    const vpha = totalVphaInPha ?? new Decimal(0)
    return pha.add(vpha)
  }, [isValidConnection, l1PhaBalance, totalVphaInPha])

  const addPhaToWallet = useCallback(() => {
    addTokenToWallet({
      chainId: mainnet.id,
      address: PHA_CONTRACT_ADDRESS,
      symbol: 'PHA',
      image: 'https://app.phala.network/icons/pha.png',
    })
  }, [addTokenToWallet])

  const addL1VphaToWallet = useCallback(() => {
    addTokenToWallet({
      chainId: mainnet.id,
      address: VAULT_CONTRACT_ADDRESS,
      symbol: 'vPHA',
      image: 'https://app.phala.network/icons/vpha.png',
    })
  }, [addTokenToWallet])

  const addL2VphaToWallet = useCallback(() => {
    addTokenToWallet({
      chainId: phalaNetwork.id,
      address: L2_VPHA_CONTRACT_ADDRESS,
      symbol: 'vPHA',
      image: 'https://app.phala.network/icons/vpha.png',
    })
  }, [addTokenToWallet])

  const addPhalaNetworkToWallet = useCallback(() => {
    addNetwork(phalaNetwork.id)
  }, [addNetwork])

  return (
    <Box pb={10} pt={3}>
      <Stack spacing={4}>
        <PortfolioSummary
          totalPhaValue={totalPhaValue}
          totalStakedVpha={totalVphaBalance}
          totalStakedInPha={totalVphaInPha}
          stakingApr={stakingApr}
          isConnected={isConnected}
        />

        <QuickActions />

        <Divider sx={{borderColor: 'divider'}} />

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Your Assets
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{xs: 12, md: 6}}>
              <AssetCard
                icon={phaIcon}
                name="Phala Token"
                symbol="PHA"
                balance={isValidConnection ? l1PhaBalance : null}
                contractAddress={PHA_CONTRACT_ADDRESS}
                chainLabel="Ethereum"
                highlight
                onAddToWallet={addPhaToWallet}
                actions={[
                  {
                    label: 'Stake',
                    href: '/staking',
                    variant: 'contained',
                  },
                  {
                    label: 'Bridge',
                    href: 'https://bridge.phala.network/',
                    external: true,
                  },
                  {
                    label: 'Swap',
                    href: `https://app.uniswap.org/swap?chain=mainnet&outputCurrency=${PHA_CONTRACT_ADDRESS}`,
                    external: true,
                  },
                ]}
              />
            </Grid>

            <Grid size={{xs: 12, md: 6}}>
              <AssetCard
                icon={vphaIcon}
                name="Phala Vault"
                symbol="vPHA"
                balance={isValidConnection ? l1VphaBalance : null}
                contractAddress={VAULT_CONTRACT_ADDRESS}
                chainLabel="Ethereum"
                subValue={
                  isValidConnection && l1VphaInPha != null
                    ? `≈ ${toCurrency(l1VphaInPha)} PHA`
                    : undefined
                }
                onAddToWallet={addL1VphaToWallet}
                actions={[
                  {
                    label: 'Unstake',
                    href: '/staking?tab=unstake',
                    variant: 'outlined',
                  },
                  {
                    label: 'Swap on DEX',
                    href: `https://app.uniswap.org/swap?chain=mainnet&inputCurrency=${VAULT_CONTRACT_ADDRESS}&outputCurrency=${PHA_CONTRACT_ADDRESS}`,
                    external: true,
                  },
                ]}
              />
            </Grid>

            <Grid size={{xs: 12, md: 6}}>
              <AssetCard
                icon={vphaIcon}
                name="Phala Vault (L2)"
                symbol="vPHA"
                balance={isValidConnection ? l2VphaBalance : null}
                contractAddress={L2_VPHA_CONTRACT_ADDRESS}
                contractExplorerUrl="https://explorer.phala.network"
                chainLabel="Phala Mainnet"
                subValue={
                  isValidConnection && l2VphaInPha != null
                    ? `≈ ${toCurrency(l2VphaInPha)} PHA`
                    : undefined
                }
                onAddToWallet={addL2VphaToWallet}
                addToWalletLabel="Add vPHA"
                onAddNetwork={addPhalaNetworkToWallet}
                actions={[
                  {
                    label: 'Bridge to L1',
                    href: 'https://bridge.phala.network/',
                    external: true,
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  )
}
