// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Enum, Option, Struct, U256, U8aFixed, Vec, u128, u32, u64, u8 } from '@polkadot/types-codec';
import type { AccountId, Balance, BlockNumber, H256, MultiAddress, Permill } from '@polkadot/types/interfaces/runtime';
import type { DispatchErrorModuleU8 } from '@polkadot/types/interfaces/system';

/** @name Address */
export interface Address extends MultiAddress {}

/** @name AssetInfo */
export interface AssetInfo extends Struct {
  readonly destId: BridgeChainId;
  readonly assetIdentity: Bytes;
}

/** @name Attestation */
export interface Attestation extends Enum {
  readonly isSgxIas: boolean;
  readonly asSgxIas: AttestationSgxIas;
  readonly type: 'SgxIas';
}

/** @name AttestationSgxIas */
export interface AttestationSgxIas extends Struct {
  readonly raReport: Bytes;
  readonly signature: Bytes;
  readonly rawSigningCert: Bytes;
}

/** @name Benchmark */
export interface Benchmark extends Struct {
  readonly pInit: u32;
  readonly pInstant: u32;
  readonly iterations: u64;
  readonly miningStartTime: u64;
  readonly challengeTimeLast: u64;
}

/** @name BridgeChainId */
export interface BridgeChainId extends u8 {}

/** @name BridgeEvent */
export interface BridgeEvent extends Enum {
  readonly isFungibleTransfer: boolean;
  readonly asFungibleTransfer: FungibleTransfer;
  readonly isNonFungibleTransfer: boolean;
  readonly asNonFungibleTransfer: NonFungibleTransfer;
  readonly isGenericTransfer: boolean;
  readonly asGenericTransfer: GenericTransfer;
  readonly type: 'FungibleTransfer' | 'NonFungibleTransfer' | 'GenericTransfer';
}

/** @name ChainId */
export interface ChainId extends u8 {}

/** @name ContractPublicKey */
export interface ContractPublicKey extends Sr25519PublicKey {}

/** @name DepositNonce */
export interface DepositNonce extends u64 {}

/** @name DispatchErrorModule */
export interface DispatchErrorModule extends DispatchErrorModuleU8 {}

/** @name DispatchMasterKeyEvent */
export interface DispatchMasterKeyEvent extends Struct {
  readonly dest: WorkerPublicKey;
  readonly ecdhPubkey: EcdhPublicKey;
  readonly encryptedMasterKey: Bytes;
  readonly iv: U8aFixed;
}

/** @name EcdhPublicKey */
export interface EcdhPublicKey extends U8aFixed {}

/** @name FungibleTransfer */
export interface FungibleTransfer extends Struct {
  readonly destId: BridgeChainId;
  readonly nonce: DepositNonce;
  readonly resourceId: ResourceId;
  readonly amount: U256;
  readonly recipient: Bytes;
}

/** @name GatekeeperChange */
export interface GatekeeperChange extends Enum {
  readonly isGatekeeperRegistered: boolean;
  readonly asGatekeeperRegistered: NewGatekeeperEvent;
  readonly type: 'GatekeeperRegistered';
}

/** @name GatekeeperEvent */
export interface GatekeeperEvent extends Enum {
  readonly isNewRandomNumber: boolean;
  readonly asNewRandomNumber: RandomNumberEvent;
  readonly isTokenomicParametersChanged: boolean;
  readonly asTokenomicParametersChanged: TokenomicParameters;
  readonly type: 'NewRandomNumber' | 'TokenomicParametersChanged';
}

/** @name GatekeeperLaunch */
export interface GatekeeperLaunch extends Enum {
  readonly isFirstGatekeeper: boolean;
  readonly asFirstGatekeeper: NewGatekeeperEvent;
  readonly isMasterPubkeyOnChain: boolean;
  readonly type: 'FirstGatekeeper' | 'MasterPubkeyOnChain';
}

/** @name GenericTransfer */
export interface GenericTransfer extends Struct {
  readonly destId: BridgeChainId;
  readonly nonce: DepositNonce;
  readonly resourceId: ResourceId;
  readonly metadata: Bytes;
}

/** @name HeartbeatChallenge */
export interface HeartbeatChallenge extends Struct {
  readonly seed: U256;
  readonly onlineTarget: U256;
}

/** @name KeyDistribution */
export interface KeyDistribution extends Enum {
  readonly isMasterKeyDistribution: boolean;
  readonly asMasterKeyDistribution: DispatchMasterKeyEvent;
  readonly type: 'MasterKeyDistribution';
}

/** @name Keys */
export interface Keys extends AccountId {}

/** @name LookupSource */
export interface LookupSource extends MultiAddress {}

/** @name MasterPublicKey */
export interface MasterPublicKey extends Sr25519PublicKey {}

/** @name Message */
export interface Message extends Struct {
  readonly sender: SenderId;
  readonly destination: Topic;
  readonly payload: Bytes;
}

/** @name MessageOrigin */
export interface MessageOrigin extends Enum {
  readonly isPallet: boolean;
  readonly asPallet: Bytes;
  readonly isContract: boolean;
  readonly asContract: H256;
  readonly isWorker: boolean;
  readonly asWorker: Sr25519PublicKey;
  readonly isAccountId: boolean;
  readonly asAccountId: H256;
  readonly isMultiLocation: boolean;
  readonly asMultiLocation: Bytes;
  readonly isGatekeeper: boolean;
  readonly type: 'Pallet' | 'Contract' | 'Worker' | 'AccountId' | 'MultiLocation' | 'Gatekeeper';
}

/** @name MinerInfo */
export interface MinerInfo extends Struct {
  readonly state: MinerState;
  readonly ve: u128;
  readonly v: u128;
  readonly vUpdatedAt: u64;
  readonly benchmark: Benchmark;
  readonly coolDownStart: u64;
  readonly stats: MinerStats;
}

/** @name MinerState */
export interface MinerState extends Enum {
  readonly isReady: boolean;
  readonly isMiningIdle: boolean;
  readonly isMiningActive: boolean;
  readonly isMiningUnresponsive: boolean;
  readonly isMiningCoolingDown: boolean;
  readonly type: 'Ready' | 'MiningIdle' | 'MiningActive' | 'MiningUnresponsive' | 'MiningCoolingDown';
}

/** @name MinerStats */
export interface MinerStats extends Struct {
  readonly totalReward: Balance;
}

/** @name NewGatekeeperEvent */
export interface NewGatekeeperEvent extends Struct {
  readonly pubkey: WorkerPublicKey;
  readonly ecdhPubkey: EcdhPublicKey;
}

/** @name NonFungibleTransfer */
export interface NonFungibleTransfer extends Struct {
  readonly destId: BridgeChainId;
  readonly nonce: DepositNonce;
  readonly resourceId: ResourceId;
  readonly tokenId: Bytes;
  readonly recipient: Bytes;
  readonly metadata: Bytes;
}

/** @name Path */
export interface Path extends Bytes {}

/** @name PoolInfo */
export interface PoolInfo extends Struct {
  readonly pid: u64;
  readonly owner: AccountId;
  readonly payoutCommission: Option<Permill>;
  readonly ownerReward: Balance;
  readonly cap: Option<Balance>;
  readonly rewardAcc: u128;
  readonly totalShares: Balance;
  readonly totalStake: Balance;
  readonly freeStake: Balance;
  readonly releasingStake: Balance;
  readonly workers: Vec<WorkerPublicKey>;
  readonly withdrawQueue: Vec<WithdrawInfo>;
}

/** @name ProposalStatus */
export interface ProposalStatus extends Enum {
  readonly isInitiated: boolean;
  readonly isApproved: boolean;
  readonly isRejected: boolean;
  readonly type: 'Initiated' | 'Approved' | 'Rejected';
}

/** @name ProposalVotes */
export interface ProposalVotes extends Struct {
  readonly votesFor: Vec<AccountId>;
  readonly votesAgainst: Vec<AccountId>;
  readonly status: ProposalStatus;
  readonly expiry: BlockNumber;
}

/** @name ProxyType */
export interface ProxyType extends Enum {
  readonly isAny: boolean;
  readonly isNonTransfer: boolean;
  readonly isCancelProxy: boolean;
  readonly isGovernance: boolean;
  readonly isCollator: boolean;
  readonly isStakePoolManager: boolean;
  readonly type: 'Any' | 'NonTransfer' | 'CancelProxy' | 'Governance' | 'Collator' | 'StakePoolManager';
}

/** @name RandomNumberEvent */
export interface RandomNumberEvent extends Struct {
  readonly blockNumber: u32;
  readonly randomNumber: U8aFixed;
  readonly lastRandomNumber: U8aFixed;
}

/** @name ResourceId */
export interface ResourceId extends U8aFixed {}

/** @name SenderId */
export interface SenderId extends MessageOrigin {}

/** @name SignedMessage */
export interface SignedMessage extends Struct {
  readonly message: Message;
  readonly sequence: u64;
  readonly signature: Bytes;
}

/** @name Sr25519PublicKey */
export interface Sr25519PublicKey extends U8aFixed {}

/** @name TokenId */
export interface TokenId extends U256 {}

/** @name TokenomicParameters */
export interface TokenomicParameters extends Struct {
  readonly phaRate: U64F64Bits;
  readonly rho: U64F64Bits;
  readonly budgetPerBlock: U64F64Bits;
  readonly vMax: U64F64Bits;
  readonly costK: U64F64Bits;
  readonly costB: U64F64Bits;
  readonly slashRate: U64F64Bits;
  readonly treasuryRatio: U64F64Bits;
  readonly heartbeatWindow: u32;
  readonly rigK: U64F64Bits;
  readonly rigB: U64F64Bits;
  readonly re: U64F64Bits;
  readonly k: U64F64Bits;
  readonly kappa: U64F64Bits;
}

/** @name TokenomicParams */
export interface TokenomicParams extends TokenomicParameters {}

/** @name Topic */
export interface Topic extends Path {}

/** @name U64F64Bits */
export interface U64F64Bits extends u128 {}

/** @name UserStakeInfo */
export interface UserStakeInfo extends Struct {
  readonly user: AccountId;
  readonly locked: Balance;
  readonly shares: Balance;
  readonly availableRewards: Balance;
  readonly rewardDebt: Balance;
}

/** @name WithdrawInfo */
export interface WithdrawInfo extends Struct {
  readonly user: AccountId;
  readonly shares: Balance;
  readonly startTime: u64;
}

/** @name WorkerInfo */
export interface WorkerInfo extends Struct {
  readonly pubkey: WorkerPublicKey;
  readonly ecdhPubkey: EcdhPublicKey;
  readonly runtimeVersion: u32;
  readonly lastUpdated: u64;
  readonly operator: Option<AccountId>;
  readonly confidenceLevel: u8;
  readonly initialScore: Option<u32>;
  readonly features: Vec<u32>;
}

/** @name WorkerPublicKey */
export interface WorkerPublicKey extends Sr25519PublicKey {}

/** @name WorkerRegistrationInfo */
export interface WorkerRegistrationInfo extends Struct {
  readonly version: u32;
  readonly machineId: Bytes;
  readonly pubkey: WorkerPublicKey;
  readonly ecdhPubkey: EcdhPublicKey;
  readonly genesisBlockHash: H256;
  readonly features: Vec<u32>;
  readonly operator: Option<AccountId>;
}

export type PHANTOM_KHALA = 'khala';
