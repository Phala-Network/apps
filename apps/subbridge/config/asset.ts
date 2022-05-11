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
  nativeChain: ChainId[]
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
    nativeChain: ['khala', 'thala'],
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
      4: {
        address: '0xd06F0F098948cBdFcB9ED8d85688637478724855',
        abi: [
          'function allowance(address owner, address spender) external view returns (uint256)',
          'function approve(address spender, uint256 amount) external returns (bool)',
          'function balanceOf(address account) external view returns (uint256)',
        ],
        spender: '0x30f8549A46afa69f3F9b46e3C28F456796E6Cf37',
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
      4: {
        address: '0x0712Cf53B9fA1A33018d180a4AbcC7f1803F55f4',
        resourceId:
          '0x00e6dfb61a2fb903df487c401663825643bb825d41695e63df8af6162ab145a6',
        abi: [
          'event Deposit(uint8 destinationChainID, bytes32 resourceID, uint64 depositNonce)',
          'function deposit(uint8 destinationChainID, bytes32 resourceID, bytes calldata data)',
        ],
      },
    },
    decimals: {ethereum: 18, rinkeby: 18, default: 12},
  },
}
