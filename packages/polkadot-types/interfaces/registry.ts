// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/types/types/registry';

import type { AssetsRegistryAssetProperties, AssetsRegistryAssetRegistryInfo, AssetsRegistryCall, AssetsRegistryError, AssetsRegistryEvent, AssetsRegistryXBridge, AssetsRegistryXBridgeConfig, CumulusPalletDmpQueueCall, CumulusPalletDmpQueueConfigData, CumulusPalletDmpQueueError, CumulusPalletDmpQueueEvent, CumulusPalletDmpQueuePageIndexData, CumulusPalletParachainSystemCall, CumulusPalletParachainSystemError, CumulusPalletParachainSystemEvent, CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot, CumulusPalletXcmError, CumulusPalletXcmEvent, CumulusPalletXcmOrigin, CumulusPalletXcmpQueueCall, CumulusPalletXcmpQueueError, CumulusPalletXcmpQueueEvent, CumulusPalletXcmpQueueInboundChannelDetails, CumulusPalletXcmpQueueInboundState, CumulusPalletXcmpQueueOutboundChannelDetails, CumulusPalletXcmpQueueOutboundState, CumulusPalletXcmpQueueQueueConfigData, CumulusPrimitivesParachainInherentParachainInherentData, FrameSupportDispatchDispatchClass, FrameSupportDispatchDispatchInfo, FrameSupportDispatchPays, FrameSupportDispatchPerDispatchClassU32, FrameSupportDispatchPerDispatchClassWeight, FrameSupportDispatchPerDispatchClassWeightsPerClass, FrameSupportDispatchRawOrigin, FrameSupportPalletId, FrameSupportScheduleLookupError, FrameSupportScheduleMaybeHashed, FrameSupportTokensMiscBalanceStatus, FrameSystemAccountInfo, FrameSystemCall, FrameSystemError, FrameSystemEvent, FrameSystemEventRecord, FrameSystemExtensionsCheckGenesis, FrameSystemExtensionsCheckNonZeroSender, FrameSystemExtensionsCheckNonce, FrameSystemExtensionsCheckSpecVersion, FrameSystemExtensionsCheckTxVersion, FrameSystemExtensionsCheckWeight, FrameSystemLastRuntimeUpgradeInfo, FrameSystemLimitsBlockLength, FrameSystemLimitsBlockWeights, FrameSystemLimitsWeightsPerClass, FrameSystemPhase, KhalaParachainRuntimeOpaqueSessionKeys, KhalaParachainRuntimeOriginCaller, KhalaParachainRuntimeProxyType, KhalaParachainRuntimeRuntime, PalletAssetsApproval, PalletAssetsAssetAccount, PalletAssetsAssetDetails, PalletAssetsAssetMetadata, PalletAssetsCall, PalletAssetsDestroyWitness, PalletAssetsError, PalletAssetsEvent, PalletAssetsExistenceReason, PalletAuthorshipCall, PalletAuthorshipError, PalletAuthorshipUncleEntryItem, PalletBalancesAccountData, PalletBalancesBalanceLock, PalletBalancesCall, PalletBalancesError, PalletBalancesEvent, PalletBalancesReasons, PalletBalancesReleases, PalletBalancesReserveData, PalletBountiesBounty, PalletBountiesBountyStatus, PalletBountiesCall, PalletBountiesError, PalletBountiesEvent, PalletChildBountiesCall, PalletChildBountiesChildBounty, PalletChildBountiesChildBountyStatus, PalletChildBountiesError, PalletChildBountiesEvent, PalletCollatorSelectionCall, PalletCollatorSelectionCandidateInfo, PalletCollatorSelectionError, PalletCollatorSelectionEvent, PalletCollectiveCall, PalletCollectiveError, PalletCollectiveEvent, PalletCollectiveRawOrigin, PalletCollectiveVotes, PalletDemocracyCall, PalletDemocracyConviction, PalletDemocracyDelegations, PalletDemocracyError, PalletDemocracyEvent, PalletDemocracyPreimageStatus, PalletDemocracyReferendumInfo, PalletDemocracyReferendumStatus, PalletDemocracyReleases, PalletDemocracyTally, PalletDemocracyVoteAccountVote, PalletDemocracyVotePriorLock, PalletDemocracyVoteThreshold, PalletDemocracyVoteVoting, PalletElectionsPhragmenCall, PalletElectionsPhragmenError, PalletElectionsPhragmenEvent, PalletElectionsPhragmenRenouncing, PalletElectionsPhragmenSeatHolder, PalletElectionsPhragmenVoter, PalletIdentityBitFlags, PalletIdentityCall, PalletIdentityError, PalletIdentityEvent, PalletIdentityIdentityField, PalletIdentityIdentityInfo, PalletIdentityJudgement, PalletIdentityRegistrarInfo, PalletIdentityRegistration, PalletLotteryCall, PalletLotteryError, PalletLotteryEvent, PalletLotteryLotteryConfig, PalletMembershipCall, PalletMembershipError, PalletMembershipEvent, PalletMultisigCall, PalletMultisigError, PalletMultisigEvent, PalletMultisigMultisig, PalletMultisigTimepoint, PalletPhalaWorldCareerType, PalletPhalaWorldFoodInfo, PalletPhalaWorldIncubationPalletCall, PalletPhalaWorldIncubationPalletError, PalletPhalaWorldIncubationPalletEvent, PalletPhalaWorldNftSaleInfo, PalletPhalaWorldNftSalePalletCall, PalletPhalaWorldNftSalePalletError, PalletPhalaWorldNftSalePalletEvent, PalletPhalaWorldNftSaleType, PalletPhalaWorldPartInfo, PalletPhalaWorldPartRarityType, PalletPhalaWorldPartSizeType, PalletPhalaWorldPreorderInfo, PalletPhalaWorldRaceType, PalletPhalaWorldRarityType, PalletPhalaWorldShellPartInfo, PalletPhalaWorldShellParts, PalletPhalaWorldStatusType, PalletPreimageCall, PalletPreimageError, PalletPreimageEvent, PalletPreimageRequestStatus, PalletProxyAnnouncement, PalletProxyCall, PalletProxyError, PalletProxyEvent, PalletProxyProxyDefinition, PalletRmrkCoreCall, PalletRmrkCoreError, PalletRmrkCoreEvent, PalletRmrkEquipCall, PalletRmrkEquipError, PalletRmrkEquipEvent, PalletRmrkMarketCall, PalletRmrkMarketError, PalletRmrkMarketEvent, PalletRmrkMarketListInfo, PalletRmrkMarketOffer, PalletSchedulerCall, PalletSchedulerError, PalletSchedulerEvent, PalletSchedulerScheduledV3, PalletSessionCall, PalletSessionError, PalletSessionEvent, PalletTimestampCall, PalletTipsCall, PalletTipsError, PalletTipsEvent, PalletTipsOpenTip, PalletTransactionPaymentChargeTransactionPayment, PalletTransactionPaymentEvent, PalletTransactionPaymentReleases, PalletTreasuryCall, PalletTreasuryError, PalletTreasuryEvent, PalletTreasuryProposal, PalletUniquesCall, PalletUniquesCollectionDetails, PalletUniquesCollectionMetadata, PalletUniquesDestroyWitness, PalletUniquesError, PalletUniquesEvent, PalletUniquesItemDetails, PalletUniquesItemMetadata, PalletUtilityCall, PalletUtilityError, PalletUtilityEvent, PalletVestingCall, PalletVestingError, PalletVestingEvent, PalletVestingReleases, PalletVestingVestingInfo, PalletXcmCall, PalletXcmError, PalletXcmEvent, PalletXcmOrigin, PalletXcmQueryStatus, PalletXcmVersionMigrationStage, PhalaMqMessage, PhalaMqMessageOrigin, PhalaMqSignedMessage, PhalaPalletsMiningPalletBenchmark, PhalaPalletsMiningPalletCall, PhalaPalletsMiningPalletError, PhalaPalletsMiningPalletEvent, PhalaPalletsMiningPalletMinerInfo, PhalaPalletsMiningPalletMinerState, PhalaPalletsMiningPalletMinerStats, PhalaPalletsMqCheckSeqCheckMqSequence, PhalaPalletsMqPalletCall, PhalaPalletsMqPalletError, PhalaPalletsRegistryPalletCall, PhalaPalletsRegistryPalletError, PhalaPalletsRegistryPalletEvent, PhalaPalletsRegistryPalletWorkerInfo, PhalaPalletsStakepoolPalletCall, PhalaPalletsStakepoolPalletError, PhalaPalletsStakepoolPalletEvent, PhalaPalletsStakepoolPalletPoolInfo, PhalaPalletsStakepoolPalletUserStakeInfo, PhalaPalletsStakepoolPalletWithdrawInfo, PhalaPalletsUtilsAttestation, PhalaTypesMessagingPRuntimeManagementEvent, PhalaTypesMessagingRetireCondition, PhalaTypesMessagingTokenomicParameters, PhalaTypesVersionedWorkerEndpoints, PhalaTypesWorkerEndpointPayload, PhalaTypesWorkerRegistrationInfo, PhantomType, PolkadotCorePrimitivesInboundDownwardMessage, PolkadotCorePrimitivesInboundHrmpMessage, PolkadotCorePrimitivesOutboundHrmpMessage, PolkadotParachainPrimitivesXcmpMessageFormat, PolkadotPrimitivesV2AbridgedHostConfiguration, PolkadotPrimitivesV2AbridgedHrmpChannel, PolkadotPrimitivesV2PersistedValidationData, PolkadotPrimitivesV2UpgradeRestriction, RmrkTraitsBaseBaseInfo, RmrkTraitsCollectionCollectionInfo, RmrkTraitsNftAccountIdOrCollectionNftTuple, RmrkTraitsNftNftChild, RmrkTraitsNftNftInfo, RmrkTraitsNftRoyaltyInfo, RmrkTraitsPartEquippableList, RmrkTraitsPartFixedPart, RmrkTraitsPartPartType, RmrkTraitsPartSlotPart, RmrkTraitsPropertyPropertyInfo, RmrkTraitsResourceBasicResource, RmrkTraitsResourceComposableResource, RmrkTraitsResourceResourceInfo, RmrkTraitsResourceResourceInfoMin, RmrkTraitsResourceResourceTypes, RmrkTraitsResourceSlotResource, RmrkTraitsTheme, RmrkTraitsThemeThemeProperty, SpConsensusAuraSr25519AppSr25519Public, SpCoreCryptoKeyTypeId, SpCoreEcdsaSignature, SpCoreEd25519Signature, SpCoreSr25519Public, SpCoreSr25519Signature, SpCoreVoid, SpRuntimeArithmeticError, SpRuntimeBlakeTwo256, SpRuntimeDigest, SpRuntimeDigestDigestItem, SpRuntimeDispatchError, SpRuntimeHeader, SpRuntimeModuleError, SpRuntimeMultiSignature, SpRuntimeTokenError, SpRuntimeTransactionalError, SpTrieStorageProof, SpVersionRuntimeVersion, SpWeightsRuntimeDbWeight, SubbridgePalletsChainbridgePalletBridgeEvent, SubbridgePalletsChainbridgePalletCall, SubbridgePalletsChainbridgePalletError, SubbridgePalletsChainbridgePalletEvent, SubbridgePalletsChainbridgePalletProposalStatus, SubbridgePalletsChainbridgePalletProposalVotes, SubbridgePalletsXcmbridgePalletError, SubbridgePalletsXcmbridgePalletEvent, SubbridgePalletsXtransferPalletCall, SubbridgePalletsXtransferPalletError, SubbridgePalletsXtransferPalletEvent, XcmDoubleEncoded, XcmV0Junction, XcmV0JunctionBodyId, XcmV0JunctionBodyPart, XcmV0JunctionNetworkId, XcmV0MultiAsset, XcmV0MultiLocation, XcmV0Order, XcmV0OriginKind, XcmV0Response, XcmV0Xcm, XcmV1Junction, XcmV1MultiAsset, XcmV1MultiLocation, XcmV1MultiassetAssetId, XcmV1MultiassetAssetInstance, XcmV1MultiassetFungibility, XcmV1MultiassetMultiAssetFilter, XcmV1MultiassetMultiAssets, XcmV1MultiassetWildFungibility, XcmV1MultiassetWildMultiAsset, XcmV1MultilocationJunctions, XcmV1Order, XcmV1Response, XcmV1Xcm, XcmV2Instruction, XcmV2Response, XcmV2TraitsError, XcmV2TraitsOutcome, XcmV2WeightLimit, XcmV2Xcm, XcmVersionedMultiAssets, XcmVersionedMultiLocation, XcmVersionedResponse, XcmVersionedXcm } from '@polkadot/types/lookup';

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
    CumulusPalletParachainSystemError: CumulusPalletParachainSystemError;
    CumulusPalletParachainSystemEvent: CumulusPalletParachainSystemEvent;
    CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot: CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot;
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
    FrameSupportDispatchDispatchClass: FrameSupportDispatchDispatchClass;
    FrameSupportDispatchDispatchInfo: FrameSupportDispatchDispatchInfo;
    FrameSupportDispatchPays: FrameSupportDispatchPays;
    FrameSupportDispatchPerDispatchClassU32: FrameSupportDispatchPerDispatchClassU32;
    FrameSupportDispatchPerDispatchClassWeight: FrameSupportDispatchPerDispatchClassWeight;
    FrameSupportDispatchPerDispatchClassWeightsPerClass: FrameSupportDispatchPerDispatchClassWeightsPerClass;
    FrameSupportDispatchRawOrigin: FrameSupportDispatchRawOrigin;
    FrameSupportPalletId: FrameSupportPalletId;
    FrameSupportScheduleLookupError: FrameSupportScheduleLookupError;
    FrameSupportScheduleMaybeHashed: FrameSupportScheduleMaybeHashed;
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
    KhalaParachainRuntimeOpaqueSessionKeys: KhalaParachainRuntimeOpaqueSessionKeys;
    KhalaParachainRuntimeOriginCaller: KhalaParachainRuntimeOriginCaller;
    KhalaParachainRuntimeProxyType: KhalaParachainRuntimeProxyType;
    KhalaParachainRuntimeRuntime: KhalaParachainRuntimeRuntime;
    PalletAssetsApproval: PalletAssetsApproval;
    PalletAssetsAssetAccount: PalletAssetsAssetAccount;
    PalletAssetsAssetDetails: PalletAssetsAssetDetails;
    PalletAssetsAssetMetadata: PalletAssetsAssetMetadata;
    PalletAssetsCall: PalletAssetsCall;
    PalletAssetsDestroyWitness: PalletAssetsDestroyWitness;
    PalletAssetsError: PalletAssetsError;
    PalletAssetsEvent: PalletAssetsEvent;
    PalletAssetsExistenceReason: PalletAssetsExistenceReason;
    PalletAuthorshipCall: PalletAuthorshipCall;
    PalletAuthorshipError: PalletAuthorshipError;
    PalletAuthorshipUncleEntryItem: PalletAuthorshipUncleEntryItem;
    PalletBalancesAccountData: PalletBalancesAccountData;
    PalletBalancesBalanceLock: PalletBalancesBalanceLock;
    PalletBalancesCall: PalletBalancesCall;
    PalletBalancesError: PalletBalancesError;
    PalletBalancesEvent: PalletBalancesEvent;
    PalletBalancesReasons: PalletBalancesReasons;
    PalletBalancesReleases: PalletBalancesReleases;
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
    PalletDemocracyPreimageStatus: PalletDemocracyPreimageStatus;
    PalletDemocracyReferendumInfo: PalletDemocracyReferendumInfo;
    PalletDemocracyReferendumStatus: PalletDemocracyReferendumStatus;
    PalletDemocracyReleases: PalletDemocracyReleases;
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
    PalletPhalaWorldCareerType: PalletPhalaWorldCareerType;
    PalletPhalaWorldFoodInfo: PalletPhalaWorldFoodInfo;
    PalletPhalaWorldIncubationPalletCall: PalletPhalaWorldIncubationPalletCall;
    PalletPhalaWorldIncubationPalletError: PalletPhalaWorldIncubationPalletError;
    PalletPhalaWorldIncubationPalletEvent: PalletPhalaWorldIncubationPalletEvent;
    PalletPhalaWorldNftSaleInfo: PalletPhalaWorldNftSaleInfo;
    PalletPhalaWorldNftSalePalletCall: PalletPhalaWorldNftSalePalletCall;
    PalletPhalaWorldNftSalePalletError: PalletPhalaWorldNftSalePalletError;
    PalletPhalaWorldNftSalePalletEvent: PalletPhalaWorldNftSalePalletEvent;
    PalletPhalaWorldNftSaleType: PalletPhalaWorldNftSaleType;
    PalletPhalaWorldPartInfo: PalletPhalaWorldPartInfo;
    PalletPhalaWorldPartRarityType: PalletPhalaWorldPartRarityType;
    PalletPhalaWorldPartSizeType: PalletPhalaWorldPartSizeType;
    PalletPhalaWorldPreorderInfo: PalletPhalaWorldPreorderInfo;
    PalletPhalaWorldRaceType: PalletPhalaWorldRaceType;
    PalletPhalaWorldRarityType: PalletPhalaWorldRarityType;
    PalletPhalaWorldShellPartInfo: PalletPhalaWorldShellPartInfo;
    PalletPhalaWorldShellParts: PalletPhalaWorldShellParts;
    PalletPhalaWorldStatusType: PalletPhalaWorldStatusType;
    PalletPreimageCall: PalletPreimageCall;
    PalletPreimageError: PalletPreimageError;
    PalletPreimageEvent: PalletPreimageEvent;
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
    PalletSchedulerScheduledV3: PalletSchedulerScheduledV3;
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
    PalletXcmVersionMigrationStage: PalletXcmVersionMigrationStage;
    PhalaMqMessage: PhalaMqMessage;
    PhalaMqMessageOrigin: PhalaMqMessageOrigin;
    PhalaMqSignedMessage: PhalaMqSignedMessage;
    PhalaPalletsMiningPalletBenchmark: PhalaPalletsMiningPalletBenchmark;
    PhalaPalletsMiningPalletCall: PhalaPalletsMiningPalletCall;
    PhalaPalletsMiningPalletError: PhalaPalletsMiningPalletError;
    PhalaPalletsMiningPalletEvent: PhalaPalletsMiningPalletEvent;
    PhalaPalletsMiningPalletMinerInfo: PhalaPalletsMiningPalletMinerInfo;
    PhalaPalletsMiningPalletMinerState: PhalaPalletsMiningPalletMinerState;
    PhalaPalletsMiningPalletMinerStats: PhalaPalletsMiningPalletMinerStats;
    PhalaPalletsMqCheckSeqCheckMqSequence: PhalaPalletsMqCheckSeqCheckMqSequence;
    PhalaPalletsMqPalletCall: PhalaPalletsMqPalletCall;
    PhalaPalletsMqPalletError: PhalaPalletsMqPalletError;
    PhalaPalletsRegistryPalletCall: PhalaPalletsRegistryPalletCall;
    PhalaPalletsRegistryPalletError: PhalaPalletsRegistryPalletError;
    PhalaPalletsRegistryPalletEvent: PhalaPalletsRegistryPalletEvent;
    PhalaPalletsRegistryPalletWorkerInfo: PhalaPalletsRegistryPalletWorkerInfo;
    PhalaPalletsStakepoolPalletCall: PhalaPalletsStakepoolPalletCall;
    PhalaPalletsStakepoolPalletError: PhalaPalletsStakepoolPalletError;
    PhalaPalletsStakepoolPalletEvent: PhalaPalletsStakepoolPalletEvent;
    PhalaPalletsStakepoolPalletPoolInfo: PhalaPalletsStakepoolPalletPoolInfo;
    PhalaPalletsStakepoolPalletUserStakeInfo: PhalaPalletsStakepoolPalletUserStakeInfo;
    PhalaPalletsStakepoolPalletWithdrawInfo: PhalaPalletsStakepoolPalletWithdrawInfo;
    PhalaPalletsUtilsAttestation: PhalaPalletsUtilsAttestation;
    PhalaTypesMessagingPRuntimeManagementEvent: PhalaTypesMessagingPRuntimeManagementEvent;
    PhalaTypesMessagingRetireCondition: PhalaTypesMessagingRetireCondition;
    PhalaTypesMessagingTokenomicParameters: PhalaTypesMessagingTokenomicParameters;
    PhalaTypesVersionedWorkerEndpoints: PhalaTypesVersionedWorkerEndpoints;
    PhalaTypesWorkerEndpointPayload: PhalaTypesWorkerEndpointPayload;
    PhalaTypesWorkerRegistrationInfo: PhalaTypesWorkerRegistrationInfo;
    PhantomType: PhantomType;
    PolkadotCorePrimitivesInboundDownwardMessage: PolkadotCorePrimitivesInboundDownwardMessage;
    PolkadotCorePrimitivesInboundHrmpMessage: PolkadotCorePrimitivesInboundHrmpMessage;
    PolkadotCorePrimitivesOutboundHrmpMessage: PolkadotCorePrimitivesOutboundHrmpMessage;
    PolkadotParachainPrimitivesXcmpMessageFormat: PolkadotParachainPrimitivesXcmpMessageFormat;
    PolkadotPrimitivesV2AbridgedHostConfiguration: PolkadotPrimitivesV2AbridgedHostConfiguration;
    PolkadotPrimitivesV2AbridgedHrmpChannel: PolkadotPrimitivesV2AbridgedHrmpChannel;
    PolkadotPrimitivesV2PersistedValidationData: PolkadotPrimitivesV2PersistedValidationData;
    PolkadotPrimitivesV2UpgradeRestriction: PolkadotPrimitivesV2UpgradeRestriction;
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
    SpConsensusAuraSr25519AppSr25519Public: SpConsensusAuraSr25519AppSr25519Public;
    SpCoreCryptoKeyTypeId: SpCoreCryptoKeyTypeId;
    SpCoreEcdsaSignature: SpCoreEcdsaSignature;
    SpCoreEd25519Signature: SpCoreEd25519Signature;
    SpCoreSr25519Public: SpCoreSr25519Public;
    SpCoreSr25519Signature: SpCoreSr25519Signature;
    SpCoreVoid: SpCoreVoid;
    SpRuntimeArithmeticError: SpRuntimeArithmeticError;
    SpRuntimeBlakeTwo256: SpRuntimeBlakeTwo256;
    SpRuntimeDigest: SpRuntimeDigest;
    SpRuntimeDigestDigestItem: SpRuntimeDigestDigestItem;
    SpRuntimeDispatchError: SpRuntimeDispatchError;
    SpRuntimeHeader: SpRuntimeHeader;
    SpRuntimeModuleError: SpRuntimeModuleError;
    SpRuntimeMultiSignature: SpRuntimeMultiSignature;
    SpRuntimeTokenError: SpRuntimeTokenError;
    SpRuntimeTransactionalError: SpRuntimeTransactionalError;
    SpTrieStorageProof: SpTrieStorageProof;
    SpVersionRuntimeVersion: SpVersionRuntimeVersion;
    SpWeightsRuntimeDbWeight: SpWeightsRuntimeDbWeight;
    SubbridgePalletsChainbridgePalletBridgeEvent: SubbridgePalletsChainbridgePalletBridgeEvent;
    SubbridgePalletsChainbridgePalletCall: SubbridgePalletsChainbridgePalletCall;
    SubbridgePalletsChainbridgePalletError: SubbridgePalletsChainbridgePalletError;
    SubbridgePalletsChainbridgePalletEvent: SubbridgePalletsChainbridgePalletEvent;
    SubbridgePalletsChainbridgePalletProposalStatus: SubbridgePalletsChainbridgePalletProposalStatus;
    SubbridgePalletsChainbridgePalletProposalVotes: SubbridgePalletsChainbridgePalletProposalVotes;
    SubbridgePalletsXcmbridgePalletError: SubbridgePalletsXcmbridgePalletError;
    SubbridgePalletsXcmbridgePalletEvent: SubbridgePalletsXcmbridgePalletEvent;
    SubbridgePalletsXtransferPalletCall: SubbridgePalletsXtransferPalletCall;
    SubbridgePalletsXtransferPalletError: SubbridgePalletsXtransferPalletError;
    SubbridgePalletsXtransferPalletEvent: SubbridgePalletsXtransferPalletEvent;
    XcmDoubleEncoded: XcmDoubleEncoded;
    XcmV0Junction: XcmV0Junction;
    XcmV0JunctionBodyId: XcmV0JunctionBodyId;
    XcmV0JunctionBodyPart: XcmV0JunctionBodyPart;
    XcmV0JunctionNetworkId: XcmV0JunctionNetworkId;
    XcmV0MultiAsset: XcmV0MultiAsset;
    XcmV0MultiLocation: XcmV0MultiLocation;
    XcmV0Order: XcmV0Order;
    XcmV0OriginKind: XcmV0OriginKind;
    XcmV0Response: XcmV0Response;
    XcmV0Xcm: XcmV0Xcm;
    XcmV1Junction: XcmV1Junction;
    XcmV1MultiAsset: XcmV1MultiAsset;
    XcmV1MultiLocation: XcmV1MultiLocation;
    XcmV1MultiassetAssetId: XcmV1MultiassetAssetId;
    XcmV1MultiassetAssetInstance: XcmV1MultiassetAssetInstance;
    XcmV1MultiassetFungibility: XcmV1MultiassetFungibility;
    XcmV1MultiassetMultiAssetFilter: XcmV1MultiassetMultiAssetFilter;
    XcmV1MultiassetMultiAssets: XcmV1MultiassetMultiAssets;
    XcmV1MultiassetWildFungibility: XcmV1MultiassetWildFungibility;
    XcmV1MultiassetWildMultiAsset: XcmV1MultiassetWildMultiAsset;
    XcmV1MultilocationJunctions: XcmV1MultilocationJunctions;
    XcmV1Order: XcmV1Order;
    XcmV1Response: XcmV1Response;
    XcmV1Xcm: XcmV1Xcm;
    XcmV2Instruction: XcmV2Instruction;
    XcmV2Response: XcmV2Response;
    XcmV2TraitsError: XcmV2TraitsError;
    XcmV2TraitsOutcome: XcmV2TraitsOutcome;
    XcmV2WeightLimit: XcmV2WeightLimit;
    XcmV2Xcm: XcmV2Xcm;
    XcmVersionedMultiAssets: XcmVersionedMultiAssets;
    XcmVersionedMultiLocation: XcmVersionedMultiLocation;
    XcmVersionedResponse: XcmVersionedResponse;
    XcmVersionedXcm: XcmVersionedXcm;
  } // InterfaceTypes
} // declare module
