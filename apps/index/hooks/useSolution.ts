import {
  fromAmountAtom,
  fromAssetAtom,
  fromChainAtom,
  toAssetAtom,
  toChainAtom,
} from '@/store/core'
import {ASSETS, type Solution} from '@phala/index'
import {useAtom} from 'jotai'
import useSWR, {type SWRResponse} from 'swr'

const solution: Solution = [
  {
    exe_type: 'swap',
    exe: 'moonbeam_stellaswap',
    source_chain: 'Moonbeam',
    dest_chain: 'Moonbeam',
    spend_asset: ASSETS.Moonbeam.WGLMR,
    receive_asset: ASSETS.Moonbeam.xcDOT,
  },
  {
    exe_type: 'swap',
    exe: 'moonbeam_stellaswap',
    source_chain: 'Moonbeam',
    dest_chain: 'Moonbeam',
    spend_asset: ASSETS.Moonbeam.xcDOT,
    receive_asset: ASSETS.Moonbeam.xcPHA,
  },
  {
    exe_type: 'bridge',
    exe: 'moonbeam_bridge_to_phala',
    source_chain: 'Moonbeam',
    dest_chain: 'Phala',
    spend_asset: ASSETS.Moonbeam.xcPHA,
    receive_asset: ASSETS.Phala.PHA,
  },
  {
    exe_type: 'bridge',
    exe: 'phala_bridge_to_astar',
    source_chain: 'Phala',
    dest_chain: 'Astar',
    spend_asset: ASSETS.Phala.PHA,
    receive_asset: ASSETS.Astar.PHA,
  },
  {
    exe_type: 'bridge',
    exe: 'astar_bridge_to_astarevm',
    source_chain: 'Astar',
    dest_chain: 'AstarEvm',
    spend_asset: ASSETS.Astar.PHA,
    receive_asset: ASSETS.AstarEvm.xcPHA,
  },
  {
    exe_type: 'swap',
    exe: 'astar_evm_arthswap',
    source_chain: 'AstarEvm',
    dest_chain: 'AstarEvm',
    spend_asset: ASSETS.AstarEvm.xcPHA,
    receive_asset: ASSETS.AstarEvm.WASTAR,
  },
  {
    exe_type: 'swap',
    exe: 'astar_evm_arthswap',
    source_chain: 'AstarEvm',
    dest_chain: 'AstarEvm',
    spend_asset: ASSETS.AstarEvm.WASTAR,
    receive_asset: ASSETS.AstarEvm.xcGLMR,
  },
]

const useSolution = (): SWRResponse<Solution | null> => {
  const [fromChain] = useAtom(fromChainAtom)
  const [fromAsset] = useAtom(fromAssetAtom)
  const [fromAmount] = useAtom(fromAmountAtom)
  const [toChain] = useAtom(toChainAtom)
  const [toAsset] = useAtom(toAssetAtom)

  return useSWR(
    fromAmount.length > 0 && [
      fromChain?.name,
      fromAsset.symbol,
      toChain.name,
      toAsset.symbol,
      fromAmount,
    ],
    ([fromChainId, fromAssetId, toChainId, toAssetId, fromAmount]) => {
      if (
        fromChainId === 'Moonbeam' &&
        fromAssetId === 'WGLMR' &&
        toChainId === 'AstarEvm' &&
        toAssetId === 'xcGLMR'
      ) {
        return solution
      }
      return null
    },
  )
}

export default useSolution
