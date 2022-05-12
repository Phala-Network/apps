import phaIcon from '@/assets/pha_asset_icon.png'
import type {ethers} from 'ethers'
import {StaticImageData} from 'next/image'
import {ChainId} from './chain'

export type AssetId = 'pha'
export type KaruraToken = 'PHA'
export interface Asset {
  id: AssetId
  symbol: string
  icon: StaticImageData
  decimals: Partial<Record<ChainId, number>> & {default: number}
  karuraToken?: KaruraToken
  assetContract?: {
    [evmChainId: number]: {
      address: `0x${string}`
      abi: ethers.ContractInterface
      spender: `0x${string}`
    }
  }
  bridgeContract?: {
    [evmChainId: number]: {
      address: `0x${string}`
      resourceId: `0x${string}`
      abi: ethers.ContractInterface
    }
  }
}

export const ASSETS: Readonly<Record<AssetId, Asset>> = {
  pha: {
    id: 'pha',
    symbol: 'PHA',
    icon: phaIcon,
    karuraToken: 'PHA',
    assetContract: {
      1: {
        address: '0x6c5bA91642F10282b576d91922Ae6448C9d52f4E',
        abi: [
          'function allowance(address owner, address spender) external view returns (uint256)',
          'function approve(address spender, uint256 amount) external returns (bool)',
          'function balanceOf(address account) external view returns (uint256)',
        ],
        spender: '0xEEc0fb4913119567cDfC0c5fc2Bf8f9F9B226c2d',
      },
      42: {
        address: '0x512f7a3c14b6ee86c2015bc8ac1fe97e657f75f2',
        abi: [
          'function allowance(address owner, address spender) external view returns (uint256)',
          'function approve(address spender, uint256 amount) external returns (bool)',
          'function balanceOf(address account) external view returns (uint256)',
        ],
        spender: '0xF69b08D649B744A4d4781CB1B86E30Cc9Ac9991b',
      },
    },
    bridgeContract: {
      1: {
        address: '0x8F92e7353b180937895E0C5937d616E8ea1A2Bb9',
        resourceId:
          '0x00e6dfb61a2fb903df487c401663825643bb825d41695e63df8af6162ab145a6',
        abi: [
          'event Deposit(uint8 destinationChainID, bytes32 resourceID, uint64 depositNonce)',
          'function deposit(uint8 destinationChainID, bytes32 resourceID, bytes calldata data)',
        ],
      },
      42: {
        address: '0x82db1f1717487cADEAf6F0C74825495d6D89E08e',
        resourceId:
          '0x00e6dfb61a2fb903df487c401663825643bb825d41695e63df8af6162ab145a6',
        abi: [
          'event Deposit(uint8 destinationChainID, bytes32 resourceID, uint64 depositNonce)',
          'function deposit(uint8 destinationChainID, bytes32 resourceID, bytes calldata data)',
        ],
      },
    },
    decimals: {ethereum: 18, kovan: 18, default: 12},
  },
}
