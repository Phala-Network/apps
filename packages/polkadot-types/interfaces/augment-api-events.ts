// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/events';

import type { ApiTypes, AugmentedEvent } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, Result, U256, U8aFixed, Vec, bool, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H256 } from '@polkadot/types/interfaces/runtime';
import type { FrameSupportDispatchDispatchInfo, FrameSupportTokensMiscBalanceStatus, PalletDemocracyMetadataOwner, PalletDemocracyVoteAccountVote, PalletDemocracyVoteThreshold, PalletIndexDepositInfo, PalletMultisigTimepoint, PhalaPalletsComputeVaultPalletForceShutdownReason, PhalaParachainRuntimeProxyType, PhalaTypesAttestationProvider, RmrkTraitsNftAccountIdOrCollectionNftTuple, SpCoreSr25519Public, SpRuntimeDispatchError, SpWeightsWeightV2Weight, StagingXcmV3MultiAsset, StagingXcmV3MultiLocation, StagingXcmV3MultiassetAssetId, StagingXcmV3MultiassetMultiAssets, StagingXcmV3Response, StagingXcmV3TraitsError, StagingXcmV3TraitsOutcome, StagingXcmV3Xcm, StagingXcmVersionedMultiAssets, StagingXcmVersionedMultiLocation, SygmaFeeHandlerRouterFeeHandlerType, SygmaTraitsTransferType } from '@polkadot/types/lookup';

export type __AugmentedEvent<ApiType extends ApiTypes> = AugmentedEvent<ApiType>;

declare module '@polkadot/api-base/types/events' {
  interface AugmentedEvents<ApiType extends ApiTypes> {
    assets: {
      /**
       * Accounts were destroyed for given asset.
       **/
      AccountsDestroyed: AugmentedEvent<ApiType, [assetId: u32, accountsDestroyed: u32, accountsRemaining: u32], { assetId: u32, accountsDestroyed: u32, accountsRemaining: u32 }>;
      /**
       * An approval for account `delegate` was cancelled by `owner`.
       **/
      ApprovalCancelled: AugmentedEvent<ApiType, [assetId: u32, owner: AccountId32, delegate: AccountId32], { assetId: u32, owner: AccountId32, delegate: AccountId32 }>;
      /**
       * Approvals were destroyed for given asset.
       **/
      ApprovalsDestroyed: AugmentedEvent<ApiType, [assetId: u32, approvalsDestroyed: u32, approvalsRemaining: u32], { assetId: u32, approvalsDestroyed: u32, approvalsRemaining: u32 }>;
      /**
       * (Additional) funds have been approved for transfer to a destination account.
       **/
      ApprovedTransfer: AugmentedEvent<ApiType, [assetId: u32, source: AccountId32, delegate: AccountId32, amount: u128], { assetId: u32, source: AccountId32, delegate: AccountId32, amount: u128 }>;
      /**
       * Some asset `asset_id` was frozen.
       **/
      AssetFrozen: AugmentedEvent<ApiType, [assetId: u32], { assetId: u32 }>;
      /**
       * The min_balance of an asset has been updated by the asset owner.
       **/
      AssetMinBalanceChanged: AugmentedEvent<ApiType, [assetId: u32, newMinBalance: u128], { assetId: u32, newMinBalance: u128 }>;
      /**
       * An asset has had its attributes changed by the `Force` origin.
       **/
      AssetStatusChanged: AugmentedEvent<ApiType, [assetId: u32], { assetId: u32 }>;
      /**
       * Some asset `asset_id` was thawed.
       **/
      AssetThawed: AugmentedEvent<ApiType, [assetId: u32], { assetId: u32 }>;
      /**
       * Some account `who` was blocked.
       **/
      Blocked: AugmentedEvent<ApiType, [assetId: u32, who: AccountId32], { assetId: u32, who: AccountId32 }>;
      /**
       * Some assets were destroyed.
       **/
      Burned: AugmentedEvent<ApiType, [assetId: u32, owner: AccountId32, balance: u128], { assetId: u32, owner: AccountId32, balance: u128 }>;
      /**
       * Some asset class was created.
       **/
      Created: AugmentedEvent<ApiType, [assetId: u32, creator: AccountId32, owner: AccountId32], { assetId: u32, creator: AccountId32, owner: AccountId32 }>;
      /**
       * An asset class was destroyed.
       **/
      Destroyed: AugmentedEvent<ApiType, [assetId: u32], { assetId: u32 }>;
      /**
       * An asset class is in the process of being destroyed.
       **/
      DestructionStarted: AugmentedEvent<ApiType, [assetId: u32], { assetId: u32 }>;
      /**
       * Some asset class was force-created.
       **/
      ForceCreated: AugmentedEvent<ApiType, [assetId: u32, owner: AccountId32], { assetId: u32, owner: AccountId32 }>;
      /**
       * Some account `who` was frozen.
       **/
      Frozen: AugmentedEvent<ApiType, [assetId: u32, who: AccountId32], { assetId: u32, who: AccountId32 }>;
      /**
       * Some assets were issued.
       **/
      Issued: AugmentedEvent<ApiType, [assetId: u32, owner: AccountId32, amount: u128], { assetId: u32, owner: AccountId32, amount: u128 }>;
      /**
       * Metadata has been cleared for an asset.
       **/
      MetadataCleared: AugmentedEvent<ApiType, [assetId: u32], { assetId: u32 }>;
      /**
       * New metadata has been set for an asset.
       **/
      MetadataSet: AugmentedEvent<ApiType, [assetId: u32, name: Bytes, symbol_: Bytes, decimals: u8, isFrozen: bool], { assetId: u32, name: Bytes, symbol: Bytes, decimals: u8, isFrozen: bool }>;
      /**
       * The owner changed.
       **/
      OwnerChanged: AugmentedEvent<ApiType, [assetId: u32, owner: AccountId32], { assetId: u32, owner: AccountId32 }>;
      /**
       * The management team changed.
       **/
      TeamChanged: AugmentedEvent<ApiType, [assetId: u32, issuer: AccountId32, admin: AccountId32, freezer: AccountId32], { assetId: u32, issuer: AccountId32, admin: AccountId32, freezer: AccountId32 }>;
      /**
       * Some account `who` was thawed.
       **/
      Thawed: AugmentedEvent<ApiType, [assetId: u32, who: AccountId32], { assetId: u32, who: AccountId32 }>;
      /**
       * Some account `who` was created with a deposit from `depositor`.
       **/
      Touched: AugmentedEvent<ApiType, [assetId: u32, who: AccountId32, depositor: AccountId32], { assetId: u32, who: AccountId32, depositor: AccountId32 }>;
      /**
       * Some assets were transferred.
       **/
      Transferred: AugmentedEvent<ApiType, [assetId: u32, from: AccountId32, to: AccountId32, amount: u128], { assetId: u32, from: AccountId32, to: AccountId32, amount: u128 }>;
      /**
       * An `amount` was transferred in its entirety from `owner` to `destination` by
       * the approved `delegate`.
       **/
      TransferredApproved: AugmentedEvent<ApiType, [assetId: u32, owner: AccountId32, delegate: AccountId32, destination: AccountId32, amount: u128], { assetId: u32, owner: AccountId32, delegate: AccountId32, destination: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    assetsRegistry: {
      /**
       * Asset is registerd.
       **/
      AssetRegistered: AugmentedEvent<ApiType, [assetId: u32, location: StagingXcmV3MultiLocation], { assetId: u32, location: StagingXcmV3MultiLocation }>;
      /**
       * Asset is unregisterd.
       **/
      AssetUnregistered: AugmentedEvent<ApiType, [assetId: u32, location: StagingXcmV3MultiLocation], { assetId: u32, location: StagingXcmV3MultiLocation }>;
      /**
       * Asset disabled chainbridge.
       **/
      ChainbridgeDisabled: AugmentedEvent<ApiType, [assetId: u32, chainId: u8, resourceId: U8aFixed], { assetId: u32, chainId: u8, resourceId: U8aFixed }>;
      /**
       * Asset enabled chainbridge.
       **/
      ChainbridgeEnabled: AugmentedEvent<ApiType, [assetId: u32, chainId: u8, resourceId: U8aFixed], { assetId: u32, chainId: u8, resourceId: U8aFixed }>;
      /**
       * Force burn asset from an certain account.
       **/
      ForceBurnt: AugmentedEvent<ApiType, [assetId: u32, who: AccountId32, amount: u128], { assetId: u32, who: AccountId32, amount: u128 }>;
      /**
       * Force mint asset to an certain account.
       **/
      ForceMinted: AugmentedEvent<ApiType, [assetId: u32, beneficiary: AccountId32, amount: u128], { assetId: u32, beneficiary: AccountId32, amount: u128 }>;
      /**
       * Asset disabled sygmabridge.
       **/
      SygmabridgeDisabled: AugmentedEvent<ApiType, [assetId: u32, domainId: u8, resourceId: U8aFixed], { assetId: u32, domainId: u8, resourceId: U8aFixed }>;
      /**
       * Asset enabled sygmabridge.
       **/
      SygmabridgeEnabled: AugmentedEvent<ApiType, [assetId: u32, domainId: u8, resourceId: U8aFixed], { assetId: u32, domainId: u8, resourceId: U8aFixed }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    balances: {
      /**
       * A balance was set by root.
       **/
      BalanceSet: AugmentedEvent<ApiType, [who: AccountId32, free: u128], { who: AccountId32, free: u128 }>;
      /**
       * Some amount was burned from an account.
       **/
      Burned: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Some amount was deposited (e.g. for transaction fees).
       **/
      Deposit: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * An account was removed whose balance was non-zero but below ExistentialDeposit,
       * resulting in an outright loss.
       **/
      DustLost: AugmentedEvent<ApiType, [account: AccountId32, amount: u128], { account: AccountId32, amount: u128 }>;
      /**
       * An account was created with some free balance.
       **/
      Endowed: AugmentedEvent<ApiType, [account: AccountId32, freeBalance: u128], { account: AccountId32, freeBalance: u128 }>;
      /**
       * Some balance was frozen.
       **/
      Frozen: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Total issuance was increased by `amount`, creating a credit to be balanced.
       **/
      Issued: AugmentedEvent<ApiType, [amount: u128], { amount: u128 }>;
      /**
       * Some balance was locked.
       **/
      Locked: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Some amount was minted into an account.
       **/
      Minted: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Total issuance was decreased by `amount`, creating a debt to be balanced.
       **/
      Rescinded: AugmentedEvent<ApiType, [amount: u128], { amount: u128 }>;
      /**
       * Some balance was reserved (moved from free to reserved).
       **/
      Reserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Some balance was moved from the reserve of the first account to the second account.
       * Final argument indicates the destination balance type.
       **/
      ReserveRepatriated: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, amount: u128, destinationStatus: FrameSupportTokensMiscBalanceStatus], { from: AccountId32, to: AccountId32, amount: u128, destinationStatus: FrameSupportTokensMiscBalanceStatus }>;
      /**
       * Some amount was restored into an account.
       **/
      Restored: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Some amount was removed from the account (e.g. for misbehavior).
       **/
      Slashed: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Some amount was suspended from an account (it can be restored later).
       **/
      Suspended: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Some balance was thawed.
       **/
      Thawed: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Transfer succeeded.
       **/
      Transfer: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, amount: u128], { from: AccountId32, to: AccountId32, amount: u128 }>;
      /**
       * Some balance was unlocked.
       **/
      Unlocked: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Some balance was unreserved (moved from reserved to free).
       **/
      Unreserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * An account was upgraded.
       **/
      Upgraded: AugmentedEvent<ApiType, [who: AccountId32], { who: AccountId32 }>;
      /**
       * Some amount was withdrawn from the account (e.g. for transaction fees).
       **/
      Withdraw: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    bounties: {
      /**
       * A bounty is awarded to a beneficiary.
       **/
      BountyAwarded: AugmentedEvent<ApiType, [index: u32, beneficiary: AccountId32], { index: u32, beneficiary: AccountId32 }>;
      /**
       * A bounty proposal is funded and became active.
       **/
      BountyBecameActive: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      /**
       * A bounty is cancelled.
       **/
      BountyCanceled: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      /**
       * A bounty is claimed by beneficiary.
       **/
      BountyClaimed: AugmentedEvent<ApiType, [index: u32, payout: u128, beneficiary: AccountId32], { index: u32, payout: u128, beneficiary: AccountId32 }>;
      /**
       * A bounty expiry is extended.
       **/
      BountyExtended: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      /**
       * New bounty proposal.
       **/
      BountyProposed: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      /**
       * A bounty proposal was rejected; funds were slashed.
       **/
      BountyRejected: AugmentedEvent<ApiType, [index: u32, bond: u128], { index: u32, bond: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    chainBridge: {
      /**
       * Chain now available for transfers (chain_id)
       **/
      ChainWhitelisted: AugmentedEvent<ApiType, [u8]>;
      FeeUpdated: AugmentedEvent<ApiType, [destId: u8, fee: u128], { destId: u8, fee: u128 }>;
      /**
       * FungibleTransfer is for relaying fungibles (dest_id, nonce, resource_id, amount, recipient)
       **/
      FungibleTransfer: AugmentedEvent<ApiType, [u8, u64, U8aFixed, U256, Bytes]>;
      /**
       * GenericTransfer is for a generic data payload (dest_id, nonce, resource_id, metadata)
       **/
      GenericTransfer: AugmentedEvent<ApiType, [u8, u64, U8aFixed, Bytes]>;
      /**
       * NonFungibleTransfer is for relaying NFTs (dest_id, nonce, resource_id, token_id, recipient, metadata)
       **/
      NonFungibleTransfer: AugmentedEvent<ApiType, [u8, u64, U8aFixed, Bytes, Bytes, Bytes]>;
      /**
       * Voting successful for a proposal
       **/
      ProposalApproved: AugmentedEvent<ApiType, [u8, u64]>;
      /**
       * Execution of call failed
       **/
      ProposalFailed: AugmentedEvent<ApiType, [u8, u64]>;
      /**
       * Voting rejected a proposal
       **/
      ProposalRejected: AugmentedEvent<ApiType, [u8, u64]>;
      /**
       * Execution of call succeeded
       **/
      ProposalSucceeded: AugmentedEvent<ApiType, [u8, u64]>;
      /**
       * Relayer added to set
       **/
      RelayerAdded: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * Relayer removed from set
       **/
      RelayerRemoved: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * Vote threshold has changed (new_threshold)
       **/
      RelayerThresholdChanged: AugmentedEvent<ApiType, [u32]>;
      /**
       * Vot submitted against proposal
       **/
      VoteAgainst: AugmentedEvent<ApiType, [u8, u64, AccountId32]>;
      /**
       * Vote submitted in favour of proposal
       **/
      VoteFor: AugmentedEvent<ApiType, [u8, u64, AccountId32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    childBounties: {
      /**
       * A child-bounty is added.
       **/
      Added: AugmentedEvent<ApiType, [index: u32, childIndex: u32], { index: u32, childIndex: u32 }>;
      /**
       * A child-bounty is awarded to a beneficiary.
       **/
      Awarded: AugmentedEvent<ApiType, [index: u32, childIndex: u32, beneficiary: AccountId32], { index: u32, childIndex: u32, beneficiary: AccountId32 }>;
      /**
       * A child-bounty is cancelled.
       **/
      Canceled: AugmentedEvent<ApiType, [index: u32, childIndex: u32], { index: u32, childIndex: u32 }>;
      /**
       * A child-bounty is claimed by beneficiary.
       **/
      Claimed: AugmentedEvent<ApiType, [index: u32, childIndex: u32, payout: u128, beneficiary: AccountId32], { index: u32, childIndex: u32, payout: u128, beneficiary: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    collatorSelection: {
      /**
       * A new candidate joined.
       **/
      CandidateAdded: AugmentedEvent<ApiType, [accountId: AccountId32, deposit: u128], { accountId: AccountId32, deposit: u128 }>;
      /**
       * A candidate was removed.
       **/
      CandidateRemoved: AugmentedEvent<ApiType, [accountId: AccountId32], { accountId: AccountId32 }>;
      /**
       * An account was unable to be added to the Invulnerables because they did not have keys
       * registered. Other Invulnerables may have been set.
       **/
      InvalidInvulnerableSkipped: AugmentedEvent<ApiType, [accountId: AccountId32], { accountId: AccountId32 }>;
      /**
       * A new Invulnerable was added.
       **/
      InvulnerableAdded: AugmentedEvent<ApiType, [accountId: AccountId32], { accountId: AccountId32 }>;
      /**
       * An Invulnerable was removed.
       **/
      InvulnerableRemoved: AugmentedEvent<ApiType, [accountId: AccountId32], { accountId: AccountId32 }>;
      /**
       * The candidacy bond was set.
       **/
      NewCandidacyBond: AugmentedEvent<ApiType, [bondAmount: u128], { bondAmount: u128 }>;
      /**
       * The number of desired candidates was set.
       **/
      NewDesiredCandidates: AugmentedEvent<ApiType, [desiredCandidates: u32], { desiredCandidates: u32 }>;
      /**
       * New Invulnerables were set.
       **/
      NewInvulnerables: AugmentedEvent<ApiType, [invulnerables: Vec<AccountId32>], { invulnerables: Vec<AccountId32> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    council: {
      /**
       * A motion was approved by the required threshold.
       **/
      Approved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A proposal was closed because its threshold was reached or after its duration was up.
       **/
      Closed: AugmentedEvent<ApiType, [proposalHash: H256, yes: u32, no: u32], { proposalHash: H256, yes: u32, no: u32 }>;
      /**
       * A motion was not approved by the required threshold.
       **/
      Disapproved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A motion was executed; result will be `Ok` if it returned without error.
       **/
      Executed: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single member did some action; result will be `Ok` if it returned without error.
       **/
      MemberExecuted: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A motion (given hash) has been proposed (by given account) with a threshold (given
       * `MemberCount`).
       **/
      Proposed: AugmentedEvent<ApiType, [account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32], { account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32 }>;
      /**
       * A motion (given hash) has been voted on by given account, leaving
       * a tally (yes votes and no votes given respectively as `MemberCount`).
       **/
      Voted: AugmentedEvent<ApiType, [account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32], { account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    cumulusXcm: {
      /**
       * Downward message executed with the given outcome.
       * \[ id, outcome \]
       **/
      ExecutedDownward: AugmentedEvent<ApiType, [U8aFixed, StagingXcmV3TraitsOutcome]>;
      /**
       * Downward message is invalid XCM.
       * \[ id \]
       **/
      InvalidFormat: AugmentedEvent<ApiType, [U8aFixed]>;
      /**
       * Downward message is unsupported version of XCM.
       * \[ id \]
       **/
      UnsupportedVersion: AugmentedEvent<ApiType, [U8aFixed]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    democracy: {
      /**
       * A proposal_hash has been blacklisted permanently.
       **/
      Blacklisted: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A referendum has been cancelled.
       **/
      Cancelled: AugmentedEvent<ApiType, [refIndex: u32], { refIndex: u32 }>;
      /**
       * An account has delegated their vote to another account.
       **/
      Delegated: AugmentedEvent<ApiType, [who: AccountId32, target: AccountId32], { who: AccountId32, target: AccountId32 }>;
      /**
       * An external proposal has been tabled.
       **/
      ExternalTabled: AugmentedEvent<ApiType, []>;
      /**
       * Metadata for a proposal or a referendum has been cleared.
       **/
      MetadataCleared: AugmentedEvent<ApiType, [owner: PalletDemocracyMetadataOwner, hash_: H256], { owner: PalletDemocracyMetadataOwner, hash_: H256 }>;
      /**
       * Metadata for a proposal or a referendum has been set.
       **/
      MetadataSet: AugmentedEvent<ApiType, [owner: PalletDemocracyMetadataOwner, hash_: H256], { owner: PalletDemocracyMetadataOwner, hash_: H256 }>;
      /**
       * Metadata has been transferred to new owner.
       **/
      MetadataTransferred: AugmentedEvent<ApiType, [prevOwner: PalletDemocracyMetadataOwner, owner: PalletDemocracyMetadataOwner, hash_: H256], { prevOwner: PalletDemocracyMetadataOwner, owner: PalletDemocracyMetadataOwner, hash_: H256 }>;
      /**
       * A proposal has been rejected by referendum.
       **/
      NotPassed: AugmentedEvent<ApiType, [refIndex: u32], { refIndex: u32 }>;
      /**
       * A proposal has been approved by referendum.
       **/
      Passed: AugmentedEvent<ApiType, [refIndex: u32], { refIndex: u32 }>;
      /**
       * A proposal got canceled.
       **/
      ProposalCanceled: AugmentedEvent<ApiType, [propIndex: u32], { propIndex: u32 }>;
      /**
       * A motion has been proposed by a public account.
       **/
      Proposed: AugmentedEvent<ApiType, [proposalIndex: u32, deposit: u128], { proposalIndex: u32, deposit: u128 }>;
      /**
       * An account has secconded a proposal
       **/
      Seconded: AugmentedEvent<ApiType, [seconder: AccountId32, propIndex: u32], { seconder: AccountId32, propIndex: u32 }>;
      /**
       * A referendum has begun.
       **/
      Started: AugmentedEvent<ApiType, [refIndex: u32, threshold: PalletDemocracyVoteThreshold], { refIndex: u32, threshold: PalletDemocracyVoteThreshold }>;
      /**
       * A public proposal has been tabled for referendum vote.
       **/
      Tabled: AugmentedEvent<ApiType, [proposalIndex: u32, deposit: u128], { proposalIndex: u32, deposit: u128 }>;
      /**
       * An account has cancelled a previous delegation operation.
       **/
      Undelegated: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * An external proposal has been vetoed.
       **/
      Vetoed: AugmentedEvent<ApiType, [who: AccountId32, proposalHash: H256, until: u32], { who: AccountId32, proposalHash: H256, until: u32 }>;
      /**
       * An account has voted in a referendum
       **/
      Voted: AugmentedEvent<ApiType, [voter: AccountId32, refIndex: u32, vote: PalletDemocracyVoteAccountVote], { voter: AccountId32, refIndex: u32, vote: PalletDemocracyVoteAccountVote }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    dmpQueue: {
      /**
       * Downward message executed with the given outcome.
       **/
      ExecutedDownward: AugmentedEvent<ApiType, [messageHash: U8aFixed, messageId: U8aFixed, outcome: StagingXcmV3TraitsOutcome], { messageHash: U8aFixed, messageId: U8aFixed, outcome: StagingXcmV3TraitsOutcome }>;
      /**
       * Downward message is invalid XCM.
       **/
      InvalidFormat: AugmentedEvent<ApiType, [messageHash: U8aFixed], { messageHash: U8aFixed }>;
      /**
       * The maximum number of downward messages was reached.
       **/
      MaxMessagesExhausted: AugmentedEvent<ApiType, [messageHash: U8aFixed], { messageHash: U8aFixed }>;
      /**
       * Downward message is overweight and was placed in the overweight queue.
       **/
      OverweightEnqueued: AugmentedEvent<ApiType, [messageHash: U8aFixed, messageId: U8aFixed, overweightIndex: u64, requiredWeight: SpWeightsWeightV2Weight], { messageHash: U8aFixed, messageId: U8aFixed, overweightIndex: u64, requiredWeight: SpWeightsWeightV2Weight }>;
      /**
       * Downward message from the overweight queue was executed.
       **/
      OverweightServiced: AugmentedEvent<ApiType, [overweightIndex: u64, weightUsed: SpWeightsWeightV2Weight], { overweightIndex: u64, weightUsed: SpWeightsWeightV2Weight }>;
      /**
       * Downward message is unsupported version of XCM.
       **/
      UnsupportedVersion: AugmentedEvent<ApiType, [messageHash: U8aFixed], { messageHash: U8aFixed }>;
      /**
       * The weight limit for handling downward messages was reached.
       **/
      WeightExhausted: AugmentedEvent<ApiType, [messageHash: U8aFixed, messageId: U8aFixed, remainingWeight: SpWeightsWeightV2Weight, requiredWeight: SpWeightsWeightV2Weight], { messageHash: U8aFixed, messageId: U8aFixed, remainingWeight: SpWeightsWeightV2Weight, requiredWeight: SpWeightsWeightV2Weight }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    identity: {
      /**
       * A name was cleared, and the given balance returned.
       **/
      IdentityCleared: AugmentedEvent<ApiType, [who: AccountId32, deposit: u128], { who: AccountId32, deposit: u128 }>;
      /**
       * A name was removed and the given balance slashed.
       **/
      IdentityKilled: AugmentedEvent<ApiType, [who: AccountId32, deposit: u128], { who: AccountId32, deposit: u128 }>;
      /**
       * A name was set or reset (which will remove all judgements).
       **/
      IdentitySet: AugmentedEvent<ApiType, [who: AccountId32], { who: AccountId32 }>;
      /**
       * A judgement was given by a registrar.
       **/
      JudgementGiven: AugmentedEvent<ApiType, [target: AccountId32, registrarIndex: u32], { target: AccountId32, registrarIndex: u32 }>;
      /**
       * A judgement was asked from a registrar.
       **/
      JudgementRequested: AugmentedEvent<ApiType, [who: AccountId32, registrarIndex: u32], { who: AccountId32, registrarIndex: u32 }>;
      /**
       * A judgement request was retracted.
       **/
      JudgementUnrequested: AugmentedEvent<ApiType, [who: AccountId32, registrarIndex: u32], { who: AccountId32, registrarIndex: u32 }>;
      /**
       * A registrar was added.
       **/
      RegistrarAdded: AugmentedEvent<ApiType, [registrarIndex: u32], { registrarIndex: u32 }>;
      /**
       * A sub-identity was added to an identity and the deposit paid.
       **/
      SubIdentityAdded: AugmentedEvent<ApiType, [sub: AccountId32, main: AccountId32, deposit: u128], { sub: AccountId32, main: AccountId32, deposit: u128 }>;
      /**
       * A sub-identity was removed from an identity and the deposit freed.
       **/
      SubIdentityRemoved: AugmentedEvent<ApiType, [sub: AccountId32, main: AccountId32, deposit: u128], { sub: AccountId32, main: AccountId32, deposit: u128 }>;
      /**
       * A sub-identity was cleared, and the given deposit repatriated from the
       * main identity account to the sub-identity account.
       **/
      SubIdentityRevoked: AugmentedEvent<ApiType, [sub: AccountId32, main: AccountId32, deposit: u128], { sub: AccountId32, main: AccountId32, deposit: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    lottery: {
      /**
       * A new set of calls have been set!
       **/
      CallsUpdated: AugmentedEvent<ApiType, []>;
      /**
       * A lottery has been started!
       **/
      LotteryStarted: AugmentedEvent<ApiType, []>;
      /**
       * A ticket has been bought!
       **/
      TicketBought: AugmentedEvent<ApiType, [who: AccountId32, callIndex: ITuple<[u8, u8]>], { who: AccountId32, callIndex: ITuple<[u8, u8]> }>;
      /**
       * A winner has been chosen!
       **/
      Winner: AugmentedEvent<ApiType, [winner: AccountId32, lotteryBalance: u128], { winner: AccountId32, lotteryBalance: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    multisig: {
      /**
       * A multisig operation has been approved by someone.
       **/
      MultisigApproval: AugmentedEvent<ApiType, [approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed], { approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed }>;
      /**
       * A multisig operation has been cancelled.
       **/
      MultisigCancelled: AugmentedEvent<ApiType, [cancelling: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed], { cancelling: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed }>;
      /**
       * A multisig operation has been executed.
       **/
      MultisigExecuted: AugmentedEvent<ApiType, [approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed, result: Result<Null, SpRuntimeDispatchError>], { approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A new multisig operation has begun.
       **/
      NewMultisig: AugmentedEvent<ApiType, [approving: AccountId32, multisig: AccountId32, callHash: U8aFixed], { approving: AccountId32, multisig: AccountId32, callHash: U8aFixed }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    palletIndex: {
      /**
       * Task has been claimed.
       **/
      Claimed: AugmentedEvent<ApiType, [tasks: Vec<U8aFixed>, fee: u128], { tasks: Vec<U8aFixed>, fee: u128 }>;
      /**
       * New task saved.
       **/
      NewTask: AugmentedEvent<ApiType, [depositInfo: PalletIndexDepositInfo], { depositInfo: PalletIndexDepositInfo }>;
      /**
       * Worker is set.
       **/
      WorkerAdd: AugmentedEvent<ApiType, [worker: AccountId32], { worker: AccountId32 }>;
      /**
       * Worker is set.
       **/
      WorkerRemove: AugmentedEvent<ApiType, [worker: AccountId32], { worker: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    parachainSystem: {
      /**
       * Downward messages were processed using the given weight.
       **/
      DownwardMessagesProcessed: AugmentedEvent<ApiType, [weightUsed: SpWeightsWeightV2Weight, dmqHead: H256], { weightUsed: SpWeightsWeightV2Weight, dmqHead: H256 }>;
      /**
       * Some downward messages have been received and will be processed.
       **/
      DownwardMessagesReceived: AugmentedEvent<ApiType, [count: u32], { count: u32 }>;
      /**
       * An upgrade has been authorized.
       **/
      UpgradeAuthorized: AugmentedEvent<ApiType, [codeHash: H256], { codeHash: H256 }>;
      /**
       * An upward message was sent to the relay chain.
       **/
      UpwardMessageSent: AugmentedEvent<ApiType, [messageHash: Option<U8aFixed>], { messageHash: Option<U8aFixed> }>;
      /**
       * The validation function was applied as of the contained relay chain block number.
       **/
      ValidationFunctionApplied: AugmentedEvent<ApiType, [relayChainBlockNum: u32], { relayChainBlockNum: u32 }>;
      /**
       * The relay-chain aborted the upgrade process.
       **/
      ValidationFunctionDiscarded: AugmentedEvent<ApiType, []>;
      /**
       * The validation function has been scheduled to apply.
       **/
      ValidationFunctionStored: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phalaBasePool: {
      /**
       * A Nft is created to contain pool shares
       **/
      NftCreated: AugmentedEvent<ApiType, [pid: u64, cid: u32, nftId: u32, owner: AccountId32, shares: u128], { pid: u64, cid: u32, nftId: u32, owner: AccountId32, shares: u128 }>;
      /**
       * A pool contribution whitelist is added
       * 
       * - lazy operated when the first staker is added to the whitelist
       **/
      PoolWhitelistCreated: AugmentedEvent<ApiType, [pid: u64], { pid: u64 }>;
      /**
       * The pool contribution whitelist is deleted
       * 
       * - lazy operated when the last staker is removed from the whitelist
       **/
      PoolWhitelistDeleted: AugmentedEvent<ApiType, [pid: u64], { pid: u64 }>;
      /**
       * A staker is added to the pool contribution whitelist
       **/
      PoolWhitelistStakerAdded: AugmentedEvent<ApiType, [pid: u64, staker: AccountId32], { pid: u64, staker: AccountId32 }>;
      /**
       * A staker is removed from the pool contribution whitelist
       **/
      PoolWhitelistStakerRemoved: AugmentedEvent<ApiType, [pid: u64, staker: AccountId32], { pid: u64, staker: AccountId32 }>;
      /**
       * Some stake was withdrawn from a pool
       * 
       * The lock in [`Balances`](pallet_balances::pallet::Pallet) is updated to release the
       * locked stake.
       * 
       * Affected states:
       * - the stake related fields in [`Pools`]
       * - the user staking asset account
       **/
      Withdrawal: AugmentedEvent<ApiType, [pid: u64, user: AccountId32, amount: u128, shares: u128, burntShares: u128], { pid: u64, user: AccountId32, amount: u128, shares: u128, burntShares: u128 }>;
      /**
       * A withdrawal request is inserted to a queue
       * 
       * Affected states:
       * - a new item is inserted to or an old item is being replaced by the new item in the
       * withdraw queue in [`Pools`]
       **/
      WithdrawalQueued: AugmentedEvent<ApiType, [pid: u64, user: AccountId32, shares: u128, nftId: u32, asVault: Option<u64>, withdrawingNftId: u32], { pid: u64, user: AccountId32, shares: u128, nftId: u32, asVault: Option<u64>, withdrawingNftId: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phalaComputation: {
      /**
       * Benchmark Updated
       **/
      BenchmarkUpdated: AugmentedEvent<ApiType, [session: AccountId32, pInstant: u32], { session: AccountId32, pInstant: u32 }>;
      BudgetUpdated: AugmentedEvent<ApiType, [nonce: u64, budget: u128], { nonce: u64, budget: u128 }>;
      /**
       * Cool down expiration changed (in sec).
       * 
       * Indicates a change in [`CoolDownPeriod`].
       **/
      CoolDownExpirationChanged: AugmentedEvent<ApiType, [period: u64], { period: u64 }>;
      /**
       * Some internal error happened when settling a worker's ledger.
       **/
      InternalErrorWorkerSettleFailed: AugmentedEvent<ApiType, [worker: SpCoreSr25519Public], { worker: SpCoreSr25519Public }>;
      /**
       * Some internal error happened when trying to halve the subsidy
       **/
      InternalErrorWrongHalvingConfigured: AugmentedEvent<ApiType, []>;
      /**
       * Worker & session are bounded.
       * 
       * Affected states:
       * - [`SessionBindings`] for the session account is pointed to the worker
       * - [`WorkerBindings`] for the worker is pointed to the session account
       * - the worker info at [`Sessions`] is updated with `Ready` state
       **/
      SessionBound: AugmentedEvent<ApiType, [session: AccountId32, worker: SpCoreSr25519Public], { session: AccountId32, worker: SpCoreSr25519Public }>;
      /**
       * Worker settled successfully.
       * 
       * It results in the v in [`Sessions`] being updated. It also indicates the downstream
       * stake pool has received the computing reward (payout), and the treasury has received the
       * tax.
       **/
      SessionSettled: AugmentedEvent<ApiType, [session: AccountId32, vBits: u128, payoutBits: u128], { session: AccountId32, vBits: u128, payoutBits: u128 }>;
      /**
       * A session settlement was dropped because the on-chain version is more up-to-date.
       * 
       * This is a temporary walk-around of the computing staking design. Will be fixed by
       * StakePool v2.
       **/
      SessionSettlementDropped: AugmentedEvent<ApiType, [session: AccountId32, v: u128, payout: u128], { session: AccountId32, v: u128, payout: u128 }>;
      /**
       * Worker & worker are unbound.
       * 
       * Affected states:
       * - [`SessionBindings`] for the session account is removed
       * - [`WorkerBindings`] for the worker is removed
       **/
      SessionUnbound: AugmentedEvent<ApiType, [session: AccountId32, worker: SpCoreSr25519Public], { session: AccountId32, worker: SpCoreSr25519Public }>;
      /**
       * Block subsidy halved by 25%.
       * 
       * This event will be followed by a [`TokenomicParametersChanged`](#variant.TokenomicParametersChanged)
       * event indicating the change of the block subsidy budget in the parameter.
       **/
      SubsidyBudgetHalved: AugmentedEvent<ApiType, []>;
      /**
       * Tokenomic parameter changed.
       * 
       * Affected states:
       * - [`TokenomicParameters`] is updated.
       **/
      TokenomicParametersChanged: AugmentedEvent<ApiType, []>;
      /**
       * Worker enters unresponsive state.
       * 
       * Affected states:
       * - the worker info at [`Sessions`] is updated from `WorkerIdle` to `WorkerUnresponsive`
       **/
      WorkerEnterUnresponsive: AugmentedEvent<ApiType, [session: AccountId32], { session: AccountId32 }>;
      /**
       * Worker returns to responsive state.
       * 
       * Affected states:
       * - the worker info at [`Sessions`] is updated from `WorkerUnresponsive` to `WorkerIdle`
       **/
      WorkerExitUnresponsive: AugmentedEvent<ApiType, [session: AccountId32], { session: AccountId32 }>;
      /**
       * Worker is reclaimed, with its slash settled.
       **/
      WorkerReclaimed: AugmentedEvent<ApiType, [session: AccountId32, originalStake: u128, slashed: u128], { session: AccountId32, originalStake: u128, slashed: u128 }>;
      /**
       * A worker starts computing.
       * 
       * Affected states:
       * - the worker info at [`Sessions`] is updated with `WorkerIdle` state
       * - [`NextSessionId`] for the session is incremented
       * - [`Stakes`] for the session is updated
       * - [`OnlineWorkers`] is incremented
       **/
      WorkerStarted: AugmentedEvent<ApiType, [session: AccountId32, initV: u128, initP: u32], { session: AccountId32, initV: u128, initP: u32 }>;
      /**
       * Worker stops computing.
       * 
       * Affected states:
       * - the worker info at [`Sessions`] is updated with `WorkerCoolingDown` state
       * - [`OnlineWorkers`] is decremented
       **/
      WorkerStopped: AugmentedEvent<ApiType, [session: AccountId32], { session: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phalaPhatContracts: {
      ClusterCreated: AugmentedEvent<ApiType, [cluster: H256, systemContract: H256], { cluster: H256, systemContract: H256 }>;
      ClusterDeployed: AugmentedEvent<ApiType, [cluster: H256, pubkey: SpCoreSr25519Public, worker: SpCoreSr25519Public], { cluster: H256, pubkey: SpCoreSr25519Public, worker: SpCoreSr25519Public }>;
      ClusterDeploymentFailed: AugmentedEvent<ApiType, [cluster: H256, worker: SpCoreSr25519Public], { cluster: H256, worker: SpCoreSr25519Public }>;
      ClusterDestroyed: AugmentedEvent<ApiType, [cluster: H256], { cluster: H256 }>;
      ClusterPubkeyAvailable: AugmentedEvent<ApiType, [cluster: H256, pubkey: SpCoreSr25519Public], { cluster: H256, pubkey: SpCoreSr25519Public }>;
      ContractPubkeyAvailable: AugmentedEvent<ApiType, [contract: H256, cluster: H256, pubkey: SpCoreSr25519Public], { contract: H256, cluster: H256, pubkey: SpCoreSr25519Public }>;
      Instantiated: AugmentedEvent<ApiType, [contract: H256, cluster: H256, deployer: H256], { contract: H256, cluster: H256, deployer: H256 }>;
      Instantiating: AugmentedEvent<ApiType, [contract: H256, cluster: H256, deployer: AccountId32], { contract: H256, cluster: H256, deployer: AccountId32 }>;
      Transfered: AugmentedEvent<ApiType, [cluster: H256, account: H256, amount: u128], { cluster: H256, account: H256, amount: u128 }>;
      WorkerAddedToCluster: AugmentedEvent<ApiType, [worker: SpCoreSr25519Public, cluster: H256], { worker: SpCoreSr25519Public, cluster: H256 }>;
      WorkerRemovedFromCluster: AugmentedEvent<ApiType, [worker: SpCoreSr25519Public, cluster: H256], { worker: SpCoreSr25519Public, cluster: H256 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phalaPhatTokenomic: {
      ContractDepositChanged: AugmentedEvent<ApiType, [cluster: Option<H256>, contract: H256, deposit: u128], { cluster: Option<H256>, contract: H256, deposit: u128 }>;
      UserStakeChanged: AugmentedEvent<ApiType, [cluster: Option<H256>, account: AccountId32, contract: H256, stake: u128], { cluster: Option<H256>, account: AccountId32, contract: H256, stake: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phalaRegistry: {
      /**
       * A new Gatekeeper is enabled on the blockchain
       **/
      GatekeeperAdded: AugmentedEvent<ApiType, [pubkey: SpCoreSr25519Public], { pubkey: SpCoreSr25519Public }>;
      GatekeeperLaunched: AugmentedEvent<ApiType, []>;
      GatekeeperRemoved: AugmentedEvent<ApiType, [pubkey: SpCoreSr25519Public], { pubkey: SpCoreSr25519Public }>;
      InitialScoreSet: AugmentedEvent<ApiType, [pubkey: SpCoreSr25519Public, initScore: u32], { pubkey: SpCoreSr25519Public, initScore: u32 }>;
      MasterKeyRotated: AugmentedEvent<ApiType, [rotationId: u64, masterPubkey: SpCoreSr25519Public], { rotationId: u64, masterPubkey: SpCoreSr25519Public }>;
      MasterKeyRotationFailed: AugmentedEvent<ApiType, [rotationLock: Option<u64>, gatekeeperRotationId: u64], { rotationLock: Option<u64>, gatekeeperRotationId: u64 }>;
      MinimumPRuntimeVersionChangedTo: AugmentedEvent<ApiType, [u32, u32, u32]>;
      PRuntimeConsensusVersionChangedTo: AugmentedEvent<ApiType, [u32]>;
      WorkerAdded: AugmentedEvent<ApiType, [pubkey: SpCoreSr25519Public, attestationProvider: Option<PhalaTypesAttestationProvider>, confidenceLevel: u8], { pubkey: SpCoreSr25519Public, attestationProvider: Option<PhalaTypesAttestationProvider>, confidenceLevel: u8 }>;
      WorkerUpdated: AugmentedEvent<ApiType, [pubkey: SpCoreSr25519Public, attestationProvider: Option<PhalaTypesAttestationProvider>, confidenceLevel: u8], { pubkey: SpCoreSr25519Public, attestationProvider: Option<PhalaTypesAttestationProvider>, confidenceLevel: u8 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phalaStakePool: {
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phalaStakePoolv2: {
      /**
       * Someone contributed to a pool
       * 
       * Affected states:
       * - the stake related fields in [`Pools`]
       * - the user W-PHA balance reduced
       * - the user recive ad share NFT once contribution succeeded
       * - when there was any request in the withdraw queue, the action may trigger withdrawals
       * ([`Withdrawal`](#variant.Withdrawal) event)
       **/
      Contribution: AugmentedEvent<ApiType, [pid: u64, user: AccountId32, amount: u128, shares: u128, asVault: Option<u64>], { pid: u64, user: AccountId32, amount: u128, shares: u128, asVault: Option<u64> }>;
      /**
       * Owner rewards were withdrawn by pool owner
       * 
       * Affected states:
       * - the stake related fields in [`Pools`]
       * - the owner asset account
       **/
      OwnerRewardsWithdrawn: AugmentedEvent<ApiType, [pid: u64, user: AccountId32, amount: u128], { pid: u64, user: AccountId32, amount: u128 }>;
      /**
       * The stake capacity of the pool is updated
       * 
       * Affected states:
       * - the `cap` field in [`Pools`] is updated
       **/
      PoolCapacitySet: AugmentedEvent<ApiType, [pid: u64, cap: u128], { pid: u64, cap: u128 }>;
      /**
       * The commission of a pool is updated
       * 
       * The commission ratio is represented by an integer. The real value is
       * `commission / 1_000_000u32`.
       * 
       * Affected states:
       * - the `payout_commission` field in [`Pools`] is updated
       **/
      PoolCommissionSet: AugmentedEvent<ApiType, [pid: u64, commission: u32], { pid: u64, commission: u32 }>;
      /**
       * A stake pool is created by `owner`
       * 
       * Affected states:
       * - a new entry in [`Pools`] with the pid
       **/
      PoolCreated: AugmentedEvent<ApiType, [owner: AccountId32, pid: u64, cid: u32, poolAccountId: AccountId32], { owner: AccountId32, pid: u64, cid: u32, poolAccountId: AccountId32 }>;
      /**
       * The pool received a slash event from one of its workers (currently disabled)
       * 
       * The slash is accured to the pending slash accumulator.
       **/
      PoolSlashed: AugmentedEvent<ApiType, [pid: u64, amount: u128], { pid: u64, amount: u128 }>;
      /**
       * A worker is added to the pool
       * 
       * Affected states:
       * - the `worker` is added to the vector `workers` in [`Pools`]
       * - the worker in the [`WorkerAssignments`] is pointed to `pid`
       * - the worker-session binding is updated in `computation` pallet ([`WorkerBindings`](computation::pallet::WorkerBindings),
       * [`SessionBindings`](computation::pallet::SessionBindings))
       **/
      PoolWorkerAdded: AugmentedEvent<ApiType, [pid: u64, worker: SpCoreSr25519Public, session: AccountId32], { pid: u64, worker: SpCoreSr25519Public, session: AccountId32 }>;
      /**
       * A worker is removed from a pool.
       * 
       * Affected states:
       * - the worker item in [`WorkerAssignments`] is removed
       * - the worker is removed from the [`Pools`] item
       **/
      PoolWorkerRemoved: AugmentedEvent<ApiType, [pid: u64, worker: SpCoreSr25519Public], { pid: u64, worker: SpCoreSr25519Public }>;
      /**
       * Some reward is dismissed because the amount is too tiny (dust)
       * 
       * There's no affected state.
       **/
      RewardDismissedDust: AugmentedEvent<ApiType, [pid: u64, amount: u128], { pid: u64, amount: u128 }>;
      /**
       * Some reward is dismissed because the pool doesn't have any share
       * 
       * There's no affected state.
       **/
      RewardDismissedNoShare: AugmentedEvent<ApiType, [pid: u64, amount: u128], { pid: u64, amount: u128 }>;
      /**
       * Some reward is dismissed because the worker is no longer bound to a pool
       * 
       * There's no affected state.
       **/
      RewardDismissedNotInPool: AugmentedEvent<ApiType, [worker: SpCoreSr25519Public, amount: u128], { worker: SpCoreSr25519Public, amount: u128 }>;
      /**
       * The amount of reward that distributed to owner and stakers
       **/
      RewardReceived: AugmentedEvent<ApiType, [pid: u64, toOwner: u128, toStakers: u128], { pid: u64, toOwner: u128, toStakers: u128 }>;
      /**
       * Some to-distribute reward is dismissed because the amount is too tiny (dust)
       * 
       * There's no affected state.
       **/
      RewardToDistributionDismissedDust: AugmentedEvent<ApiType, [pid: u64, amount: u128], { pid: u64, amount: u128 }>;
      /**
       * Some to-distribute reward is dismissed because the amount is too tiny (dust)
       * 
       * There's no affected state.
       **/
      RewardToOwnerDismissedDust: AugmentedEvent<ApiType, [pid: u64, amount: u128], { pid: u64, amount: u128 }>;
      /**
       * Some slash is actually settled to a contributor (currently disabled)
       **/
      SlashSettled: AugmentedEvent<ApiType, [pid: u64, user: AccountId32, amount: u128], { pid: u64, user: AccountId32, amount: u128 }>;
      /**
       * A worker is reclaimed from the pool
       **/
      WorkerReclaimed: AugmentedEvent<ApiType, [pid: u64, worker: SpCoreSr25519Public], { pid: u64, worker: SpCoreSr25519Public }>;
      /**
       * The amount of stakes for a worker to start computing
       **/
      WorkingStarted: AugmentedEvent<ApiType, [pid: u64, worker: SpCoreSr25519Public, amount: u128], { pid: u64, worker: SpCoreSr25519Public, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phalaVault: {
      /**
       * Someone contributed to a vault
       * 
       * Affected states:
       * - the stake related fields in [`Pools`]
       * - the user W-PHA balance reduced
       * - the user recive ad share NFT once contribution succeeded
       * - when there was any request in the withdraw queue, the action may trigger withdrawals
       * ([`Withdrawal`](#variant.Withdrawal) event)
       **/
      Contribution: AugmentedEvent<ApiType, [pid: u64, user: AccountId32, amount: u128, shares: u128], { pid: u64, user: AccountId32, amount: u128, shares: u128 }>;
      ForceShutdown: AugmentedEvent<ApiType, [pid: u64, reason: PhalaPalletsComputeVaultPalletForceShutdownReason], { pid: u64, reason: PhalaPalletsComputeVaultPalletForceShutdownReason }>;
      /**
       * Owner shares is claimed by pool owner
       * Affected states:
       * - the shares related fields in [`Pools`]
       * - the nft related storages in rmrk and pallet unique
       **/
      OwnerSharesClaimed: AugmentedEvent<ApiType, [pid: u64, user: AccountId32, shares: u128], { pid: u64, user: AccountId32, shares: u128 }>;
      /**
       * Additional owner shares are mint into the pool
       * 
       * Affected states:
       * - the shares related fields in [`Pools`]
       * - last_share_price_checkpoint in [`Pools`]
       **/
      OwnerSharesGained: AugmentedEvent<ApiType, [pid: u64, shares: u128, checkoutPrice: u128], { pid: u64, shares: u128, checkoutPrice: u128 }>;
      /**
       * A vault is created by `owner`
       * 
       * Affected states:
       * - a new entry in [`Pools`] with the pid
       **/
      PoolCreated: AugmentedEvent<ApiType, [owner: AccountId32, pid: u64, cid: u32, poolAccountId: AccountId32], { owner: AccountId32, pid: u64, cid: u32, poolAccountId: AccountId32 }>;
      /**
       * The commission of a vault is updated
       * 
       * The commission ratio is represented by an integer. The real value is
       * `commission / 1_000_000u32`.
       * 
       * Affected states:
       * - the `commission` field in [`Pools`] is updated
       **/
      VaultCommissionSet: AugmentedEvent<ApiType, [pid: u64, commission: u32], { pid: u64, commission: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phalaWrappedBalances: {
      /**
       * Some dust stake is removed
       * 
       * Triggered when the remaining stake of a user is too small after withdrawal or slash.
       * 
       * Affected states:
       * - the balance of the locking ledger of the contributor at [`StakeLedger`] is set to 0
       * - the user's dust stake is moved to treasury
       **/
      DustRemoved: AugmentedEvent<ApiType, [user: AccountId32, amount: u128], { user: AccountId32, amount: u128 }>;
      Unwrapped: AugmentedEvent<ApiType, [user: AccountId32, amount: u128], { user: AccountId32, amount: u128 }>;
      Voted: AugmentedEvent<ApiType, [user: AccountId32, voteId: u32, ayeAmount: u128, nayAmount: u128], { user: AccountId32, voteId: u32, ayeAmount: u128, nayAmount: u128 }>;
      Wrapped: AugmentedEvent<ApiType, [user: AccountId32, amount: u128], { user: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phragmenElection: {
      /**
       * A candidate was slashed by amount due to failing to obtain a seat as member or
       * runner-up.
       * 
       * Note that old members and runners-up are also candidates.
       **/
      CandidateSlashed: AugmentedEvent<ApiType, [candidate: AccountId32, amount: u128], { candidate: AccountId32, amount: u128 }>;
      /**
       * Internal error happened while trying to perform election.
       **/
      ElectionError: AugmentedEvent<ApiType, []>;
      /**
       * No (or not enough) candidates existed for this round. This is different from
       * `NewTerm(\[\])`. See the description of `NewTerm`.
       **/
      EmptyTerm: AugmentedEvent<ApiType, []>;
      /**
       * A member has been removed. This should always be followed by either `NewTerm` or
       * `EmptyTerm`.
       **/
      MemberKicked: AugmentedEvent<ApiType, [member: AccountId32], { member: AccountId32 }>;
      /**
       * A new term with new_members. This indicates that enough candidates existed to run
       * the election, not that enough have has been elected. The inner value must be examined
       * for this purpose. A `NewTerm(\[\])` indicates that some candidates got their bond
       * slashed and none were elected, whilst `EmptyTerm` means that no candidates existed to
       * begin with.
       **/
      NewTerm: AugmentedEvent<ApiType, [newMembers: Vec<ITuple<[AccountId32, u128]>>], { newMembers: Vec<ITuple<[AccountId32, u128]>> }>;
      /**
       * Someone has renounced their candidacy.
       **/
      Renounced: AugmentedEvent<ApiType, [candidate: AccountId32], { candidate: AccountId32 }>;
      /**
       * A seat holder was slashed by amount by being forcefully removed from the set.
       **/
      SeatHolderSlashed: AugmentedEvent<ApiType, [seatHolder: AccountId32, amount: u128], { seatHolder: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    polkadotXcm: {
      /**
       * Some assets have been claimed from an asset trap
       **/
      AssetsClaimed: AugmentedEvent<ApiType, [hash_: H256, origin: StagingXcmV3MultiLocation, assets: StagingXcmVersionedMultiAssets], { hash_: H256, origin: StagingXcmV3MultiLocation, assets: StagingXcmVersionedMultiAssets }>;
      /**
       * Some assets have been placed in an asset trap.
       **/
      AssetsTrapped: AugmentedEvent<ApiType, [hash_: H256, origin: StagingXcmV3MultiLocation, assets: StagingXcmVersionedMultiAssets], { hash_: H256, origin: StagingXcmV3MultiLocation, assets: StagingXcmVersionedMultiAssets }>;
      /**
       * Execution of an XCM message was attempted.
       **/
      Attempted: AugmentedEvent<ApiType, [outcome: StagingXcmV3TraitsOutcome], { outcome: StagingXcmV3TraitsOutcome }>;
      /**
       * Fees were paid from a location for an operation (often for using `SendXcm`).
       **/
      FeesPaid: AugmentedEvent<ApiType, [paying: StagingXcmV3MultiLocation, fees: StagingXcmV3MultiassetMultiAssets], { paying: StagingXcmV3MultiLocation, fees: StagingXcmV3MultiassetMultiAssets }>;
      /**
       * Expected query response has been received but the querier location of the response does
       * not match the expected. The query remains registered for a later, valid, response to
       * be received and acted upon.
       **/
      InvalidQuerier: AugmentedEvent<ApiType, [origin: StagingXcmV3MultiLocation, queryId: u64, expectedQuerier: StagingXcmV3MultiLocation, maybeActualQuerier: Option<StagingXcmV3MultiLocation>], { origin: StagingXcmV3MultiLocation, queryId: u64, expectedQuerier: StagingXcmV3MultiLocation, maybeActualQuerier: Option<StagingXcmV3MultiLocation> }>;
      /**
       * Expected query response has been received but the expected querier location placed in
       * storage by this runtime previously cannot be decoded. The query remains registered.
       * 
       * This is unexpected (since a location placed in storage in a previously executing
       * runtime should be readable prior to query timeout) and dangerous since the possibly
       * valid response will be dropped. Manual governance intervention is probably going to be
       * needed.
       **/
      InvalidQuerierVersion: AugmentedEvent<ApiType, [origin: StagingXcmV3MultiLocation, queryId: u64], { origin: StagingXcmV3MultiLocation, queryId: u64 }>;
      /**
       * Expected query response has been received but the origin location of the response does
       * not match that expected. The query remains registered for a later, valid, response to
       * be received and acted upon.
       **/
      InvalidResponder: AugmentedEvent<ApiType, [origin: StagingXcmV3MultiLocation, queryId: u64, expectedLocation: Option<StagingXcmV3MultiLocation>], { origin: StagingXcmV3MultiLocation, queryId: u64, expectedLocation: Option<StagingXcmV3MultiLocation> }>;
      /**
       * Expected query response has been received but the expected origin location placed in
       * storage by this runtime previously cannot be decoded. The query remains registered.
       * 
       * This is unexpected (since a location placed in storage in a previously executing
       * runtime should be readable prior to query timeout) and dangerous since the possibly
       * valid response will be dropped. Manual governance intervention is probably going to be
       * needed.
       **/
      InvalidResponderVersion: AugmentedEvent<ApiType, [origin: StagingXcmV3MultiLocation, queryId: u64], { origin: StagingXcmV3MultiLocation, queryId: u64 }>;
      /**
       * Query response has been received and query is removed. The registered notification has
       * been dispatched and executed successfully.
       **/
      Notified: AugmentedEvent<ApiType, [queryId: u64, palletIndex: u8, callIndex: u8], { queryId: u64, palletIndex: u8, callIndex: u8 }>;
      /**
       * Query response has been received and query is removed. The dispatch was unable to be
       * decoded into a `Call`; this might be due to dispatch function having a signature which
       * is not `(origin, QueryId, Response)`.
       **/
      NotifyDecodeFailed: AugmentedEvent<ApiType, [queryId: u64, palletIndex: u8, callIndex: u8], { queryId: u64, palletIndex: u8, callIndex: u8 }>;
      /**
       * Query response has been received and query is removed. There was a general error with
       * dispatching the notification call.
       **/
      NotifyDispatchError: AugmentedEvent<ApiType, [queryId: u64, palletIndex: u8, callIndex: u8], { queryId: u64, palletIndex: u8, callIndex: u8 }>;
      /**
       * Query response has been received and query is removed. The registered notification
       * could not be dispatched because the dispatch weight is greater than the maximum weight
       * originally budgeted by this runtime for the query result.
       **/
      NotifyOverweight: AugmentedEvent<ApiType, [queryId: u64, palletIndex: u8, callIndex: u8, actualWeight: SpWeightsWeightV2Weight, maxBudgetedWeight: SpWeightsWeightV2Weight], { queryId: u64, palletIndex: u8, callIndex: u8, actualWeight: SpWeightsWeightV2Weight, maxBudgetedWeight: SpWeightsWeightV2Weight }>;
      /**
       * A given location which had a version change subscription was dropped owing to an error
       * migrating the location to our new XCM format.
       **/
      NotifyTargetMigrationFail: AugmentedEvent<ApiType, [location: StagingXcmVersionedMultiLocation, queryId: u64], { location: StagingXcmVersionedMultiLocation, queryId: u64 }>;
      /**
       * A given location which had a version change subscription was dropped owing to an error
       * sending the notification to it.
       **/
      NotifyTargetSendFail: AugmentedEvent<ApiType, [location: StagingXcmV3MultiLocation, queryId: u64, error: StagingXcmV3TraitsError], { location: StagingXcmV3MultiLocation, queryId: u64, error: StagingXcmV3TraitsError }>;
      /**
       * Query response has been received and is ready for taking with `take_response`. There is
       * no registered notification call.
       **/
      ResponseReady: AugmentedEvent<ApiType, [queryId: u64, response: StagingXcmV3Response], { queryId: u64, response: StagingXcmV3Response }>;
      /**
       * Received query response has been read and removed.
       **/
      ResponseTaken: AugmentedEvent<ApiType, [queryId: u64], { queryId: u64 }>;
      /**
       * A XCM message was sent.
       **/
      Sent: AugmentedEvent<ApiType, [origin: StagingXcmV3MultiLocation, destination: StagingXcmV3MultiLocation, message: StagingXcmV3Xcm, messageId: U8aFixed], { origin: StagingXcmV3MultiLocation, destination: StagingXcmV3MultiLocation, message: StagingXcmV3Xcm, messageId: U8aFixed }>;
      /**
       * The supported version of a location has been changed. This might be through an
       * automatic notification or a manual intervention.
       **/
      SupportedVersionChanged: AugmentedEvent<ApiType, [location: StagingXcmV3MultiLocation, version: u32], { location: StagingXcmV3MultiLocation, version: u32 }>;
      /**
       * Query response received which does not match a registered query. This may be because a
       * matching query was never registered, it may be because it is a duplicate response, or
       * because the query timed out.
       **/
      UnexpectedResponse: AugmentedEvent<ApiType, [origin: StagingXcmV3MultiLocation, queryId: u64], { origin: StagingXcmV3MultiLocation, queryId: u64 }>;
      /**
       * An XCM version change notification message has been attempted to be sent.
       * 
       * The cost of sending it (borne by the chain) is included.
       **/
      VersionChangeNotified: AugmentedEvent<ApiType, [destination: StagingXcmV3MultiLocation, result: u32, cost: StagingXcmV3MultiassetMultiAssets, messageId: U8aFixed], { destination: StagingXcmV3MultiLocation, result: u32, cost: StagingXcmV3MultiassetMultiAssets, messageId: U8aFixed }>;
      /**
       * We have requested that a remote chain send us XCM version change notifications.
       **/
      VersionNotifyRequested: AugmentedEvent<ApiType, [destination: StagingXcmV3MultiLocation, cost: StagingXcmV3MultiassetMultiAssets, messageId: U8aFixed], { destination: StagingXcmV3MultiLocation, cost: StagingXcmV3MultiassetMultiAssets, messageId: U8aFixed }>;
      /**
       * A remote has requested XCM version change notification from us and we have honored it.
       * A version information message is sent to them and its cost is included.
       **/
      VersionNotifyStarted: AugmentedEvent<ApiType, [destination: StagingXcmV3MultiLocation, cost: StagingXcmV3MultiassetMultiAssets, messageId: U8aFixed], { destination: StagingXcmV3MultiLocation, cost: StagingXcmV3MultiassetMultiAssets, messageId: U8aFixed }>;
      /**
       * We have requested that a remote chain stops sending us XCM version change
       * notifications.
       **/
      VersionNotifyUnrequested: AugmentedEvent<ApiType, [destination: StagingXcmV3MultiLocation, cost: StagingXcmV3MultiassetMultiAssets, messageId: U8aFixed], { destination: StagingXcmV3MultiLocation, cost: StagingXcmV3MultiassetMultiAssets, messageId: U8aFixed }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    preimage: {
      /**
       * A preimage has ben cleared.
       **/
      Cleared: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * A preimage has been noted.
       **/
      Noted: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * A preimage has been requested.
       **/
      Requested: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    proxy: {
      /**
       * An announcement was placed to make a call in the future.
       **/
      Announced: AugmentedEvent<ApiType, [real: AccountId32, proxy: AccountId32, callHash: H256], { real: AccountId32, proxy: AccountId32, callHash: H256 }>;
      /**
       * A proxy was added.
       **/
      ProxyAdded: AugmentedEvent<ApiType, [delegator: AccountId32, delegatee: AccountId32, proxyType: PhalaParachainRuntimeProxyType, delay: u32], { delegator: AccountId32, delegatee: AccountId32, proxyType: PhalaParachainRuntimeProxyType, delay: u32 }>;
      /**
       * A proxy was executed correctly, with the given.
       **/
      ProxyExecuted: AugmentedEvent<ApiType, [result: Result<Null, SpRuntimeDispatchError>], { result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A proxy was removed.
       **/
      ProxyRemoved: AugmentedEvent<ApiType, [delegator: AccountId32, delegatee: AccountId32, proxyType: PhalaParachainRuntimeProxyType, delay: u32], { delegator: AccountId32, delegatee: AccountId32, proxyType: PhalaParachainRuntimeProxyType, delay: u32 }>;
      /**
       * A pure account has been created by new proxy with given
       * disambiguation index and proxy type.
       **/
      PureCreated: AugmentedEvent<ApiType, [pure: AccountId32, who: AccountId32, proxyType: PhalaParachainRuntimeProxyType, disambiguationIndex: u16], { pure: AccountId32, who: AccountId32, proxyType: PhalaParachainRuntimeProxyType, disambiguationIndex: u16 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    rmrkCore: {
      CollectionCreated: AugmentedEvent<ApiType, [issuer: AccountId32, collectionId: u32], { issuer: AccountId32, collectionId: u32 }>;
      CollectionDestroyed: AugmentedEvent<ApiType, [issuer: AccountId32, collectionId: u32], { issuer: AccountId32, collectionId: u32 }>;
      CollectionLocked: AugmentedEvent<ApiType, [issuer: AccountId32, collectionId: u32], { issuer: AccountId32, collectionId: u32 }>;
      IssuerChanged: AugmentedEvent<ApiType, [oldIssuer: AccountId32, newIssuer: AccountId32, collectionId: u32], { oldIssuer: AccountId32, newIssuer: AccountId32, collectionId: u32 }>;
      NFTAccepted: AugmentedEvent<ApiType, [sender: AccountId32, recipient: RmrkTraitsNftAccountIdOrCollectionNftTuple, collectionId: u32, nftId: u32], { sender: AccountId32, recipient: RmrkTraitsNftAccountIdOrCollectionNftTuple, collectionId: u32, nftId: u32 }>;
      NFTBurned: AugmentedEvent<ApiType, [owner: AccountId32, collectionId: u32, nftId: u32], { owner: AccountId32, collectionId: u32, nftId: u32 }>;
      NftMinted: AugmentedEvent<ApiType, [owner: RmrkTraitsNftAccountIdOrCollectionNftTuple, collectionId: u32, nftId: u32], { owner: RmrkTraitsNftAccountIdOrCollectionNftTuple, collectionId: u32, nftId: u32 }>;
      NFTRejected: AugmentedEvent<ApiType, [sender: AccountId32, collectionId: u32, nftId: u32], { sender: AccountId32, collectionId: u32, nftId: u32 }>;
      NFTSent: AugmentedEvent<ApiType, [sender: AccountId32, recipient: RmrkTraitsNftAccountIdOrCollectionNftTuple, collectionId: u32, nftId: u32, approvalRequired: bool], { sender: AccountId32, recipient: RmrkTraitsNftAccountIdOrCollectionNftTuple, collectionId: u32, nftId: u32, approvalRequired: bool }>;
      PrioritySet: AugmentedEvent<ApiType, [collectionId: u32, nftId: u32], { collectionId: u32, nftId: u32 }>;
      PropertiesRemoved: AugmentedEvent<ApiType, [collectionId: u32, maybeNftId: Option<u32>], { collectionId: u32, maybeNftId: Option<u32> }>;
      PropertyRemoved: AugmentedEvent<ApiType, [collectionId: u32, maybeNftId: Option<u32>, key: Bytes], { collectionId: u32, maybeNftId: Option<u32>, key: Bytes }>;
      PropertySet: AugmentedEvent<ApiType, [collectionId: u32, maybeNftId: Option<u32>, key: Bytes, value: Bytes], { collectionId: u32, maybeNftId: Option<u32>, key: Bytes, value: Bytes }>;
      ResourceAccepted: AugmentedEvent<ApiType, [nftId: u32, resourceId: u32, collectionId: u32], { nftId: u32, resourceId: u32, collectionId: u32 }>;
      ResourceAdded: AugmentedEvent<ApiType, [nftId: u32, resourceId: u32, collectionId: u32], { nftId: u32, resourceId: u32, collectionId: u32 }>;
      ResourceRemoval: AugmentedEvent<ApiType, [nftId: u32, resourceId: u32, collectionId: u32], { nftId: u32, resourceId: u32, collectionId: u32 }>;
      ResourceRemovalAccepted: AugmentedEvent<ApiType, [nftId: u32, resourceId: u32, collectionId: u32], { nftId: u32, resourceId: u32, collectionId: u32 }>;
      ResourceReplaced: AugmentedEvent<ApiType, [nftId: u32, resourceId: u32, collectionId: u32], { nftId: u32, resourceId: u32, collectionId: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    rmrkEquip: {
      BaseCreated: AugmentedEvent<ApiType, [issuer: AccountId32, baseId: u32], { issuer: AccountId32, baseId: u32 }>;
      BaseIssuerChanged: AugmentedEvent<ApiType, [oldIssuer: AccountId32, newIssuer: AccountId32, baseId: u32], { oldIssuer: AccountId32, newIssuer: AccountId32, baseId: u32 }>;
      EquippablesUpdated: AugmentedEvent<ApiType, [baseId: u32, slotId: u32], { baseId: u32, slotId: u32 }>;
      SlotEquipped: AugmentedEvent<ApiType, [itemCollection: u32, itemNft: u32, baseId: u32, slotId: u32], { itemCollection: u32, itemNft: u32, baseId: u32, slotId: u32 }>;
      SlotUnequipped: AugmentedEvent<ApiType, [itemCollection: u32, itemNft: u32, baseId: u32, slotId: u32], { itemCollection: u32, itemNft: u32, baseId: u32, slotId: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    rmrkMarket: {
      /**
       * Market fee paid to marketplace owner
       **/
      MarketFeePaid: AugmentedEvent<ApiType, [sender: AccountId32, marketplaceOwner: AccountId32, collectionId: u32, nftId: u32, amount: u128], { sender: AccountId32, marketplaceOwner: AccountId32, collectionId: u32, nftId: u32, amount: u128 }>;
      /**
       * Offer was accepted
       **/
      OfferAccepted: AugmentedEvent<ApiType, [owner: AccountId32, buyer: AccountId32, collectionId: u32, nftId: u32], { owner: AccountId32, buyer: AccountId32, collectionId: u32, nftId: u32 }>;
      /**
       * Offer was placed on a token
       **/
      OfferPlaced: AugmentedEvent<ApiType, [offerer: AccountId32, collectionId: u32, nftId: u32, price: u128], { offerer: AccountId32, collectionId: u32, nftId: u32, price: u128 }>;
      /**
       * Offer was withdrawn
       **/
      OfferWithdrawn: AugmentedEvent<ApiType, [sender: AccountId32, collectionId: u32, nftId: u32], { sender: AccountId32, collectionId: u32, nftId: u32 }>;
      /**
       * Royalty fee paid to royalty owner
       **/
      RoyaltyFeePaid: AugmentedEvent<ApiType, [sender: AccountId32, royaltyOwner: AccountId32, collectionId: u32, nftId: u32, amount: u128], { sender: AccountId32, royaltyOwner: AccountId32, collectionId: u32, nftId: u32, amount: u128 }>;
      /**
       * Token listed on Marketplace
       **/
      TokenListed: AugmentedEvent<ApiType, [owner: AccountId32, collectionId: u32, nftId: u32, price: u128], { owner: AccountId32, collectionId: u32, nftId: u32, price: u128 }>;
      /**
       * The price for a token was updated
       **/
      TokenPriceUpdated: AugmentedEvent<ApiType, [owner: AccountId32, collectionId: u32, nftId: u32, price: Option<u128>], { owner: AccountId32, collectionId: u32, nftId: u32, price: Option<u128> }>;
      /**
       * Token was sold to a new owner
       **/
      TokenSold: AugmentedEvent<ApiType, [owner: AccountId32, buyer: AccountId32, collectionId: u32, nftId: u32, price: u128], { owner: AccountId32, buyer: AccountId32, collectionId: u32, nftId: u32, price: u128 }>;
      /**
       * Token unlisted on Marketplace
       **/
      TokenUnlisted: AugmentedEvent<ApiType, [owner: AccountId32, collectionId: u32, nftId: u32], { owner: AccountId32, collectionId: u32, nftId: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    scheduler: {
      /**
       * The call for the provided hash was not found so the task has been aborted.
       **/
      CallUnavailable: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>], { task: ITuple<[u32, u32]>, id: Option<U8aFixed> }>;
      /**
       * Canceled some task.
       **/
      Canceled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32, index: u32 }>;
      /**
       * Dispatched some task.
       **/
      Dispatched: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>, result: Result<Null, SpRuntimeDispatchError>], { task: ITuple<[u32, u32]>, id: Option<U8aFixed>, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * The given task was unable to be renewed since the agenda is full at that block.
       **/
      PeriodicFailed: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>], { task: ITuple<[u32, u32]>, id: Option<U8aFixed> }>;
      /**
       * The given task can never be executed since it is overweight.
       **/
      PermanentlyOverweight: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>], { task: ITuple<[u32, u32]>, id: Option<U8aFixed> }>;
      /**
       * Scheduled some task.
       **/
      Scheduled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32, index: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    session: {
      /**
       * New session has happened. Note that the argument is the session index, not the
       * block number as the type might suggest.
       **/
      NewSession: AugmentedEvent<ApiType, [sessionIndex: u32], { sessionIndex: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sygmaAccessSegregator: {
      /**
       * Extrinsic access grant to someone
       * args: [pallet_index, extrinsic_name, who]
       **/
      AccessGranted: AugmentedEvent<ApiType, [palletIndex: u8, extrinsicName: Bytes, who: AccountId32], { palletIndex: u8, extrinsicName: Bytes, who: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sygmaBasicFeeHandler: {
      /**
       * Fee set for a specific asset
       * args: [domain, asset, amount]
       **/
      FeeSet: AugmentedEvent<ApiType, [domain: u8, asset: StagingXcmV3MultiassetAssetId, amount: u128], { domain: u8, asset: StagingXcmV3MultiassetAssetId, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sygmaBridge: {
      /**
       * When all bridges are paused
       **/
      AllBridgePaused: AugmentedEvent<ApiType, [sender: AccountId32], { sender: AccountId32 }>;
      /**
       * When all bridges are unpaused
       **/
      AllBridgeUnpaused: AugmentedEvent<ApiType, [sender: AccountId32], { sender: AccountId32 }>;
      /**
       * When bridge is paused
       * args: [dest_domain_id]
       **/
      BridgePaused: AugmentedEvent<ApiType, [destDomainId: u8], { destDomainId: u8 }>;
      /**
       * When bridge is unpaused
       * args: [dest_domain_id]
       **/
      BridgeUnpaused: AugmentedEvent<ApiType, [destDomainId: u8], { destDomainId: u8 }>;
      /**
       * When initial bridge transfer send to dest domain
       * args: [dest_domain_id, resource_id, deposit_nonce, sender, transfer_type,
       * deposit_data, handler_response, ]
       **/
      Deposit: AugmentedEvent<ApiType, [destDomainId: u8, resourceId: U8aFixed, depositNonce: u64, sender: AccountId32, transferType: SygmaTraitsTransferType, depositData: Bytes, handlerResponse: Bytes], { destDomainId: u8, resourceId: U8aFixed, depositNonce: u64, sender: AccountId32, transferType: SygmaTraitsTransferType, depositData: Bytes, handlerResponse: Bytes }>;
      /**
       * When proposal was faild to execute
       **/
      FailedHandlerExecution: AugmentedEvent<ApiType, [error: Bytes, originDomainId: u8, depositNonce: u64], { error: Bytes, originDomainId: u8, depositNonce: u64 }>;
      /**
       * When bridge fee is collected
       **/
      FeeCollected: AugmentedEvent<ApiType, [feePayer: AccountId32, destDomainId: u8, resourceId: U8aFixed, feeAmount: u128, feeAssetId: StagingXcmV3MultiassetAssetId], { feePayer: AccountId32, destDomainId: u8, resourceId: U8aFixed, feeAmount: u128, feeAssetId: StagingXcmV3MultiassetAssetId }>;
      /**
       * When proposal was executed successfully
       **/
      ProposalExecution: AugmentedEvent<ApiType, [originDomainId: u8, depositNonce: u64, dataHash: U8aFixed], { originDomainId: u8, depositNonce: u64, dataHash: U8aFixed }>;
      /**
       * When registering a new dest domainID with its corresponding chainID
       **/
      RegisterDestDomain: AugmentedEvent<ApiType, [sender: AccountId32, domainId: u8, chainId: U256], { sender: AccountId32, domainId: u8, chainId: U256 }>;
      /**
       * When user is going to retry a bridge transfer
       * args: [deposit_on_block_height, dest_domain_id, sender]
       **/
      Retry: AugmentedEvent<ApiType, [depositOnBlockHeight: u128, destDomainId: u8, sender: AccountId32], { depositOnBlockHeight: u128, destDomainId: u8, sender: AccountId32 }>;
      /**
       * When unregistering a dest domainID with its corresponding chainID
       **/
      UnregisterDestDomain: AugmentedEvent<ApiType, [sender: AccountId32, domainId: u8, chainId: U256], { sender: AccountId32, domainId: u8, chainId: U256 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sygmaFeeHandlerRouter: {
      /**
       * When fee handler was set for a specific (domain, asset) pair
       * args: [dest_domain_id, asset_id, handler_type]
       **/
      FeeHandlerSet: AugmentedEvent<ApiType, [domain: u8, asset: StagingXcmV3MultiassetAssetId, handlerType: SygmaFeeHandlerRouterFeeHandlerType], { domain: u8, asset: StagingXcmV3MultiassetAssetId, handlerType: SygmaFeeHandlerRouterFeeHandlerType }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sygmaPercentageFeeHandler: {
      /**
       * Fee set rate for a specific asset and domain
       * args: [domain, asset, rate_basis_point, fee_lower_bound, fee_upper_bound]
       **/
      FeeRateSet: AugmentedEvent<ApiType, [domain: u8, asset: StagingXcmV3MultiassetAssetId, rateBasisPoint: u32, feeLowerBound: u128, feeUpperBound: u128], { domain: u8, asset: StagingXcmV3MultiassetAssetId, rateBasisPoint: u32, feeLowerBound: u128, feeUpperBound: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sygmaWrapper: {
      /**
       * Assets sent to EVM chain.
       **/
      AssetTransfered: AugmentedEvent<ApiType, [asset: StagingXcmV3MultiAsset, origin: StagingXcmV3MultiLocation, dest: StagingXcmV3MultiLocation], { asset: StagingXcmV3MultiAsset, origin: StagingXcmV3MultiLocation, dest: StagingXcmV3MultiLocation }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    system: {
      /**
       * `:code` was updated.
       **/
      CodeUpdated: AugmentedEvent<ApiType, []>;
      /**
       * An extrinsic failed.
       **/
      ExtrinsicFailed: AugmentedEvent<ApiType, [dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportDispatchDispatchInfo], { dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportDispatchDispatchInfo }>;
      /**
       * An extrinsic completed successfully.
       **/
      ExtrinsicSuccess: AugmentedEvent<ApiType, [dispatchInfo: FrameSupportDispatchDispatchInfo], { dispatchInfo: FrameSupportDispatchDispatchInfo }>;
      /**
       * An account was reaped.
       **/
      KilledAccount: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * A new account was created.
       **/
      NewAccount: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * On on-chain remark happened.
       **/
      Remarked: AugmentedEvent<ApiType, [sender: AccountId32, hash_: H256], { sender: AccountId32, hash_: H256 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    technicalCommittee: {
      /**
       * A motion was approved by the required threshold.
       **/
      Approved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A proposal was closed because its threshold was reached or after its duration was up.
       **/
      Closed: AugmentedEvent<ApiType, [proposalHash: H256, yes: u32, no: u32], { proposalHash: H256, yes: u32, no: u32 }>;
      /**
       * A motion was not approved by the required threshold.
       **/
      Disapproved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A motion was executed; result will be `Ok` if it returned without error.
       **/
      Executed: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single member did some action; result will be `Ok` if it returned without error.
       **/
      MemberExecuted: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A motion (given hash) has been proposed (by given account) with a threshold (given
       * `MemberCount`).
       **/
      Proposed: AugmentedEvent<ApiType, [account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32], { account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32 }>;
      /**
       * A motion (given hash) has been voted on by given account, leaving
       * a tally (yes votes and no votes given respectively as `MemberCount`).
       **/
      Voted: AugmentedEvent<ApiType, [account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32], { account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    technicalMembership: {
      /**
       * Phantom member, never used.
       **/
      Dummy: AugmentedEvent<ApiType, []>;
      /**
       * One of the members' keys changed.
       **/
      KeyChanged: AugmentedEvent<ApiType, []>;
      /**
       * The given member was added; see the transaction for who.
       **/
      MemberAdded: AugmentedEvent<ApiType, []>;
      /**
       * The given member was removed; see the transaction for who.
       **/
      MemberRemoved: AugmentedEvent<ApiType, []>;
      /**
       * The membership was reset; see the transaction for who the new set is.
       **/
      MembersReset: AugmentedEvent<ApiType, []>;
      /**
       * Two members were swapped; see the transaction for who.
       **/
      MembersSwapped: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    tips: {
      /**
       * A new tip suggestion has been opened.
       **/
      NewTip: AugmentedEvent<ApiType, [tipHash: H256], { tipHash: H256 }>;
      /**
       * A tip suggestion has been closed.
       **/
      TipClosed: AugmentedEvent<ApiType, [tipHash: H256, who: AccountId32, payout: u128], { tipHash: H256, who: AccountId32, payout: u128 }>;
      /**
       * A tip suggestion has reached threshold and is closing.
       **/
      TipClosing: AugmentedEvent<ApiType, [tipHash: H256], { tipHash: H256 }>;
      /**
       * A tip suggestion has been retracted.
       **/
      TipRetracted: AugmentedEvent<ApiType, [tipHash: H256], { tipHash: H256 }>;
      /**
       * A tip suggestion has been slashed.
       **/
      TipSlashed: AugmentedEvent<ApiType, [tipHash: H256, finder: AccountId32, deposit: u128], { tipHash: H256, finder: AccountId32, deposit: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    transactionPayment: {
      /**
       * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
       * has been paid by `who`.
       **/
      TransactionFeePaid: AugmentedEvent<ApiType, [who: AccountId32, actualFee: u128, tip: u128], { who: AccountId32, actualFee: u128, tip: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    treasury: {
      /**
       * Some funds have been allocated.
       **/
      Awarded: AugmentedEvent<ApiType, [proposalIndex: u32, award: u128, account: AccountId32], { proposalIndex: u32, award: u128, account: AccountId32 }>;
      /**
       * Some of our funds have been burnt.
       **/
      Burnt: AugmentedEvent<ApiType, [burntFunds: u128], { burntFunds: u128 }>;
      /**
       * Some funds have been deposited.
       **/
      Deposit: AugmentedEvent<ApiType, [value: u128], { value: u128 }>;
      /**
       * New proposal.
       **/
      Proposed: AugmentedEvent<ApiType, [proposalIndex: u32], { proposalIndex: u32 }>;
      /**
       * A proposal was rejected; funds were slashed.
       **/
      Rejected: AugmentedEvent<ApiType, [proposalIndex: u32, slashed: u128], { proposalIndex: u32, slashed: u128 }>;
      /**
       * Spending has finished; this is the amount that rolls over until next spend.
       **/
      Rollover: AugmentedEvent<ApiType, [rolloverBalance: u128], { rolloverBalance: u128 }>;
      /**
       * A new spend proposal has been approved.
       **/
      SpendApproved: AugmentedEvent<ApiType, [proposalIndex: u32, amount: u128, beneficiary: AccountId32], { proposalIndex: u32, amount: u128, beneficiary: AccountId32 }>;
      /**
       * We have ended a spend period and will now allocate funds.
       **/
      Spending: AugmentedEvent<ApiType, [budgetRemaining: u128], { budgetRemaining: u128 }>;
      /**
       * The inactive funds of the pallet have been updated.
       **/
      UpdatedInactive: AugmentedEvent<ApiType, [reactivated: u128, deactivated: u128], { reactivated: u128, deactivated: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    uniques: {
      /**
       * An approval for a `delegate` account to transfer the `item` of an item
       * `collection` was cancelled by its `owner`.
       **/
      ApprovalCancelled: AugmentedEvent<ApiType, [collection: u32, item: u32, owner: AccountId32, delegate: AccountId32], { collection: u32, item: u32, owner: AccountId32, delegate: AccountId32 }>;
      /**
       * An `item` of a `collection` has been approved by the `owner` for transfer by
       * a `delegate`.
       **/
      ApprovedTransfer: AugmentedEvent<ApiType, [collection: u32, item: u32, owner: AccountId32, delegate: AccountId32], { collection: u32, item: u32, owner: AccountId32, delegate: AccountId32 }>;
      /**
       * Attribute metadata has been cleared for a `collection` or `item`.
       **/
      AttributeCleared: AugmentedEvent<ApiType, [collection: u32, maybeItem: Option<u32>, key: Bytes], { collection: u32, maybeItem: Option<u32>, key: Bytes }>;
      /**
       * New attribute metadata has been set for a `collection` or `item`.
       **/
      AttributeSet: AugmentedEvent<ApiType, [collection: u32, maybeItem: Option<u32>, key: Bytes, value: Bytes], { collection: u32, maybeItem: Option<u32>, key: Bytes, value: Bytes }>;
      /**
       * An `item` was destroyed.
       **/
      Burned: AugmentedEvent<ApiType, [collection: u32, item: u32, owner: AccountId32], { collection: u32, item: u32, owner: AccountId32 }>;
      /**
       * Some `collection` was frozen.
       **/
      CollectionFrozen: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * Max supply has been set for a collection.
       **/
      CollectionMaxSupplySet: AugmentedEvent<ApiType, [collection: u32, maxSupply: u32], { collection: u32, maxSupply: u32 }>;
      /**
       * Metadata has been cleared for a `collection`.
       **/
      CollectionMetadataCleared: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * New metadata has been set for a `collection`.
       **/
      CollectionMetadataSet: AugmentedEvent<ApiType, [collection: u32, data: Bytes, isFrozen: bool], { collection: u32, data: Bytes, isFrozen: bool }>;
      /**
       * Some `collection` was thawed.
       **/
      CollectionThawed: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * A `collection` was created.
       **/
      Created: AugmentedEvent<ApiType, [collection: u32, creator: AccountId32, owner: AccountId32], { collection: u32, creator: AccountId32, owner: AccountId32 }>;
      /**
       * A `collection` was destroyed.
       **/
      Destroyed: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * A `collection` was force-created.
       **/
      ForceCreated: AugmentedEvent<ApiType, [collection: u32, owner: AccountId32], { collection: u32, owner: AccountId32 }>;
      /**
       * Some `item` was frozen.
       **/
      Frozen: AugmentedEvent<ApiType, [collection: u32, item: u32], { collection: u32, item: u32 }>;
      /**
       * An `item` was issued.
       **/
      Issued: AugmentedEvent<ApiType, [collection: u32, item: u32, owner: AccountId32], { collection: u32, item: u32, owner: AccountId32 }>;
      /**
       * An item was bought.
       **/
      ItemBought: AugmentedEvent<ApiType, [collection: u32, item: u32, price: u128, seller: AccountId32, buyer: AccountId32], { collection: u32, item: u32, price: u128, seller: AccountId32, buyer: AccountId32 }>;
      /**
       * The price for the instance was removed.
       **/
      ItemPriceRemoved: AugmentedEvent<ApiType, [collection: u32, item: u32], { collection: u32, item: u32 }>;
      /**
       * The price was set for the instance.
       **/
      ItemPriceSet: AugmentedEvent<ApiType, [collection: u32, item: u32, price: u128, whitelistedBuyer: Option<AccountId32>], { collection: u32, item: u32, price: u128, whitelistedBuyer: Option<AccountId32> }>;
      /**
       * A `collection` has had its attributes changed by the `Force` origin.
       **/
      ItemStatusChanged: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * Metadata has been cleared for an item.
       **/
      MetadataCleared: AugmentedEvent<ApiType, [collection: u32, item: u32], { collection: u32, item: u32 }>;
      /**
       * New metadata has been set for an item.
       **/
      MetadataSet: AugmentedEvent<ApiType, [collection: u32, item: u32, data: Bytes, isFrozen: bool], { collection: u32, item: u32, data: Bytes, isFrozen: bool }>;
      /**
       * The owner changed.
       **/
      OwnerChanged: AugmentedEvent<ApiType, [collection: u32, newOwner: AccountId32], { collection: u32, newOwner: AccountId32 }>;
      /**
       * Ownership acceptance has changed for an account.
       **/
      OwnershipAcceptanceChanged: AugmentedEvent<ApiType, [who: AccountId32, maybeCollection: Option<u32>], { who: AccountId32, maybeCollection: Option<u32> }>;
      /**
       * Metadata has been cleared for an item.
       **/
      Redeposited: AugmentedEvent<ApiType, [collection: u32, successfulItems: Vec<u32>], { collection: u32, successfulItems: Vec<u32> }>;
      /**
       * The management team changed.
       **/
      TeamChanged: AugmentedEvent<ApiType, [collection: u32, issuer: AccountId32, admin: AccountId32, freezer: AccountId32], { collection: u32, issuer: AccountId32, admin: AccountId32, freezer: AccountId32 }>;
      /**
       * Some `item` was thawed.
       **/
      Thawed: AugmentedEvent<ApiType, [collection: u32, item: u32], { collection: u32, item: u32 }>;
      /**
       * An `item` was transferred.
       **/
      Transferred: AugmentedEvent<ApiType, [collection: u32, item: u32, from: AccountId32, to: AccountId32], { collection: u32, item: u32, from: AccountId32, to: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    utility: {
      /**
       * Batch of dispatches completed fully with no error.
       **/
      BatchCompleted: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches completed but has errors.
       **/
      BatchCompletedWithErrors: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
       * well as the error.
       **/
      BatchInterrupted: AugmentedEvent<ApiType, [index: u32, error: SpRuntimeDispatchError], { index: u32, error: SpRuntimeDispatchError }>;
      /**
       * A call was dispatched.
       **/
      DispatchedAs: AugmentedEvent<ApiType, [result: Result<Null, SpRuntimeDispatchError>], { result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single item within a Batch of dispatches has completed with no error.
       **/
      ItemCompleted: AugmentedEvent<ApiType, []>;
      /**
       * A single item within a Batch of dispatches has completed with error.
       **/
      ItemFailed: AugmentedEvent<ApiType, [error: SpRuntimeDispatchError], { error: SpRuntimeDispatchError }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    vesting: {
      /**
       * An \[account\] has become fully vested.
       **/
      VestingCompleted: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * The amount vested has been updated. This could indicate a change in funds available.
       * The balance given is the amount which is left unvested (and thus locked).
       **/
      VestingUpdated: AugmentedEvent<ApiType, [account: AccountId32, unvested: u128], { account: AccountId32, unvested: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    xcmBridge: {
      /**
       * Assets sent to parachain or relaychain.
       **/
      AssetTransfered: AugmentedEvent<ApiType, [asset: StagingXcmV3MultiAsset, origin: StagingXcmV3MultiLocation, dest: StagingXcmV3MultiLocation], { asset: StagingXcmV3MultiAsset, origin: StagingXcmV3MultiLocation, dest: StagingXcmV3MultiLocation }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    xcmpQueue: {
      /**
       * Bad XCM format used.
       **/
      BadFormat: AugmentedEvent<ApiType, [messageHash: U8aFixed], { messageHash: U8aFixed }>;
      /**
       * Bad XCM version used.
       **/
      BadVersion: AugmentedEvent<ApiType, [messageHash: U8aFixed], { messageHash: U8aFixed }>;
      /**
       * Some XCM failed.
       **/
      Fail: AugmentedEvent<ApiType, [messageHash: U8aFixed, messageId: U8aFixed, error: StagingXcmV3TraitsError, weight: SpWeightsWeightV2Weight], { messageHash: U8aFixed, messageId: U8aFixed, error: StagingXcmV3TraitsError, weight: SpWeightsWeightV2Weight }>;
      /**
       * An XCM exceeded the individual message weight budget.
       **/
      OverweightEnqueued: AugmentedEvent<ApiType, [sender: u32, sentAt: u32, index: u64, required: SpWeightsWeightV2Weight], { sender: u32, sentAt: u32, index: u64, required: SpWeightsWeightV2Weight }>;
      /**
       * An XCM from the overweight queue was executed with the given actual weight used.
       **/
      OverweightServiced: AugmentedEvent<ApiType, [index: u64, used: SpWeightsWeightV2Weight], { index: u64, used: SpWeightsWeightV2Weight }>;
      /**
       * Some XCM was executed ok.
       **/
      Success: AugmentedEvent<ApiType, [messageHash: U8aFixed, messageId: U8aFixed, weight: SpWeightsWeightV2Weight], { messageHash: U8aFixed, messageId: U8aFixed, weight: SpWeightsWeightV2Weight }>;
      /**
       * An HRMP message was sent to a sibling parachain.
       **/
      XcmpMessageSent: AugmentedEvent<ApiType, [messageHash: U8aFixed], { messageHash: U8aFixed }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    xTransfer: {
      /**
       * Assets being deposited to somewhere.
       **/
      Deposited: AugmentedEvent<ApiType, [what: StagingXcmV3MultiAsset, who: StagingXcmV3MultiLocation, memo: Bytes], { what: StagingXcmV3MultiAsset, who: StagingXcmV3MultiLocation, memo: Bytes }>;
      /**
       * Assets being forwarded to somewhere.
       **/
      Forwarded: AugmentedEvent<ApiType, [what: StagingXcmV3MultiAsset, who: StagingXcmV3MultiLocation, memo: Bytes], { what: StagingXcmV3MultiAsset, who: StagingXcmV3MultiLocation, memo: Bytes }>;
      /**
       * Assets being withdrawn from somewhere.
       **/
      Withdrawn: AugmentedEvent<ApiType, [what: StagingXcmV3MultiAsset, who: StagingXcmV3MultiLocation, memo: Bytes], { what: StagingXcmV3MultiAsset, who: StagingXcmV3MultiLocation, memo: Bytes }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
  } // AugmentedEvents
} // declare module
