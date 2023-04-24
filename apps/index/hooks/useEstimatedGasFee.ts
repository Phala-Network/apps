// export const useEstimatedGasFee = (): Decimal | undefined => {
//   const fromChain = useAtomValue(fromChainAtom)
//   const toChain = useAtomValue(toChainAtom)
//   const asset = useAtomValue(toAssetAtom)
//   const ethersWeb3Provider = useEthersBrowserProvider()

// const {kind: bridgeKind} = useAtomValue(infoAtom)

// const {data: ethersGasPrice} = useSWR(
//   ethersWeb3Provider,
//   ethersGasPriceFetcher
// )

// const {data: evmXTokensEstimatedGas} = useSWR(
//   ethersXTokensContract != null &&
//     toChain.paraId != null &&
//     asset.xc20Address?.[fromChain.id] != null && [
//       ethersXTokensContract,
//       asset.xc20Address[fromChain.id],
//       toChain.paraId,
//       decimals,
//     ],
//   evmXTokensEstimatedGasFetcher
// )

// return ethersGasPrice != null
//   ? evmXTokensEstimatedGas != null
//     ? ethersGasPrice.times(evmXTokensEstimatedGas)
//     : undefined
//   : undefined
// }
