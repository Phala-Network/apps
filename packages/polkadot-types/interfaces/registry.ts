// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/types/types/registry';

import type { AssetsRegistryAssetProperties, AssetsRegistryAssetRegistryInfo, AssetsRegistryCall, AssetsRegistryError, AssetsRegistryEvent, AssetsRegistryXBridge, AssetsRegistryXBridgeConfig, CumulusPalletDmpQueueCall, CumulusPalletDmpQueueConfigData, CumulusPalletDmpQueueError, CumulusPalletDmpQueueEvent, CumulusPalletDmpQueuePageIndexData, CumulusPalletParachainSystemCall, CumulusPalletParachainSystemCodeUpgradeAuthorization, CumulusPalletParachainSystemError, CumulusPalletParachainSystemEvent, CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot, CumulusPalletParachainSystemRelayStateSnapshotRelayDispatchQueueRemainingCapacity, CumulusPalletParachainSystemUnincludedSegmentAncestor, CumulusPalletParachainSystemUnincludedSegmentHrmpChannelUpdate, CumulusPalletParachainSystemUnincludedSegmentSegmentTracker, CumulusPalletParachainSystemUnincludedSegmentUsedBandwidth, CumulusPalletXcmError, CumulusPalletXcmEvent, CumulusPalletXcmOrigin, CumulusPalletXcmpQueueCall, CumulusPalletXcmpQueueError, CumulusPalletXcmpQueueEvent, CumulusPalletXcmpQueueInboundChannelDetails, CumulusPalletXcmpQueueInboundState, CumulusPalletXcmpQueueOutboundChannelDetails, CumulusPalletXcmpQueueOutboundState, CumulusPalletXcmpQueueQueueConfigData, CumulusPrimitivesParachainInherentParachainInherentData, FrameMetadataHashExtensionCheckMetadataHash, FrameMetadataHashExtensionMode, FrameSupportDispatchDispatchClass, FrameSupportDispatchDispatchInfo, FrameSupportDispatchPays, FrameSupportDispatchPerDispatchClassU32, FrameSupportDispatchPerDispatchClassWeight, FrameSupportDispatchPerDispatchClassWeightsPerClass, FrameSupportDispatchRawOrigin, FrameSupportPalletId, FrameSupportPreimagesBounded, FrameSupportTokensMiscBalanceStatus, FrameSystemAccountInfo, FrameSystemCall, FrameSystemError, FrameSystemEvent, FrameSystemEventRecord, FrameSystemExtensionsCheckGenesis, FrameSystemExtensionsCheckNonZeroSender, FrameSystemExtensionsCheckNonce, FrameSystemExtensionsCheckSpecVersion, FrameSystemExtensionsCheckTxVersion, FrameSystemExtensionsCheckWeight, FrameSystemLastRuntimeUpgradeInfo, FrameSystemLimitsBlockLength, FrameSystemLimitsBlockWeights, FrameSystemLimitsWeightsPerClass, FrameSystemPhase, PalletAssetsAccountStatus, PalletAssetsApproval, PalletAssetsAssetAccount, PalletAssetsAssetDetails, PalletAssetsAssetMetadata, PalletAssetsAssetStatus, PalletAssetsCall, PalletAssetsError, PalletAssetsEvent, PalletAssetsExistenceReason, PalletBalancesAccountData, PalletBalancesBalanceLock, PalletBalancesCall, PalletBalancesError, PalletBalancesEvent, PalletBalancesIdAmount, PalletBalancesReasons, PalletBalancesReserveData, PalletBountiesBounty, PalletBountiesBountyStatus, PalletBountiesCall, PalletBountiesError, PalletBountiesEvent, PalletChildBountiesCall, PalletChildBountiesChildBounty, PalletChildBountiesChildBountyStatus, PalletChildBountiesError, PalletChildBountiesEvent, PalletCollatorSelectionCall, PalletCollatorSelectionCandidateInfo, PalletCollatorSelectionError, PalletCollatorSelectionEvent, PalletCollectiveCall, PalletCollectiveError, PalletCollectiveEvent, PalletCollectiveRawOrigin, PalletCollectiveVotes, PalletDemocracyCall, PalletDemocracyConviction, PalletDemocracyDelegations, PalletDemocracyError, PalletDemocracyEvent, PalletDemocracyMetadataOwner, PalletDemocracyReferendumInfo, PalletDemocracyReferendumStatus, PalletDemocracyTally, PalletDemocracyVoteAccountVote, PalletDemocracyVotePriorLock, PalletDemocracyVoteThreshold, PalletDemocracyVoteVoting, PalletElectionsPhragmenCall, PalletElectionsPhragmenError, PalletElectionsPhragmenEvent, PalletElectionsPhragmenRenouncing, PalletElectionsPhragmenSeatHolder, PalletElectionsPhragmenVoter, PalletIdentityBitFlags, PalletIdentityCall, PalletIdentityError, PalletIdentityEvent, PalletIdentityIdentityField, PalletIdentityIdentityInfo, PalletIdentityJudgement, PalletIdentityRegistrarInfo, PalletIdentityRegistration, PalletIndexCall, PalletIndexDepositInfo, PalletIndexError, PalletIndexEvent, PalletLotteryCall, PalletLotteryError, PalletLotteryEvent, PalletLotteryLotteryConfig, PalletMembershipCall, PalletMembershipError, PalletMembershipEvent, PalletMultisigCall, PalletMultisigError, PalletMultisigEvent, PalletMultisigMultisig, PalletMultisigTimepoint, PalletPreimageCall, PalletPreimageError, PalletPreimageEvent, PalletPreimageHoldReason, PalletPreimageOldRequestStatus, PalletPreimageRequestStatus, PalletProxyAnnouncement, PalletProxyCall, PalletProxyError, PalletProxyEvent, PalletProxyProxyDefinition, PalletRmrkCoreCall, PalletRmrkCoreError, PalletRmrkCoreEvent, PalletRmrkEquipCall, PalletRmrkEquipError, PalletRmrkEquipEvent, PalletRmrkMarketCall, PalletRmrkMarketError, PalletRmrkMarketEvent, PalletRmrkMarketListInfo, PalletRmrkMarketOffer, PalletSchedulerCall, PalletSchedulerError, PalletSchedulerEvent, PalletSchedulerScheduled, PalletSessionCall, PalletSessionError, PalletSessionEvent, PalletTimestampCall, PalletTipsCall, PalletTipsError, PalletTipsEvent, PalletTipsOpenTip, PalletTransactionPaymentChargeTransactionPayment, PalletTransactionPaymentEvent, PalletTransactionPaymentReleases, PalletTreasuryCall, PalletTreasuryError, PalletTreasuryEvent, PalletTreasuryProposal, PalletUniquesCall, PalletUniquesCollectionDetails, PalletUniquesCollectionMetadata, PalletUniquesDestroyWitness, PalletUniquesError, PalletUniquesEvent, PalletUniquesItemDetails, PalletUniquesItemMetadata, PalletUtilityCall, PalletUtilityError, PalletUtilityEvent, PalletVestingCall, PalletVestingError, PalletVestingEvent, PalletVestingReleases, PalletVestingVestingInfo, PalletXcmCall, PalletXcmError, PalletXcmEvent, PalletXcmOrigin, PalletXcmQueryStatus, PalletXcmRemoteLockedFungibleRecord, PalletXcmVersionMigrationStage, PhalaMqMessage, PhalaMqMessageOrigin, PhalaMqSignedMessage, PhalaPalletsComputeBasePoolPalletBasePool, PhalaPalletsComputeBasePoolPalletCall, PhalaPalletsComputeBasePoolPalletError, PhalaPalletsComputeBasePoolPalletEvent, PhalaPalletsComputeBasePoolPalletWithdrawInfo, PhalaPalletsComputeComputationPalletBenchmark, PhalaPalletsComputeComputationPalletCall, PhalaPalletsComputeComputationPalletError, PhalaPalletsComputeComputationPalletEvent, PhalaPalletsComputeComputationPalletSessionInfo, PhalaPalletsComputeComputationPalletSessionStats, PhalaPalletsComputeComputationPalletWorkerState, PhalaPalletsComputePoolProxy, PhalaPalletsComputePoolProxyStakePool, PhalaPalletsComputePoolProxyVault, PhalaPalletsComputeStakePoolV2PalletCall, PhalaPalletsComputeStakePoolV2PalletError, PhalaPalletsComputeStakePoolV2PalletEvent, PhalaPalletsComputeVaultPalletCall, PhalaPalletsComputeVaultPalletError, PhalaPalletsComputeVaultPalletEvent, PhalaPalletsComputeVaultPalletForceShutdownReason, PhalaPalletsComputeWrappedBalancesPalletCall, PhalaPalletsComputeWrappedBalancesPalletError, PhalaPalletsComputeWrappedBalancesPalletEvent, PhalaPalletsComputeWrappedBalancesPalletFinanceAccount, PhalaPalletsMqCheckSeqCheckMqSequence, PhalaPalletsMqPalletCall, PhalaPalletsMqPalletError, PhalaPalletsPhatPalletBasicContractInfo, PhalaPalletsPhatPalletCall, PhalaPalletsPhatPalletError, PhalaPalletsPhatPalletEvent, PhalaPalletsPhatTokenomicPalletCall, PhalaPalletsPhatTokenomicPalletError, PhalaPalletsPhatTokenomicPalletEvent, PhalaPalletsRegistryPalletCall, PhalaPalletsRegistryPalletError, PhalaPalletsRegistryPalletEvent, PhalaPalletsRegistryPalletKnownConsensusVersion, PhalaPalletsRegistryPalletWorkerInfoV2, PhalaPalletsStakePoolPalletError, PhalaPalletsStakePoolPalletEvent, PhalaPalletsStakePoolPalletPoolInfo, PhalaPalletsStakePoolPalletUserStakeInfo, PhalaPalletsStakePoolPalletWithdrawInfo, PhalaPalletsUtilsAttestationLegacyAttestation, PhalaParachainRuntimeOpaqueSessionKeys, PhalaParachainRuntimeOriginCaller, PhalaParachainRuntimeProxyType, PhalaParachainRuntimeRuntime, PhalaParachainRuntimeRuntimeHoldReason, PhalaTypesAttestationProvider, PhalaTypesAttestationReport, PhalaTypesCollateral, PhalaTypesContractClusterInfo, PhalaTypesContractClusterPermission, PhalaTypesContractCodeIndex, PhalaTypesContractMessagingResourceType, PhalaTypesMessagingTokenomicParameters, PhalaTypesVersionedWorkerEndpoints, PhalaTypesWorkerEndpointPayload, PhalaTypesWorkerRegistrationInfo, PhalaTypesWorkerRegistrationInfoV2, PhantomType, PolkadotCorePrimitivesInboundDownwardMessage, PolkadotCorePrimitivesInboundHrmpMessage, PolkadotCorePrimitivesOutboundHrmpMessage, PolkadotParachainPrimitivesPrimitivesXcmpMessageFormat, PolkadotPrimitivesV6AbridgedHostConfiguration, PolkadotPrimitivesV6AbridgedHrmpChannel, PolkadotPrimitivesV6AsyncBackingAsyncBackingParams, PolkadotPrimitivesV6PersistedValidationData, PolkadotPrimitivesV6UpgradeGoAhead, PolkadotPrimitivesV6UpgradeRestriction, RmrkTraitsBaseBaseInfo, RmrkTraitsCollectionCollectionInfo, RmrkTraitsNftAccountIdOrCollectionNftTuple, RmrkTraitsNftNftChild, RmrkTraitsNftNftInfo, RmrkTraitsNftRoyaltyInfo, RmrkTraitsPartEquippableList, RmrkTraitsPartFixedPart, RmrkTraitsPartPartType, RmrkTraitsPartSlotPart, RmrkTraitsPropertyPropertyInfo, RmrkTraitsResourceBasicResource, RmrkTraitsResourceComposableResource, RmrkTraitsResourceResourceInfo, RmrkTraitsResourceResourceInfoMin, RmrkTraitsResourceResourceTypes, RmrkTraitsResourceSlotResource, RmrkTraitsTheme, RmrkTraitsThemeThemeProperty, SgxAttestationDcapSgxV30QuoteCollateral, SpArithmeticArithmeticError, SpConsensusAuraSr25519AppSr25519Public, SpCoreCryptoKeyTypeId, SpCoreEcdsaSignature, SpCoreEd25519Signature, SpCoreSr25519Public, SpCoreSr25519Signature, SpCoreVoid, SpRuntimeBlakeTwo256, SpRuntimeDigest, SpRuntimeDigestDigestItem, SpRuntimeDispatchError, SpRuntimeModuleError, SpRuntimeMultiSignature, SpRuntimeTokenError, SpRuntimeTransactionalError, SpTrieStorageProof, SpVersionRuntimeVersion, SpWeightsRuntimeDbWeight, SpWeightsWeightV2Weight, StagingXcmDoubleEncoded, StagingXcmV2BodyId, StagingXcmV2BodyPart, StagingXcmV2Instruction, StagingXcmV2Junction, StagingXcmV2MultiAsset, StagingXcmV2MultiLocation, StagingXcmV2MultiassetAssetId, StagingXcmV2MultiassetAssetInstance, StagingXcmV2MultiassetFungibility, StagingXcmV2MultiassetMultiAssetFilter, StagingXcmV2MultiassetMultiAssets, StagingXcmV2MultiassetWildFungibility, StagingXcmV2MultiassetWildMultiAsset, StagingXcmV2MultilocationJunctions, StagingXcmV2NetworkId, StagingXcmV2OriginKind, StagingXcmV2Response, StagingXcmV2TraitsError, StagingXcmV2WeightLimit, StagingXcmV2Xcm, StagingXcmV3Instruction, StagingXcmV3Junction, StagingXcmV3JunctionBodyId, StagingXcmV3JunctionBodyPart, StagingXcmV3JunctionNetworkId, StagingXcmV3Junctions, StagingXcmV3MaybeErrorCode, StagingXcmV3MultiAsset, StagingXcmV3MultiLocation, StagingXcmV3MultiassetAssetId, StagingXcmV3MultiassetAssetInstance, StagingXcmV3MultiassetFungibility, StagingXcmV3MultiassetMultiAssetFilter, StagingXcmV3MultiassetMultiAssets, StagingXcmV3MultiassetWildFungibility, StagingXcmV3MultiassetWildMultiAsset, StagingXcmV3PalletInfo, StagingXcmV3QueryResponseInfo, StagingXcmV3Response, StagingXcmV3TraitsError, StagingXcmV3TraitsOutcome, StagingXcmV3WeightLimit, StagingXcmV3Xcm, StagingXcmVersionedAssetId, StagingXcmVersionedMultiAssets, StagingXcmVersionedMultiLocation, StagingXcmVersionedResponse, StagingXcmVersionedXcm, SubbridgePalletsChainbridgePalletBridgeEvent, SubbridgePalletsChainbridgePalletCall, SubbridgePalletsChainbridgePalletError, SubbridgePalletsChainbridgePalletEvent, SubbridgePalletsChainbridgePalletProposalStatus, SubbridgePalletsChainbridgePalletProposalVotes, SubbridgePalletsSygmaWrapperPalletError, SubbridgePalletsSygmaWrapperPalletEvent, SubbridgePalletsXcmbridgePalletError, SubbridgePalletsXcmbridgePalletEvent, SubbridgePalletsXtransferPalletCall, SubbridgePalletsXtransferPalletError, SubbridgePalletsXtransferPalletEvent, SygmaAccessSegregatorCall, SygmaAccessSegregatorError, SygmaAccessSegregatorEvent, SygmaBasicFeehandlerCall, SygmaBasicFeehandlerError, SygmaBasicFeehandlerEvent, SygmaBridgeCall, SygmaBridgeError, SygmaBridgeEvent, SygmaBridgeProposal, SygmaFeeHandlerRouterCall, SygmaFeeHandlerRouterError, SygmaFeeHandlerRouterEvent, SygmaFeeHandlerRouterFeeHandlerType, SygmaPercentageFeehandlerCall, SygmaPercentageFeehandlerError, SygmaPercentageFeehandlerEvent, SygmaTraitsMpcAddress, SygmaTraitsTransferType } from '@polkadot/types/lookup';

declare module '@polkadot/types/types/registry' {
  interface InterfaceTypes {
    AssetsRegistryAssetProperties: AssetsRegistryAssetProperties;
    AssetsRegistryAssetRegistryInfo: AssetsRegistryAssetRegistryInfo;
    AssetsRegistryCall: AssetsRegistryCall;
    AssetsRegistryError: AssetsRegistryError;
    AssetsRegistryEvent: AssetsRegistryEvent;
    AssetsRegistryXBridge: AssetsRegistryXBridge;
    AssetsRegistryXBridgeConfig: AssetsRegistryXBridgeConfig;
    CumulusPalletDmpQueueCall: CumulusPalletDmpQueueCall;
    CumulusPalletDmpQueueConfigData: CumulusPalletDmpQueueConfigData;
    CumulusPalletDmpQueueError: CumulusPalletDmpQueueError;
    CumulusPalletDmpQueueEvent: CumulusPalletDmpQueueEvent;
    CumulusPalletDmpQueuePageIndexData: CumulusPalletDmpQueuePageIndexData;
    CumulusPalletParachainSystemCall: CumulusPalletParachainSystemCall;
    CumulusPalletParachainSystemCodeUpgradeAuthorization: CumulusPalletParachainSystemCodeUpgradeAuthorization;
    CumulusPalletParachainSystemError: CumulusPalletParachainSystemError;
    CumulusPalletParachainSystemEvent: CumulusPalletParachainSystemEvent;
    CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot: CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot;
    CumulusPalletParachainSystemRelayStateSnapshotRelayDispatchQueueRemainingCapacity: CumulusPalletParachainSystemRelayStateSnapshotRelayDispatchQueueRemainingCapacity;
    CumulusPalletParachainSystemUnincludedSegmentAncestor: CumulusPalletParachainSystemUnincludedSegmentAncestor;
    CumulusPalletParachainSystemUnincludedSegmentHrmpChannelUpdate: CumulusPalletParachainSystemUnincludedSegmentHrmpChannelUpdate;
    CumulusPalletParachainSystemUnincludedSegmentSegmentTracker: CumulusPalletParachainSystemUnincludedSegmentSegmentTracker;
    CumulusPalletParachainSystemUnincludedSegmentUsedBandwidth: CumulusPalletParachainSystemUnincludedSegmentUsedBandwidth;
    CumulusPalletXcmError: CumulusPalletXcmError;
    CumulusPalletXcmEvent: CumulusPalletXcmEvent;
    CumulusPalletXcmOrigin: CumulusPalletXcmOrigin;
    CumulusPalletXcmpQueueCall: CumulusPalletXcmpQueueCall;
    CumulusPalletXcmpQueueError: CumulusPalletXcmpQueueError;
    CumulusPalletXcmpQueueEvent: CumulusPalletXcmpQueueEvent;
    CumulusPalletXcmpQueueInboundChannelDetails: CumulusPalletXcmpQueueInboundChannelDetails;
    CumulusPalletXcmpQueueInboundState: CumulusPalletXcmpQueueInboundState;
    CumulusPalletXcmpQueueOutboundChannelDetails: CumulusPalletXcmpQueueOutboundChannelDetails;
    CumulusPalletXcmpQueueOutboundState: CumulusPalletXcmpQueueOutboundState;
    CumulusPalletXcmpQueueQueueConfigData: CumulusPalletXcmpQueueQueueConfigData;
    CumulusPrimitivesParachainInherentParachainInherentData: CumulusPrimitivesParachainInherentParachainInherentData;
    FrameMetadataHashExtensionCheckMetadataHash: FrameMetadataHashExtensionCheckMetadataHash;
    FrameMetadataHashExtensionMode: FrameMetadataHashExtensionMode;
    FrameSupportDispatchDispatchClass: FrameSupportDispatchDispatchClass;
    FrameSupportDispatchDispatchInfo: FrameSupportDispatchDispatchInfo;
    FrameSupportDispatchPays: FrameSupportDispatchPays;
    FrameSupportDispatchPerDispatchClassU32: FrameSupportDispatchPerDispatchClassU32;
    FrameSupportDispatchPerDispatchClassWeight: FrameSupportDispatchPerDispatchClassWeight;
    FrameSupportDispatchPerDispatchClassWeightsPerClass: FrameSupportDispatchPerDispatchClassWeightsPerClass;
    FrameSupportDispatchRawOrigin: FrameSupportDispatchRawOrigin;
    FrameSupportPalletId: FrameSupportPalletId;
    FrameSupportPreimagesBounded: FrameSupportPreimagesBounded;
    FrameSupportTokensMiscBalanceStatus: FrameSupportTokensMiscBalanceStatus;
    FrameSystemAccountInfo: FrameSystemAccountInfo;
    FrameSystemCall: FrameSystemCall;
    FrameSystemError: FrameSystemError;
    FrameSystemEvent: FrameSystemEvent;
    FrameSystemEventRecord: FrameSystemEventRecord;
    FrameSystemExtensionsCheckGenesis: FrameSystemExtensionsCheckGenesis;
    FrameSystemExtensionsCheckNonZeroSender: FrameSystemExtensionsCheckNonZeroSender;
    FrameSystemExtensionsCheckNonce: FrameSystemExtensionsCheckNonce;
    FrameSystemExtensionsCheckSpecVersion: FrameSystemExtensionsCheckSpecVersion;
    FrameSystemExtensionsCheckTxVersion: FrameSystemExtensionsCheckTxVersion;
    FrameSystemExtensionsCheckWeight: FrameSystemExtensionsCheckWeight;
    FrameSystemLastRuntimeUpgradeInfo: FrameSystemLastRuntimeUpgradeInfo;
    FrameSystemLimitsBlockLength: FrameSystemLimitsBlockLength;
    FrameSystemLimitsBlockWeights: FrameSystemLimitsBlockWeights;
    FrameSystemLimitsWeightsPerClass: FrameSystemLimitsWeightsPerClass;
    FrameSystemPhase: FrameSystemPhase;
    PalletAssetsAccountStatus: PalletAssetsAccountStatus;
    PalletAssetsApproval: PalletAssetsApproval;
    PalletAssetsAssetAccount: PalletAssetsAssetAccount;
    PalletAssetsAssetDetails: PalletAssetsAssetDetails;
    PalletAssetsAssetMetadata: PalletAssetsAssetMetadata;
    PalletAssetsAssetStatus: PalletAssetsAssetStatus;
    PalletAssetsCall: PalletAssetsCall;
    PalletAssetsError: PalletAssetsError;
    PalletAssetsEvent: PalletAssetsEvent;
    PalletAssetsExistenceReason: PalletAssetsExistenceReason;
    PalletBalancesAccountData: PalletBalancesAccountData;
    PalletBalancesBalanceLock: PalletBalancesBalanceLock;
    PalletBalancesCall: PalletBalancesCall;
    PalletBalancesError: PalletBalancesError;
    PalletBalancesEvent: PalletBalancesEvent;
    PalletBalancesIdAmount: PalletBalancesIdAmount;
    PalletBalancesReasons: PalletBalancesReasons;
    PalletBalancesReserveData: PalletBalancesReserveData;
    PalletBountiesBounty: PalletBountiesBounty;
    PalletBountiesBountyStatus: PalletBountiesBountyStatus;
    PalletBountiesCall: PalletBountiesCall;
    PalletBountiesError: PalletBountiesError;
    PalletBountiesEvent: PalletBountiesEvent;
    PalletChildBountiesCall: PalletChildBountiesCall;
    PalletChildBountiesChildBounty: PalletChildBountiesChildBounty;
    PalletChildBountiesChildBountyStatus: PalletChildBountiesChildBountyStatus;
    PalletChildBountiesError: PalletChildBountiesError;
    PalletChildBountiesEvent: PalletChildBountiesEvent;
    PalletCollatorSelectionCall: PalletCollatorSelectionCall;
    PalletCollatorSelectionCandidateInfo: PalletCollatorSelectionCandidateInfo;
    PalletCollatorSelectionError: PalletCollatorSelectionError;
    PalletCollatorSelectionEvent: PalletCollatorSelectionEvent;
    PalletCollectiveCall: PalletCollectiveCall;
    PalletCollectiveError: PalletCollectiveError;
    PalletCollectiveEvent: PalletCollectiveEvent;
    PalletCollectiveRawOrigin: PalletCollectiveRawOrigin;
    PalletCollectiveVotes: PalletCollectiveVotes;
    PalletDemocracyCall: PalletDemocracyCall;
    PalletDemocracyConviction: PalletDemocracyConviction;
    PalletDemocracyDelegations: PalletDemocracyDelegations;
    PalletDemocracyError: PalletDemocracyError;
    PalletDemocracyEvent: PalletDemocracyEvent;
    PalletDemocracyMetadataOwner: PalletDemocracyMetadataOwner;
    PalletDemocracyReferendumInfo: PalletDemocracyReferendumInfo;
    PalletDemocracyReferendumStatus: PalletDemocracyReferendumStatus;
    PalletDemocracyTally: PalletDemocracyTally;
    PalletDemocracyVoteAccountVote: PalletDemocracyVoteAccountVote;
    PalletDemocracyVotePriorLock: PalletDemocracyVotePriorLock;
    PalletDemocracyVoteThreshold: PalletDemocracyVoteThreshold;
    PalletDemocracyVoteVoting: PalletDemocracyVoteVoting;
    PalletElectionsPhragmenCall: PalletElectionsPhragmenCall;
    PalletElectionsPhragmenError: PalletElectionsPhragmenError;
    PalletElectionsPhragmenEvent: PalletElectionsPhragmenEvent;
    PalletElectionsPhragmenRenouncing: PalletElectionsPhragmenRenouncing;
    PalletElectionsPhragmenSeatHolder: PalletElectionsPhragmenSeatHolder;
    PalletElectionsPhragmenVoter: PalletElectionsPhragmenVoter;
    PalletIdentityBitFlags: PalletIdentityBitFlags;
    PalletIdentityCall: PalletIdentityCall;
    PalletIdentityError: PalletIdentityError;
    PalletIdentityEvent: PalletIdentityEvent;
    PalletIdentityIdentityField: PalletIdentityIdentityField;
    PalletIdentityIdentityInfo: PalletIdentityIdentityInfo;
    PalletIdentityJudgement: PalletIdentityJudgement;
    PalletIdentityRegistrarInfo: PalletIdentityRegistrarInfo;
    PalletIdentityRegistration: PalletIdentityRegistration;
    PalletIndexCall: PalletIndexCall;
    PalletIndexDepositInfo: PalletIndexDepositInfo;
    PalletIndexError: PalletIndexError;
    PalletIndexEvent: PalletIndexEvent;
    PalletLotteryCall: PalletLotteryCall;
    PalletLotteryError: PalletLotteryError;
    PalletLotteryEvent: PalletLotteryEvent;
    PalletLotteryLotteryConfig: PalletLotteryLotteryConfig;
    PalletMembershipCall: PalletMembershipCall;
    PalletMembershipError: PalletMembershipError;
    PalletMembershipEvent: PalletMembershipEvent;
    PalletMultisigCall: PalletMultisigCall;
    PalletMultisigError: PalletMultisigError;
    PalletMultisigEvent: PalletMultisigEvent;
    PalletMultisigMultisig: PalletMultisigMultisig;
    PalletMultisigTimepoint: PalletMultisigTimepoint;
    PalletPreimageCall: PalletPreimageCall;
    PalletPreimageError: PalletPreimageError;
    PalletPreimageEvent: PalletPreimageEvent;
    PalletPreimageHoldReason: PalletPreimageHoldReason;
    PalletPreimageOldRequestStatus: PalletPreimageOldRequestStatus;
    PalletPreimageRequestStatus: PalletPreimageRequestStatus;
    PalletProxyAnnouncement: PalletProxyAnnouncement;
    PalletProxyCall: PalletProxyCall;
    PalletProxyError: PalletProxyError;
    PalletProxyEvent: PalletProxyEvent;
    PalletProxyProxyDefinition: PalletProxyProxyDefinition;
    PalletRmrkCoreCall: PalletRmrkCoreCall;
    PalletRmrkCoreError: PalletRmrkCoreError;
    PalletRmrkCoreEvent: PalletRmrkCoreEvent;
    PalletRmrkEquipCall: PalletRmrkEquipCall;
    PalletRmrkEquipError: PalletRmrkEquipError;
    PalletRmrkEquipEvent: PalletRmrkEquipEvent;
    PalletRmrkMarketCall: PalletRmrkMarketCall;
    PalletRmrkMarketError: PalletRmrkMarketError;
    PalletRmrkMarketEvent: PalletRmrkMarketEvent;
    PalletRmrkMarketListInfo: PalletRmrkMarketListInfo;
    PalletRmrkMarketOffer: PalletRmrkMarketOffer;
    PalletSchedulerCall: PalletSchedulerCall;
    PalletSchedulerError: PalletSchedulerError;
    PalletSchedulerEvent: PalletSchedulerEvent;
    PalletSchedulerScheduled: PalletSchedulerScheduled;
    PalletSessionCall: PalletSessionCall;
    PalletSessionError: PalletSessionError;
    PalletSessionEvent: PalletSessionEvent;
    PalletTimestampCall: PalletTimestampCall;
    PalletTipsCall: PalletTipsCall;
    PalletTipsError: PalletTipsError;
    PalletTipsEvent: PalletTipsEvent;
    PalletTipsOpenTip: PalletTipsOpenTip;
    PalletTransactionPaymentChargeTransactionPayment: PalletTransactionPaymentChargeTransactionPayment;
    PalletTransactionPaymentEvent: PalletTransactionPaymentEvent;
    PalletTransactionPaymentReleases: PalletTransactionPaymentReleases;
    PalletTreasuryCall: PalletTreasuryCall;
    PalletTreasuryError: PalletTreasuryError;
    PalletTreasuryEvent: PalletTreasuryEvent;
    PalletTreasuryProposal: PalletTreasuryProposal;
    PalletUniquesCall: PalletUniquesCall;
    PalletUniquesCollectionDetails: PalletUniquesCollectionDetails;
    PalletUniquesCollectionMetadata: PalletUniquesCollectionMetadata;
    PalletUniquesDestroyWitness: PalletUniquesDestroyWitness;
    PalletUniquesError: PalletUniquesError;
    PalletUniquesEvent: PalletUniquesEvent;
    PalletUniquesItemDetails: PalletUniquesItemDetails;
    PalletUniquesItemMetadata: PalletUniquesItemMetadata;
    PalletUtilityCall: PalletUtilityCall;
    PalletUtilityError: PalletUtilityError;
    PalletUtilityEvent: PalletUtilityEvent;
    PalletVestingCall: PalletVestingCall;
    PalletVestingError: PalletVestingError;
    PalletVestingEvent: PalletVestingEvent;
    PalletVestingReleases: PalletVestingReleases;
    PalletVestingVestingInfo: PalletVestingVestingInfo;
    PalletXcmCall: PalletXcmCall;
    PalletXcmError: PalletXcmError;
    PalletXcmEvent: PalletXcmEvent;
    PalletXcmOrigin: PalletXcmOrigin;
    PalletXcmQueryStatus: PalletXcmQueryStatus;
    PalletXcmRemoteLockedFungibleRecord: PalletXcmRemoteLockedFungibleRecord;
    PalletXcmVersionMigrationStage: PalletXcmVersionMigrationStage;
    PhalaMqMessage: PhalaMqMessage;
    PhalaMqMessageOrigin: PhalaMqMessageOrigin;
    PhalaMqSignedMessage: PhalaMqSignedMessage;
    PhalaPalletsComputeBasePoolPalletBasePool: PhalaPalletsComputeBasePoolPalletBasePool;
    PhalaPalletsComputeBasePoolPalletCall: PhalaPalletsComputeBasePoolPalletCall;
    PhalaPalletsComputeBasePoolPalletError: PhalaPalletsComputeBasePoolPalletError;
    PhalaPalletsComputeBasePoolPalletEvent: PhalaPalletsComputeBasePoolPalletEvent;
    PhalaPalletsComputeBasePoolPalletWithdrawInfo: PhalaPalletsComputeBasePoolPalletWithdrawInfo;
    PhalaPalletsComputeComputationPalletBenchmark: PhalaPalletsComputeComputationPalletBenchmark;
    PhalaPalletsComputeComputationPalletCall: PhalaPalletsComputeComputationPalletCall;
    PhalaPalletsComputeComputationPalletError: PhalaPalletsComputeComputationPalletError;
    PhalaPalletsComputeComputationPalletEvent: PhalaPalletsComputeComputationPalletEvent;
    PhalaPalletsComputeComputationPalletSessionInfo: PhalaPalletsComputeComputationPalletSessionInfo;
    PhalaPalletsComputeComputationPalletSessionStats: PhalaPalletsComputeComputationPalletSessionStats;
    PhalaPalletsComputeComputationPalletWorkerState: PhalaPalletsComputeComputationPalletWorkerState;
    PhalaPalletsComputePoolProxy: PhalaPalletsComputePoolProxy;
    PhalaPalletsComputePoolProxyStakePool: PhalaPalletsComputePoolProxyStakePool;
    PhalaPalletsComputePoolProxyVault: PhalaPalletsComputePoolProxyVault;
    PhalaPalletsComputeStakePoolV2PalletCall: PhalaPalletsComputeStakePoolV2PalletCall;
    PhalaPalletsComputeStakePoolV2PalletError: PhalaPalletsComputeStakePoolV2PalletError;
    PhalaPalletsComputeStakePoolV2PalletEvent: PhalaPalletsComputeStakePoolV2PalletEvent;
    PhalaPalletsComputeVaultPalletCall: PhalaPalletsComputeVaultPalletCall;
    PhalaPalletsComputeVaultPalletError: PhalaPalletsComputeVaultPalletError;
    PhalaPalletsComputeVaultPalletEvent: PhalaPalletsComputeVaultPalletEvent;
    PhalaPalletsComputeVaultPalletForceShutdownReason: PhalaPalletsComputeVaultPalletForceShutdownReason;
    PhalaPalletsComputeWrappedBalancesPalletCall: PhalaPalletsComputeWrappedBalancesPalletCall;
    PhalaPalletsComputeWrappedBalancesPalletError: PhalaPalletsComputeWrappedBalancesPalletError;
    PhalaPalletsComputeWrappedBalancesPalletEvent: PhalaPalletsComputeWrappedBalancesPalletEvent;
    PhalaPalletsComputeWrappedBalancesPalletFinanceAccount: PhalaPalletsComputeWrappedBalancesPalletFinanceAccount;
    PhalaPalletsMqCheckSeqCheckMqSequence: PhalaPalletsMqCheckSeqCheckMqSequence;
    PhalaPalletsMqPalletCall: PhalaPalletsMqPalletCall;
    PhalaPalletsMqPalletError: PhalaPalletsMqPalletError;
    PhalaPalletsPhatPalletBasicContractInfo: PhalaPalletsPhatPalletBasicContractInfo;
    PhalaPalletsPhatPalletCall: PhalaPalletsPhatPalletCall;
    PhalaPalletsPhatPalletError: PhalaPalletsPhatPalletError;
    PhalaPalletsPhatPalletEvent: PhalaPalletsPhatPalletEvent;
    PhalaPalletsPhatTokenomicPalletCall: PhalaPalletsPhatTokenomicPalletCall;
    PhalaPalletsPhatTokenomicPalletError: PhalaPalletsPhatTokenomicPalletError;
    PhalaPalletsPhatTokenomicPalletEvent: PhalaPalletsPhatTokenomicPalletEvent;
    PhalaPalletsRegistryPalletCall: PhalaPalletsRegistryPalletCall;
    PhalaPalletsRegistryPalletError: PhalaPalletsRegistryPalletError;
    PhalaPalletsRegistryPalletEvent: PhalaPalletsRegistryPalletEvent;
    PhalaPalletsRegistryPalletKnownConsensusVersion: PhalaPalletsRegistryPalletKnownConsensusVersion;
    PhalaPalletsRegistryPalletWorkerInfoV2: PhalaPalletsRegistryPalletWorkerInfoV2;
    PhalaPalletsStakePoolPalletError: PhalaPalletsStakePoolPalletError;
    PhalaPalletsStakePoolPalletEvent: PhalaPalletsStakePoolPalletEvent;
    PhalaPalletsStakePoolPalletPoolInfo: PhalaPalletsStakePoolPalletPoolInfo;
    PhalaPalletsStakePoolPalletUserStakeInfo: PhalaPalletsStakePoolPalletUserStakeInfo;
    PhalaPalletsStakePoolPalletWithdrawInfo: PhalaPalletsStakePoolPalletWithdrawInfo;
    PhalaPalletsUtilsAttestationLegacyAttestation: PhalaPalletsUtilsAttestationLegacyAttestation;
    PhalaParachainRuntimeOpaqueSessionKeys: PhalaParachainRuntimeOpaqueSessionKeys;
    PhalaParachainRuntimeOriginCaller: PhalaParachainRuntimeOriginCaller;
    PhalaParachainRuntimeProxyType: PhalaParachainRuntimeProxyType;
    PhalaParachainRuntimeRuntime: PhalaParachainRuntimeRuntime;
    PhalaParachainRuntimeRuntimeHoldReason: PhalaParachainRuntimeRuntimeHoldReason;
    PhalaTypesAttestationProvider: PhalaTypesAttestationProvider;
    PhalaTypesAttestationReport: PhalaTypesAttestationReport;
    PhalaTypesCollateral: PhalaTypesCollateral;
    PhalaTypesContractClusterInfo: PhalaTypesContractClusterInfo;
    PhalaTypesContractClusterPermission: PhalaTypesContractClusterPermission;
    PhalaTypesContractCodeIndex: PhalaTypesContractCodeIndex;
    PhalaTypesContractMessagingResourceType: PhalaTypesContractMessagingResourceType;
    PhalaTypesMessagingTokenomicParameters: PhalaTypesMessagingTokenomicParameters;
    PhalaTypesVersionedWorkerEndpoints: PhalaTypesVersionedWorkerEndpoints;
    PhalaTypesWorkerEndpointPayload: PhalaTypesWorkerEndpointPayload;
    PhalaTypesWorkerRegistrationInfo: PhalaTypesWorkerRegistrationInfo;
    PhalaTypesWorkerRegistrationInfoV2: PhalaTypesWorkerRegistrationInfoV2;
    PhantomType: PhantomType;
    PolkadotCorePrimitivesInboundDownwardMessage: PolkadotCorePrimitivesInboundDownwardMessage;
    PolkadotCorePrimitivesInboundHrmpMessage: PolkadotCorePrimitivesInboundHrmpMessage;
    PolkadotCorePrimitivesOutboundHrmpMessage: PolkadotCorePrimitivesOutboundHrmpMessage;
    PolkadotParachainPrimitivesPrimitivesXcmpMessageFormat: PolkadotParachainPrimitivesPrimitivesXcmpMessageFormat;
    PolkadotPrimitivesV6AbridgedHostConfiguration: PolkadotPrimitivesV6AbridgedHostConfiguration;
    PolkadotPrimitivesV6AbridgedHrmpChannel: PolkadotPrimitivesV6AbridgedHrmpChannel;
    PolkadotPrimitivesV6AsyncBackingAsyncBackingParams: PolkadotPrimitivesV6AsyncBackingAsyncBackingParams;
    PolkadotPrimitivesV6PersistedValidationData: PolkadotPrimitivesV6PersistedValidationData;
    PolkadotPrimitivesV6UpgradeGoAhead: PolkadotPrimitivesV6UpgradeGoAhead;
    PolkadotPrimitivesV6UpgradeRestriction: PolkadotPrimitivesV6UpgradeRestriction;
    RmrkTraitsBaseBaseInfo: RmrkTraitsBaseBaseInfo;
    RmrkTraitsCollectionCollectionInfo: RmrkTraitsCollectionCollectionInfo;
    RmrkTraitsNftAccountIdOrCollectionNftTuple: RmrkTraitsNftAccountIdOrCollectionNftTuple;
    RmrkTraitsNftNftChild: RmrkTraitsNftNftChild;
    RmrkTraitsNftNftInfo: RmrkTraitsNftNftInfo;
    RmrkTraitsNftRoyaltyInfo: RmrkTraitsNftRoyaltyInfo;
    RmrkTraitsPartEquippableList: RmrkTraitsPartEquippableList;
    RmrkTraitsPartFixedPart: RmrkTraitsPartFixedPart;
    RmrkTraitsPartPartType: RmrkTraitsPartPartType;
    RmrkTraitsPartSlotPart: RmrkTraitsPartSlotPart;
    RmrkTraitsPropertyPropertyInfo: RmrkTraitsPropertyPropertyInfo;
    RmrkTraitsResourceBasicResource: RmrkTraitsResourceBasicResource;
    RmrkTraitsResourceComposableResource: RmrkTraitsResourceComposableResource;
    RmrkTraitsResourceResourceInfo: RmrkTraitsResourceResourceInfo;
    RmrkTraitsResourceResourceInfoMin: RmrkTraitsResourceResourceInfoMin;
    RmrkTraitsResourceResourceTypes: RmrkTraitsResourceResourceTypes;
    RmrkTraitsResourceSlotResource: RmrkTraitsResourceSlotResource;
    RmrkTraitsTheme: RmrkTraitsTheme;
    RmrkTraitsThemeThemeProperty: RmrkTraitsThemeThemeProperty;
    SgxAttestationDcapSgxV30QuoteCollateral: SgxAttestationDcapSgxV30QuoteCollateral;
    SpArithmeticArithmeticError: SpArithmeticArithmeticError;
    SpConsensusAuraSr25519AppSr25519Public: SpConsensusAuraSr25519AppSr25519Public;
    SpCoreCryptoKeyTypeId: SpCoreCryptoKeyTypeId;
    SpCoreEcdsaSignature: SpCoreEcdsaSignature;
    SpCoreEd25519Signature: SpCoreEd25519Signature;
    SpCoreSr25519Public: SpCoreSr25519Public;
    SpCoreSr25519Signature: SpCoreSr25519Signature;
    SpCoreVoid: SpCoreVoid;
    SpRuntimeBlakeTwo256: SpRuntimeBlakeTwo256;
    SpRuntimeDigest: SpRuntimeDigest;
    SpRuntimeDigestDigestItem: SpRuntimeDigestDigestItem;
    SpRuntimeDispatchError: SpRuntimeDispatchError;
    SpRuntimeModuleError: SpRuntimeModuleError;
    SpRuntimeMultiSignature: SpRuntimeMultiSignature;
    SpRuntimeTokenError: SpRuntimeTokenError;
    SpRuntimeTransactionalError: SpRuntimeTransactionalError;
    SpTrieStorageProof: SpTrieStorageProof;
    SpVersionRuntimeVersion: SpVersionRuntimeVersion;
    SpWeightsRuntimeDbWeight: SpWeightsRuntimeDbWeight;
    SpWeightsWeightV2Weight: SpWeightsWeightV2Weight;
    StagingXcmDoubleEncoded: StagingXcmDoubleEncoded;
    StagingXcmV2BodyId: StagingXcmV2BodyId;
    StagingXcmV2BodyPart: StagingXcmV2BodyPart;
    StagingXcmV2Instruction: StagingXcmV2Instruction;
    StagingXcmV2Junction: StagingXcmV2Junction;
    StagingXcmV2MultiAsset: StagingXcmV2MultiAsset;
    StagingXcmV2MultiLocation: StagingXcmV2MultiLocation;
    StagingXcmV2MultiassetAssetId: StagingXcmV2MultiassetAssetId;
    StagingXcmV2MultiassetAssetInstance: StagingXcmV2MultiassetAssetInstance;
    StagingXcmV2MultiassetFungibility: StagingXcmV2MultiassetFungibility;
    StagingXcmV2MultiassetMultiAssetFilter: StagingXcmV2MultiassetMultiAssetFilter;
    StagingXcmV2MultiassetMultiAssets: StagingXcmV2MultiassetMultiAssets;
    StagingXcmV2MultiassetWildFungibility: StagingXcmV2MultiassetWildFungibility;
    StagingXcmV2MultiassetWildMultiAsset: StagingXcmV2MultiassetWildMultiAsset;
    StagingXcmV2MultilocationJunctions: StagingXcmV2MultilocationJunctions;
    StagingXcmV2NetworkId: StagingXcmV2NetworkId;
    StagingXcmV2OriginKind: StagingXcmV2OriginKind;
    StagingXcmV2Response: StagingXcmV2Response;
    StagingXcmV2TraitsError: StagingXcmV2TraitsError;
    StagingXcmV2WeightLimit: StagingXcmV2WeightLimit;
    StagingXcmV2Xcm: StagingXcmV2Xcm;
    StagingXcmV3Instruction: StagingXcmV3Instruction;
    StagingXcmV3Junction: StagingXcmV3Junction;
    StagingXcmV3JunctionBodyId: StagingXcmV3JunctionBodyId;
    StagingXcmV3JunctionBodyPart: StagingXcmV3JunctionBodyPart;
    StagingXcmV3JunctionNetworkId: StagingXcmV3JunctionNetworkId;
    StagingXcmV3Junctions: StagingXcmV3Junctions;
    StagingXcmV3MaybeErrorCode: StagingXcmV3MaybeErrorCode;
    StagingXcmV3MultiAsset: StagingXcmV3MultiAsset;
    StagingXcmV3MultiLocation: StagingXcmV3MultiLocation;
    StagingXcmV3MultiassetAssetId: StagingXcmV3MultiassetAssetId;
    StagingXcmV3MultiassetAssetInstance: StagingXcmV3MultiassetAssetInstance;
    StagingXcmV3MultiassetFungibility: StagingXcmV3MultiassetFungibility;
    StagingXcmV3MultiassetMultiAssetFilter: StagingXcmV3MultiassetMultiAssetFilter;
    StagingXcmV3MultiassetMultiAssets: StagingXcmV3MultiassetMultiAssets;
    StagingXcmV3MultiassetWildFungibility: StagingXcmV3MultiassetWildFungibility;
    StagingXcmV3MultiassetWildMultiAsset: StagingXcmV3MultiassetWildMultiAsset;
    StagingXcmV3PalletInfo: StagingXcmV3PalletInfo;
    StagingXcmV3QueryResponseInfo: StagingXcmV3QueryResponseInfo;
    StagingXcmV3Response: StagingXcmV3Response;
    StagingXcmV3TraitsError: StagingXcmV3TraitsError;
    StagingXcmV3TraitsOutcome: StagingXcmV3TraitsOutcome;
    StagingXcmV3WeightLimit: StagingXcmV3WeightLimit;
    StagingXcmV3Xcm: StagingXcmV3Xcm;
    StagingXcmVersionedAssetId: StagingXcmVersionedAssetId;
    StagingXcmVersionedMultiAssets: StagingXcmVersionedMultiAssets;
    StagingXcmVersionedMultiLocation: StagingXcmVersionedMultiLocation;
    StagingXcmVersionedResponse: StagingXcmVersionedResponse;
    StagingXcmVersionedXcm: StagingXcmVersionedXcm;
    SubbridgePalletsChainbridgePalletBridgeEvent: SubbridgePalletsChainbridgePalletBridgeEvent;
    SubbridgePalletsChainbridgePalletCall: SubbridgePalletsChainbridgePalletCall;
    SubbridgePalletsChainbridgePalletError: SubbridgePalletsChainbridgePalletError;
    SubbridgePalletsChainbridgePalletEvent: SubbridgePalletsChainbridgePalletEvent;
    SubbridgePalletsChainbridgePalletProposalStatus: SubbridgePalletsChainbridgePalletProposalStatus;
    SubbridgePalletsChainbridgePalletProposalVotes: SubbridgePalletsChainbridgePalletProposalVotes;
    SubbridgePalletsSygmaWrapperPalletError: SubbridgePalletsSygmaWrapperPalletError;
    SubbridgePalletsSygmaWrapperPalletEvent: SubbridgePalletsSygmaWrapperPalletEvent;
    SubbridgePalletsXcmbridgePalletError: SubbridgePalletsXcmbridgePalletError;
    SubbridgePalletsXcmbridgePalletEvent: SubbridgePalletsXcmbridgePalletEvent;
    SubbridgePalletsXtransferPalletCall: SubbridgePalletsXtransferPalletCall;
    SubbridgePalletsXtransferPalletError: SubbridgePalletsXtransferPalletError;
    SubbridgePalletsXtransferPalletEvent: SubbridgePalletsXtransferPalletEvent;
    SygmaAccessSegregatorCall: SygmaAccessSegregatorCall;
    SygmaAccessSegregatorError: SygmaAccessSegregatorError;
    SygmaAccessSegregatorEvent: SygmaAccessSegregatorEvent;
    SygmaBasicFeehandlerCall: SygmaBasicFeehandlerCall;
    SygmaBasicFeehandlerError: SygmaBasicFeehandlerError;
    SygmaBasicFeehandlerEvent: SygmaBasicFeehandlerEvent;
    SygmaBridgeCall: SygmaBridgeCall;
    SygmaBridgeError: SygmaBridgeError;
    SygmaBridgeEvent: SygmaBridgeEvent;
    SygmaBridgeProposal: SygmaBridgeProposal;
    SygmaFeeHandlerRouterCall: SygmaFeeHandlerRouterCall;
    SygmaFeeHandlerRouterError: SygmaFeeHandlerRouterError;
    SygmaFeeHandlerRouterEvent: SygmaFeeHandlerRouterEvent;
    SygmaFeeHandlerRouterFeeHandlerType: SygmaFeeHandlerRouterFeeHandlerType;
    SygmaPercentageFeehandlerCall: SygmaPercentageFeehandlerCall;
    SygmaPercentageFeehandlerError: SygmaPercentageFeehandlerError;
    SygmaPercentageFeehandlerEvent: SygmaPercentageFeehandlerEvent;
    SygmaTraitsMpcAddress: SygmaTraitsMpcAddress;
    SygmaTraitsTransferType: SygmaTraitsTransferType;
  } // InterfaceTypes
} // declare module
