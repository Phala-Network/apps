// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

/* eslint-disable sort-keys */

export default {
  /**
   * Lookup3: frame_system::AccountInfo<Index, pallet_balances::AccountData<Balance>>
   **/
  FrameSystemAccountInfo: {
    nonce: 'u32',
    consumers: 'u32',
    providers: 'u32',
    sufficients: 'u32',
    data: 'PalletBalancesAccountData'
  },
  /**
   * Lookup5: pallet_balances::AccountData<Balance>
   **/
  PalletBalancesAccountData: {
    free: 'u128',
    reserved: 'u128',
    miscFrozen: 'u128',
    feeFrozen: 'u128'
  },
  /**
   * Lookup7: frame_support::dispatch::PerDispatchClass<sp_weights::weight_v2::Weight>
   **/
  FrameSupportDispatchPerDispatchClassWeight: {
    normal: 'SpWeightsWeightV2Weight',
    operational: 'SpWeightsWeightV2Weight',
    mandatory: 'SpWeightsWeightV2Weight'
  },
  /**
   * Lookup8: sp_weights::weight_v2::Weight
   **/
  SpWeightsWeightV2Weight: {
    refTime: 'Compact<u64>',
    proofSize: 'Compact<u64>'
  },
  /**
   * Lookup13: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: 'Vec<SpRuntimeDigestDigestItem>'
  },
  /**
   * Lookup15: sp_runtime::generic::digest::DigestItem
   **/
  SpRuntimeDigestDigestItem: {
    _enum: {
      Other: 'Bytes',
      __Unused1: 'Null',
      __Unused2: 'Null',
      __Unused3: 'Null',
      Consensus: '([u8;4],Bytes)',
      Seal: '([u8;4],Bytes)',
      PreRuntime: '([u8;4],Bytes)',
      __Unused7: 'Null',
      RuntimeEnvironmentUpdated: 'Null'
    }
  },
  /**
   * Lookup18: frame_system::EventRecord<khala_parachain_runtime::RuntimeEvent, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: 'FrameSystemPhase',
    event: 'Event',
    topics: 'Vec<H256>'
  },
  /**
   * Lookup20: frame_system::pallet::Event<T>
   **/
  FrameSystemEvent: {
    _enum: {
      ExtrinsicSuccess: {
        dispatchInfo: 'FrameSupportDispatchDispatchInfo',
      },
      ExtrinsicFailed: {
        dispatchError: 'SpRuntimeDispatchError',
        dispatchInfo: 'FrameSupportDispatchDispatchInfo',
      },
      CodeUpdated: 'Null',
      NewAccount: {
        account: 'AccountId32',
      },
      KilledAccount: {
        account: 'AccountId32',
      },
      Remarked: {
        _alias: {
          hash_: 'hash',
        },
        sender: 'AccountId32',
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup21: frame_support::dispatch::DispatchInfo
   **/
  FrameSupportDispatchDispatchInfo: {
    weight: 'SpWeightsWeightV2Weight',
    class: 'FrameSupportDispatchDispatchClass',
    paysFee: 'FrameSupportDispatchPays'
  },
  /**
   * Lookup22: frame_support::dispatch::DispatchClass
   **/
  FrameSupportDispatchDispatchClass: {
    _enum: ['Normal', 'Operational', 'Mandatory']
  },
  /**
   * Lookup23: frame_support::dispatch::Pays
   **/
  FrameSupportDispatchPays: {
    _enum: ['Yes', 'No']
  },
  /**
   * Lookup24: sp_runtime::DispatchError
   **/
  SpRuntimeDispatchError: {
    _enum: {
      Other: 'Null',
      CannotLookup: 'Null',
      BadOrigin: 'Null',
      Module: 'SpRuntimeModuleError',
      ConsumerRemaining: 'Null',
      NoProviders: 'Null',
      TooManyConsumers: 'Null',
      Token: 'SpRuntimeTokenError',
      Arithmetic: 'SpArithmeticArithmeticError',
      Transactional: 'SpRuntimeTransactionalError',
      Exhausted: 'Null',
      Corruption: 'Null',
      Unavailable: 'Null'
    }
  },
  /**
   * Lookup25: sp_runtime::ModuleError
   **/
  SpRuntimeModuleError: {
    index: 'u8',
    error: '[u8;4]'
  },
  /**
   * Lookup26: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: ['NoFunds', 'WouldDie', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported']
  },
  /**
   * Lookup27: sp_arithmetic::ArithmeticError
   **/
  SpArithmeticArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero']
  },
  /**
   * Lookup28: sp_runtime::TransactionalError
   **/
  SpRuntimeTransactionalError: {
    _enum: ['LimitReached', 'NoLayer']
  },
  /**
   * Lookup29: pallet_utility::pallet::Event
   **/
  PalletUtilityEvent: {
    _enum: {
      BatchInterrupted: {
        index: 'u32',
        error: 'SpRuntimeDispatchError',
      },
      BatchCompleted: 'Null',
      BatchCompletedWithErrors: 'Null',
      ItemCompleted: 'Null',
      ItemFailed: {
        error: 'SpRuntimeDispatchError',
      },
      DispatchedAs: {
        result: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup32: pallet_multisig::pallet::Event<T>
   **/
  PalletMultisigEvent: {
    _enum: {
      NewMultisig: {
        approving: 'AccountId32',
        multisig: 'AccountId32',
        callHash: '[u8;32]',
      },
      MultisigApproval: {
        approving: 'AccountId32',
        timepoint: 'PalletMultisigTimepoint',
        multisig: 'AccountId32',
        callHash: '[u8;32]',
      },
      MultisigExecuted: {
        approving: 'AccountId32',
        timepoint: 'PalletMultisigTimepoint',
        multisig: 'AccountId32',
        callHash: '[u8;32]',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      MultisigCancelled: {
        cancelling: 'AccountId32',
        timepoint: 'PalletMultisigTimepoint',
        multisig: 'AccountId32',
        callHash: '[u8;32]'
      }
    }
  },
  /**
   * Lookup33: pallet_multisig::Timepoint<BlockNumber>
   **/
  PalletMultisigTimepoint: {
    height: 'u32',
    index: 'u32'
  },
  /**
   * Lookup34: pallet_proxy::pallet::Event<T>
   **/
  PalletProxyEvent: {
    _enum: {
      ProxyExecuted: {
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      PureCreated: {
        pure: 'AccountId32',
        who: 'AccountId32',
        proxyType: 'KhalaParachainRuntimeProxyType',
        disambiguationIndex: 'u16',
      },
      Announced: {
        real: 'AccountId32',
        proxy: 'AccountId32',
        callHash: 'H256',
      },
      ProxyAdded: {
        delegator: 'AccountId32',
        delegatee: 'AccountId32',
        proxyType: 'KhalaParachainRuntimeProxyType',
        delay: 'u32',
      },
      ProxyRemoved: {
        delegator: 'AccountId32',
        delegatee: 'AccountId32',
        proxyType: 'KhalaParachainRuntimeProxyType',
        delay: 'u32'
      }
    }
  },
  /**
   * Lookup35: khala_parachain_runtime::ProxyType
   **/
  KhalaParachainRuntimeProxyType: {
    _enum: ['Any', 'NonTransfer', 'CancelProxy', 'Governance', 'Collator', 'StakePoolManager']
  },
  /**
   * Lookup37: pallet_vesting::pallet::Event<T>
   **/
  PalletVestingEvent: {
    _enum: {
      VestingUpdated: {
        account: 'AccountId32',
        unvested: 'u128',
      },
      VestingCompleted: {
        account: 'AccountId32'
      }
    }
  },
  /**
   * Lookup38: pallet_scheduler::pallet::Event<T>
   **/
  PalletSchedulerEvent: {
    _enum: {
      Scheduled: {
        when: 'u32',
        index: 'u32',
      },
      Canceled: {
        when: 'u32',
        index: 'u32',
      },
      Dispatched: {
        task: '(u32,u32)',
        id: 'Option<[u8;32]>',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      CallUnavailable: {
        task: '(u32,u32)',
        id: 'Option<[u8;32]>',
      },
      PeriodicFailed: {
        task: '(u32,u32)',
        id: 'Option<[u8;32]>',
      },
      PermanentlyOverweight: {
        task: '(u32,u32)',
        id: 'Option<[u8;32]>'
      }
    }
  },
  /**
   * Lookup41: pallet_preimage::pallet::Event<T>
   **/
  PalletPreimageEvent: {
    _enum: {
      Noted: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      Requested: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      Cleared: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup42: cumulus_pallet_parachain_system::pallet::Event<T>
   **/
  CumulusPalletParachainSystemEvent: {
    _enum: {
      ValidationFunctionStored: 'Null',
      ValidationFunctionApplied: {
        relayChainBlockNum: 'u32',
      },
      ValidationFunctionDiscarded: 'Null',
      UpgradeAuthorized: {
        codeHash: 'H256',
      },
      DownwardMessagesReceived: {
        count: 'u32',
      },
      DownwardMessagesProcessed: {
        weightUsed: 'SpWeightsWeightV2Weight',
        dmqHead: 'H256',
      },
      UpwardMessageSent: {
        messageHash: 'Option<[u8;32]>'
      }
    }
  },
  /**
   * Lookup43: cumulus_pallet_xcmp_queue::pallet::Event<T>
   **/
  CumulusPalletXcmpQueueEvent: {
    _enum: {
      Success: {
        messageHash: 'Option<[u8;32]>',
        weight: 'SpWeightsWeightV2Weight',
      },
      Fail: {
        messageHash: 'Option<[u8;32]>',
        error: 'XcmV3TraitsError',
        weight: 'SpWeightsWeightV2Weight',
      },
      BadVersion: {
        messageHash: 'Option<[u8;32]>',
      },
      BadFormat: {
        messageHash: 'Option<[u8;32]>',
      },
      XcmpMessageSent: {
        messageHash: 'Option<[u8;32]>',
      },
      OverweightEnqueued: {
        sender: 'u32',
        sentAt: 'u32',
        index: 'u64',
        required: 'SpWeightsWeightV2Weight',
      },
      OverweightServiced: {
        index: 'u64',
        used: 'SpWeightsWeightV2Weight'
      }
    }
  },
  /**
   * Lookup44: xcm::v3::traits::Error
   **/
  XcmV3TraitsError: {
    _enum: {
      Overflow: 'Null',
      Unimplemented: 'Null',
      UntrustedReserveLocation: 'Null',
      UntrustedTeleportLocation: 'Null',
      LocationFull: 'Null',
      LocationNotInvertible: 'Null',
      BadOrigin: 'Null',
      InvalidLocation: 'Null',
      AssetNotFound: 'Null',
      FailedToTransactAsset: 'Null',
      NotWithdrawable: 'Null',
      LocationCannotHold: 'Null',
      ExceedsMaxMessageSize: 'Null',
      DestinationUnsupported: 'Null',
      Transport: 'Null',
      Unroutable: 'Null',
      UnknownClaim: 'Null',
      FailedToDecode: 'Null',
      MaxWeightInvalid: 'Null',
      NotHoldingFees: 'Null',
      TooExpensive: 'Null',
      Trap: 'u64',
      ExpectationFalse: 'Null',
      PalletNotFound: 'Null',
      NameMismatch: 'Null',
      VersionIncompatible: 'Null',
      HoldingWouldOverflow: 'Null',
      ExportError: 'Null',
      ReanchorFailed: 'Null',
      NoDeal: 'Null',
      FeesNotMet: 'Null',
      LockError: 'Null',
      NoPermission: 'Null',
      Unanchored: 'Null',
      NotDepositable: 'Null',
      UnhandledXcmVersion: 'Null',
      WeightLimitReached: 'SpWeightsWeightV2Weight',
      Barrier: 'Null',
      WeightNotComputable: 'Null',
      ExceedsStackLimit: 'Null'
    }
  },
  /**
   * Lookup46: cumulus_pallet_xcm::pallet::Event<T>
   **/
  CumulusPalletXcmEvent: {
    _enum: {
      InvalidFormat: '[u8;32]',
      UnsupportedVersion: '[u8;32]',
      ExecutedDownward: '([u8;32],XcmV3TraitsOutcome)'
    }
  },
  /**
   * Lookup47: xcm::v3::traits::Outcome
   **/
  XcmV3TraitsOutcome: {
    _enum: {
      Complete: 'SpWeightsWeightV2Weight',
      Incomplete: '(SpWeightsWeightV2Weight,XcmV3TraitsError)',
      Error: 'XcmV3TraitsError'
    }
  },
  /**
   * Lookup48: cumulus_pallet_dmp_queue::pallet::Event<T>
   **/
  CumulusPalletDmpQueueEvent: {
    _enum: {
      InvalidFormat: {
        messageId: '[u8;32]',
      },
      UnsupportedVersion: {
        messageId: '[u8;32]',
      },
      ExecutedDownward: {
        messageId: '[u8;32]',
        outcome: 'XcmV3TraitsOutcome',
      },
      WeightExhausted: {
        messageId: '[u8;32]',
        remainingWeight: 'SpWeightsWeightV2Weight',
        requiredWeight: 'SpWeightsWeightV2Weight',
      },
      OverweightEnqueued: {
        messageId: '[u8;32]',
        overweightIndex: 'u64',
        requiredWeight: 'SpWeightsWeightV2Weight',
      },
      OverweightServiced: {
        overweightIndex: 'u64',
        weightUsed: 'SpWeightsWeightV2Weight',
      },
      MaxMessagesExhausted: {
        messageId: '[u8;32]'
      }
    }
  },
  /**
   * Lookup49: pallet_xcm::pallet::Event<T>
   **/
  PalletXcmEvent: {
    _enum: {
      Attempted: 'XcmV3TraitsOutcome',
      Sent: '(XcmV3MultiLocation,XcmV3MultiLocation,XcmV3Xcm)',
      UnexpectedResponse: '(XcmV3MultiLocation,u64)',
      ResponseReady: '(u64,XcmV3Response)',
      Notified: '(u64,u8,u8)',
      NotifyOverweight: '(u64,u8,u8,SpWeightsWeightV2Weight,SpWeightsWeightV2Weight)',
      NotifyDispatchError: '(u64,u8,u8)',
      NotifyDecodeFailed: '(u64,u8,u8)',
      InvalidResponder: '(XcmV3MultiLocation,u64,Option<XcmV3MultiLocation>)',
      InvalidResponderVersion: '(XcmV3MultiLocation,u64)',
      ResponseTaken: 'u64',
      AssetsTrapped: '(H256,XcmV3MultiLocation,XcmVersionedMultiAssets)',
      VersionChangeNotified: '(XcmV3MultiLocation,u32,XcmV3MultiassetMultiAssets)',
      SupportedVersionChanged: '(XcmV3MultiLocation,u32)',
      NotifyTargetSendFail: '(XcmV3MultiLocation,u64,XcmV3TraitsError)',
      NotifyTargetMigrationFail: '(XcmVersionedMultiLocation,u64)',
      InvalidQuerierVersion: '(XcmV3MultiLocation,u64)',
      InvalidQuerier: '(XcmV3MultiLocation,u64,XcmV3MultiLocation,Option<XcmV3MultiLocation>)',
      VersionNotifyStarted: '(XcmV3MultiLocation,XcmV3MultiassetMultiAssets)',
      VersionNotifyRequested: '(XcmV3MultiLocation,XcmV3MultiassetMultiAssets)',
      VersionNotifyUnrequested: '(XcmV3MultiLocation,XcmV3MultiassetMultiAssets)',
      FeesPaid: '(XcmV3MultiLocation,XcmV3MultiassetMultiAssets)',
      AssetsClaimed: '(H256,XcmV3MultiLocation,XcmVersionedMultiAssets)'
    }
  },
  /**
   * Lookup50: xcm::v3::multilocation::MultiLocation
   **/
  XcmV3MultiLocation: {
    parents: 'u8',
    interior: 'XcmV3Junctions'
  },
  /**
   * Lookup51: xcm::v3::junctions::Junctions
   **/
  XcmV3Junctions: {
    _enum: {
      Here: 'Null',
      X1: 'XcmV3Junction',
      X2: '(XcmV3Junction,XcmV3Junction)',
      X3: '(XcmV3Junction,XcmV3Junction,XcmV3Junction)',
      X4: '(XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction)',
      X5: '(XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction)',
      X6: '(XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction)',
      X7: '(XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction)',
      X8: '(XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction)'
    }
  },
  /**
   * Lookup52: xcm::v3::junction::Junction
   **/
  XcmV3Junction: {
    _enum: {
      Parachain: 'Compact<u32>',
      AccountId32: {
        network: 'Option<XcmV3JunctionNetworkId>',
        id: '[u8;32]',
      },
      AccountIndex64: {
        network: 'Option<XcmV3JunctionNetworkId>',
        index: 'Compact<u64>',
      },
      AccountKey20: {
        network: 'Option<XcmV3JunctionNetworkId>',
        key: '[u8;20]',
      },
      PalletInstance: 'u8',
      GeneralIndex: 'Compact<u128>',
      GeneralKey: {
        length: 'u8',
        data: '[u8;32]',
      },
      OnlyChild: 'Null',
      Plurality: {
        id: 'XcmV3JunctionBodyId',
        part: 'XcmV3JunctionBodyPart',
      },
      GlobalConsensus: 'XcmV3JunctionNetworkId'
    }
  },
  /**
   * Lookup55: xcm::v3::junction::NetworkId
   **/
  XcmV3JunctionNetworkId: {
    _enum: {
      ByGenesis: '[u8;32]',
      ByFork: {
        blockNumber: 'u64',
        blockHash: '[u8;32]',
      },
      Polkadot: 'Null',
      Kusama: 'Null',
      Westend: 'Null',
      Rococo: 'Null',
      Wococo: 'Null',
      Ethereum: {
        chainId: 'Compact<u64>',
      },
      BitcoinCore: 'Null',
      BitcoinCash: 'Null'
    }
  },
  /**
   * Lookup58: xcm::v3::junction::BodyId
   **/
  XcmV3JunctionBodyId: {
    _enum: {
      Unit: 'Null',
      Moniker: '[u8;4]',
      Index: 'Compact<u32>',
      Executive: 'Null',
      Technical: 'Null',
      Legislative: 'Null',
      Judicial: 'Null',
      Defense: 'Null',
      Administration: 'Null',
      Treasury: 'Null'
    }
  },
  /**
   * Lookup59: xcm::v3::junction::BodyPart
   **/
  XcmV3JunctionBodyPart: {
    _enum: {
      Voice: 'Null',
      Members: {
        count: 'Compact<u32>',
      },
      Fraction: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>',
      },
      AtLeastProportion: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>',
      },
      MoreThanProportion: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup60: xcm::v3::Xcm<Call>
   **/
  XcmV3Xcm: 'Vec<XcmV3Instruction>',
  /**
   * Lookup62: xcm::v3::Instruction<Call>
   **/
  XcmV3Instruction: {
    _enum: {
      WithdrawAsset: 'XcmV3MultiassetMultiAssets',
      ReserveAssetDeposited: 'XcmV3MultiassetMultiAssets',
      ReceiveTeleportedAsset: 'XcmV3MultiassetMultiAssets',
      QueryResponse: {
        queryId: 'Compact<u64>',
        response: 'XcmV3Response',
        maxWeight: 'SpWeightsWeightV2Weight',
        querier: 'Option<XcmV3MultiLocation>',
      },
      TransferAsset: {
        assets: 'XcmV3MultiassetMultiAssets',
        beneficiary: 'XcmV3MultiLocation',
      },
      TransferReserveAsset: {
        assets: 'XcmV3MultiassetMultiAssets',
        dest: 'XcmV3MultiLocation',
        xcm: 'XcmV3Xcm',
      },
      Transact: {
        originKind: 'XcmV2OriginKind',
        requireWeightAtMost: 'SpWeightsWeightV2Weight',
        call: 'XcmDoubleEncoded',
      },
      HrmpNewChannelOpenRequest: {
        sender: 'Compact<u32>',
        maxMessageSize: 'Compact<u32>',
        maxCapacity: 'Compact<u32>',
      },
      HrmpChannelAccepted: {
        recipient: 'Compact<u32>',
      },
      HrmpChannelClosing: {
        initiator: 'Compact<u32>',
        sender: 'Compact<u32>',
        recipient: 'Compact<u32>',
      },
      ClearOrigin: 'Null',
      DescendOrigin: 'XcmV3Junctions',
      ReportError: 'XcmV3QueryResponseInfo',
      DepositAsset: {
        assets: 'XcmV3MultiassetMultiAssetFilter',
        beneficiary: 'XcmV3MultiLocation',
      },
      DepositReserveAsset: {
        assets: 'XcmV3MultiassetMultiAssetFilter',
        dest: 'XcmV3MultiLocation',
        xcm: 'XcmV3Xcm',
      },
      ExchangeAsset: {
        give: 'XcmV3MultiassetMultiAssetFilter',
        want: 'XcmV3MultiassetMultiAssets',
        maximal: 'bool',
      },
      InitiateReserveWithdraw: {
        assets: 'XcmV3MultiassetMultiAssetFilter',
        reserve: 'XcmV3MultiLocation',
        xcm: 'XcmV3Xcm',
      },
      InitiateTeleport: {
        assets: 'XcmV3MultiassetMultiAssetFilter',
        dest: 'XcmV3MultiLocation',
        xcm: 'XcmV3Xcm',
      },
      ReportHolding: {
        responseInfo: 'XcmV3QueryResponseInfo',
        assets: 'XcmV3MultiassetMultiAssetFilter',
      },
      BuyExecution: {
        fees: 'XcmV3MultiAsset',
        weightLimit: 'XcmV3WeightLimit',
      },
      RefundSurplus: 'Null',
      SetErrorHandler: 'XcmV3Xcm',
      SetAppendix: 'XcmV3Xcm',
      ClearError: 'Null',
      ClaimAsset: {
        assets: 'XcmV3MultiassetMultiAssets',
        ticket: 'XcmV3MultiLocation',
      },
      Trap: 'Compact<u64>',
      SubscribeVersion: {
        queryId: 'Compact<u64>',
        maxResponseWeight: 'SpWeightsWeightV2Weight',
      },
      UnsubscribeVersion: 'Null',
      BurnAsset: 'XcmV3MultiassetMultiAssets',
      ExpectAsset: 'XcmV3MultiassetMultiAssets',
      ExpectOrigin: 'Option<XcmV3MultiLocation>',
      ExpectError: 'Option<(u32,XcmV3TraitsError)>',
      ExpectTransactStatus: 'XcmV3MaybeErrorCode',
      QueryPallet: {
        moduleName: 'Bytes',
        responseInfo: 'XcmV3QueryResponseInfo',
      },
      ExpectPallet: {
        index: 'Compact<u32>',
        name: 'Bytes',
        moduleName: 'Bytes',
        crateMajor: 'Compact<u32>',
        minCrateMinor: 'Compact<u32>',
      },
      ReportTransactStatus: 'XcmV3QueryResponseInfo',
      ClearTransactStatus: 'Null',
      UniversalOrigin: 'XcmV3Junction',
      ExportMessage: {
        network: 'XcmV3JunctionNetworkId',
        destination: 'XcmV3Junctions',
        xcm: 'XcmV3Xcm',
      },
      LockAsset: {
        asset: 'XcmV3MultiAsset',
        unlocker: 'XcmV3MultiLocation',
      },
      UnlockAsset: {
        asset: 'XcmV3MultiAsset',
        target: 'XcmV3MultiLocation',
      },
      NoteUnlockable: {
        asset: 'XcmV3MultiAsset',
        owner: 'XcmV3MultiLocation',
      },
      RequestUnlock: {
        asset: 'XcmV3MultiAsset',
        locker: 'XcmV3MultiLocation',
      },
      SetFeesMode: {
        jitWithdraw: 'bool',
      },
      SetTopic: '[u8;32]',
      ClearTopic: 'Null',
      AliasOrigin: 'XcmV3MultiLocation',
      UnpaidExecution: {
        weightLimit: 'XcmV3WeightLimit',
        checkOrigin: 'Option<XcmV3MultiLocation>'
      }
    }
  },
  /**
   * Lookup63: xcm::v3::multiasset::MultiAssets
   **/
  XcmV3MultiassetMultiAssets: 'Vec<XcmV3MultiAsset>',
  /**
   * Lookup65: xcm::v3::multiasset::MultiAsset
   **/
  XcmV3MultiAsset: {
    id: 'XcmV3MultiassetAssetId',
    fun: 'XcmV3MultiassetFungibility'
  },
  /**
   * Lookup66: xcm::v3::multiasset::AssetId
   **/
  XcmV3MultiassetAssetId: {
    _enum: {
      Concrete: 'XcmV3MultiLocation',
      Abstract: '[u8;32]'
    }
  },
  /**
   * Lookup67: xcm::v3::multiasset::Fungibility
   **/
  XcmV3MultiassetFungibility: {
    _enum: {
      Fungible: 'Compact<u128>',
      NonFungible: 'XcmV3MultiassetAssetInstance'
    }
  },
  /**
   * Lookup68: xcm::v3::multiasset::AssetInstance
   **/
  XcmV3MultiassetAssetInstance: {
    _enum: {
      Undefined: 'Null',
      Index: 'Compact<u128>',
      Array4: '[u8;4]',
      Array8: '[u8;8]',
      Array16: '[u8;16]',
      Array32: '[u8;32]'
    }
  },
  /**
   * Lookup71: xcm::v3::Response
   **/
  XcmV3Response: {
    _enum: {
      Null: 'Null',
      Assets: 'XcmV3MultiassetMultiAssets',
      ExecutionResult: 'Option<(u32,XcmV3TraitsError)>',
      Version: 'u32',
      PalletsInfo: 'Vec<XcmV3PalletInfo>',
      DispatchResult: 'XcmV3MaybeErrorCode'
    }
  },
  /**
   * Lookup75: xcm::v3::PalletInfo
   **/
  XcmV3PalletInfo: {
    index: 'Compact<u32>',
    name: 'Bytes',
    moduleName: 'Bytes',
    major: 'Compact<u32>',
    minor: 'Compact<u32>',
    patch: 'Compact<u32>'
  },
  /**
   * Lookup78: xcm::v3::MaybeErrorCode
   **/
  XcmV3MaybeErrorCode: {
    _enum: {
      Success: 'Null',
      Error: 'Bytes',
      TruncatedError: 'Bytes'
    }
  },
  /**
   * Lookup81: xcm::v2::OriginKind
   **/
  XcmV2OriginKind: {
    _enum: ['Native', 'SovereignAccount', 'Superuser', 'Xcm']
  },
  /**
   * Lookup82: xcm::double_encoded::DoubleEncoded<T>
   **/
  XcmDoubleEncoded: {
    encoded: 'Bytes'
  },
  /**
   * Lookup83: xcm::v3::QueryResponseInfo
   **/
  XcmV3QueryResponseInfo: {
    destination: 'XcmV3MultiLocation',
    queryId: 'Compact<u64>',
    maxWeight: 'SpWeightsWeightV2Weight'
  },
  /**
   * Lookup84: xcm::v3::multiasset::MultiAssetFilter
   **/
  XcmV3MultiassetMultiAssetFilter: {
    _enum: {
      Definite: 'XcmV3MultiassetMultiAssets',
      Wild: 'XcmV3MultiassetWildMultiAsset'
    }
  },
  /**
   * Lookup85: xcm::v3::multiasset::WildMultiAsset
   **/
  XcmV3MultiassetWildMultiAsset: {
    _enum: {
      All: 'Null',
      AllOf: {
        id: 'XcmV3MultiassetAssetId',
        fun: 'XcmV3MultiassetWildFungibility',
      },
      AllCounted: 'Compact<u32>',
      AllOfCounted: {
        id: 'XcmV3MultiassetAssetId',
        fun: 'XcmV3MultiassetWildFungibility',
        count: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup86: xcm::v3::multiasset::WildFungibility
   **/
  XcmV3MultiassetWildFungibility: {
    _enum: ['Fungible', 'NonFungible']
  },
  /**
   * Lookup88: xcm::v3::WeightLimit
   **/
  XcmV3WeightLimit: {
    _enum: {
      Unlimited: 'Null',
      Limited: 'SpWeightsWeightV2Weight'
    }
  },
  /**
   * Lookup89: xcm::VersionedMultiAssets
   **/
  XcmVersionedMultiAssets: {
    _enum: {
      __Unused0: 'Null',
      V2: 'XcmV2MultiassetMultiAssets',
      __Unused2: 'Null',
      V3: 'XcmV3MultiassetMultiAssets'
    }
  },
  /**
   * Lookup90: xcm::v2::multiasset::MultiAssets
   **/
  XcmV2MultiassetMultiAssets: 'Vec<XcmV2MultiAsset>',
  /**
   * Lookup92: xcm::v2::multiasset::MultiAsset
   **/
  XcmV2MultiAsset: {
    id: 'XcmV2MultiassetAssetId',
    fun: 'XcmV2MultiassetFungibility'
  },
  /**
   * Lookup93: xcm::v2::multiasset::AssetId
   **/
  XcmV2MultiassetAssetId: {
    _enum: {
      Concrete: 'XcmV2MultiLocation',
      Abstract: 'Bytes'
    }
  },
  /**
   * Lookup94: xcm::v2::multilocation::MultiLocation
   **/
  XcmV2MultiLocation: {
    parents: 'u8',
    interior: 'XcmV2MultilocationJunctions'
  },
  /**
   * Lookup95: xcm::v2::multilocation::Junctions
   **/
  XcmV2MultilocationJunctions: {
    _enum: {
      Here: 'Null',
      X1: 'XcmV2Junction',
      X2: '(XcmV2Junction,XcmV2Junction)',
      X3: '(XcmV2Junction,XcmV2Junction,XcmV2Junction)',
      X4: '(XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction)',
      X5: '(XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction)',
      X6: '(XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction)',
      X7: '(XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction)',
      X8: '(XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction)'
    }
  },
  /**
   * Lookup96: xcm::v2::junction::Junction
   **/
  XcmV2Junction: {
    _enum: {
      Parachain: 'Compact<u32>',
      AccountId32: {
        network: 'XcmV2NetworkId',
        id: '[u8;32]',
      },
      AccountIndex64: {
        network: 'XcmV2NetworkId',
        index: 'Compact<u64>',
      },
      AccountKey20: {
        network: 'XcmV2NetworkId',
        key: '[u8;20]',
      },
      PalletInstance: 'u8',
      GeneralIndex: 'Compact<u128>',
      GeneralKey: 'Bytes',
      OnlyChild: 'Null',
      Plurality: {
        id: 'XcmV2BodyId',
        part: 'XcmV2BodyPart'
      }
    }
  },
  /**
   * Lookup97: xcm::v2::NetworkId
   **/
  XcmV2NetworkId: {
    _enum: {
      Any: 'Null',
      Named: 'Bytes',
      Polkadot: 'Null',
      Kusama: 'Null'
    }
  },
  /**
   * Lookup99: xcm::v2::BodyId
   **/
  XcmV2BodyId: {
    _enum: {
      Unit: 'Null',
      Named: 'Bytes',
      Index: 'Compact<u32>',
      Executive: 'Null',
      Technical: 'Null',
      Legislative: 'Null',
      Judicial: 'Null',
      Defense: 'Null',
      Administration: 'Null',
      Treasury: 'Null'
    }
  },
  /**
   * Lookup100: xcm::v2::BodyPart
   **/
  XcmV2BodyPart: {
    _enum: {
      Voice: 'Null',
      Members: {
        count: 'Compact<u32>',
      },
      Fraction: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>',
      },
      AtLeastProportion: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>',
      },
      MoreThanProportion: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup101: xcm::v2::multiasset::Fungibility
   **/
  XcmV2MultiassetFungibility: {
    _enum: {
      Fungible: 'Compact<u128>',
      NonFungible: 'XcmV2MultiassetAssetInstance'
    }
  },
  /**
   * Lookup102: xcm::v2::multiasset::AssetInstance
   **/
  XcmV2MultiassetAssetInstance: {
    _enum: {
      Undefined: 'Null',
      Index: 'Compact<u128>',
      Array4: '[u8;4]',
      Array8: '[u8;8]',
      Array16: '[u8;16]',
      Array32: '[u8;32]',
      Blob: 'Bytes'
    }
  },
  /**
   * Lookup103: xcm::VersionedMultiLocation
   **/
  XcmVersionedMultiLocation: {
    _enum: {
      __Unused0: 'Null',
      V2: 'XcmV2MultiLocation',
      __Unused2: 'Null',
      V3: 'XcmV3MultiLocation'
    }
  },
  /**
   * Lookup104: pallet_balances::pallet::Event<T, I>
   **/
  PalletBalancesEvent: {
    _enum: {
      Endowed: {
        account: 'AccountId32',
        freeBalance: 'u128',
      },
      DustLost: {
        account: 'AccountId32',
        amount: 'u128',
      },
      Transfer: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
      },
      BalanceSet: {
        who: 'AccountId32',
        free: 'u128',
        reserved: 'u128',
      },
      Reserved: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Unreserved: {
        who: 'AccountId32',
        amount: 'u128',
      },
      ReserveRepatriated: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
        destinationStatus: 'FrameSupportTokensMiscBalanceStatus',
      },
      Deposit: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Withdraw: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Slashed: {
        who: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup105: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved']
  },
  /**
   * Lookup106: pallet_transaction_payment::pallet::Event<T>
   **/
  PalletTransactionPaymentEvent: {
    _enum: {
      TransactionFeePaid: {
        who: 'AccountId32',
        actualFee: 'u128',
        tip: 'u128'
      }
    }
  },
  /**
   * Lookup107: pallet_collator_selection::pallet::Event<T>
   **/
  PalletCollatorSelectionEvent: {
    _enum: {
      NewInvulnerables: {
        invulnerables: 'Vec<AccountId32>',
      },
      NewDesiredCandidates: {
        desiredCandidates: 'u32',
      },
      NewCandidacyBond: {
        bondAmount: 'u128',
      },
      CandidateAdded: {
        accountId: 'AccountId32',
        deposit: 'u128',
      },
      CandidateRemoved: {
        accountId: 'AccountId32'
      }
    }
  },
  /**
   * Lookup109: pallet_session::pallet::Event
   **/
  PalletSessionEvent: {
    _enum: {
      NewSession: {
        sessionIndex: 'u32'
      }
    }
  },
  /**
   * Lookup110: pallet_identity::pallet::Event<T>
   **/
  PalletIdentityEvent: {
    _enum: {
      IdentitySet: {
        who: 'AccountId32',
      },
      IdentityCleared: {
        who: 'AccountId32',
        deposit: 'u128',
      },
      IdentityKilled: {
        who: 'AccountId32',
        deposit: 'u128',
      },
      JudgementRequested: {
        who: 'AccountId32',
        registrarIndex: 'u32',
      },
      JudgementUnrequested: {
        who: 'AccountId32',
        registrarIndex: 'u32',
      },
      JudgementGiven: {
        target: 'AccountId32',
        registrarIndex: 'u32',
      },
      RegistrarAdded: {
        registrarIndex: 'u32',
      },
      SubIdentityAdded: {
        sub: 'AccountId32',
        main: 'AccountId32',
        deposit: 'u128',
      },
      SubIdentityRemoved: {
        sub: 'AccountId32',
        main: 'AccountId32',
        deposit: 'u128',
      },
      SubIdentityRevoked: {
        sub: 'AccountId32',
        main: 'AccountId32',
        deposit: 'u128'
      }
    }
  },
  /**
   * Lookup111: pallet_democracy::pallet::Event<T>
   **/
  PalletDemocracyEvent: {
    _enum: {
      Proposed: {
        proposalIndex: 'u32',
        deposit: 'u128',
      },
      Tabled: {
        proposalIndex: 'u32',
        deposit: 'u128',
      },
      ExternalTabled: 'Null',
      Started: {
        refIndex: 'u32',
        threshold: 'PalletDemocracyVoteThreshold',
      },
      Passed: {
        refIndex: 'u32',
      },
      NotPassed: {
        refIndex: 'u32',
      },
      Cancelled: {
        refIndex: 'u32',
      },
      Delegated: {
        who: 'AccountId32',
        target: 'AccountId32',
      },
      Undelegated: {
        account: 'AccountId32',
      },
      Vetoed: {
        who: 'AccountId32',
        proposalHash: 'H256',
        until: 'u32',
      },
      Blacklisted: {
        proposalHash: 'H256',
      },
      Voted: {
        voter: 'AccountId32',
        refIndex: 'u32',
        vote: 'PalletDemocracyVoteAccountVote',
      },
      Seconded: {
        seconder: 'AccountId32',
        propIndex: 'u32',
      },
      ProposalCanceled: {
        propIndex: 'u32',
      },
      MetadataSet: {
        _alias: {
          hash_: 'hash',
        },
        owner: 'PalletDemocracyMetadataOwner',
        hash_: 'H256',
      },
      MetadataCleared: {
        _alias: {
          hash_: 'hash',
        },
        owner: 'PalletDemocracyMetadataOwner',
        hash_: 'H256',
      },
      MetadataTransferred: {
        _alias: {
          hash_: 'hash',
        },
        prevOwner: 'PalletDemocracyMetadataOwner',
        owner: 'PalletDemocracyMetadataOwner',
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup112: pallet_democracy::vote_threshold::VoteThreshold
   **/
  PalletDemocracyVoteThreshold: {
    _enum: ['SuperMajorityApprove', 'SuperMajorityAgainst', 'SimpleMajority']
  },
  /**
   * Lookup113: pallet_democracy::vote::AccountVote<Balance>
   **/
  PalletDemocracyVoteAccountVote: {
    _enum: {
      Standard: {
        vote: 'Vote',
        balance: 'u128',
      },
      Split: {
        aye: 'u128',
        nay: 'u128'
      }
    }
  },
  /**
   * Lookup115: pallet_democracy::types::MetadataOwner
   **/
  PalletDemocracyMetadataOwner: {
    _enum: {
      External: 'Null',
      Proposal: 'u32',
      Referendum: 'u32'
    }
  },
  /**
   * Lookup116: pallet_collective::pallet::Event<T, I>
   **/
  PalletCollectiveEvent: {
    _enum: {
      Proposed: {
        account: 'AccountId32',
        proposalIndex: 'u32',
        proposalHash: 'H256',
        threshold: 'u32',
      },
      Voted: {
        account: 'AccountId32',
        proposalHash: 'H256',
        voted: 'bool',
        yes: 'u32',
        no: 'u32',
      },
      Approved: {
        proposalHash: 'H256',
      },
      Disapproved: {
        proposalHash: 'H256',
      },
      Executed: {
        proposalHash: 'H256',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      MemberExecuted: {
        proposalHash: 'H256',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      Closed: {
        proposalHash: 'H256',
        yes: 'u32',
        no: 'u32'
      }
    }
  },
  /**
   * Lookup117: pallet_treasury::pallet::Event<T, I>
   **/
  PalletTreasuryEvent: {
    _enum: {
      Proposed: {
        proposalIndex: 'u32',
      },
      Spending: {
        budgetRemaining: 'u128',
      },
      Awarded: {
        proposalIndex: 'u32',
        award: 'u128',
        account: 'AccountId32',
      },
      Rejected: {
        proposalIndex: 'u32',
        slashed: 'u128',
      },
      Burnt: {
        burntFunds: 'u128',
      },
      Rollover: {
        rolloverBalance: 'u128',
      },
      Deposit: {
        value: 'u128',
      },
      SpendApproved: {
        proposalIndex: 'u32',
        amount: 'u128',
        beneficiary: 'AccountId32',
      },
      UpdatedInactive: {
        reactivated: 'u128',
        deactivated: 'u128'
      }
    }
  },
  /**
   * Lookup118: pallet_bounties::pallet::Event<T, I>
   **/
  PalletBountiesEvent: {
    _enum: {
      BountyProposed: {
        index: 'u32',
      },
      BountyRejected: {
        index: 'u32',
        bond: 'u128',
      },
      BountyBecameActive: {
        index: 'u32',
      },
      BountyAwarded: {
        index: 'u32',
        beneficiary: 'AccountId32',
      },
      BountyClaimed: {
        index: 'u32',
        payout: 'u128',
        beneficiary: 'AccountId32',
      },
      BountyCanceled: {
        index: 'u32',
      },
      BountyExtended: {
        index: 'u32'
      }
    }
  },
  /**
   * Lookup119: pallet_lottery::pallet::Event<T>
   **/
  PalletLotteryEvent: {
    _enum: {
      LotteryStarted: 'Null',
      CallsUpdated: 'Null',
      Winner: {
        winner: 'AccountId32',
        lotteryBalance: 'u128',
      },
      TicketBought: {
        who: 'AccountId32',
        callIndex: '(u8,u8)'
      }
    }
  },
  /**
   * Lookup122: pallet_membership::pallet::Event<T, I>
   **/
  PalletMembershipEvent: {
    _enum: ['MemberAdded', 'MemberRemoved', 'MembersSwapped', 'MembersReset', 'KeyChanged', 'Dummy']
  },
  /**
   * Lookup123: pallet_elections_phragmen::pallet::Event<T>
   **/
  PalletElectionsPhragmenEvent: {
    _enum: {
      NewTerm: {
        newMembers: 'Vec<(AccountId32,u128)>',
      },
      EmptyTerm: 'Null',
      ElectionError: 'Null',
      MemberKicked: {
        member: 'AccountId32',
      },
      Renounced: {
        candidate: 'AccountId32',
      },
      CandidateSlashed: {
        candidate: 'AccountId32',
        amount: 'u128',
      },
      SeatHolderSlashed: {
        seatHolder: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup126: pallet_tips::pallet::Event<T, I>
   **/
  PalletTipsEvent: {
    _enum: {
      NewTip: {
        tipHash: 'H256',
      },
      TipClosing: {
        tipHash: 'H256',
      },
      TipClosed: {
        tipHash: 'H256',
        who: 'AccountId32',
        payout: 'u128',
      },
      TipRetracted: {
        tipHash: 'H256',
      },
      TipSlashed: {
        tipHash: 'H256',
        finder: 'AccountId32',
        deposit: 'u128'
      }
    }
  },
  /**
   * Lookup127: pallet_child_bounties::pallet::Event<T>
   **/
  PalletChildBountiesEvent: {
    _enum: {
      Added: {
        index: 'u32',
        childIndex: 'u32',
      },
      Awarded: {
        index: 'u32',
        childIndex: 'u32',
        beneficiary: 'AccountId32',
      },
      Claimed: {
        index: 'u32',
        childIndex: 'u32',
        payout: 'u128',
        beneficiary: 'AccountId32',
      },
      Canceled: {
        index: 'u32',
        childIndex: 'u32'
      }
    }
  },
  /**
   * Lookup128: subbridge_pallets::chainbridge::pallet::Event<T>
   **/
  SubbridgePalletsChainbridgePalletEvent: {
    _enum: {
      RelayerThresholdChanged: 'u32',
      ChainWhitelisted: 'u8',
      RelayerAdded: 'AccountId32',
      RelayerRemoved: 'AccountId32',
      FungibleTransfer: '(u8,u64,[u8;32],U256,Bytes)',
      NonFungibleTransfer: '(u8,u64,[u8;32],Bytes,Bytes,Bytes)',
      GenericTransfer: '(u8,u64,[u8;32],Bytes)',
      VoteFor: '(u8,u64,AccountId32)',
      VoteAgainst: '(u8,u64,AccountId32)',
      ProposalApproved: '(u8,u64)',
      ProposalRejected: '(u8,u64)',
      ProposalSucceeded: '(u8,u64)',
      ProposalFailed: '(u8,u64)',
      FeeUpdated: {
        destId: 'u8',
        fee: 'u128'
      }
    }
  },
  /**
   * Lookup131: subbridge_pallets::xcmbridge::pallet::Event<T>
   **/
  SubbridgePalletsXcmbridgePalletEvent: {
    _enum: {
      AssetTransfered: {
        asset: 'XcmV3MultiAsset',
        origin: 'XcmV3MultiLocation',
        dest: 'XcmV3MultiLocation'
      }
    }
  },
  /**
   * Lookup132: subbridge_pallets::xtransfer::pallet::Event<T>
   **/
  SubbridgePalletsXtransferPalletEvent: {
    _enum: {
      Withdrawn: {
        what: 'XcmV3MultiAsset',
        who: 'XcmV3MultiLocation',
        memo: 'Bytes',
      },
      Deposited: {
        what: 'XcmV3MultiAsset',
        who: 'XcmV3MultiLocation',
        memo: 'Bytes',
      },
      Forwarded: {
        what: 'XcmV3MultiAsset',
        who: 'XcmV3MultiLocation',
        memo: 'Bytes'
      }
    }
  },
  /**
   * Lookup133: phala_pallets::registry::pallet::Event<T>
   **/
  PhalaPalletsRegistryPalletEvent: {
    _enum: {
      GatekeeperAdded: {
        pubkey: 'SpCoreSr25519Public',
      },
      GatekeeperRemoved: {
        pubkey: 'SpCoreSr25519Public',
      },
      WorkerAdded: {
        pubkey: 'SpCoreSr25519Public',
        attestationProvider: 'Option<PhalaTypesAttestationProvider>',
        confidenceLevel: 'u8',
      },
      WorkerUpdated: {
        pubkey: 'SpCoreSr25519Public',
        attestationProvider: 'Option<PhalaTypesAttestationProvider>',
        confidenceLevel: 'u8',
      },
      MasterKeyRotated: {
        rotationId: 'u64',
        masterPubkey: 'SpCoreSr25519Public',
      },
      MasterKeyRotationFailed: {
        rotationLock: 'Option<u64>',
        gatekeeperRotationId: 'u64',
      },
      InitialScoreSet: {
        pubkey: 'SpCoreSr25519Public',
        initScore: 'u32',
      },
      MinimumPRuntimeVersionChangedTo: '(u32,u32,u32)',
      PRuntimeConsensusVersionChangedTo: 'u32'
    }
  },
  /**
   * Lookup134: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: '[u8;32]',
  /**
   * Lookup136: phala_types::AttestationProvider
   **/
  PhalaTypesAttestationProvider: {
    _enum: ['Root', 'Ias']
  },
  /**
   * Lookup138: phala_pallets::compute::computation::pallet::Event<T>
   **/
  PhalaPalletsComputeComputationPalletEvent: {
    _enum: {
      CoolDownExpirationChanged: {
        period: 'u64',
      },
      WorkerStarted: {
        session: 'AccountId32',
        initV: 'u128',
        initP: 'u32',
      },
      WorkerStopped: {
        session: 'AccountId32',
      },
      WorkerReclaimed: {
        session: 'AccountId32',
        originalStake: 'u128',
        slashed: 'u128',
      },
      SessionBound: {
        session: 'AccountId32',
        worker: 'SpCoreSr25519Public',
      },
      SessionUnbound: {
        session: 'AccountId32',
        worker: 'SpCoreSr25519Public',
      },
      WorkerEnterUnresponsive: {
        session: 'AccountId32',
      },
      WorkerExitUnresponsive: {
        session: 'AccountId32',
      },
      SessionSettled: {
        session: 'AccountId32',
        vBits: 'u128',
        payoutBits: 'u128',
      },
      InternalErrorWorkerSettleFailed: {
        worker: 'SpCoreSr25519Public',
      },
      SubsidyBudgetHalved: 'Null',
      InternalErrorWrongHalvingConfigured: 'Null',
      TokenomicParametersChanged: 'Null',
      SessionSettlementDropped: {
        session: 'AccountId32',
        v: 'u128',
        payout: 'u128',
      },
      BenchmarkUpdated: {
        session: 'AccountId32',
        pInstant: 'u32',
      },
      BudgetUpdated: {
        nonce: 'u64',
        budget: 'u128'
      }
    }
  },
  /**
   * Lookup139: phala_pallets::stake_pool::pallet::Event<T>
   **/
  PhalaPalletsStakePoolPalletEvent: 'Null',
  /**
   * Lookup140: pallet_assets::pallet::Event<T, I>
   **/
  PalletAssetsEvent: {
    _enum: {
      Created: {
        assetId: 'u32',
        creator: 'AccountId32',
        owner: 'AccountId32',
      },
      Issued: {
        assetId: 'u32',
        owner: 'AccountId32',
        amount: 'u128',
      },
      Transferred: {
        assetId: 'u32',
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
      },
      Burned: {
        assetId: 'u32',
        owner: 'AccountId32',
        balance: 'u128',
      },
      TeamChanged: {
        assetId: 'u32',
        issuer: 'AccountId32',
        admin: 'AccountId32',
        freezer: 'AccountId32',
      },
      OwnerChanged: {
        assetId: 'u32',
        owner: 'AccountId32',
      },
      Frozen: {
        assetId: 'u32',
        who: 'AccountId32',
      },
      Thawed: {
        assetId: 'u32',
        who: 'AccountId32',
      },
      AssetFrozen: {
        assetId: 'u32',
      },
      AssetThawed: {
        assetId: 'u32',
      },
      AccountsDestroyed: {
        assetId: 'u32',
        accountsDestroyed: 'u32',
        accountsRemaining: 'u32',
      },
      ApprovalsDestroyed: {
        assetId: 'u32',
        approvalsDestroyed: 'u32',
        approvalsRemaining: 'u32',
      },
      DestructionStarted: {
        assetId: 'u32',
      },
      Destroyed: {
        assetId: 'u32',
      },
      ForceCreated: {
        assetId: 'u32',
        owner: 'AccountId32',
      },
      MetadataSet: {
        assetId: 'u32',
        name: 'Bytes',
        symbol: 'Bytes',
        decimals: 'u8',
        isFrozen: 'bool',
      },
      MetadataCleared: {
        assetId: 'u32',
      },
      ApprovedTransfer: {
        assetId: 'u32',
        source: 'AccountId32',
        delegate: 'AccountId32',
        amount: 'u128',
      },
      ApprovalCancelled: {
        assetId: 'u32',
        owner: 'AccountId32',
        delegate: 'AccountId32',
      },
      TransferredApproved: {
        assetId: 'u32',
        owner: 'AccountId32',
        delegate: 'AccountId32',
        destination: 'AccountId32',
        amount: 'u128',
      },
      AssetStatusChanged: {
        assetId: 'u32',
      },
      AssetMinBalanceChanged: {
        assetId: 'u32',
        newMinBalance: 'u128'
      }
    }
  },
  /**
   * Lookup141: assets_registry::pallet::Event<T>
   **/
  AssetsRegistryEvent: {
    _enum: {
      AssetRegistered: {
        assetId: 'u32',
        location: 'XcmV3MultiLocation',
      },
      AssetUnregistered: {
        assetId: 'u32',
        location: 'XcmV3MultiLocation',
      },
      ChainbridgeEnabled: {
        assetId: 'u32',
        chainId: 'u8',
        resourceId: '[u8;32]',
      },
      ChainbridgeDisabled: {
        assetId: 'u32',
        chainId: 'u8',
        resourceId: '[u8;32]',
      },
      SygmabridgeEnabled: {
        assetId: 'u32',
        domainId: 'u8',
        resourceId: '[u8;32]',
      },
      SygmabridgeDisabled: {
        assetId: 'u32',
        domainId: 'u8',
        resourceId: '[u8;32]',
      },
      ForceMinted: {
        assetId: 'u32',
        beneficiary: 'AccountId32',
        amount: 'u128',
      },
      ForceBurnt: {
        assetId: 'u32',
        who: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup142: phala_pallets::compute::stake_pool_v2::pallet::Event<T>
   **/
  PhalaPalletsComputeStakePoolV2PalletEvent: {
    _enum: {
      PoolCreated: {
        owner: 'AccountId32',
        pid: 'u64',
        cid: 'u32',
        poolAccountId: 'AccountId32',
      },
      PoolCommissionSet: {
        pid: 'u64',
        commission: 'u32',
      },
      PoolCapacitySet: {
        pid: 'u64',
        cap: 'u128',
      },
      PoolWorkerAdded: {
        pid: 'u64',
        worker: 'SpCoreSr25519Public',
        session: 'AccountId32',
      },
      Contribution: {
        pid: 'u64',
        user: 'AccountId32',
        amount: 'u128',
        shares: 'u128',
        asVault: 'Option<u64>',
      },
      OwnerRewardsWithdrawn: {
        pid: 'u64',
        user: 'AccountId32',
        amount: 'u128',
      },
      PoolSlashed: {
        pid: 'u64',
        amount: 'u128',
      },
      SlashSettled: {
        pid: 'u64',
        user: 'AccountId32',
        amount: 'u128',
      },
      RewardDismissedNotInPool: {
        worker: 'SpCoreSr25519Public',
        amount: 'u128',
      },
      RewardDismissedNoShare: {
        pid: 'u64',
        amount: 'u128',
      },
      RewardDismissedDust: {
        pid: 'u64',
        amount: 'u128',
      },
      PoolWorkerRemoved: {
        pid: 'u64',
        worker: 'SpCoreSr25519Public',
      },
      WorkerReclaimed: {
        pid: 'u64',
        worker: 'SpCoreSr25519Public',
      },
      RewardReceived: {
        pid: 'u64',
        toOwner: 'u128',
        toStakers: 'u128',
      },
      WorkingStarted: {
        pid: 'u64',
        worker: 'SpCoreSr25519Public',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup143: phala_pallets::compute::vault::pallet::Event<T>
   **/
  PhalaPalletsComputeVaultPalletEvent: {
    _enum: {
      PoolCreated: {
        owner: 'AccountId32',
        pid: 'u64',
        cid: 'u32',
        poolAccountId: 'AccountId32',
      },
      VaultCommissionSet: {
        pid: 'u64',
        commission: 'u32',
      },
      OwnerSharesClaimed: {
        pid: 'u64',
        user: 'AccountId32',
        shares: 'u128',
      },
      OwnerSharesGained: {
        pid: 'u64',
        shares: 'u128',
        checkoutPrice: 'u128',
      },
      Contribution: {
        pid: 'u64',
        user: 'AccountId32',
        amount: 'u128',
        shares: 'u128'
      }
    }
  },
  /**
   * Lookup144: phala_pallets::compute::wrapped_balances::pallet::Event<T>
   **/
  PhalaPalletsComputeWrappedBalancesPalletEvent: {
    _enum: {
      DustRemoved: {
        user: 'AccountId32',
        amount: 'u128',
      },
      Wrapped: {
        user: 'AccountId32',
        amount: 'u128',
      },
      Unwrapped: {
        user: 'AccountId32',
        amount: 'u128',
      },
      Voted: {
        user: 'AccountId32',
        voteId: 'u32',
        ayeAmount: 'u128',
        nayAmount: 'u128'
      }
    }
  },
  /**
   * Lookup145: phala_pallets::compute::base_pool::pallet::Event<T>
   **/
  PhalaPalletsComputeBasePoolPalletEvent: {
    _enum: {
      NftCreated: {
        pid: 'u64',
        cid: 'u32',
        nftId: 'u32',
        owner: 'AccountId32',
        shares: 'u128',
      },
      WithdrawalQueued: {
        pid: 'u64',
        user: 'AccountId32',
        shares: 'u128',
        nftId: 'u32',
        asVault: 'Option<u64>',
      },
      Withdrawal: {
        pid: 'u64',
        user: 'AccountId32',
        amount: 'u128',
        shares: 'u128',
      },
      PoolWhitelistCreated: {
        pid: 'u64',
      },
      PoolWhitelistDeleted: {
        pid: 'u64',
      },
      PoolWhitelistStakerAdded: {
        pid: 'u64',
        staker: 'AccountId32',
      },
      PoolWhitelistStakerRemoved: {
        pid: 'u64',
        staker: 'AccountId32'
      }
    }
  },
  /**
   * Lookup146: pallet_uniques::pallet::Event<T, I>
   **/
  PalletUniquesEvent: {
    _enum: {
      Created: {
        collection: 'u32',
        creator: 'AccountId32',
        owner: 'AccountId32',
      },
      ForceCreated: {
        collection: 'u32',
        owner: 'AccountId32',
      },
      Destroyed: {
        collection: 'u32',
      },
      Issued: {
        collection: 'u32',
        item: 'u32',
        owner: 'AccountId32',
      },
      Transferred: {
        collection: 'u32',
        item: 'u32',
        from: 'AccountId32',
        to: 'AccountId32',
      },
      Burned: {
        collection: 'u32',
        item: 'u32',
        owner: 'AccountId32',
      },
      Frozen: {
        collection: 'u32',
        item: 'u32',
      },
      Thawed: {
        collection: 'u32',
        item: 'u32',
      },
      CollectionFrozen: {
        collection: 'u32',
      },
      CollectionThawed: {
        collection: 'u32',
      },
      OwnerChanged: {
        collection: 'u32',
        newOwner: 'AccountId32',
      },
      TeamChanged: {
        collection: 'u32',
        issuer: 'AccountId32',
        admin: 'AccountId32',
        freezer: 'AccountId32',
      },
      ApprovedTransfer: {
        collection: 'u32',
        item: 'u32',
        owner: 'AccountId32',
        delegate: 'AccountId32',
      },
      ApprovalCancelled: {
        collection: 'u32',
        item: 'u32',
        owner: 'AccountId32',
        delegate: 'AccountId32',
      },
      ItemStatusChanged: {
        collection: 'u32',
      },
      CollectionMetadataSet: {
        collection: 'u32',
        data: 'Bytes',
        isFrozen: 'bool',
      },
      CollectionMetadataCleared: {
        collection: 'u32',
      },
      MetadataSet: {
        collection: 'u32',
        item: 'u32',
        data: 'Bytes',
        isFrozen: 'bool',
      },
      MetadataCleared: {
        collection: 'u32',
        item: 'u32',
      },
      Redeposited: {
        collection: 'u32',
        successfulItems: 'Vec<u32>',
      },
      AttributeSet: {
        collection: 'u32',
        maybeItem: 'Option<u32>',
        key: 'Bytes',
        value: 'Bytes',
      },
      AttributeCleared: {
        collection: 'u32',
        maybeItem: 'Option<u32>',
        key: 'Bytes',
      },
      OwnershipAcceptanceChanged: {
        who: 'AccountId32',
        maybeCollection: 'Option<u32>',
      },
      CollectionMaxSupplySet: {
        collection: 'u32',
        maxSupply: 'u32',
      },
      ItemPriceSet: {
        collection: 'u32',
        item: 'u32',
        price: 'u128',
        whitelistedBuyer: 'Option<AccountId32>',
      },
      ItemPriceRemoved: {
        collection: 'u32',
        item: 'u32',
      },
      ItemBought: {
        collection: 'u32',
        item: 'u32',
        price: 'u128',
        seller: 'AccountId32',
        buyer: 'AccountId32'
      }
    }
  },
  /**
   * Lookup153: pallet_rmrk_core::pallet::Event<T>
   **/
  PalletRmrkCoreEvent: {
    _enum: {
      CollectionCreated: {
        issuer: 'AccountId32',
        collectionId: 'u32',
      },
      NftMinted: {
        owner: 'RmrkTraitsNftAccountIdOrCollectionNftTuple',
        collectionId: 'u32',
        nftId: 'u32',
      },
      NFTBurned: {
        owner: 'AccountId32',
        collectionId: 'u32',
        nftId: 'u32',
      },
      CollectionDestroyed: {
        issuer: 'AccountId32',
        collectionId: 'u32',
      },
      NFTSent: {
        sender: 'AccountId32',
        recipient: 'RmrkTraitsNftAccountIdOrCollectionNftTuple',
        collectionId: 'u32',
        nftId: 'u32',
        approvalRequired: 'bool',
      },
      NFTAccepted: {
        sender: 'AccountId32',
        recipient: 'RmrkTraitsNftAccountIdOrCollectionNftTuple',
        collectionId: 'u32',
        nftId: 'u32',
      },
      NFTRejected: {
        sender: 'AccountId32',
        collectionId: 'u32',
        nftId: 'u32',
      },
      IssuerChanged: {
        oldIssuer: 'AccountId32',
        newIssuer: 'AccountId32',
        collectionId: 'u32',
      },
      PropertySet: {
        collectionId: 'u32',
        maybeNftId: 'Option<u32>',
        key: 'Bytes',
        value: 'Bytes',
      },
      PropertyRemoved: {
        collectionId: 'u32',
        maybeNftId: 'Option<u32>',
        key: 'Bytes',
      },
      PropertiesRemoved: {
        collectionId: 'u32',
        maybeNftId: 'Option<u32>',
      },
      CollectionLocked: {
        issuer: 'AccountId32',
        collectionId: 'u32',
      },
      ResourceAdded: {
        nftId: 'u32',
        resourceId: 'u32',
        collectionId: 'u32',
      },
      ResourceReplaced: {
        nftId: 'u32',
        resourceId: 'u32',
        collectionId: 'u32',
      },
      ResourceAccepted: {
        nftId: 'u32',
        resourceId: 'u32',
        collectionId: 'u32',
      },
      ResourceRemoval: {
        nftId: 'u32',
        resourceId: 'u32',
        collectionId: 'u32',
      },
      ResourceRemovalAccepted: {
        nftId: 'u32',
        resourceId: 'u32',
        collectionId: 'u32',
      },
      PrioritySet: {
        collectionId: 'u32',
        nftId: 'u32'
      }
    }
  },
  /**
   * Lookup154: rmrk_traits::nft::AccountIdOrCollectionNftTuple<sp_core::crypto::AccountId32, CollectionId, NftId>
   **/
  RmrkTraitsNftAccountIdOrCollectionNftTuple: {
    _enum: {
      AccountId: 'AccountId32',
      CollectionAndNftTuple: '(u32,u32)'
    }
  },
  /**
   * Lookup155: pallet_rmrk_equip::pallet::Event<T>
   **/
  PalletRmrkEquipEvent: {
    _enum: {
      BaseCreated: {
        issuer: 'AccountId32',
        baseId: 'u32',
      },
      SlotEquipped: {
        itemCollection: 'u32',
        itemNft: 'u32',
        baseId: 'u32',
        slotId: 'u32',
      },
      SlotUnequipped: {
        itemCollection: 'u32',
        itemNft: 'u32',
        baseId: 'u32',
        slotId: 'u32',
      },
      EquippablesUpdated: {
        baseId: 'u32',
        slotId: 'u32',
      },
      BaseIssuerChanged: {
        oldIssuer: 'AccountId32',
        newIssuer: 'AccountId32',
        baseId: 'u32'
      }
    }
  },
  /**
   * Lookup156: pallet_rmrk_market::pallet::Event<T>
   **/
  PalletRmrkMarketEvent: {
    _enum: {
      TokenPriceUpdated: {
        owner: 'AccountId32',
        collectionId: 'u32',
        nftId: 'u32',
        price: 'Option<u128>',
      },
      TokenSold: {
        owner: 'AccountId32',
        buyer: 'AccountId32',
        collectionId: 'u32',
        nftId: 'u32',
        price: 'u128',
      },
      TokenListed: {
        owner: 'AccountId32',
        collectionId: 'u32',
        nftId: 'u32',
        price: 'u128',
      },
      TokenUnlisted: {
        owner: 'AccountId32',
        collectionId: 'u32',
        nftId: 'u32',
      },
      OfferPlaced: {
        offerer: 'AccountId32',
        collectionId: 'u32',
        nftId: 'u32',
        price: 'u128',
      },
      OfferWithdrawn: {
        sender: 'AccountId32',
        collectionId: 'u32',
        nftId: 'u32',
      },
      OfferAccepted: {
        owner: 'AccountId32',
        buyer: 'AccountId32',
        collectionId: 'u32',
        nftId: 'u32',
      },
      RoyaltyFeePaid: {
        sender: 'AccountId32',
        royaltyOwner: 'AccountId32',
        collectionId: 'u32',
        nftId: 'u32',
        amount: 'u128',
      },
      MarketFeePaid: {
        sender: 'AccountId32',
        marketplaceOwner: 'AccountId32',
        collectionId: 'u32',
        nftId: 'u32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup158: pallet_phala_world::nft_sale::pallet::Event<T>
   **/
  PalletPhalaWorldNftSalePalletEvent: {
    _enum: {
      WorldClockStarted: {
        startTime: 'u64',
      },
      NewEra: {
        time: 'u64',
        era: 'u64',
      },
      SpiritClaimed: {
        owner: 'AccountId32',
        collectionId: 'u32',
        nftId: 'u32',
      },
      OriginOfShellPreordered: {
        owner: 'AccountId32',
        preorderId: 'u32',
        race: 'PalletPhalaWorldRaceType',
        career: 'PalletPhalaWorldCareerType',
      },
      OriginOfShellMinted: {
        rarityType: 'PalletPhalaWorldRarityType',
        collectionId: 'u32',
        nftId: 'u32',
        owner: 'AccountId32',
        race: 'PalletPhalaWorldRaceType',
        career: 'PalletPhalaWorldCareerType',
        generationId: 'u32',
      },
      SpiritCollectionIdSet: {
        collectionId: 'u32',
      },
      OriginOfShellCollectionIdSet: {
        collectionId: 'u32',
      },
      OriginOfShellInventoryUpdated: {
        rarityType: 'PalletPhalaWorldRarityType',
      },
      ClaimSpiritStatusChanged: {
        status: 'bool',
      },
      PurchaseRareOriginOfShellsStatusChanged: {
        status: 'bool',
      },
      PurchasePrimeOriginOfShellsStatusChanged: {
        status: 'bool',
      },
      PreorderOriginOfShellsStatusChanged: {
        status: 'bool',
      },
      ChosenPreorderMinted: {
        preorderId: 'u32',
        owner: 'AccountId32',
        nftId: 'u32',
      },
      NotChosenPreorderRefunded: {
        preorderId: 'u32',
        owner: 'AccountId32',
      },
      LastDayOfSaleStatusChanged: {
        status: 'bool',
      },
      OverlordChanged: {
        oldOverlord: 'Option<AccountId32>',
        newOverlord: 'AccountId32',
      },
      OriginOfShellsInventoryWasSet: {
        status: 'bool',
      },
      OriginOfShellGiftedToOwner: {
        owner: 'AccountId32',
        nftSaleType: 'PalletPhalaWorldNftSaleType',
      },
      SpiritsMetadataSet: {
        spiritsMetadata: 'Bytes',
      },
      OriginOfShellsMetadataSet: {
        originOfShellsMetadata: 'Vec<(PalletPhalaWorldRaceType,Bytes)>',
      },
      PayeeChanged: {
        oldPayee: 'Option<AccountId32>',
        newPayee: 'AccountId32',
      },
      SignerChanged: {
        oldSigner: 'Option<AccountId32>',
        newSigner: 'AccountId32'
      }
    }
  },
  /**
   * Lookup159: pallet_phala_world::traits::RaceType
   **/
  PalletPhalaWorldRaceType: {
    _enum: ['Cyborg', 'AISpectre', 'XGene', 'Pandroid']
  },
  /**
   * Lookup160: pallet_phala_world::traits::CareerType
   **/
  PalletPhalaWorldCareerType: {
    _enum: ['HackerWizard', 'HardwareDruid', 'RoboWarrior', 'TradeNegotiator', 'Web3Monk']
  },
  /**
   * Lookup161: pallet_phala_world::traits::RarityType
   **/
  PalletPhalaWorldRarityType: {
    _enum: ['Prime', 'Magic', 'Legendary']
  },
  /**
   * Lookup162: pallet_phala_world::traits::NftSaleType
   **/
  PalletPhalaWorldNftSaleType: {
    _enum: ['ForSale', 'Giveaway', 'Reserved']
  },
  /**
   * Lookup165: pallet_phala_world::incubation::pallet::Event<T>
   **/
  PalletPhalaWorldIncubationPalletEvent: {
    _enum: {
      CanStartIncubationStatusChanged: {
        status: 'bool',
        startTime: 'u64',
        officialHatchTime: 'u64',
      },
      StartedIncubation: {
        collectionId: 'u32',
        nftId: 'u32',
        owner: 'AccountId32',
        startTime: 'u64',
        hatchTime: 'u64',
      },
      OriginOfShellReceivedFood: {
        collectionId: 'u32',
        nftId: 'u32',
        sender: 'AccountId32',
        era: 'u64',
      },
      OriginOfShellChosenPartsUpdated: {
        collectionId: 'u32',
        nftId: 'u32',
        oldChosenParts: 'Option<PalletPhalaWorldShellParts>',
        newChosenParts: 'PalletPhalaWorldShellParts',
      },
      ShellCollectionIdSet: {
        collectionId: 'u32',
      },
      ShellPartsCollectionIdSet: {
        collectionId: 'u32',
      },
      ShellPartMinted: {
        shellPartsCollectionId: 'u32',
        shellPartNftId: 'u32',
        parentShellCollectionId: 'u32',
        parentShellNftId: 'u32',
        owner: 'AccountId32',
      },
      ShellAwakened: {
        shellCollectionId: 'u32',
        shellNftId: 'u32',
        rarity: 'PalletPhalaWorldRarityType',
        career: 'PalletPhalaWorldCareerType',
        race: 'PalletPhalaWorldRaceType',
        generationId: 'u32',
        originOfShellCollectionId: 'u32',
        originOfShellNftId: 'u32',
        owner: 'AccountId32'
      }
    }
  },
  /**
   * Lookup167: pallet_phala_world::traits::ShellParts<bounded_collections::bounded_vec::BoundedVec<T, S>, pallet_phala_world::traits::ShellPartInfo<bounded_collections::bounded_vec::BoundedVec<T, S>, bounded_collections::bounded_vec::BoundedVec<pallet_phala_world::traits::PartInfo<bounded_collections::bounded_vec::BoundedVec<T, S>>, S>>>
   **/
  PalletPhalaWorldShellParts: {
    parts: 'BTreeMap<Bytes, PalletPhalaWorldShellPartInfo>'
  },
  /**
   * Lookup168: pallet_phala_world::traits::ShellPartInfo<bounded_collections::bounded_vec::BoundedVec<T, S>, bounded_collections::bounded_vec::BoundedVec<pallet_phala_world::traits::PartInfo<bounded_collections::bounded_vec::BoundedVec<T, S>>, S>>
   **/
  PalletPhalaWorldShellPartInfo: {
    shellPart: 'PalletPhalaWorldPartInfo',
    subParts: 'Option<Vec<PalletPhalaWorldPartInfo>>'
  },
  /**
   * Lookup170: pallet_phala_world::traits::PartInfo<bounded_collections::bounded_vec::BoundedVec<T, S>>
   **/
  PalletPhalaWorldPartInfo: {
    name: 'Bytes',
    rarity: 'PalletPhalaWorldPartRarityType',
    race: 'Option<PalletPhalaWorldRaceType>',
    career: 'Option<PalletPhalaWorldCareerType>',
    sizes: 'Option<Vec<PalletPhalaWorldPartSizeType>>',
    style: 'Option<Bytes>',
    metadata: 'Option<Bytes>',
    layer: 'u32',
    x: 'u32',
    y: 'u32',
    tradeable: 'bool'
  },
  /**
   * Lookup171: pallet_phala_world::traits::PartRarityType
   **/
  PalletPhalaWorldPartRarityType: {
    _enum: ['Normal', 'Rare', 'Epic', 'Legend']
  },
  /**
   * Lookup176: pallet_phala_world::traits::PartSizeType
   **/
  PalletPhalaWorldPartSizeType: {
    _enum: ['MA', 'MB', 'MC', 'FA', 'FB', 'FC', 'XA', 'XB', 'XC', 'PA', 'PB', 'PC', 'PD', 'AA']
  },
  /**
   * Lookup184: pallet_phala_world::marketplace::pallet::Event<T>
   **/
  PalletPhalaWorldMarketplacePalletEvent: {
    _enum: {
      MarketplaceOwnerSet: {
        oldMarketplaceOwner: 'Option<AccountId32>',
        newMarketplaceOwner: 'AccountId32',
      },
      RoyaltyInfoUpdated: {
        collectionId: 'u32',
        nftId: 'u32',
        oldRoyaltyInfo: 'Option<RmrkTraitsNftRoyaltyInfo>',
        newRoyaltyInfo: 'RmrkTraitsNftRoyaltyInfo'
      }
    }
  },
  /**
   * Lookup186: rmrk_traits::nft::RoyaltyInfo<sp_core::crypto::AccountId32, sp_arithmetic::per_things::Permill>
   **/
  RmrkTraitsNftRoyaltyInfo: {
    recipient: 'AccountId32',
    amount: 'Permill'
  },
  /**
   * Lookup188: pallet_index::pallet::Event<T>
   **/
  PalletIndexEvent: {
    _enum: {
      WorkerAdd: {
        worker: 'AccountId32',
      },
      WorkerRemove: {
        worker: 'AccountId32',
      },
      NewTask: {
        depositInfo: 'PalletIndexDepositInfo',
      },
      Claimed: {
        tasks: 'Vec<[u8;32]>'
      }
    }
  },
  /**
   * Lookup189: pallet_index::pallet::DepositInfo<sp_core::crypto::AccountId32>
   **/
  PalletIndexDepositInfo: {
    sender: 'AccountId32',
    asset: 'XcmV3MultiassetAssetId',
    amount: 'u128',
    recipient: 'Bytes',
    task: 'Bytes'
  },
  /**
   * Lookup191: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup194: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup196: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
      remark: {
        remark: 'Bytes',
      },
      set_heap_pages: {
        pages: 'u64',
      },
      set_code: {
        code: 'Bytes',
      },
      set_code_without_checks: {
        code: 'Bytes',
      },
      set_storage: {
        items: 'Vec<(Bytes,Bytes)>',
      },
      kill_storage: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'Vec<Bytes>',
      },
      kill_prefix: {
        prefix: 'Bytes',
        subkeys: 'u32',
      },
      remark_with_event: {
        remark: 'Bytes'
      }
    }
  },
  /**
   * Lookup200: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'SpWeightsWeightV2Weight',
    maxBlock: 'SpWeightsWeightV2Weight',
    perClass: 'FrameSupportDispatchPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup201: frame_support::dispatch::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportDispatchPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup202: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'SpWeightsWeightV2Weight',
    maxExtrinsic: 'Option<SpWeightsWeightV2Weight>',
    maxTotal: 'Option<SpWeightsWeightV2Weight>',
    reserved: 'Option<SpWeightsWeightV2Weight>'
  },
  /**
   * Lookup204: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportDispatchPerDispatchClassU32'
  },
  /**
   * Lookup205: frame_support::dispatch::PerDispatchClass<T>
   **/
  FrameSupportDispatchPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup206: sp_weights::RuntimeDbWeight
   **/
  SpWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup207: sp_version::RuntimeVersion
   **/
  SpVersionRuntimeVersion: {
    specName: 'Text',
    implName: 'Text',
    authoringVersion: 'u32',
    specVersion: 'u32',
    implVersion: 'u32',
    apis: 'Vec<([u8;8],u32)>',
    transactionVersion: 'u32',
    stateVersion: 'u8'
  },
  /**
   * Lookup211: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered']
  },
  /**
   * Lookup212: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup214: pallet_utility::pallet::Call<T>
   **/
  PalletUtilityCall: {
    _enum: {
      batch: {
        calls: 'Vec<Call>',
      },
      as_derivative: {
        index: 'u16',
        call: 'Call',
      },
      batch_all: {
        calls: 'Vec<Call>',
      },
      dispatch_as: {
        asOrigin: 'KhalaParachainRuntimeOriginCaller',
        call: 'Call',
      },
      force_batch: {
        calls: 'Vec<Call>',
      },
      with_weight: {
        call: 'Call',
        weight: 'SpWeightsWeightV2Weight'
      }
    }
  },
  /**
   * Lookup217: pallet_multisig::pallet::Call<T>
   **/
  PalletMultisigCall: {
    _enum: {
      as_multi_threshold_1: {
        otherSignatories: 'Vec<AccountId32>',
        call: 'Call',
      },
      as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        maybeTimepoint: 'Option<PalletMultisigTimepoint>',
        call: 'Call',
        maxWeight: 'SpWeightsWeightV2Weight',
      },
      approve_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        maybeTimepoint: 'Option<PalletMultisigTimepoint>',
        callHash: '[u8;32]',
        maxWeight: 'SpWeightsWeightV2Weight',
      },
      cancel_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        timepoint: 'PalletMultisigTimepoint',
        callHash: '[u8;32]'
      }
    }
  },
  /**
   * Lookup219: pallet_proxy::pallet::Call<T>
   **/
  PalletProxyCall: {
    _enum: {
      proxy: {
        real: 'MultiAddress',
        forceProxyType: 'Option<KhalaParachainRuntimeProxyType>',
        call: 'Call',
      },
      add_proxy: {
        delegate: 'MultiAddress',
        proxyType: 'KhalaParachainRuntimeProxyType',
        delay: 'u32',
      },
      remove_proxy: {
        delegate: 'MultiAddress',
        proxyType: 'KhalaParachainRuntimeProxyType',
        delay: 'u32',
      },
      remove_proxies: 'Null',
      create_pure: {
        proxyType: 'KhalaParachainRuntimeProxyType',
        delay: 'u32',
        index: 'u16',
      },
      kill_pure: {
        spawner: 'MultiAddress',
        proxyType: 'KhalaParachainRuntimeProxyType',
        index: 'u16',
        height: 'Compact<u32>',
        extIndex: 'Compact<u32>',
      },
      announce: {
        real: 'MultiAddress',
        callHash: 'H256',
      },
      remove_announcement: {
        real: 'MultiAddress',
        callHash: 'H256',
      },
      reject_announcement: {
        delegate: 'MultiAddress',
        callHash: 'H256',
      },
      proxy_announced: {
        delegate: 'MultiAddress',
        real: 'MultiAddress',
        forceProxyType: 'Option<KhalaParachainRuntimeProxyType>',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup223: pallet_vesting::pallet::Call<T>
   **/
  PalletVestingCall: {
    _enum: {
      vest: 'Null',
      vest_other: {
        target: 'MultiAddress',
      },
      vested_transfer: {
        target: 'MultiAddress',
        schedule: 'PalletVestingVestingInfo',
      },
      force_vested_transfer: {
        source: 'MultiAddress',
        target: 'MultiAddress',
        schedule: 'PalletVestingVestingInfo',
      },
      merge_schedules: {
        schedule1Index: 'u32',
        schedule2Index: 'u32'
      }
    }
  },
  /**
   * Lookup224: pallet_vesting::vesting_info::VestingInfo<Balance, BlockNumber>
   **/
  PalletVestingVestingInfo: {
    locked: 'u128',
    perBlock: 'u128',
    startingBlock: 'u32'
  },
  /**
   * Lookup225: pallet_scheduler::pallet::Call<T>
   **/
  PalletSchedulerCall: {
    _enum: {
      schedule: {
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      cancel: {
        when: 'u32',
        index: 'u32',
      },
      schedule_named: {
        id: '[u8;32]',
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      cancel_named: {
        id: '[u8;32]',
      },
      schedule_after: {
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      schedule_named_after: {
        id: '[u8;32]',
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup227: pallet_preimage::pallet::Call<T>
   **/
  PalletPreimageCall: {
    _enum: {
      note_preimage: {
        bytes: 'Bytes',
      },
      unnote_preimage: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      request_preimage: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      unrequest_preimage: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup228: cumulus_pallet_parachain_system::pallet::Call<T>
   **/
  CumulusPalletParachainSystemCall: {
    _enum: {
      set_validation_data: {
        data: 'CumulusPrimitivesParachainInherentParachainInherentData',
      },
      sudo_send_upward_message: {
        message: 'Bytes',
      },
      authorize_upgrade: {
        codeHash: 'H256',
        checkVersion: 'bool',
      },
      enact_authorized_upgrade: {
        code: 'Bytes'
      }
    }
  },
  /**
   * Lookup229: cumulus_primitives_parachain_inherent::ParachainInherentData
   **/
  CumulusPrimitivesParachainInherentParachainInherentData: {
    validationData: 'PolkadotPrimitivesV2PersistedValidationData',
    relayChainState: 'SpTrieStorageProof',
    downwardMessages: 'Vec<PolkadotCorePrimitivesInboundDownwardMessage>',
    horizontalMessages: 'BTreeMap<u32, Vec<PolkadotCorePrimitivesInboundHrmpMessage>>'
  },
  /**
   * Lookup230: polkadot_primitives::v2::PersistedValidationData<primitive_types::H256, N>
   **/
  PolkadotPrimitivesV2PersistedValidationData: {
    parentHead: 'Bytes',
    relayParentNumber: 'u32',
    relayParentStorageRoot: 'H256',
    maxPovSize: 'u32'
  },
  /**
   * Lookup232: sp_trie::storage_proof::StorageProof
   **/
  SpTrieStorageProof: {
    trieNodes: 'BTreeSet<Bytes>'
  },
  /**
   * Lookup235: polkadot_core_primitives::InboundDownwardMessage<BlockNumber>
   **/
  PolkadotCorePrimitivesInboundDownwardMessage: {
    sentAt: 'u32',
    msg: 'Bytes'
  },
  /**
   * Lookup238: polkadot_core_primitives::InboundHrmpMessage<BlockNumber>
   **/
  PolkadotCorePrimitivesInboundHrmpMessage: {
    sentAt: 'u32',
    data: 'Bytes'
  },
  /**
   * Lookup241: cumulus_pallet_xcmp_queue::pallet::Call<T>
   **/
  CumulusPalletXcmpQueueCall: {
    _enum: {
      service_overweight: {
        index: 'u64',
        weightLimit: 'SpWeightsWeightV2Weight',
      },
      suspend_xcm_execution: 'Null',
      resume_xcm_execution: 'Null',
      update_suspend_threshold: {
        _alias: {
          new_: 'new',
        },
        new_: 'u32',
      },
      update_drop_threshold: {
        _alias: {
          new_: 'new',
        },
        new_: 'u32',
      },
      update_resume_threshold: {
        _alias: {
          new_: 'new',
        },
        new_: 'u32',
      },
      update_threshold_weight: {
        _alias: {
          new_: 'new',
        },
        new_: 'SpWeightsWeightV2Weight',
      },
      update_weight_restrict_decay: {
        _alias: {
          new_: 'new',
        },
        new_: 'SpWeightsWeightV2Weight',
      },
      update_xcmp_max_individual_weight: {
        _alias: {
          new_: 'new',
        },
        new_: 'SpWeightsWeightV2Weight'
      }
    }
  },
  /**
   * Lookup242: cumulus_pallet_dmp_queue::pallet::Call<T>
   **/
  CumulusPalletDmpQueueCall: {
    _enum: {
      service_overweight: {
        index: 'u64',
        weightLimit: 'SpWeightsWeightV2Weight'
      }
    }
  },
  /**
   * Lookup243: pallet_xcm::pallet::Call<T>
   **/
  PalletXcmCall: {
    _enum: {
      send: {
        dest: 'XcmVersionedMultiLocation',
        message: 'XcmVersionedXcm',
      },
      teleport_assets: {
        dest: 'XcmVersionedMultiLocation',
        beneficiary: 'XcmVersionedMultiLocation',
        assets: 'XcmVersionedMultiAssets',
        feeAssetItem: 'u32',
      },
      reserve_transfer_assets: {
        dest: 'XcmVersionedMultiLocation',
        beneficiary: 'XcmVersionedMultiLocation',
        assets: 'XcmVersionedMultiAssets',
        feeAssetItem: 'u32',
      },
      execute: {
        message: 'XcmVersionedXcm',
        maxWeight: 'SpWeightsWeightV2Weight',
      },
      force_xcm_version: {
        location: 'XcmV3MultiLocation',
        xcmVersion: 'u32',
      },
      force_default_xcm_version: {
        maybeXcmVersion: 'Option<u32>',
      },
      force_subscribe_version_notify: {
        location: 'XcmVersionedMultiLocation',
      },
      force_unsubscribe_version_notify: {
        location: 'XcmVersionedMultiLocation',
      },
      limited_reserve_transfer_assets: {
        dest: 'XcmVersionedMultiLocation',
        beneficiary: 'XcmVersionedMultiLocation',
        assets: 'XcmVersionedMultiAssets',
        feeAssetItem: 'u32',
        weightLimit: 'XcmV3WeightLimit',
      },
      limited_teleport_assets: {
        dest: 'XcmVersionedMultiLocation',
        beneficiary: 'XcmVersionedMultiLocation',
        assets: 'XcmVersionedMultiAssets',
        feeAssetItem: 'u32',
        weightLimit: 'XcmV3WeightLimit'
      }
    }
  },
  /**
   * Lookup244: xcm::VersionedXcm<RuntimeCall>
   **/
  XcmVersionedXcm: {
    _enum: {
      __Unused0: 'Null',
      __Unused1: 'Null',
      V2: 'XcmV2Xcm',
      V3: 'XcmV3Xcm'
    }
  },
  /**
   * Lookup245: xcm::v2::Xcm<RuntimeCall>
   **/
  XcmV2Xcm: 'Vec<XcmV2Instruction>',
  /**
   * Lookup247: xcm::v2::Instruction<RuntimeCall>
   **/
  XcmV2Instruction: {
    _enum: {
      WithdrawAsset: 'XcmV2MultiassetMultiAssets',
      ReserveAssetDeposited: 'XcmV2MultiassetMultiAssets',
      ReceiveTeleportedAsset: 'XcmV2MultiassetMultiAssets',
      QueryResponse: {
        queryId: 'Compact<u64>',
        response: 'XcmV2Response',
        maxWeight: 'Compact<u64>',
      },
      TransferAsset: {
        assets: 'XcmV2MultiassetMultiAssets',
        beneficiary: 'XcmV2MultiLocation',
      },
      TransferReserveAsset: {
        assets: 'XcmV2MultiassetMultiAssets',
        dest: 'XcmV2MultiLocation',
        xcm: 'XcmV2Xcm',
      },
      Transact: {
        originType: 'XcmV2OriginKind',
        requireWeightAtMost: 'Compact<u64>',
        call: 'XcmDoubleEncoded',
      },
      HrmpNewChannelOpenRequest: {
        sender: 'Compact<u32>',
        maxMessageSize: 'Compact<u32>',
        maxCapacity: 'Compact<u32>',
      },
      HrmpChannelAccepted: {
        recipient: 'Compact<u32>',
      },
      HrmpChannelClosing: {
        initiator: 'Compact<u32>',
        sender: 'Compact<u32>',
        recipient: 'Compact<u32>',
      },
      ClearOrigin: 'Null',
      DescendOrigin: 'XcmV2MultilocationJunctions',
      ReportError: {
        queryId: 'Compact<u64>',
        dest: 'XcmV2MultiLocation',
        maxResponseWeight: 'Compact<u64>',
      },
      DepositAsset: {
        assets: 'XcmV2MultiassetMultiAssetFilter',
        maxAssets: 'Compact<u32>',
        beneficiary: 'XcmV2MultiLocation',
      },
      DepositReserveAsset: {
        assets: 'XcmV2MultiassetMultiAssetFilter',
        maxAssets: 'Compact<u32>',
        dest: 'XcmV2MultiLocation',
        xcm: 'XcmV2Xcm',
      },
      ExchangeAsset: {
        give: 'XcmV2MultiassetMultiAssetFilter',
        receive: 'XcmV2MultiassetMultiAssets',
      },
      InitiateReserveWithdraw: {
        assets: 'XcmV2MultiassetMultiAssetFilter',
        reserve: 'XcmV2MultiLocation',
        xcm: 'XcmV2Xcm',
      },
      InitiateTeleport: {
        assets: 'XcmV2MultiassetMultiAssetFilter',
        dest: 'XcmV2MultiLocation',
        xcm: 'XcmV2Xcm',
      },
      QueryHolding: {
        queryId: 'Compact<u64>',
        dest: 'XcmV2MultiLocation',
        assets: 'XcmV2MultiassetMultiAssetFilter',
        maxResponseWeight: 'Compact<u64>',
      },
      BuyExecution: {
        fees: 'XcmV2MultiAsset',
        weightLimit: 'XcmV2WeightLimit',
      },
      RefundSurplus: 'Null',
      SetErrorHandler: 'XcmV2Xcm',
      SetAppendix: 'XcmV2Xcm',
      ClearError: 'Null',
      ClaimAsset: {
        assets: 'XcmV2MultiassetMultiAssets',
        ticket: 'XcmV2MultiLocation',
      },
      Trap: 'Compact<u64>',
      SubscribeVersion: {
        queryId: 'Compact<u64>',
        maxResponseWeight: 'Compact<u64>',
      },
      UnsubscribeVersion: 'Null'
    }
  },
  /**
   * Lookup248: xcm::v2::Response
   **/
  XcmV2Response: {
    _enum: {
      Null: 'Null',
      Assets: 'XcmV2MultiassetMultiAssets',
      ExecutionResult: 'Option<(u32,XcmV2TraitsError)>',
      Version: 'u32'
    }
  },
  /**
   * Lookup251: xcm::v2::traits::Error
   **/
  XcmV2TraitsError: {
    _enum: {
      Overflow: 'Null',
      Unimplemented: 'Null',
      UntrustedReserveLocation: 'Null',
      UntrustedTeleportLocation: 'Null',
      MultiLocationFull: 'Null',
      MultiLocationNotInvertible: 'Null',
      BadOrigin: 'Null',
      InvalidLocation: 'Null',
      AssetNotFound: 'Null',
      FailedToTransactAsset: 'Null',
      NotWithdrawable: 'Null',
      LocationCannotHold: 'Null',
      ExceedsMaxMessageSize: 'Null',
      DestinationUnsupported: 'Null',
      Transport: 'Null',
      Unroutable: 'Null',
      UnknownClaim: 'Null',
      FailedToDecode: 'Null',
      MaxWeightInvalid: 'Null',
      NotHoldingFees: 'Null',
      TooExpensive: 'Null',
      Trap: 'u64',
      UnhandledXcmVersion: 'Null',
      WeightLimitReached: 'u64',
      Barrier: 'Null',
      WeightNotComputable: 'Null'
    }
  },
  /**
   * Lookup252: xcm::v2::multiasset::MultiAssetFilter
   **/
  XcmV2MultiassetMultiAssetFilter: {
    _enum: {
      Definite: 'XcmV2MultiassetMultiAssets',
      Wild: 'XcmV2MultiassetWildMultiAsset'
    }
  },
  /**
   * Lookup253: xcm::v2::multiasset::WildMultiAsset
   **/
  XcmV2MultiassetWildMultiAsset: {
    _enum: {
      All: 'Null',
      AllOf: {
        id: 'XcmV2MultiassetAssetId',
        fun: 'XcmV2MultiassetWildFungibility'
      }
    }
  },
  /**
   * Lookup254: xcm::v2::multiasset::WildFungibility
   **/
  XcmV2MultiassetWildFungibility: {
    _enum: ['Fungible', 'NonFungible']
  },
  /**
   * Lookup255: xcm::v2::WeightLimit
   **/
  XcmV2WeightLimit: {
    _enum: {
      Unlimited: 'Null',
      Limited: 'Compact<u64>'
    }
  },
  /**
   * Lookup264: pallet_balances::pallet::Call<T, I>
   **/
  PalletBalancesCall: {
    _enum: {
      transfer: {
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      set_balance: {
        who: 'MultiAddress',
        newFree: 'Compact<u128>',
        newReserved: 'Compact<u128>',
      },
      force_transfer: {
        source: 'MultiAddress',
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      transfer_keep_alive: {
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      transfer_all: {
        dest: 'MultiAddress',
        keepAlive: 'bool',
      },
      force_unreserve: {
        who: 'MultiAddress',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup265: pallet_collator_selection::pallet::Call<T>
   **/
  PalletCollatorSelectionCall: {
    _enum: {
      set_invulnerables: {
        _alias: {
          new_: 'new',
        },
        new_: 'Vec<AccountId32>',
      },
      set_desired_candidates: {
        max: 'u32',
      },
      set_candidacy_bond: {
        bond: 'u128',
      },
      register_as_candidate: 'Null',
      leave_intent: 'Null'
    }
  },
  /**
   * Lookup266: pallet_session::pallet::Call<T>
   **/
  PalletSessionCall: {
    _enum: {
      set_keys: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'KhalaParachainRuntimeOpaqueSessionKeys',
        proof: 'Bytes',
      },
      purge_keys: 'Null'
    }
  },
  /**
   * Lookup267: khala_parachain_runtime::opaque::SessionKeys
   **/
  KhalaParachainRuntimeOpaqueSessionKeys: {
    aura: 'SpConsensusAuraSr25519AppSr25519Public'
  },
  /**
   * Lookup268: sp_consensus_aura::sr25519::app_sr25519::Public
   **/
  SpConsensusAuraSr25519AppSr25519Public: 'SpCoreSr25519Public',
  /**
   * Lookup269: pallet_identity::pallet::Call<T>
   **/
  PalletIdentityCall: {
    _enum: {
      add_registrar: {
        account: 'MultiAddress',
      },
      set_identity: {
        info: 'PalletIdentityIdentityInfo',
      },
      set_subs: {
        subs: 'Vec<(AccountId32,Data)>',
      },
      clear_identity: 'Null',
      request_judgement: {
        regIndex: 'Compact<u32>',
        maxFee: 'Compact<u128>',
      },
      cancel_request: {
        regIndex: 'u32',
      },
      set_fee: {
        index: 'Compact<u32>',
        fee: 'Compact<u128>',
      },
      set_account_id: {
        _alias: {
          new_: 'new',
        },
        index: 'Compact<u32>',
        new_: 'MultiAddress',
      },
      set_fields: {
        index: 'Compact<u32>',
        fields: 'PalletIdentityBitFlags',
      },
      provide_judgement: {
        regIndex: 'Compact<u32>',
        target: 'MultiAddress',
        judgement: 'PalletIdentityJudgement',
        identity: 'H256',
      },
      kill_identity: {
        target: 'MultiAddress',
      },
      add_sub: {
        sub: 'MultiAddress',
        data: 'Data',
      },
      rename_sub: {
        sub: 'MultiAddress',
        data: 'Data',
      },
      remove_sub: {
        sub: 'MultiAddress',
      },
      quit_sub: 'Null'
    }
  },
  /**
   * Lookup270: pallet_identity::types::IdentityInfo<FieldLimit>
   **/
  PalletIdentityIdentityInfo: {
    additional: 'Vec<(Data,Data)>',
    display: 'Data',
    legal: 'Data',
    web: 'Data',
    riot: 'Data',
    email: 'Data',
    pgpFingerprint: 'Option<[u8;20]>',
    image: 'Data',
    twitter: 'Data'
  },
  /**
   * Lookup306: pallet_identity::types::BitFlags<pallet_identity::types::IdentityField>
   **/
  PalletIdentityBitFlags: {
    _bitLength: 64,
    Display: 1,
    Legal: 2,
    Web: 4,
    Riot: 8,
    Email: 16,
    PgpFingerprint: 32,
    Image: 64,
    Twitter: 128
  },
  /**
   * Lookup307: pallet_identity::types::IdentityField
   **/
  PalletIdentityIdentityField: {
    _enum: ['__Unused0', 'Display', 'Legal', '__Unused3', 'Web', '__Unused5', '__Unused6', '__Unused7', 'Riot', '__Unused9', '__Unused10', '__Unused11', '__Unused12', '__Unused13', '__Unused14', '__Unused15', 'Email', '__Unused17', '__Unused18', '__Unused19', '__Unused20', '__Unused21', '__Unused22', '__Unused23', '__Unused24', '__Unused25', '__Unused26', '__Unused27', '__Unused28', '__Unused29', '__Unused30', '__Unused31', 'PgpFingerprint', '__Unused33', '__Unused34', '__Unused35', '__Unused36', '__Unused37', '__Unused38', '__Unused39', '__Unused40', '__Unused41', '__Unused42', '__Unused43', '__Unused44', '__Unused45', '__Unused46', '__Unused47', '__Unused48', '__Unused49', '__Unused50', '__Unused51', '__Unused52', '__Unused53', '__Unused54', '__Unused55', '__Unused56', '__Unused57', '__Unused58', '__Unused59', '__Unused60', '__Unused61', '__Unused62', '__Unused63', 'Image', '__Unused65', '__Unused66', '__Unused67', '__Unused68', '__Unused69', '__Unused70', '__Unused71', '__Unused72', '__Unused73', '__Unused74', '__Unused75', '__Unused76', '__Unused77', '__Unused78', '__Unused79', '__Unused80', '__Unused81', '__Unused82', '__Unused83', '__Unused84', '__Unused85', '__Unused86', '__Unused87', '__Unused88', '__Unused89', '__Unused90', '__Unused91', '__Unused92', '__Unused93', '__Unused94', '__Unused95', '__Unused96', '__Unused97', '__Unused98', '__Unused99', '__Unused100', '__Unused101', '__Unused102', '__Unused103', '__Unused104', '__Unused105', '__Unused106', '__Unused107', '__Unused108', '__Unused109', '__Unused110', '__Unused111', '__Unused112', '__Unused113', '__Unused114', '__Unused115', '__Unused116', '__Unused117', '__Unused118', '__Unused119', '__Unused120', '__Unused121', '__Unused122', '__Unused123', '__Unused124', '__Unused125', '__Unused126', '__Unused127', 'Twitter']
  },
  /**
   * Lookup308: pallet_identity::types::Judgement<Balance>
   **/
  PalletIdentityJudgement: {
    _enum: {
      Unknown: 'Null',
      FeePaid: 'u128',
      Reasonable: 'Null',
      KnownGood: 'Null',
      OutOfDate: 'Null',
      LowQuality: 'Null',
      Erroneous: 'Null'
    }
  },
  /**
   * Lookup309: pallet_democracy::pallet::Call<T>
   **/
  PalletDemocracyCall: {
    _enum: {
      propose: {
        proposal: 'FrameSupportPreimagesBounded',
        value: 'Compact<u128>',
      },
      second: {
        proposal: 'Compact<u32>',
      },
      vote: {
        refIndex: 'Compact<u32>',
        vote: 'PalletDemocracyVoteAccountVote',
      },
      emergency_cancel: {
        refIndex: 'u32',
      },
      external_propose: {
        proposal: 'FrameSupportPreimagesBounded',
      },
      external_propose_majority: {
        proposal: 'FrameSupportPreimagesBounded',
      },
      external_propose_default: {
        proposal: 'FrameSupportPreimagesBounded',
      },
      fast_track: {
        proposalHash: 'H256',
        votingPeriod: 'u32',
        delay: 'u32',
      },
      veto_external: {
        proposalHash: 'H256',
      },
      cancel_referendum: {
        refIndex: 'Compact<u32>',
      },
      delegate: {
        to: 'MultiAddress',
        conviction: 'PalletDemocracyConviction',
        balance: 'u128',
      },
      undelegate: 'Null',
      clear_public_proposals: 'Null',
      unlock: {
        target: 'MultiAddress',
      },
      remove_vote: {
        index: 'u32',
      },
      remove_other_vote: {
        target: 'MultiAddress',
        index: 'u32',
      },
      blacklist: {
        proposalHash: 'H256',
        maybeRefIndex: 'Option<u32>',
      },
      cancel_proposal: {
        propIndex: 'Compact<u32>',
      },
      set_metadata: {
        owner: 'PalletDemocracyMetadataOwner',
        maybeHash: 'Option<H256>'
      }
    }
  },
  /**
   * Lookup310: frame_support::traits::preimages::Bounded<khala_parachain_runtime::RuntimeCall>
   **/
  FrameSupportPreimagesBounded: {
    _enum: {
      Legacy: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      Inline: 'Bytes',
      Lookup: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
        len: 'u32'
      }
    }
  },
  /**
   * Lookup312: pallet_democracy::conviction::Conviction
   **/
  PalletDemocracyConviction: {
    _enum: ['None', 'Locked1x', 'Locked2x', 'Locked3x', 'Locked4x', 'Locked5x', 'Locked6x']
  },
  /**
   * Lookup314: pallet_collective::pallet::Call<T, I>
   **/
  PalletCollectiveCall: {
    _enum: {
      set_members: {
        newMembers: 'Vec<AccountId32>',
        prime: 'Option<AccountId32>',
        oldCount: 'u32',
      },
      execute: {
        proposal: 'Call',
        lengthBound: 'Compact<u32>',
      },
      propose: {
        threshold: 'Compact<u32>',
        proposal: 'Call',
        lengthBound: 'Compact<u32>',
      },
      vote: {
        proposal: 'H256',
        index: 'Compact<u32>',
        approve: 'bool',
      },
      close_old_weight: {
        proposalHash: 'H256',
        index: 'Compact<u32>',
        proposalWeightBound: 'Compact<u64>',
        lengthBound: 'Compact<u32>',
      },
      disapprove_proposal: {
        proposalHash: 'H256',
      },
      close: {
        proposalHash: 'H256',
        index: 'Compact<u32>',
        proposalWeightBound: 'SpWeightsWeightV2Weight',
        lengthBound: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup317: pallet_treasury::pallet::Call<T, I>
   **/
  PalletTreasuryCall: {
    _enum: {
      propose_spend: {
        value: 'Compact<u128>',
        beneficiary: 'MultiAddress',
      },
      reject_proposal: {
        proposalId: 'Compact<u32>',
      },
      approve_proposal: {
        proposalId: 'Compact<u32>',
      },
      spend: {
        amount: 'Compact<u128>',
        beneficiary: 'MultiAddress',
      },
      remove_approval: {
        proposalId: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup318: pallet_bounties::pallet::Call<T, I>
   **/
  PalletBountiesCall: {
    _enum: {
      propose_bounty: {
        value: 'Compact<u128>',
        description: 'Bytes',
      },
      approve_bounty: {
        bountyId: 'Compact<u32>',
      },
      propose_curator: {
        bountyId: 'Compact<u32>',
        curator: 'MultiAddress',
        fee: 'Compact<u128>',
      },
      unassign_curator: {
        bountyId: 'Compact<u32>',
      },
      accept_curator: {
        bountyId: 'Compact<u32>',
      },
      award_bounty: {
        bountyId: 'Compact<u32>',
        beneficiary: 'MultiAddress',
      },
      claim_bounty: {
        bountyId: 'Compact<u32>',
      },
      close_bounty: {
        bountyId: 'Compact<u32>',
      },
      extend_bounty_expiry: {
        bountyId: 'Compact<u32>',
        remark: 'Bytes'
      }
    }
  },
  /**
   * Lookup319: pallet_lottery::pallet::Call<T>
   **/
  PalletLotteryCall: {
    _enum: {
      buy_ticket: {
        call: 'Call',
      },
      set_calls: {
        calls: 'Vec<Call>',
      },
      start_lottery: {
        price: 'u128',
        length: 'u32',
        delay: 'u32',
        repeat: 'bool',
      },
      stop_repeat: 'Null'
    }
  },
  /**
   * Lookup321: pallet_membership::pallet::Call<T, I>
   **/
  PalletMembershipCall: {
    _enum: {
      add_member: {
        who: 'MultiAddress',
      },
      remove_member: {
        who: 'MultiAddress',
      },
      swap_member: {
        remove: 'MultiAddress',
        add: 'MultiAddress',
      },
      reset_members: {
        members: 'Vec<AccountId32>',
      },
      change_key: {
        _alias: {
          new_: 'new',
        },
        new_: 'MultiAddress',
      },
      set_prime: {
        who: 'MultiAddress',
      },
      clear_prime: 'Null'
    }
  },
  /**
   * Lookup322: pallet_elections_phragmen::pallet::Call<T>
   **/
  PalletElectionsPhragmenCall: {
    _enum: {
      vote: {
        votes: 'Vec<AccountId32>',
        value: 'Compact<u128>',
      },
      remove_voter: 'Null',
      submit_candidacy: {
        candidateCount: 'Compact<u32>',
      },
      renounce_candidacy: {
        renouncing: 'PalletElectionsPhragmenRenouncing',
      },
      remove_member: {
        who: 'MultiAddress',
        slashBond: 'bool',
        rerunElection: 'bool',
      },
      clean_defunct_voters: {
        numVoters: 'u32',
        numDefunct: 'u32'
      }
    }
  },
  /**
   * Lookup323: pallet_elections_phragmen::Renouncing
   **/
  PalletElectionsPhragmenRenouncing: {
    _enum: {
      Member: 'Null',
      RunnerUp: 'Null',
      Candidate: 'Compact<u32>'
    }
  },
  /**
   * Lookup324: pallet_tips::pallet::Call<T, I>
   **/
  PalletTipsCall: {
    _enum: {
      report_awesome: {
        reason: 'Bytes',
        who: 'MultiAddress',
      },
      retract_tip: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      tip_new: {
        reason: 'Bytes',
        who: 'MultiAddress',
        tipValue: 'Compact<u128>',
      },
      tip: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
        tipValue: 'Compact<u128>',
      },
      close_tip: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      slash_tip: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup325: pallet_child_bounties::pallet::Call<T>
   **/
  PalletChildBountiesCall: {
    _enum: {
      add_child_bounty: {
        parentBountyId: 'Compact<u32>',
        value: 'Compact<u128>',
        description: 'Bytes',
      },
      propose_curator: {
        parentBountyId: 'Compact<u32>',
        childBountyId: 'Compact<u32>',
        curator: 'MultiAddress',
        fee: 'Compact<u128>',
      },
      accept_curator: {
        parentBountyId: 'Compact<u32>',
        childBountyId: 'Compact<u32>',
      },
      unassign_curator: {
        parentBountyId: 'Compact<u32>',
        childBountyId: 'Compact<u32>',
      },
      award_child_bounty: {
        parentBountyId: 'Compact<u32>',
        childBountyId: 'Compact<u32>',
        beneficiary: 'MultiAddress',
      },
      claim_child_bounty: {
        parentBountyId: 'Compact<u32>',
        childBountyId: 'Compact<u32>',
      },
      close_child_bounty: {
        parentBountyId: 'Compact<u32>',
        childBountyId: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup326: subbridge_pallets::chainbridge::pallet::Call<T>
   **/
  SubbridgePalletsChainbridgePalletCall: {
    _enum: {
      set_threshold: {
        threshold: 'u32',
      },
      whitelist_chain: {
        id: 'u8',
      },
      add_relayer: {
        v: 'AccountId32',
      },
      remove_relayer: {
        v: 'AccountId32',
      },
      update_fee: {
        fee: 'u128',
        destId: 'u8',
      },
      acknowledge_proposal: {
        nonce: 'u64',
        srcId: 'u8',
        rId: '[u8;32]',
        call: 'Call',
      },
      reject_proposal: {
        nonce: 'u64',
        srcId: 'u8',
        rId: '[u8;32]',
        call: 'Call',
      },
      eval_vote_state: {
        nonce: 'u64',
        srcId: 'u8',
        prop: 'Call',
      },
      handle_fungible_transfer: {
        dest: 'Bytes',
        amount: 'u128',
        rid: '[u8;32]'
      }
    }
  },
  /**
   * Lookup327: subbridge_pallets::xtransfer::pallet::Call<T>
   **/
  SubbridgePalletsXtransferPalletCall: {
    _enum: {
      transfer: {
        asset: 'XcmV3MultiAsset',
        dest: 'XcmV3MultiLocation',
        destWeight: 'Option<SpWeightsWeightV2Weight>',
      },
      transfer_generic: {
        data: 'Bytes',
        dest: 'XcmV3MultiLocation',
        destWeight: 'Option<SpWeightsWeightV2Weight>'
      }
    }
  },
  /**
   * Lookup329: phala_pallets::mq::pallet::Call<T>
   **/
  PhalaPalletsMqPalletCall: {
    _enum: {
      sync_offchain_message: {
        signedMessage: 'PhalaMqSignedMessage',
      },
      push_message: {
        destination: 'Bytes',
        payload: 'Bytes',
      },
      force_push_pallet_message: {
        destination: 'Bytes',
        payload: 'Bytes'
      }
    }
  },
  /**
   * Lookup330: phala_mq::types::SignedMessage
   **/
  PhalaMqSignedMessage: {
    message: 'PhalaMqMessage',
    sequence: 'u64',
    signature: 'Bytes'
  },
  /**
   * Lookup331: phala_mq::types::Message
   **/
  PhalaMqMessage: {
    sender: 'PhalaMqMessageOrigin',
    destination: 'Bytes',
    payload: 'Bytes'
  },
  /**
   * Lookup332: phala_mq::types::MessageOrigin
   **/
  PhalaMqMessageOrigin: {
    _enum: {
      Pallet: 'Bytes',
      Contract: 'H256',
      Worker: 'SpCoreSr25519Public',
      AccountId: 'H256',
      MultiLocation: 'Bytes',
      Gatekeeper: 'Null',
      Cluster: 'H256',
      __Unused7: 'Null',
      __Unused8: 'Null',
      __Unused9: 'Null',
      __Unused10: 'Null',
      __Unused11: 'Null',
      __Unused12: 'Null',
      __Unused13: 'Null',
      __Unused14: 'Null',
      __Unused15: 'Null',
      __Unused16: 'Null',
      __Unused17: 'Null',
      __Unused18: 'Null',
      __Unused19: 'Null',
      __Unused20: 'Null',
      __Unused21: 'Null',
      __Unused22: 'Null',
      __Unused23: 'Null',
      __Unused24: 'Null',
      __Unused25: 'Null',
      __Unused26: 'Null',
      __Unused27: 'Null',
      __Unused28: 'Null',
      __Unused29: 'Null',
      __Unused30: 'Null',
      __Unused31: 'Null',
      __Unused32: 'Null',
      __Unused33: 'Null',
      __Unused34: 'Null',
      __Unused35: 'Null',
      __Unused36: 'Null',
      __Unused37: 'Null',
      __Unused38: 'Null',
      __Unused39: 'Null',
      __Unused40: 'Null',
      __Unused41: 'Null',
      __Unused42: 'Null',
      __Unused43: 'Null',
      __Unused44: 'Null',
      __Unused45: 'Null',
      __Unused46: 'Null',
      __Unused47: 'Null',
      __Unused48: 'Null',
      __Unused49: 'Null',
      __Unused50: 'Null',
      __Unused51: 'Null',
      __Unused52: 'Null',
      __Unused53: 'Null',
      __Unused54: 'Null',
      __Unused55: 'Null',
      __Unused56: 'Null',
      __Unused57: 'Null',
      __Unused58: 'Null',
      __Unused59: 'Null',
      __Unused60: 'Null',
      __Unused61: 'Null',
      __Unused62: 'Null',
      __Unused63: 'Null',
      __Unused64: 'Null',
      __Unused65: 'Null',
      __Unused66: 'Null',
      __Unused67: 'Null',
      __Unused68: 'Null',
      __Unused69: 'Null',
      __Unused70: 'Null',
      __Unused71: 'Null',
      __Unused72: 'Null',
      __Unused73: 'Null',
      __Unused74: 'Null',
      __Unused75: 'Null',
      __Unused76: 'Null',
      __Unused77: 'Null',
      __Unused78: 'Null',
      __Unused79: 'Null',
      __Unused80: 'Null',
      __Unused81: 'Null',
      __Unused82: 'Null',
      __Unused83: 'Null',
      __Unused84: 'Null',
      __Unused85: 'Null',
      __Unused86: 'Null',
      __Unused87: 'Null',
      __Unused88: 'Null',
      __Unused89: 'Null',
      __Unused90: 'Null',
      __Unused91: 'Null',
      __Unused92: 'Null',
      __Unused93: 'Null',
      __Unused94: 'Null',
      __Unused95: 'Null',
      __Unused96: 'Null',
      __Unused97: 'Null',
      __Unused98: 'Null',
      __Unused99: 'Null',
      __Unused100: 'Null',
      __Unused101: 'Null',
      __Unused102: 'Null',
      __Unused103: 'Null',
      __Unused104: 'Null',
      __Unused105: 'Null',
      __Unused106: 'Null',
      __Unused107: 'Null',
      __Unused108: 'Null',
      __Unused109: 'Null',
      __Unused110: 'Null',
      __Unused111: 'Null',
      __Unused112: 'Null',
      __Unused113: 'Null',
      __Unused114: 'Null',
      __Unused115: 'Null',
      __Unused116: 'Null',
      __Unused117: 'Null',
      __Unused118: 'Null',
      __Unused119: 'Null',
      __Unused120: 'Null',
      __Unused121: 'Null',
      __Unused122: 'Null',
      __Unused123: 'Null',
      __Unused124: 'Null',
      __Unused125: 'Null',
      __Unused126: 'Null',
      __Unused127: 'Null',
      __Unused128: 'Null',
      __Unused129: 'Null',
      __Unused130: 'Null',
      __Unused131: 'Null',
      __Unused132: 'Null',
      __Unused133: 'Null',
      __Unused134: 'Null',
      __Unused135: 'Null',
      __Unused136: 'Null',
      __Unused137: 'Null',
      __Unused138: 'Null',
      __Unused139: 'Null',
      __Unused140: 'Null',
      __Unused141: 'Null',
      __Unused142: 'Null',
      __Unused143: 'Null',
      __Unused144: 'Null',
      __Unused145: 'Null',
      __Unused146: 'Null',
      __Unused147: 'Null',
      __Unused148: 'Null',
      __Unused149: 'Null',
      __Unused150: 'Null',
      __Unused151: 'Null',
      __Unused152: 'Null',
      __Unused153: 'Null',
      __Unused154: 'Null',
      __Unused155: 'Null',
      __Unused156: 'Null',
      __Unused157: 'Null',
      __Unused158: 'Null',
      __Unused159: 'Null',
      __Unused160: 'Null',
      __Unused161: 'Null',
      __Unused162: 'Null',
      __Unused163: 'Null',
      __Unused164: 'Null',
      __Unused165: 'Null',
      __Unused166: 'Null',
      __Unused167: 'Null',
      __Unused168: 'Null',
      __Unused169: 'Null',
      __Unused170: 'Null',
      __Unused171: 'Null',
      __Unused172: 'Null',
      __Unused173: 'Null',
      __Unused174: 'Null',
      __Unused175: 'Null',
      __Unused176: 'Null',
      __Unused177: 'Null',
      __Unused178: 'Null',
      __Unused179: 'Null',
      __Unused180: 'Null',
      __Unused181: 'Null',
      __Unused182: 'Null',
      __Unused183: 'Null',
      __Unused184: 'Null',
      __Unused185: 'Null',
      __Unused186: 'Null',
      __Unused187: 'Null',
      __Unused188: 'Null',
      __Unused189: 'Null',
      __Unused190: 'Null',
      __Unused191: 'Null',
      __Unused192: 'Null',
      __Unused193: 'Null',
      __Unused194: 'Null',
      __Unused195: 'Null',
      __Unused196: 'Null',
      __Unused197: 'Null',
      __Unused198: 'Null',
      __Unused199: 'Null',
      __Unused200: 'Null',
      __Unused201: 'Null',
      __Unused202: 'Null',
      __Unused203: 'Null',
      __Unused204: 'Null',
      __Unused205: 'Null',
      __Unused206: 'Null',
      __Unused207: 'Null',
      __Unused208: 'Null',
      __Unused209: 'Null',
      __Unused210: 'Null',
      __Unused211: 'Null',
      __Unused212: 'Null',
      __Unused213: 'Null',
      __Unused214: 'Null',
      __Unused215: 'Null',
      __Unused216: 'Null',
      __Unused217: 'Null',
      __Unused218: 'Null',
      __Unused219: 'Null',
      __Unused220: 'Null',
      __Unused221: 'Null',
      __Unused222: 'Null',
      __Unused223: 'Null',
      __Unused224: 'Null',
      __Unused225: 'Null',
      __Unused226: 'Null',
      __Unused227: 'Null',
      __Unused228: 'Null',
      __Unused229: 'Null',
      __Unused230: 'Null',
      __Unused231: 'Null',
      __Unused232: 'Null',
      __Unused233: 'Null',
      __Unused234: 'Null',
      __Unused235: 'Null',
      __Unused236: 'Null',
      __Unused237: 'Null',
      __Unused238: 'Null',
      __Unused239: 'Null',
      __Unused240: 'Null',
      __Unused241: 'Null',
      __Unused242: 'Null',
      __Unused243: 'Null',
      __Unused244: 'Null',
      __Unused245: 'Null',
      __Unused246: 'Null',
      __Unused247: 'Null',
      __Unused248: 'Null',
      __Unused249: 'Null',
      __Unused250: 'Null',
      __Unused251: 'Null',
      __Unused252: 'Null',
      __Unused253: 'Null',
      __Unused254: 'Null',
      Reserved: 'Null'
    }
  },
  /**
   * Lookup334: phala_pallets::registry::pallet::Call<T>
   **/
  PhalaPalletsRegistryPalletCall: {
    _enum: {
      force_set_benchmark_duration: {
        value: 'u32',
      },
      force_register_worker: {
        pubkey: 'SpCoreSr25519Public',
        ecdhPubkey: 'SpCoreSr25519Public',
        operator: 'Option<AccountId32>',
      },
      force_register_topic_pubkey: {
        topic: 'Bytes',
        pubkey: 'Bytes',
      },
      register_gatekeeper: {
        gatekeeper: 'SpCoreSr25519Public',
      },
      unregister_gatekeeper: {
        gatekeeper: 'SpCoreSr25519Public',
      },
      rotate_master_key: 'Null',
      register_worker: {
        pruntimeInfo: 'PhalaTypesWorkerRegistrationInfo',
        attestation: 'PhalaPalletsUtilsAttestationLegacyAttestation',
      },
      register_worker_v2: {
        pruntimeInfo: 'PhalaTypesWorkerRegistrationInfoV2',
        attestation: 'Option<PhalaTypesAttestationReport>',
      },
      update_worker_endpoint: {
        endpointPayload: 'PhalaTypesWorkerEndpointPayload',
        signature: 'Bytes',
      },
      add_pruntime: {
        pruntimeHash: 'Bytes',
      },
      remove_pruntime: {
        pruntimeHash: 'Bytes',
      },
      add_relaychain_genesis_block_hash: {
        genesisBlockHash: 'H256',
      },
      remove_relaychain_genesis_block_hash: {
        genesisBlockHash: 'H256',
      },
      set_minimum_pruntime_version: {
        major: 'u32',
        minor: 'u32',
        patch: 'u32',
      },
      set_pruntime_consensus_version: {
        version: 'u32'
      }
    }
  },
  /**
   * Lookup335: phala_types::WorkerRegistrationInfo<sp_core::crypto::AccountId32>
   **/
  PhalaTypesWorkerRegistrationInfo: {
    version: 'u32',
    machineId: 'Bytes',
    pubkey: 'SpCoreSr25519Public',
    ecdhPubkey: 'SpCoreSr25519Public',
    genesisBlockHash: 'H256',
    features: 'Vec<u32>',
    operator: 'Option<AccountId32>'
  },
  /**
   * Lookup336: phala_pallets::utils::attestation_legacy::Attestation
   **/
  PhalaPalletsUtilsAttestationLegacyAttestation: {
    _enum: {
      SgxIas: {
        raReport: 'Bytes',
        signature: 'Bytes',
        rawSigningCert: 'Bytes'
      }
    }
  },
  /**
   * Lookup337: phala_types::WorkerRegistrationInfoV2<sp_core::crypto::AccountId32>
   **/
  PhalaTypesWorkerRegistrationInfoV2: {
    version: 'u32',
    machineId: 'Bytes',
    pubkey: 'SpCoreSr25519Public',
    ecdhPubkey: 'SpCoreSr25519Public',
    genesisBlockHash: 'H256',
    features: 'Vec<u32>',
    operator: 'Option<AccountId32>',
    paraId: 'u32',
    maxConsensusVersion: 'u32'
  },
  /**
   * Lookup339: phala_types::AttestationReport
   **/
  PhalaTypesAttestationReport: {
    _enum: {
      SgxIas: {
        raReport: 'Bytes',
        signature: 'Bytes',
        rawSigningCert: 'Bytes'
      }
    }
  },
  /**
   * Lookup340: phala_types::WorkerEndpointPayload
   **/
  PhalaTypesWorkerEndpointPayload: {
    pubkey: 'SpCoreSr25519Public',
    versionedEndpoints: 'PhalaTypesVersionedWorkerEndpoints',
    signingTime: 'u64'
  },
  /**
   * Lookup341: phala_types::VersionedWorkerEndpoints
   **/
  PhalaTypesVersionedWorkerEndpoints: {
    _enum: {
      V1: 'Vec<Text>'
    }
  },
  /**
   * Lookup343: phala_pallets::compute::computation::pallet::Call<T>
   **/
  PhalaPalletsComputeComputationPalletCall: {
    _enum: {
      set_cool_down_expiration: {
        period: 'u64',
      },
      unbind: {
        session: 'AccountId32',
      },
      force_heartbeat: 'Null',
      force_start_computing: {
        session: 'AccountId32',
        stake: 'u128',
      },
      force_stop_computing: {
        session: 'AccountId32',
      },
      update_tokenomic: {
        newParams: 'PhalaTypesMessagingTokenomicParameters',
      },
      set_heartbeat_paused: {
        paused: 'bool',
      },
      set_budget_per_block: {
        nonce: 'u64',
        blockNumber: 'u32',
        budget: 'u128',
      },
      update_contract_root: {
        accountId: 'AccountId32'
      }
    }
  },
  /**
   * Lookup344: phala_types::messaging::TokenomicParameters
   **/
  PhalaTypesMessagingTokenomicParameters: {
    phaRate: 'u128',
    rho: 'u128',
    budgetPerBlock: 'u128',
    vMax: 'u128',
    costK: 'u128',
    costB: 'u128',
    slashRate: 'u128',
    treasuryRatio: 'u128',
    heartbeatWindow: 'u32',
    rigK: 'u128',
    rigB: 'u128',
    re: 'u128',
    k: 'u128',
    kappa: 'u128'
  },
  /**
   * Lookup345: pallet_assets::pallet::Call<T, I>
   **/
  PalletAssetsCall: {
    _enum: {
      create: {
        id: 'Compact<u32>',
        admin: 'MultiAddress',
        minBalance: 'u128',
      },
      force_create: {
        id: 'Compact<u32>',
        owner: 'MultiAddress',
        isSufficient: 'bool',
        minBalance: 'Compact<u128>',
      },
      start_destroy: {
        id: 'Compact<u32>',
      },
      destroy_accounts: {
        id: 'Compact<u32>',
      },
      destroy_approvals: {
        id: 'Compact<u32>',
      },
      finish_destroy: {
        id: 'Compact<u32>',
      },
      mint: {
        id: 'Compact<u32>',
        beneficiary: 'MultiAddress',
        amount: 'Compact<u128>',
      },
      burn: {
        id: 'Compact<u32>',
        who: 'MultiAddress',
        amount: 'Compact<u128>',
      },
      transfer: {
        id: 'Compact<u32>',
        target: 'MultiAddress',
        amount: 'Compact<u128>',
      },
      transfer_keep_alive: {
        id: 'Compact<u32>',
        target: 'MultiAddress',
        amount: 'Compact<u128>',
      },
      force_transfer: {
        id: 'Compact<u32>',
        source: 'MultiAddress',
        dest: 'MultiAddress',
        amount: 'Compact<u128>',
      },
      freeze: {
        id: 'Compact<u32>',
        who: 'MultiAddress',
      },
      thaw: {
        id: 'Compact<u32>',
        who: 'MultiAddress',
      },
      freeze_asset: {
        id: 'Compact<u32>',
      },
      thaw_asset: {
        id: 'Compact<u32>',
      },
      transfer_ownership: {
        id: 'Compact<u32>',
        owner: 'MultiAddress',
      },
      set_team: {
        id: 'Compact<u32>',
        issuer: 'MultiAddress',
        admin: 'MultiAddress',
        freezer: 'MultiAddress',
      },
      set_metadata: {
        id: 'Compact<u32>',
        name: 'Bytes',
        symbol: 'Bytes',
        decimals: 'u8',
      },
      clear_metadata: {
        id: 'Compact<u32>',
      },
      force_set_metadata: {
        id: 'Compact<u32>',
        name: 'Bytes',
        symbol: 'Bytes',
        decimals: 'u8',
        isFrozen: 'bool',
      },
      force_clear_metadata: {
        id: 'Compact<u32>',
      },
      force_asset_status: {
        id: 'Compact<u32>',
        owner: 'MultiAddress',
        issuer: 'MultiAddress',
        admin: 'MultiAddress',
        freezer: 'MultiAddress',
        minBalance: 'Compact<u128>',
        isSufficient: 'bool',
        isFrozen: 'bool',
      },
      approve_transfer: {
        id: 'Compact<u32>',
        delegate: 'MultiAddress',
        amount: 'Compact<u128>',
      },
      cancel_approval: {
        id: 'Compact<u32>',
        delegate: 'MultiAddress',
      },
      force_cancel_approval: {
        id: 'Compact<u32>',
        owner: 'MultiAddress',
        delegate: 'MultiAddress',
      },
      transfer_approved: {
        id: 'Compact<u32>',
        owner: 'MultiAddress',
        destination: 'MultiAddress',
        amount: 'Compact<u128>',
      },
      touch: {
        id: 'Compact<u32>',
      },
      refund: {
        id: 'Compact<u32>',
        allowBurn: 'bool',
      },
      set_min_balance: {
        id: 'Compact<u32>',
        minBalance: 'u128'
      }
    }
  },
  /**
   * Lookup346: assets_registry::pallet::Call<T>
   **/
  AssetsRegistryCall: {
    _enum: {
      force_withdraw_fund: {
        assetId: 'Option<u32>',
        recipient: 'AccountId32',
        amount: 'u128',
      },
      force_register_asset: {
        location: 'XcmV3MultiLocation',
        assetId: 'u32',
        properties: 'AssetsRegistryAssetProperties',
      },
      force_unregister_asset: {
        assetId: 'u32',
      },
      force_set_metadata: {
        assetId: 'u32',
        properties: 'AssetsRegistryAssetProperties',
      },
      force_mint: {
        assetId: 'u32',
        beneficiary: 'AccountId32',
        amount: 'u128',
      },
      force_burn: {
        assetId: 'u32',
        who: 'AccountId32',
        amount: 'u128',
      },
      force_set_price: {
        assetId: 'u32',
        executionPrice: 'u128',
      },
      force_set_location: {
        assetId: 'u32',
        location: 'XcmV3MultiLocation',
      },
      force_enable_chainbridge: {
        assetId: 'u32',
        chainId: 'u8',
        isMintable: 'bool',
        metadata: 'Bytes',
      },
      force_disable_chainbridge: {
        assetId: 'u32',
        chainId: 'u8',
      },
      force_enable_sygmabridge: {
        assetId: 'u32',
        resourceId: '[u8;32]',
        domainId: 'u8',
        isMintable: 'bool',
        metadata: 'Bytes',
      },
      force_disable_sygmabridge: {
        assetId: 'u32',
        resourceId: '[u8;32]',
        domainId: 'u8'
      }
    }
  },
  /**
   * Lookup347: assets_registry::pallet::AssetProperties
   **/
  AssetsRegistryAssetProperties: {
    name: 'Bytes',
    symbol: 'Bytes',
    decimals: 'u8'
  },
  /**
   * Lookup348: phala_pallets::compute::stake_pool_v2::pallet::Call<T>
   **/
  PhalaPalletsComputeStakePoolV2PalletCall: {
    _enum: {
      create: 'Null',
      add_worker: {
        pid: 'u64',
        pubkey: 'SpCoreSr25519Public',
      },
      remove_worker: {
        pid: 'u64',
        worker: 'SpCoreSr25519Public',
      },
      set_cap: {
        pid: 'u64',
        cap: 'u128',
      },
      set_payout_pref: {
        pid: 'u64',
        payoutCommission: 'Option<Permill>',
      },
      claim_legacy_rewards: {
        pid: 'u64',
        target: 'AccountId32',
      },
      backfill_add_missing_reward: {
        input: 'Vec<(AccountId32,u64,u128)>',
      },
      claim_owner_rewards: {
        pid: 'u64',
        target: 'AccountId32',
      },
      check_and_maybe_force_withdraw: {
        pid: 'u64',
      },
      contribute: {
        pid: 'u64',
        amount: 'u128',
        asVault: 'Option<u64>',
      },
      withdraw: {
        pid: 'u64',
        shares: 'u128',
        asVault: 'Option<u64>',
      },
      reset_iter_pos: 'Null',
      fix_missing_worker_lock: {
        maxIterations: 'u32',
      },
      start_computing: {
        pid: 'u64',
        worker: 'SpCoreSr25519Public',
        stake: 'u128',
      },
      stop_computing: {
        pid: 'u64',
        worker: 'SpCoreSr25519Public',
      },
      reclaim_pool_worker: {
        pid: 'u64',
        worker: 'SpCoreSr25519Public',
      },
      set_working_enabled: {
        enable: 'bool',
      },
      restart_computing: {
        pid: 'u64',
        worker: 'SpCoreSr25519Public',
        stake: 'u128'
      }
    }
  },
  /**
   * Lookup352: phala_pallets::compute::vault::pallet::Call<T>
   **/
  PhalaPalletsComputeVaultPalletCall: {
    _enum: {
      create: 'Null',
      set_payout_pref: {
        pid: 'u64',
        payoutCommission: 'Option<Permill>',
      },
      claim_owner_shares: {
        vaultPid: 'u64',
        target: 'AccountId32',
        shares: 'u128',
      },
      maybe_gain_owner_shares: {
        vaultPid: 'u64',
      },
      check_and_maybe_force_withdraw: {
        vaultPid: 'u64',
      },
      contribute: {
        pid: 'u64',
        amount: 'u128',
      },
      withdraw: {
        pid: 'u64',
        shares: 'u128'
      }
    }
  },
  /**
   * Lookup353: phala_pallets::compute::wrapped_balances::pallet::Call<T>
   **/
  PhalaPalletsComputeWrappedBalancesPalletCall: {
    _enum: {
      wrap: {
        amount: 'u128',
      },
      unwrap_all: 'Null',
      unwrap: {
        amount: 'u128',
      },
      vote: {
        ayeAmount: 'u128',
        nayAmount: 'u128',
        voteId: 'u32',
      },
      unlock: {
        voteId: 'u32',
        maxIterations: 'u32',
      },
      backfill_vote_lock: 'Null'
    }
  },
  /**
   * Lookup354: phala_pallets::compute::base_pool::pallet::Call<T>
   **/
  PhalaPalletsComputeBasePoolPalletCall: {
    _enum: {
      add_staker_to_whitelist: {
        pid: 'u64',
        staker: 'AccountId32',
      },
      set_pool_description: {
        pid: 'u64',
        description: 'Bytes',
      },
      reset_lock_iter_pos: 'Null',
      remove_unused_lock: {
        maxIterations: 'u32',
      },
      remove_staker_from_whitelist: {
        pid: 'u64',
        staker: 'AccountId32'
      }
    }
  },
  /**
   * Lookup356: pallet_uniques::pallet::Call<T, I>
   **/
  PalletUniquesCall: {
    _enum: {
      create: {
        collection: 'u32',
        admin: 'MultiAddress',
      },
      force_create: {
        collection: 'u32',
        owner: 'MultiAddress',
        freeHolding: 'bool',
      },
      destroy: {
        collection: 'u32',
        witness: 'PalletUniquesDestroyWitness',
      },
      mint: {
        collection: 'u32',
        item: 'u32',
        owner: 'MultiAddress',
      },
      burn: {
        collection: 'u32',
        item: 'u32',
        checkOwner: 'Option<MultiAddress>',
      },
      transfer: {
        collection: 'u32',
        item: 'u32',
        dest: 'MultiAddress',
      },
      redeposit: {
        collection: 'u32',
        items: 'Vec<u32>',
      },
      freeze: {
        collection: 'u32',
        item: 'u32',
      },
      thaw: {
        collection: 'u32',
        item: 'u32',
      },
      freeze_collection: {
        collection: 'u32',
      },
      thaw_collection: {
        collection: 'u32',
      },
      transfer_ownership: {
        collection: 'u32',
        owner: 'MultiAddress',
      },
      set_team: {
        collection: 'u32',
        issuer: 'MultiAddress',
        admin: 'MultiAddress',
        freezer: 'MultiAddress',
      },
      approve_transfer: {
        collection: 'u32',
        item: 'u32',
        delegate: 'MultiAddress',
      },
      cancel_approval: {
        collection: 'u32',
        item: 'u32',
        maybeCheckDelegate: 'Option<MultiAddress>',
      },
      force_item_status: {
        collection: 'u32',
        owner: 'MultiAddress',
        issuer: 'MultiAddress',
        admin: 'MultiAddress',
        freezer: 'MultiAddress',
        freeHolding: 'bool',
        isFrozen: 'bool',
      },
      set_attribute: {
        collection: 'u32',
        maybeItem: 'Option<u32>',
        key: 'Bytes',
        value: 'Bytes',
      },
      clear_attribute: {
        collection: 'u32',
        maybeItem: 'Option<u32>',
        key: 'Bytes',
      },
      set_metadata: {
        collection: 'u32',
        item: 'u32',
        data: 'Bytes',
        isFrozen: 'bool',
      },
      clear_metadata: {
        collection: 'u32',
        item: 'u32',
      },
      set_collection_metadata: {
        collection: 'u32',
        data: 'Bytes',
        isFrozen: 'bool',
      },
      clear_collection_metadata: {
        collection: 'u32',
      },
      set_accept_ownership: {
        maybeCollection: 'Option<u32>',
      },
      set_collection_max_supply: {
        collection: 'u32',
        maxSupply: 'u32',
      },
      set_price: {
        collection: 'u32',
        item: 'u32',
        price: 'Option<u128>',
        whitelistedBuyer: 'Option<MultiAddress>',
      },
      buy_item: {
        collection: 'u32',
        item: 'u32',
        bidPrice: 'u128'
      }
    }
  },
  /**
   * Lookup357: pallet_uniques::types::DestroyWitness
   **/
  PalletUniquesDestroyWitness: {
    items: 'Compact<u32>',
    itemMetadatas: 'Compact<u32>',
    attributes: 'Compact<u32>'
  },
  /**
   * Lookup359: pallet_rmrk_core::pallet::Call<T>
   **/
  PalletRmrkCoreCall: {
    _enum: {
      mint_nft: {
        owner: 'Option<AccountId32>',
        nftId: 'u32',
        collectionId: 'u32',
        royaltyRecipient: 'Option<AccountId32>',
        royalty: 'Option<Permill>',
        metadata: 'Bytes',
        transferable: 'bool',
        resources: 'Option<Vec<RmrkTraitsResourceResourceInfoMin>>',
      },
      mint_nft_directly_to_nft: {
        owner: '(u32,u32)',
        nftId: 'u32',
        collectionId: 'u32',
        royaltyRecipient: 'Option<AccountId32>',
        royalty: 'Option<Permill>',
        metadata: 'Bytes',
        transferable: 'bool',
        resources: 'Option<Vec<RmrkTraitsResourceResourceInfoMin>>',
      },
      create_collection: {
        collectionId: 'u32',
        metadata: 'Bytes',
        max: 'Option<u32>',
        symbol: 'Bytes',
      },
      burn_nft: {
        collectionId: 'u32',
        nftId: 'u32',
      },
      destroy_collection: {
        collectionId: 'u32',
      },
      send: {
        collectionId: 'u32',
        nftId: 'u32',
        newOwner: 'RmrkTraitsNftAccountIdOrCollectionNftTuple',
      },
      accept_nft: {
        collectionId: 'u32',
        nftId: 'u32',
        newOwner: 'RmrkTraitsNftAccountIdOrCollectionNftTuple',
      },
      reject_nft: {
        collectionId: 'u32',
        nftId: 'u32',
      },
      change_collection_issuer: {
        collectionId: 'u32',
        newIssuer: 'MultiAddress',
      },
      set_property: {
        collectionId: 'u32',
        maybeNftId: 'Option<u32>',
        key: 'Bytes',
        value: 'Bytes',
      },
      lock_collection: {
        collectionId: 'u32',
      },
      add_basic_resource: {
        collectionId: 'u32',
        nftId: 'u32',
        resource: 'RmrkTraitsResourceBasicResource',
        resourceId: 'u32',
      },
      add_composable_resource: {
        collectionId: 'u32',
        nftId: 'u32',
        resource: 'RmrkTraitsResourceComposableResource',
        resourceId: 'u32',
      },
      add_slot_resource: {
        collectionId: 'u32',
        nftId: 'u32',
        resource: 'RmrkTraitsResourceSlotResource',
        resourceId: 'u32',
      },
      replace_resource: {
        collectionId: 'u32',
        nftId: 'u32',
        resource: 'RmrkTraitsResourceResourceTypes',
        resourceId: 'u32',
      },
      accept_resource: {
        collectionId: 'u32',
        nftId: 'u32',
        resourceId: 'u32',
      },
      remove_resource: {
        collectionId: 'u32',
        nftId: 'u32',
        resourceId: 'u32',
      },
      accept_resource_removal: {
        collectionId: 'u32',
        nftId: 'u32',
        resourceId: 'u32',
      },
      set_priority: {
        collectionId: 'u32',
        nftId: 'u32',
        priorities: 'Vec<u32>'
      }
    }
  },
  /**
   * Lookup362: rmrk_traits::resource::ResourceInfoMin<bounded_collections::bounded_vec::BoundedVec<T, S>, bounded_collections::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsResourceResourceInfoMin: {
    id: 'u32',
    resource: 'RmrkTraitsResourceResourceTypes'
  },
  /**
   * Lookup364: rmrk_traits::resource::ResourceTypes<bounded_collections::bounded_vec::BoundedVec<T, S>, bounded_collections::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsResourceResourceTypes: {
    _enum: {
      Basic: 'RmrkTraitsResourceBasicResource',
      Composable: 'RmrkTraitsResourceComposableResource',
      Slot: 'RmrkTraitsResourceSlotResource'
    }
  },
  /**
   * Lookup365: rmrk_traits::resource::BasicResource<bounded_collections::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsResourceBasicResource: {
    metadata: 'Bytes'
  },
  /**
   * Lookup366: rmrk_traits::resource::ComposableResource<bounded_collections::bounded_vec::BoundedVec<T, S>, bounded_collections::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsResourceComposableResource: {
    parts: 'Vec<u32>',
    base: 'u32',
    metadata: 'Option<Bytes>',
    slot: 'Option<(u32,u32)>'
  },
  /**
   * Lookup367: rmrk_traits::resource::SlotResource<bounded_collections::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsResourceSlotResource: {
    base: 'u32',
    metadata: 'Option<Bytes>',
    slot: 'u32'
  },
  /**
   * Lookup371: pallet_rmrk_equip::pallet::Call<T>
   **/
  PalletRmrkEquipCall: {
    _enum: {
      change_base_issuer: {
        baseId: 'u32',
        newIssuer: 'MultiAddress',
      },
      equip: {
        item: '(u32,u32)',
        equipper: '(u32,u32)',
        resourceId: 'u32',
        base: 'u32',
        slot: 'u32',
      },
      unequip: {
        item: '(u32,u32)',
        unequipper: '(u32,u32)',
        base: 'u32',
        slot: 'u32',
      },
      equippable: {
        baseId: 'u32',
        slotId: 'u32',
        equippables: 'RmrkTraitsPartEquippableList',
      },
      equippable_add: {
        baseId: 'u32',
        slotId: 'u32',
        equippable: 'u32',
      },
      equippable_remove: {
        baseId: 'u32',
        slotId: 'u32',
        equippable: 'u32',
      },
      theme_add: {
        baseId: 'u32',
        theme: 'RmrkTraitsTheme',
      },
      create_base: {
        baseType: 'Bytes',
        symbol: 'Bytes',
        parts: 'Vec<RmrkTraitsPartPartType>'
      }
    }
  },
  /**
   * Lookup372: rmrk_traits::part::EquippableList<bounded_collections::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsPartEquippableList: {
    _enum: {
      All: 'Null',
      Empty: 'Null',
      Custom: 'Vec<u32>'
    }
  },
  /**
   * Lookup374: rmrk_traits::theme::Theme<bounded_collections::bounded_vec::BoundedVec<T, S>, bounded_collections::bounded_vec::BoundedVec<rmrk_traits::theme::ThemeProperty<bounded_collections::bounded_vec::BoundedVec<T, S>>, S>>
   **/
  RmrkTraitsTheme: {
    name: 'Bytes',
    properties: 'Vec<RmrkTraitsThemeThemeProperty>',
    inherit: 'bool'
  },
  /**
   * Lookup376: rmrk_traits::theme::ThemeProperty<bounded_collections::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsThemeThemeProperty: {
    key: 'Bytes',
    value: 'Bytes'
  },
  /**
   * Lookup379: rmrk_traits::part::PartType<bounded_collections::bounded_vec::BoundedVec<T, S>, bounded_collections::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsPartPartType: {
    _enum: {
      FixedPart: 'RmrkTraitsPartFixedPart',
      SlotPart: 'RmrkTraitsPartSlotPart'
    }
  },
  /**
   * Lookup380: rmrk_traits::part::FixedPart<bounded_collections::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsPartFixedPart: {
    id: 'u32',
    z: 'u32',
    src: 'Bytes'
  },
  /**
   * Lookup381: rmrk_traits::part::SlotPart<bounded_collections::bounded_vec::BoundedVec<T, S>, bounded_collections::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsPartSlotPart: {
    id: 'u32',
    equippable: 'RmrkTraitsPartEquippableList',
    src: 'Option<Bytes>',
    z: 'u32'
  },
  /**
   * Lookup383: pallet_rmrk_market::pallet::Call<T>
   **/
  PalletRmrkMarketCall: {
    _enum: {
      buy: {
        collectionId: 'u32',
        nftId: 'u32',
        amount: 'Option<u128>',
      },
      list: {
        collectionId: 'u32',
        nftId: 'u32',
        amount: 'u128',
        expires: 'Option<u32>',
      },
      unlist: {
        collectionId: 'u32',
        nftId: 'u32',
      },
      make_offer: {
        collectionId: 'u32',
        nftId: 'u32',
        amount: 'u128',
        expires: 'Option<u32>',
      },
      withdraw_offer: {
        collectionId: 'u32',
        nftId: 'u32',
      },
      accept_offer: {
        collectionId: 'u32',
        nftId: 'u32',
        offerer: 'AccountId32'
      }
    }
  },
  /**
   * Lookup384: pallet_phala_world::nft_sale::pallet::Call<T>
   **/
  PalletPhalaWorldNftSalePalletCall: {
    _enum: {
      claim_spirit: 'Null',
      redeem_spirit: {
        signature: 'SpCoreSr25519Signature',
      },
      buy_rare_origin_of_shell: {
        rarityType: 'PalletPhalaWorldRarityType',
        race: 'PalletPhalaWorldRaceType',
        career: 'PalletPhalaWorldCareerType',
      },
      buy_prime_origin_of_shell: {
        signature: 'SpCoreSr25519Signature',
        race: 'PalletPhalaWorldRaceType',
        career: 'PalletPhalaWorldCareerType',
      },
      preorder_origin_of_shell: {
        race: 'PalletPhalaWorldRaceType',
        career: 'PalletPhalaWorldCareerType',
      },
      mint_chosen_preorders: {
        preorders: 'Vec<u32>',
      },
      refund_not_chosen_preorders: {
        preorders: 'Vec<u32>',
      },
      mint_gift_origin_of_shell: {
        owner: 'AccountId32',
        rarityType: 'PalletPhalaWorldRarityType',
        race: 'PalletPhalaWorldRaceType',
        career: 'PalletPhalaWorldCareerType',
        nftSaleType: 'PalletPhalaWorldNftSaleType',
      },
      set_overlord: {
        newOverlord: 'AccountId32',
      },
      initialize_world_clock: 'Null',
      set_status_type: {
        status: 'bool',
        statusType: 'PalletPhalaWorldStatusType',
      },
      init_rarity_type_counts: 'Null',
      update_rarity_type_counts: {
        rarityType: 'PalletPhalaWorldRarityType',
        forSaleCount: 'u32',
        giveawayCount: 'u32',
      },
      set_spirit_collection_id: {
        collectionId: 'u32',
      },
      set_origin_of_shell_collection_id: {
        collectionId: 'u32',
      },
      pw_create_collection: {
        metadata: 'Bytes',
        max: 'Option<u32>',
        symbol: 'Bytes',
      },
      set_spirits_metadata: {
        spiritsMetadata: 'Bytes',
      },
      set_origin_of_shells_metadata: {
        originOfShellsMetadata: 'Vec<(PalletPhalaWorldRaceType,Bytes)>',
      },
      set_payee: {
        newPayee: 'AccountId32',
      },
      set_signer: {
        newSigner: 'AccountId32'
      }
    }
  },
  /**
   * Lookup385: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup387: pallet_phala_world::traits::StatusType
   **/
  PalletPhalaWorldStatusType: {
    _enum: ['ClaimSpirits', 'PurchaseRareOriginOfShells', 'PurchasePrimeOriginOfShells', 'PreorderOriginOfShells', 'LastDayOfSale']
  },
  /**
   * Lookup388: pallet_phala_world::incubation::pallet::Call<T>
   **/
  PalletPhalaWorldIncubationPalletCall: {
    _enum: {
      start_incubation: {
        collectionId: 'u32',
        nftId: 'u32',
      },
      feed_origin_of_shell: {
        collectionId: 'u32',
        nftId: 'u32',
      },
      hatch_origin_of_shell: {
        collectionId: 'u32',
        nftId: 'u32',
        defaultShellMetadata: 'Bytes',
      },
      set_can_start_incubation_status: {
        status: 'bool',
      },
      set_shell_collection_id: {
        collectionId: 'u32',
      },
      set_shell_parts_collection_id: {
        collectionId: 'u32',
      },
      set_origin_of_shell_chosen_parts: {
        collectionId: 'u32',
        nftId: 'u32',
        chosenParts: 'PalletPhalaWorldShellParts'
      }
    }
  },
  /**
   * Lookup389: pallet_phala_world::marketplace::pallet::Call<T>
   **/
  PalletPhalaWorldMarketplacePalletCall: {
    _enum: {
      set_marketplace_owner: {
        newMarketplaceOwner: 'AccountId32',
      },
      set_nfts_royalty_info: {
        royaltyInfo: 'RmrkTraitsNftRoyaltyInfo',
        collectionId: 'u32',
        nftIds: 'Vec<u32>'
      }
    }
  },
  /**
   * Lookup391: pallet_index::pallet::Call<T>
   **/
  PalletIndexCall: {
    _enum: {
      force_add_worker: {
        worker: 'AccountId32',
      },
      force_remove_worker: {
        worker: 'AccountId32',
      },
      deposit_task: {
        asset: 'XcmV3MultiassetAssetId',
        amount: 'u128',
        recipient: 'Bytes',
        worker: 'AccountId32',
        taskId: '[u8;32]',
        task: 'Bytes',
      },
      claim_task: {
        taskId: '[u8;32]',
      },
      claim_all_task: 'Null'
    }
  },
  /**
   * Lookup392: khala_parachain_runtime::OriginCaller
   **/
  KhalaParachainRuntimeOriginCaller: {
    _enum: {
      system: 'FrameSupportDispatchRawOrigin',
      __Unused1: 'Null',
      __Unused2: 'Null',
      __Unused3: 'Null',
      __Unused4: 'Null',
      Void: 'SpCoreVoid',
      __Unused6: 'Null',
      __Unused7: 'Null',
      __Unused8: 'Null',
      __Unused9: 'Null',
      __Unused10: 'Null',
      __Unused11: 'Null',
      __Unused12: 'Null',
      __Unused13: 'Null',
      __Unused14: 'Null',
      __Unused15: 'Null',
      __Unused16: 'Null',
      __Unused17: 'Null',
      __Unused18: 'Null',
      __Unused19: 'Null',
      __Unused20: 'Null',
      __Unused21: 'Null',
      __Unused22: 'Null',
      __Unused23: 'Null',
      __Unused24: 'Null',
      __Unused25: 'Null',
      __Unused26: 'Null',
      __Unused27: 'Null',
      __Unused28: 'Null',
      __Unused29: 'Null',
      __Unused30: 'Null',
      CumulusXcm: 'CumulusPalletXcmOrigin',
      __Unused32: 'Null',
      PolkadotXcm: 'PalletXcmOrigin',
      __Unused34: 'Null',
      __Unused35: 'Null',
      __Unused36: 'Null',
      __Unused37: 'Null',
      __Unused38: 'Null',
      __Unused39: 'Null',
      __Unused40: 'Null',
      __Unused41: 'Null',
      __Unused42: 'Null',
      __Unused43: 'Null',
      __Unused44: 'Null',
      __Unused45: 'Null',
      __Unused46: 'Null',
      __Unused47: 'Null',
      __Unused48: 'Null',
      __Unused49: 'Null',
      __Unused50: 'Null',
      __Unused51: 'Null',
      __Unused52: 'Null',
      __Unused53: 'Null',
      __Unused54: 'Null',
      __Unused55: 'Null',
      __Unused56: 'Null',
      __Unused57: 'Null',
      __Unused58: 'Null',
      __Unused59: 'Null',
      __Unused60: 'Null',
      __Unused61: 'Null',
      Council: 'PalletCollectiveRawOrigin',
      __Unused63: 'Null',
      __Unused64: 'Null',
      __Unused65: 'Null',
      TechnicalCommittee: 'PalletCollectiveRawOrigin'
    }
  },
  /**
   * Lookup393: frame_support::dispatch::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSupportDispatchRawOrigin: {
    _enum: {
      Root: 'Null',
      Signed: 'AccountId32',
      None: 'Null'
    }
  },
  /**
   * Lookup394: cumulus_pallet_xcm::pallet::Origin
   **/
  CumulusPalletXcmOrigin: {
    _enum: {
      Relay: 'Null',
      SiblingParachain: 'u32'
    }
  },
  /**
   * Lookup395: pallet_xcm::pallet::Origin
   **/
  PalletXcmOrigin: {
    _enum: {
      Xcm: 'XcmV3MultiLocation',
      Response: 'XcmV3MultiLocation'
    }
  },
  /**
   * Lookup396: pallet_collective::RawOrigin<sp_core::crypto::AccountId32, I>
   **/
  PalletCollectiveRawOrigin: {
    _enum: {
      Members: '(u32,u32)',
      Member: 'AccountId32',
      _Phantom: 'Null'
    }
  },
  /**
   * Lookup398: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup399: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls']
  },
  /**
   * Lookup401: pallet_multisig::Multisig<BlockNumber, Balance, sp_core::crypto::AccountId32, MaxApprovals>
   **/
  PalletMultisigMultisig: {
    when: 'PalletMultisigTimepoint',
    deposit: 'u128',
    depositor: 'AccountId32',
    approvals: 'Vec<AccountId32>'
  },
  /**
   * Lookup403: pallet_multisig::pallet::Error<T>
   **/
  PalletMultisigError: {
    _enum: ['MinimumThreshold', 'AlreadyApproved', 'NoApprovalsNeeded', 'TooFewSignatories', 'TooManySignatories', 'SignatoriesOutOfOrder', 'SenderInSignatories', 'NotFound', 'NotOwner', 'NoTimepoint', 'WrongTimepoint', 'UnexpectedTimepoint', 'MaxWeightTooLow', 'AlreadyStored']
  },
  /**
   * Lookup406: pallet_proxy::ProxyDefinition<sp_core::crypto::AccountId32, khala_parachain_runtime::ProxyType, BlockNumber>
   **/
  PalletProxyProxyDefinition: {
    delegate: 'AccountId32',
    proxyType: 'KhalaParachainRuntimeProxyType',
    delay: 'u32'
  },
  /**
   * Lookup410: pallet_proxy::Announcement<sp_core::crypto::AccountId32, primitive_types::H256, BlockNumber>
   **/
  PalletProxyAnnouncement: {
    real: 'AccountId32',
    callHash: 'H256',
    height: 'u32'
  },
  /**
   * Lookup412: pallet_proxy::pallet::Error<T>
   **/
  PalletProxyError: {
    _enum: ['TooMany', 'NotFound', 'NotProxy', 'Unproxyable', 'Duplicate', 'NoPermission', 'Unannounced', 'NoSelfProxy']
  },
  /**
   * Lookup415: pallet_vesting::Releases
   **/
  PalletVestingReleases: {
    _enum: ['V0', 'V1']
  },
  /**
   * Lookup416: pallet_vesting::pallet::Error<T>
   **/
  PalletVestingError: {
    _enum: ['NotVesting', 'AtMaxVestingSchedules', 'AmountLow', 'ScheduleIndexOutOfBounds', 'InvalidScheduleParams']
  },
  /**
   * Lookup419: pallet_scheduler::Scheduled<Name, frame_support::traits::preimages::Bounded<khala_parachain_runtime::RuntimeCall>, BlockNumber, khala_parachain_runtime::OriginCaller, sp_core::crypto::AccountId32>
   **/
  PalletSchedulerScheduled: {
    maybeId: 'Option<[u8;32]>',
    priority: 'u8',
    call: 'FrameSupportPreimagesBounded',
    maybePeriodic: 'Option<(u32,u32)>',
    origin: 'KhalaParachainRuntimeOriginCaller'
  },
  /**
   * Lookup421: pallet_scheduler::pallet::Error<T>
   **/
  PalletSchedulerError: {
    _enum: ['FailedToSchedule', 'NotFound', 'TargetBlockNumberInPast', 'RescheduleNoChange', 'Named']
  },
  /**
   * Lookup422: pallet_preimage::RequestStatus<sp_core::crypto::AccountId32, Balance>
   **/
  PalletPreimageRequestStatus: {
    _enum: {
      Unrequested: {
        deposit: '(AccountId32,u128)',
        len: 'u32',
      },
      Requested: {
        deposit: 'Option<(AccountId32,u128)>',
        count: 'u32',
        len: 'Option<u32>'
      }
    }
  },
  /**
   * Lookup426: pallet_preimage::pallet::Error<T>
   **/
  PalletPreimageError: {
    _enum: ['TooBig', 'AlreadyNoted', 'NotAuthorized', 'NotNoted', 'Requested', 'NotRequested']
  },
  /**
   * Lookup428: polkadot_primitives::v2::UpgradeRestriction
   **/
  PolkadotPrimitivesV2UpgradeRestriction: {
    _enum: ['Present']
  },
  /**
   * Lookup429: cumulus_pallet_parachain_system::relay_state_snapshot::MessagingStateSnapshot
   **/
  CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot: {
    dmqMqcHead: 'H256',
    relayDispatchQueueSize: '(u32,u32)',
    ingressChannels: 'Vec<(u32,PolkadotPrimitivesV2AbridgedHrmpChannel)>',
    egressChannels: 'Vec<(u32,PolkadotPrimitivesV2AbridgedHrmpChannel)>'
  },
  /**
   * Lookup432: polkadot_primitives::v2::AbridgedHrmpChannel
   **/
  PolkadotPrimitivesV2AbridgedHrmpChannel: {
    maxCapacity: 'u32',
    maxTotalSize: 'u32',
    maxMessageSize: 'u32',
    msgCount: 'u32',
    totalSize: 'u32',
    mqcHead: 'Option<H256>'
  },
  /**
   * Lookup433: polkadot_primitives::v2::AbridgedHostConfiguration
   **/
  PolkadotPrimitivesV2AbridgedHostConfiguration: {
    maxCodeSize: 'u32',
    maxHeadDataSize: 'u32',
    maxUpwardQueueCount: 'u32',
    maxUpwardQueueSize: 'u32',
    maxUpwardMessageSize: 'u32',
    maxUpwardMessageNumPerCandidate: 'u32',
    hrmpMaxMessageNumPerCandidate: 'u32',
    validationUpgradeCooldown: 'u32',
    validationUpgradeDelay: 'u32'
  },
  /**
   * Lookup439: polkadot_core_primitives::OutboundHrmpMessage<polkadot_parachain::primitives::Id>
   **/
  PolkadotCorePrimitivesOutboundHrmpMessage: {
    recipient: 'u32',
    data: 'Bytes'
  },
  /**
   * Lookup440: cumulus_pallet_parachain_system::CodeUpgradeAuthorization<T>
   **/
  CumulusPalletParachainSystemCodeUpgradeAuthorization: {
    codeHash: 'H256',
    checkVersion: 'bool'
  },
  /**
   * Lookup441: cumulus_pallet_parachain_system::pallet::Error<T>
   **/
  CumulusPalletParachainSystemError: {
    _enum: ['OverlappingUpgrades', 'ProhibitedByPolkadot', 'TooBig', 'ValidationDataNotAvailable', 'HostConfigurationNotAvailable', 'NotScheduled', 'NothingAuthorized', 'Unauthorized']
  },
  /**
   * Lookup443: cumulus_pallet_xcmp_queue::InboundChannelDetails
   **/
  CumulusPalletXcmpQueueInboundChannelDetails: {
    sender: 'u32',
    state: 'CumulusPalletXcmpQueueInboundState',
    messageMetadata: 'Vec<(u32,PolkadotParachainPrimitivesXcmpMessageFormat)>'
  },
  /**
   * Lookup444: cumulus_pallet_xcmp_queue::InboundState
   **/
  CumulusPalletXcmpQueueInboundState: {
    _enum: ['Ok', 'Suspended']
  },
  /**
   * Lookup447: polkadot_parachain::primitives::XcmpMessageFormat
   **/
  PolkadotParachainPrimitivesXcmpMessageFormat: {
    _enum: ['ConcatenatedVersionedXcm', 'ConcatenatedEncodedBlob', 'Signals']
  },
  /**
   * Lookup450: cumulus_pallet_xcmp_queue::OutboundChannelDetails
   **/
  CumulusPalletXcmpQueueOutboundChannelDetails: {
    recipient: 'u32',
    state: 'CumulusPalletXcmpQueueOutboundState',
    signalsExist: 'bool',
    firstIndex: 'u16',
    lastIndex: 'u16'
  },
  /**
   * Lookup451: cumulus_pallet_xcmp_queue::OutboundState
   **/
  CumulusPalletXcmpQueueOutboundState: {
    _enum: ['Ok', 'Suspended']
  },
  /**
   * Lookup453: cumulus_pallet_xcmp_queue::QueueConfigData
   **/
  CumulusPalletXcmpQueueQueueConfigData: {
    suspendThreshold: 'u32',
    dropThreshold: 'u32',
    resumeThreshold: 'u32',
    thresholdWeight: 'SpWeightsWeightV2Weight',
    weightRestrictDecay: 'SpWeightsWeightV2Weight',
    xcmpMaxIndividualWeight: 'SpWeightsWeightV2Weight'
  },
  /**
   * Lookup455: cumulus_pallet_xcmp_queue::pallet::Error<T>
   **/
  CumulusPalletXcmpQueueError: {
    _enum: ['FailedToSend', 'BadXcmOrigin', 'BadXcm', 'BadOverweightIndex', 'WeightOverLimit']
  },
  /**
   * Lookup456: cumulus_pallet_xcm::pallet::Error<T>
   **/
  CumulusPalletXcmError: 'Null',
  /**
   * Lookup457: cumulus_pallet_dmp_queue::ConfigData
   **/
  CumulusPalletDmpQueueConfigData: {
    maxIndividual: 'SpWeightsWeightV2Weight'
  },
  /**
   * Lookup458: cumulus_pallet_dmp_queue::PageIndexData
   **/
  CumulusPalletDmpQueuePageIndexData: {
    beginUsed: 'u32',
    endUsed: 'u32',
    overweightCount: 'u64'
  },
  /**
   * Lookup461: cumulus_pallet_dmp_queue::pallet::Error<T>
   **/
  CumulusPalletDmpQueueError: {
    _enum: ['Unknown', 'OverLimit']
  },
  /**
   * Lookup462: pallet_xcm::pallet::QueryStatus<BlockNumber>
   **/
  PalletXcmQueryStatus: {
    _enum: {
      Pending: {
        responder: 'XcmVersionedMultiLocation',
        maybeMatchQuerier: 'Option<XcmVersionedMultiLocation>',
        maybeNotify: 'Option<(u8,u8)>',
        timeout: 'u32',
      },
      VersionNotifier: {
        origin: 'XcmVersionedMultiLocation',
        isActive: 'bool',
      },
      Ready: {
        response: 'XcmVersionedResponse',
        at: 'u32'
      }
    }
  },
  /**
   * Lookup465: xcm::VersionedResponse
   **/
  XcmVersionedResponse: {
    _enum: {
      __Unused0: 'Null',
      __Unused1: 'Null',
      V2: 'XcmV2Response',
      V3: 'XcmV3Response'
    }
  },
  /**
   * Lookup471: pallet_xcm::pallet::VersionMigrationStage
   **/
  PalletXcmVersionMigrationStage: {
    _enum: {
      MigrateSupportedVersion: 'Null',
      MigrateVersionNotifiers: 'Null',
      NotifyCurrentTargets: 'Option<Bytes>',
      MigrateAndNotifyOldTargets: 'Null'
    }
  },
  /**
   * Lookup474: xcm::VersionedAssetId
   **/
  XcmVersionedAssetId: {
    _enum: {
      __Unused0: 'Null',
      __Unused1: 'Null',
      __Unused2: 'Null',
      V3: 'XcmV3MultiassetAssetId'
    }
  },
  /**
   * Lookup475: pallet_xcm::pallet::RemoteLockedFungibleRecord
   **/
  PalletXcmRemoteLockedFungibleRecord: {
    amount: 'u128',
    owner: 'XcmVersionedMultiLocation',
    locker: 'XcmVersionedMultiLocation',
    users: 'u32'
  },
  /**
   * Lookup479: pallet_xcm::pallet::Error<T>
   **/
  PalletXcmError: {
    _enum: ['Unreachable', 'SendFailure', 'Filtered', 'UnweighableMessage', 'DestinationNotInvertible', 'Empty', 'CannotReanchor', 'TooManyAssets', 'InvalidOrigin', 'BadVersion', 'BadLocation', 'NoSubscription', 'AlreadySubscribed', 'InvalidAsset', 'LowBalance', 'TooManyLocks', 'AccountNotSovereign', 'FeesNotMet', 'LockNotFound', 'InUse']
  },
  /**
   * Lookup481: pallet_balances::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u128',
    reasons: 'PalletBalancesReasons'
  },
  /**
   * Lookup482: pallet_balances::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup485: pallet_balances::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: '[u8;8]',
    amount: 'u128'
  },
  /**
   * Lookup487: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'KeepAlive', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves']
  },
  /**
   * Lookup489: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2']
  },
  /**
   * Lookup492: pallet_collator_selection::pallet::CandidateInfo<sp_core::crypto::AccountId32, Balance>
   **/
  PalletCollatorSelectionCandidateInfo: {
    who: 'AccountId32',
    deposit: 'u128'
  },
  /**
   * Lookup494: pallet_collator_selection::pallet::Error<T>
   **/
  PalletCollatorSelectionError: {
    _enum: ['TooManyCandidates', 'TooFewCandidates', 'Unknown', 'Permission', 'AlreadyCandidate', 'NotCandidate', 'TooManyInvulnerables', 'AlreadyInvulnerable', 'NoAssociatedValidatorId', 'ValidatorNotRegistered']
  },
  /**
   * Lookup498: sp_core::crypto::KeyTypeId
   **/
  SpCoreCryptoKeyTypeId: '[u8;4]',
  /**
   * Lookup499: pallet_session::pallet::Error<T>
   **/
  PalletSessionError: {
    _enum: ['InvalidProof', 'NoAssociatedValidatorId', 'DuplicatedKey', 'NoKeys', 'NoAccount']
  },
  /**
   * Lookup503: pallet_identity::types::Registration<Balance, MaxJudgements, MaxAdditionalFields>
   **/
  PalletIdentityRegistration: {
    judgements: 'Vec<(u32,PalletIdentityJudgement)>',
    deposit: 'u128',
    info: 'PalletIdentityIdentityInfo'
  },
  /**
   * Lookup511: pallet_identity::types::RegistrarInfo<Balance, sp_core::crypto::AccountId32>
   **/
  PalletIdentityRegistrarInfo: {
    account: 'AccountId32',
    fee: 'u128',
    fields: 'PalletIdentityBitFlags'
  },
  /**
   * Lookup513: pallet_identity::pallet::Error<T>
   **/
  PalletIdentityError: {
    _enum: ['TooManySubAccounts', 'NotFound', 'NotNamed', 'EmptyIndex', 'FeeChanged', 'NoIdentity', 'StickyJudgement', 'JudgementGiven', 'InvalidJudgement', 'InvalidIndex', 'InvalidTarget', 'TooManyFields', 'TooManyRegistrars', 'AlreadyClaimed', 'NotSub', 'NotOwned', 'JudgementForDifferentIdentity', 'JudgementPaymentFailed']
  },
  /**
   * Lookup519: pallet_democracy::types::ReferendumInfo<BlockNumber, frame_support::traits::preimages::Bounded<khala_parachain_runtime::RuntimeCall>, Balance>
   **/
  PalletDemocracyReferendumInfo: {
    _enum: {
      Ongoing: 'PalletDemocracyReferendumStatus',
      Finished: {
        approved: 'bool',
        end: 'u32'
      }
    }
  },
  /**
   * Lookup520: pallet_democracy::types::ReferendumStatus<BlockNumber, frame_support::traits::preimages::Bounded<khala_parachain_runtime::RuntimeCall>, Balance>
   **/
  PalletDemocracyReferendumStatus: {
    end: 'u32',
    proposal: 'FrameSupportPreimagesBounded',
    threshold: 'PalletDemocracyVoteThreshold',
    delay: 'u32',
    tally: 'PalletDemocracyTally'
  },
  /**
   * Lookup521: pallet_democracy::types::Tally<Balance>
   **/
  PalletDemocracyTally: {
    ayes: 'u128',
    nays: 'u128',
    turnout: 'u128'
  },
  /**
   * Lookup522: pallet_democracy::vote::Voting<Balance, sp_core::crypto::AccountId32, BlockNumber, MaxVotes>
   **/
  PalletDemocracyVoteVoting: {
    _enum: {
      Direct: {
        votes: 'Vec<(u32,PalletDemocracyVoteAccountVote)>',
        delegations: 'PalletDemocracyDelegations',
        prior: 'PalletDemocracyVotePriorLock',
      },
      Delegating: {
        balance: 'u128',
        target: 'AccountId32',
        conviction: 'PalletDemocracyConviction',
        delegations: 'PalletDemocracyDelegations',
        prior: 'PalletDemocracyVotePriorLock'
      }
    }
  },
  /**
   * Lookup526: pallet_democracy::types::Delegations<Balance>
   **/
  PalletDemocracyDelegations: {
    votes: 'u128',
    capital: 'u128'
  },
  /**
   * Lookup527: pallet_democracy::vote::PriorLock<BlockNumber, Balance>
   **/
  PalletDemocracyVotePriorLock: '(u32,u128)',
  /**
   * Lookup531: pallet_democracy::pallet::Error<T>
   **/
  PalletDemocracyError: {
    _enum: ['ValueLow', 'ProposalMissing', 'AlreadyCanceled', 'DuplicateProposal', 'ProposalBlacklisted', 'NotSimpleMajority', 'InvalidHash', 'NoProposal', 'AlreadyVetoed', 'ReferendumInvalid', 'NoneWaiting', 'NotVoter', 'NoPermission', 'AlreadyDelegating', 'InsufficientFunds', 'NotDelegating', 'VotesExist', 'InstantNotAllowed', 'Nonsense', 'WrongUpperBound', 'MaxVotesReached', 'TooMany', 'VotingPeriodLow', 'PreimageNotExist']
  },
  /**
   * Lookup533: pallet_collective::Votes<sp_core::crypto::AccountId32, BlockNumber>
   **/
  PalletCollectiveVotes: {
    index: 'u32',
    threshold: 'u32',
    ayes: 'Vec<AccountId32>',
    nays: 'Vec<AccountId32>',
    end: 'u32'
  },
  /**
   * Lookup534: pallet_collective::pallet::Error<T, I>
   **/
  PalletCollectiveError: {
    _enum: ['NotMember', 'DuplicateProposal', 'ProposalMissing', 'WrongIndex', 'DuplicateVote', 'AlreadyInitialized', 'TooEarly', 'TooManyProposals', 'WrongProposalWeight', 'WrongProposalLength']
  },
  /**
   * Lookup535: pallet_treasury::Proposal<sp_core::crypto::AccountId32, Balance>
   **/
  PalletTreasuryProposal: {
    proposer: 'AccountId32',
    value: 'u128',
    beneficiary: 'AccountId32',
    bond: 'u128'
  },
  /**
   * Lookup537: frame_support::PalletId
   **/
  FrameSupportPalletId: '[u8;8]',
  /**
   * Lookup538: pallet_treasury::pallet::Error<T, I>
   **/
  PalletTreasuryError: {
    _enum: ['InsufficientProposersBalance', 'InvalidIndex', 'TooManyApprovals', 'InsufficientPermission', 'ProposalNotApproved']
  },
  /**
   * Lookup539: pallet_bounties::Bounty<sp_core::crypto::AccountId32, Balance, BlockNumber>
   **/
  PalletBountiesBounty: {
    proposer: 'AccountId32',
    value: 'u128',
    fee: 'u128',
    curatorDeposit: 'u128',
    bond: 'u128',
    status: 'PalletBountiesBountyStatus'
  },
  /**
   * Lookup540: pallet_bounties::BountyStatus<sp_core::crypto::AccountId32, BlockNumber>
   **/
  PalletBountiesBountyStatus: {
    _enum: {
      Proposed: 'Null',
      Approved: 'Null',
      Funded: 'Null',
      CuratorProposed: {
        curator: 'AccountId32',
      },
      Active: {
        curator: 'AccountId32',
        updateDue: 'u32',
      },
      PendingPayout: {
        curator: 'AccountId32',
        beneficiary: 'AccountId32',
        unlockAt: 'u32'
      }
    }
  },
  /**
   * Lookup542: pallet_bounties::pallet::Error<T, I>
   **/
  PalletBountiesError: {
    _enum: ['InsufficientProposersBalance', 'InvalidIndex', 'ReasonTooBig', 'UnexpectedStatus', 'RequireCurator', 'InvalidValue', 'InvalidFee', 'PendingPayout', 'Premature', 'HasActiveChildBounty', 'TooManyQueued']
  },
  /**
   * Lookup543: pallet_lottery::LotteryConfig<BlockNumber, Balance>
   **/
  PalletLotteryLotteryConfig: {
    price: 'u128',
    start: 'u32',
    length: 'u32',
    delay: 'u32',
    repeat: 'bool'
  },
  /**
   * Lookup547: pallet_lottery::pallet::Error<T>
   **/
  PalletLotteryError: {
    _enum: ['NotConfigured', 'InProgress', 'AlreadyEnded', 'InvalidCall', 'AlreadyParticipating', 'TooManyCalls', 'EncodingFailed']
  },
  /**
   * Lookup551: pallet_membership::pallet::Error<T, I>
   **/
  PalletMembershipError: {
    _enum: ['AlreadyMember', 'NotMember', 'TooManyMembers']
  },
  /**
   * Lookup553: pallet_elections_phragmen::SeatHolder<sp_core::crypto::AccountId32, Balance>
   **/
  PalletElectionsPhragmenSeatHolder: {
    who: 'AccountId32',
    stake: 'u128',
    deposit: 'u128'
  },
  /**
   * Lookup554: pallet_elections_phragmen::Voter<sp_core::crypto::AccountId32, Balance>
   **/
  PalletElectionsPhragmenVoter: {
    votes: 'Vec<AccountId32>',
    stake: 'u128',
    deposit: 'u128'
  },
  /**
   * Lookup555: pallet_elections_phragmen::pallet::Error<T>
   **/
  PalletElectionsPhragmenError: {
    _enum: ['UnableToVote', 'NoVotes', 'TooManyVotes', 'MaximumVotesExceeded', 'LowBalance', 'UnableToPayBond', 'MustBeVoter', 'DuplicatedCandidate', 'TooManyCandidates', 'MemberSubmit', 'RunnerUpSubmit', 'InsufficientCandidateFunds', 'NotMember', 'InvalidWitnessData', 'InvalidVoteCount', 'InvalidRenouncing', 'InvalidReplacement']
  },
  /**
   * Lookup556: pallet_tips::OpenTip<sp_core::crypto::AccountId32, Balance, BlockNumber, primitive_types::H256>
   **/
  PalletTipsOpenTip: {
    reason: 'H256',
    who: 'AccountId32',
    finder: 'AccountId32',
    deposit: 'u128',
    closes: 'Option<u32>',
    tips: 'Vec<(AccountId32,u128)>',
    findersFee: 'bool'
  },
  /**
   * Lookup558: pallet_tips::pallet::Error<T, I>
   **/
  PalletTipsError: {
    _enum: ['ReasonTooBig', 'AlreadyKnown', 'UnknownTip', 'NotFinder', 'StillOpen', 'Premature']
  },
  /**
   * Lookup559: pallet_child_bounties::ChildBounty<sp_core::crypto::AccountId32, Balance, BlockNumber>
   **/
  PalletChildBountiesChildBounty: {
    parentBounty: 'u32',
    value: 'u128',
    fee: 'u128',
    curatorDeposit: 'u128',
    status: 'PalletChildBountiesChildBountyStatus'
  },
  /**
   * Lookup560: pallet_child_bounties::ChildBountyStatus<sp_core::crypto::AccountId32, BlockNumber>
   **/
  PalletChildBountiesChildBountyStatus: {
    _enum: {
      Added: 'Null',
      CuratorProposed: {
        curator: 'AccountId32',
      },
      Active: {
        curator: 'AccountId32',
      },
      PendingPayout: {
        curator: 'AccountId32',
        beneficiary: 'AccountId32',
        unlockAt: 'u32'
      }
    }
  },
  /**
   * Lookup561: pallet_child_bounties::pallet::Error<T>
   **/
  PalletChildBountiesError: {
    _enum: ['ParentBountyNotActive', 'InsufficientBountyBalance', 'TooManyChildBounties']
  },
  /**
   * Lookup564: subbridge_pallets::chainbridge::pallet::ProposalVotes<sp_core::crypto::AccountId32, BlockNumber>
   **/
  SubbridgePalletsChainbridgePalletProposalVotes: {
    votesFor: 'Vec<AccountId32>',
    votesAgainst: 'Vec<AccountId32>',
    status: 'SubbridgePalletsChainbridgePalletProposalStatus',
    expiry: 'u32'
  },
  /**
   * Lookup565: subbridge_pallets::chainbridge::pallet::ProposalStatus
   **/
  SubbridgePalletsChainbridgePalletProposalStatus: {
    _enum: ['Initiated', 'Approved', 'Rejected']
  },
  /**
   * Lookup567: subbridge_pallets::chainbridge::pallet::BridgeEvent
   **/
  SubbridgePalletsChainbridgePalletBridgeEvent: {
    _enum: {
      FungibleTransfer: '(u8,u64,[u8;32],U256,Bytes)',
      NonFungibleTransfer: '(u8,u64,[u8;32],Bytes,Bytes,Bytes)',
      GenericTransfer: '(u8,u64,[u8;32],Bytes)'
    }
  },
  /**
   * Lookup569: subbridge_pallets::chainbridge::pallet::Error<T>
   **/
  SubbridgePalletsChainbridgePalletError: {
    _enum: ['_ThresholdNotSet', 'InvalidChainId', 'InvalidThreshold', 'ChainNotWhitelisted', 'ChainAlreadyWhitelisted', '_ResourceDoesNotExist', 'RelayerAlreadyExists', 'RelayerInvalid', 'MustBeRelayer', 'RelayerAlreadyVoted', 'ProposalAlreadyExists', 'ProposalDoesNotExist', 'ProposalNotComplete', 'ProposalAlreadyComplete', 'ProposalExpired', 'InvalidFeeOption', 'ExtractAssetFailed', 'ExtractDestFailed', 'CannotPayAsFee', 'TransactFailed', 'InsufficientBalance', 'FeeTooExpensive', 'CannotDetermineReservedLocation', 'DestUnrecognized', 'AssetNotRegistered', 'AssetConversionFailed', 'Unimplemented', 'CannotDepositAsset', 'BridgeEventOverflow']
  },
  /**
   * Lookup570: subbridge_pallets::xcmbridge::pallet::Error<T>
   **/
  SubbridgePalletsXcmbridgePalletError: {
    _enum: ['_UnknownError', 'CannotReanchor', 'UnweighableMessage', '_FeePaymentEmpty', 'ExecutionFailed', '_UnknownTransfer', 'AssetNotFound', '_LocationInvertFailed', 'IllegalDestination', 'CannotDepositAsset', 'UnknownTransferType', 'Unimplemented']
  },
  /**
   * Lookup571: subbridge_pallets::xtransfer::pallet::Error<T>
   **/
  SubbridgePalletsXtransferPalletError: {
    _enum: ['_TransactFailed', 'UnknownAsset', 'UnsupportedDest', 'UnhandledTransfer']
  },
  /**
   * Lookup573: phala_pallets::mq::pallet::Error<T>
   **/
  PhalaPalletsMqPalletError: {
    _enum: ['BadSender', 'BadSequence', 'BadDestination']
  },
  /**
   * Lookup575: phala_pallets::registry::pallet::WorkerInfoV2<sp_core::crypto::AccountId32>
   **/
  PhalaPalletsRegistryPalletWorkerInfoV2: {
    pubkey: 'SpCoreSr25519Public',
    ecdhPubkey: 'SpCoreSr25519Public',
    runtimeVersion: 'u32',
    lastUpdated: 'u64',
    operator: 'Option<AccountId32>',
    attestationProvider: 'Option<PhalaTypesAttestationProvider>',
    confidenceLevel: 'u8',
    initialScore: 'Option<u32>',
    features: 'Vec<u32>'
  },
  /**
   * Lookup577: phala_pallets::registry::pallet::KnownConsensusVersion
   **/
  PhalaPalletsRegistryPalletKnownConsensusVersion: {
    version: 'u32',
    count: 'u32'
  },
  /**
   * Lookup578: phala_pallets::registry::pallet::Error<T>
   **/
  PhalaPalletsRegistryPalletError: {
    _enum: ['CannotHandleUnknownMessage', 'InvalidSender', 'InvalidPubKey', 'MalformedSignature', 'InvalidSignatureLength', 'InvalidSignature', 'UnknownContract', 'InvalidIASSigningCert', 'InvalidReport', 'InvalidQuoteStatus', 'BadIASReport', 'OutdatedIASReport', 'UnknownQuoteBodyFormat', 'InvalidRuntimeInfoHash', 'InvalidRuntimeInfo', 'InvalidInput', 'InvalidBenchReport', 'WorkerNotFound', 'NoneAttestationDisabled', 'InvalidGatekeeper', 'InvalidMasterPubkey', 'MasterKeyMismatch', 'MasterKeyUninitialized', 'GenesisBlockHashRejected', 'GenesisBlockHashAlreadyExists', 'GenesisBlockHashNotFound', 'PRuntimeRejected', 'PRuntimeAlreadyExists', 'PRuntimeNotFound', 'UnknownCluster', 'NotImplemented', 'CannotRemoveLastGatekeeper', 'MasterKeyInRotation', 'InvalidRotatedMasterPubkey', 'InvalidEndpointSigningTime', 'NotMigrationRoot', 'ParachainIdMismatch', 'InvalidConsensusVersion']
  },
  /**
   * Lookup579: phala_pallets::compute::computation::pallet::SessionInfo
   **/
  PhalaPalletsComputeComputationPalletSessionInfo: {
    state: 'PhalaPalletsComputeComputationPalletWorkerState',
    ve: 'u128',
    v: 'u128',
    vUpdatedAt: 'u64',
    benchmark: 'PhalaPalletsComputeComputationPalletBenchmark',
    coolDownStart: 'u64',
    stats: 'PhalaPalletsComputeComputationPalletSessionStats'
  },
  /**
   * Lookup580: phala_pallets::compute::computation::pallet::WorkerState
   **/
  PhalaPalletsComputeComputationPalletWorkerState: {
    _enum: ['Ready', 'WorkerIdle', '_Unused', 'WorkerUnresponsive', 'WorkerCoolingDown']
  },
  /**
   * Lookup581: phala_pallets::compute::computation::pallet::Benchmark
   **/
  PhalaPalletsComputeComputationPalletBenchmark: {
    pInit: 'u32',
    pInstant: 'u32',
    iterations: 'u64',
    workingStartTime: 'u64',
    challengeTimeLast: 'u64'
  },
  /**
   * Lookup582: phala_pallets::compute::computation::pallet::SessionStats
   **/
  PhalaPalletsComputeComputationPalletSessionStats: {
    totalReward: 'u128'
  },
  /**
   * Lookup583: phala_pallets::compute::computation::pallet::Error<T>
   **/
  PhalaPalletsComputeComputationPalletError: {
    _enum: ['BadSender', '_InvalidMessage', 'WorkerNotRegistered', '_GatekeeperNotRegistered', 'DuplicateBoundSession', 'BenchmarkMissing', 'SessionNotFound', 'SessionNotBound', 'WorkerNotReady', 'WorkerNotComputing', 'WorkerNotBound', 'CoolDownNotReady', 'InsufficientStake', 'TooMuchStake', 'InternalErrorBadTokenomicParameters', 'DuplicateBoundWorker', 'BenchmarkTooLow', 'InternalErrorCannotStartWithExistingStake', 'NotMigrationRoot', 'NonceIndexInvalid', 'BudgetUpdateBlockInvalid', 'BudgetExceedMaxLimit']
  },
  /**
   * Lookup584: phala_pallets::stake_pool::pallet::PoolInfo<sp_core::crypto::AccountId32, Balance>
   **/
  PhalaPalletsStakePoolPalletPoolInfo: {
    pid: 'u64',
    owner: 'AccountId32',
    payoutCommission: 'Option<Permill>',
    ownerReward: 'u128',
    cap: 'Option<u128>',
    rewardAcc: 'u128',
    totalShares: 'u128',
    totalStake: 'u128',
    freeStake: 'u128',
    releasingStake: 'u128',
    workers: 'Vec<SpCoreSr25519Public>',
    withdrawQueue: 'Vec<PhalaPalletsStakePoolPalletWithdrawInfo>'
  },
  /**
   * Lookup587: phala_pallets::stake_pool::pallet::WithdrawInfo<sp_core::crypto::AccountId32, Balance>
   **/
  PhalaPalletsStakePoolPalletWithdrawInfo: {
    user: 'AccountId32',
    shares: 'u128',
    startTime: 'u64'
  },
  /**
   * Lookup589: phala_pallets::stake_pool::pallet::UserStakeInfo<sp_core::crypto::AccountId32, Balance>
   **/
  PhalaPalletsStakePoolPalletUserStakeInfo: {
    user: 'AccountId32',
    locked: 'u128',
    shares: 'u128',
    availableRewards: 'u128',
    rewardDebt: 'u128'
  },
  /**
   * Lookup592: phala_pallets::stake_pool::pallet::Error<T>
   **/
  PhalaPalletsStakePoolPalletError: 'Null',
  /**
   * Lookup593: pallet_assets::types::AssetDetails<Balance, sp_core::crypto::AccountId32, DepositBalance>
   **/
  PalletAssetsAssetDetails: {
    owner: 'AccountId32',
    issuer: 'AccountId32',
    admin: 'AccountId32',
    freezer: 'AccountId32',
    supply: 'u128',
    deposit: 'u128',
    minBalance: 'u128',
    isSufficient: 'bool',
    accounts: 'u32',
    sufficients: 'u32',
    approvals: 'u32',
    status: 'PalletAssetsAssetStatus'
  },
  /**
   * Lookup594: pallet_assets::types::AssetStatus
   **/
  PalletAssetsAssetStatus: {
    _enum: ['Live', 'Frozen', 'Destroying']
  },
  /**
   * Lookup596: pallet_assets::types::AssetAccount<Balance, DepositBalance, Extra>
   **/
  PalletAssetsAssetAccount: {
    balance: 'u128',
    isFrozen: 'bool',
    reason: 'PalletAssetsExistenceReason',
    extra: 'Null'
  },
  /**
   * Lookup597: pallet_assets::types::ExistenceReason<Balance>
   **/
  PalletAssetsExistenceReason: {
    _enum: {
      Consumer: 'Null',
      Sufficient: 'Null',
      DepositHeld: 'u128',
      DepositRefunded: 'Null'
    }
  },
  /**
   * Lookup599: pallet_assets::types::Approval<Balance, DepositBalance>
   **/
  PalletAssetsApproval: {
    amount: 'u128',
    deposit: 'u128'
  },
  /**
   * Lookup600: pallet_assets::types::AssetMetadata<DepositBalance, bounded_collections::bounded_vec::BoundedVec<T, S>>
   **/
  PalletAssetsAssetMetadata: {
    deposit: 'u128',
    name: 'Bytes',
    symbol: 'Bytes',
    decimals: 'u8',
    isFrozen: 'bool'
  },
  /**
   * Lookup602: pallet_assets::pallet::Error<T, I>
   **/
  PalletAssetsError: {
    _enum: ['BalanceLow', 'NoAccount', 'NoPermission', 'Unknown', 'Frozen', 'InUse', 'BadWitness', 'MinBalanceZero', 'NoProvider', 'BadMetadata', 'Unapproved', 'WouldDie', 'AlreadyExists', 'NoDeposit', 'WouldBurn', 'LiveAsset', 'AssetNotLive', 'IncorrectStatus', 'NotFrozen', 'CallbackFailed']
  },
  /**
   * Lookup603: assets_registry::pallet::AssetRegistryInfo
   **/
  AssetsRegistryAssetRegistryInfo: {
    location: 'XcmV3MultiLocation',
    reserveLocation: 'Option<XcmV3MultiLocation>',
    enabledBridges: 'Vec<AssetsRegistryXBridge>',
    properties: 'AssetsRegistryAssetProperties',
    executionPrice: 'Option<u128>'
  },
  /**
   * Lookup605: assets_registry::pallet::XBridge
   **/
  AssetsRegistryXBridge: {
    config: 'AssetsRegistryXBridgeConfig',
    metadata: 'Bytes'
  },
  /**
   * Lookup606: assets_registry::pallet::XBridgeConfig
   **/
  AssetsRegistryXBridgeConfig: {
    _enum: {
      Xcmp: 'Null',
      ChainBridge: {
        chainId: 'u8',
        resourceId: '[u8;32]',
        reserveAccount: '[u8;32]',
        isMintable: 'bool',
      },
      SygmaBridge: {
        destDomain: 'u8',
        resourceId: '[u8;32]',
        isMintable: 'bool'
      }
    }
  },
  /**
   * Lookup607: assets_registry::pallet::Error<T>
   **/
  AssetsRegistryError: {
    _enum: ['AssetAlreadyExist', 'AssetNotRegistered', 'BridgeAlreadyEnabled', 'BridgeAlreadyDisabled', 'FailedToTransactAsset', 'DuplictedLocation', 'LocationTooLong']
  },
  /**
   * Lookup609: phala_pallets::compute::stake_pool_v2::pallet::Error<T>
   **/
  PhalaPalletsComputeStakePoolV2PalletError: {
    _enum: ['WorkerNotRegistered', 'BenchmarkMissing', 'WorkerExists', 'WorkerAlreadyStopped', 'WorkerDoesNotExist', 'WorkerInAnotherPool', 'UnauthorizedOperator', 'UnauthorizedPoolOwner', 'InadequateCapacity', 'StakeExceedsCapacity', 'PoolDoesNotExist', '_PoolIsBusy', 'InsufficientContribution', 'NoNftToWithdraw', 'InsufficientBalance', 'PoolStakeNotFound', 'InsufficientFreeStake', 'InvalidWithdrawalAmount', 'FailedToBindSessionAndWorker', 'InternalSubsidyPoolCannotWithdraw', 'PoolBankrupt', 'NoRewardToClaim', 'FeatureNotEnabled', 'WorkersExceedLimit', 'CannotRestartWithLessStake', 'InvalidForceRewardAmount', 'WithdrawQueueNotEmpty', 'MissingCollectionId', 'VaultIsLocked', 'SessionDoesNotExist', 'WorkerIsNotReady', 'LockAccountStakeError', 'NoLegacyRewardToClaim']
  },
  /**
   * Lookup610: phala_pallets::compute::vault::pallet::Error<T>
   **/
  PhalaPalletsComputeVaultPalletError: {
    _enum: ['UnauthorizedPoolOwner', 'NoEnoughShareToClaim', 'NoRewardToClaim', 'AssetAccountNotExist', 'InsufficientBalance', 'InsufficientContribution', 'VaultBankrupt', 'NoNftToWithdraw']
  },
  /**
   * Lookup613: phala_pallets::compute::wrapped_balances::pallet::FinanceAccount<Balance>
   **/
  PhalaPalletsComputeWrappedBalancesPalletFinanceAccount: {
    investPools: 'Vec<(u64,u32)>',
    locked: 'u128'
  },
  /**
   * Lookup616: phala_pallets::compute::wrapped_balances::pallet::Error<T>
   **/
  PhalaPalletsComputeWrappedBalancesPalletError: {
    _enum: ['StakerAccountNotFound', 'UnwrapAmountExceedsAvaliableStake', 'VoteAmountLargerThanTotalStakes', 'ReferendumInvalid', 'ReferendumOngoing', 'IterationsIsNotVaild']
  },
  /**
   * Lookup617: phala_pallets::compute::pool_proxy::PoolProxy<sp_core::crypto::AccountId32, Balance>
   **/
  PhalaPalletsComputePoolProxy: {
    _enum: {
      StakePool: 'PhalaPalletsComputePoolProxyStakePool',
      Vault: 'PhalaPalletsComputePoolProxyVault'
    }
  },
  /**
   * Lookup618: phala_pallets::compute::pool_proxy::StakePool<sp_core::crypto::AccountId32, Balance>
   **/
  PhalaPalletsComputePoolProxyStakePool: {
    basepool: 'PhalaPalletsComputeBasePoolPalletBasePool',
    payoutCommission: 'Option<Permill>',
    cap: 'Option<u128>',
    workers: 'Vec<SpCoreSr25519Public>',
    cdWorkers: 'Vec<SpCoreSr25519Public>',
    lockAccount: 'AccountId32',
    ownerRewardAccount: 'AccountId32'
  },
  /**
   * Lookup619: phala_pallets::compute::base_pool::pallet::BasePool<sp_core::crypto::AccountId32, Balance>
   **/
  PhalaPalletsComputeBasePoolPalletBasePool: {
    pid: 'u64',
    owner: 'AccountId32',
    totalShares: 'u128',
    totalValue: 'u128',
    withdrawQueue: 'Vec<PhalaPalletsComputeBasePoolPalletWithdrawInfo>',
    valueSubscribers: 'Vec<u64>',
    cid: 'u32',
    poolAccountId: 'AccountId32'
  },
  /**
   * Lookup621: phala_pallets::compute::base_pool::pallet::WithdrawInfo<sp_core::crypto::AccountId32>
   **/
  PhalaPalletsComputeBasePoolPalletWithdrawInfo: {
    user: 'AccountId32',
    startTime: 'u64',
    nftId: 'u32'
  },
  /**
   * Lookup622: phala_pallets::compute::pool_proxy::Vault<sp_core::crypto::AccountId32, Balance>
   **/
  PhalaPalletsComputePoolProxyVault: {
    basepool: 'PhalaPalletsComputeBasePoolPalletBasePool',
    lastSharePriceCheckpoint: 'u128',
    commission: 'Option<Permill>',
    ownerShares: 'u128',
    investPools: 'Vec<u64>'
  },
  /**
   * Lookup623: phala_pallets::compute::base_pool::pallet::Error<T>
   **/
  PhalaPalletsComputeBasePoolPalletError: {
    _enum: ['MissCollectionId', 'PoolBankrupt', 'InvalidShareToWithdraw', 'InvalidWithdrawalAmount', 'RmrkError', 'PoolDoesNotExist', 'PoolTypeNotMatch', 'NftIdNotFound', 'InvalidSharePrice', 'AttrLocked', 'UnauthorizedPoolOwner', 'AlreadyInContributeWhitelist', 'NotInContributeWhitelist', 'ExceedWhitelistMaxLen', 'NoWhitelistCreated', 'ExceedMaxDescriptionLen', 'NotMigrationRoot', 'BurnNftFailed', 'TransferSharesAmountInvalid']
  },
  /**
   * Lookup624: pallet_uniques::types::CollectionDetails<sp_core::crypto::AccountId32, DepositBalance>
   **/
  PalletUniquesCollectionDetails: {
    owner: 'AccountId32',
    issuer: 'AccountId32',
    admin: 'AccountId32',
    freezer: 'AccountId32',
    totalDeposit: 'u128',
    freeHolding: 'bool',
    items: 'u32',
    itemMetadatas: 'u32',
    attributes: 'u32',
    isFrozen: 'bool'
  },
  /**
   * Lookup626: pallet_uniques::types::ItemDetails<sp_core::crypto::AccountId32, DepositBalance>
   **/
  PalletUniquesItemDetails: {
    owner: 'AccountId32',
    approved: 'Option<AccountId32>',
    isFrozen: 'bool',
    deposit: 'u128'
  },
  /**
   * Lookup627: pallet_uniques::types::CollectionMetadata<DepositBalance, StringLimit>
   **/
  PalletUniquesCollectionMetadata: {
    deposit: 'u128',
    data: 'Bytes',
    isFrozen: 'bool'
  },
  /**
   * Lookup628: pallet_uniques::types::ItemMetadata<DepositBalance, StringLimit>
   **/
  PalletUniquesItemMetadata: {
    deposit: 'u128',
    data: 'Bytes',
    isFrozen: 'bool'
  },
  /**
   * Lookup632: pallet_uniques::pallet::Error<T, I>
   **/
  PalletUniquesError: {
    _enum: ['NoPermission', 'UnknownCollection', 'AlreadyExists', 'WrongOwner', 'BadWitness', 'InUse', 'Frozen', 'WrongDelegate', 'NoDelegate', 'Unapproved', 'Unaccepted', 'Locked', 'MaxSupplyReached', 'MaxSupplyAlreadySet', 'MaxSupplyTooSmall', 'UnknownItem', 'NotForSale', 'BidTooLow']
  },
  /**
   * Lookup633: rmrk_traits::collection::CollectionInfo<bounded_collections::bounded_vec::BoundedVec<T, S>, bounded_collections::bounded_vec::BoundedVec<T, S>, sp_core::crypto::AccountId32>
   **/
  RmrkTraitsCollectionCollectionInfo: {
    issuer: 'AccountId32',
    metadata: 'Bytes',
    max: 'Option<u32>',
    symbol: 'Bytes',
    nftsCount: 'u32'
  },
  /**
   * Lookup634: rmrk_traits::nft::NftInfo<sp_core::crypto::AccountId32, sp_arithmetic::per_things::Permill, bounded_collections::bounded_vec::BoundedVec<T, S>, CollectionId, NftId>
   **/
  RmrkTraitsNftNftInfo: {
    owner: 'RmrkTraitsNftAccountIdOrCollectionNftTuple',
    royalty: 'Option<RmrkTraitsNftRoyaltyInfo>',
    metadata: 'Bytes',
    equipped: 'Option<(u32,u32)>',
    pending: 'bool',
    transferable: 'bool'
  },
  /**
   * Lookup636: rmrk_traits::resource::ResourceInfo<bounded_collections::bounded_vec::BoundedVec<T, S>, bounded_collections::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsResourceResourceInfo: {
    id: 'u32',
    resource: 'RmrkTraitsResourceResourceTypes',
    pending: 'bool',
    pendingRemoval: 'bool'
  },
  /**
   * Lookup639: rmrk_traits::nft::NftChild<CollectionId, NftId>
   **/
  RmrkTraitsNftNftChild: {
    collectionId: 'u32',
    nftId: 'u32'
  },
  /**
   * Lookup640: PhantomType::phantom_type<rmrk_traits::property::PropertyInfo<bounded_collections::bounded_vec::BoundedVec<T, S>, bounded_collections::bounded_vec::BoundedVec<T, S>>>
   **/
  PhantomType: '[Lookup641;0]',
  /**
   * Lookup641: rmrk_traits::property::PropertyInfo<bounded_collections::bounded_vec::BoundedVec<T, S>, bounded_collections::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsPropertyPropertyInfo: {
    key: 'Bytes',
    value: 'Bytes'
  },
  /**
   * Lookup643: pallet_rmrk_core::pallet::Error<T>
   **/
  PalletRmrkCoreError: {
    _enum: ['NoneValue', 'StorageOverflow', 'TooLong', 'NoAvailableCollectionId', 'NoAvailableResourceId', 'MetadataNotSet', 'RecipientNotSet', 'NoAvailableNftId', 'NotInRange', 'RoyaltyNotSet', 'CollectionUnknown', 'NoPermission', 'NoWitness', 'CollectionNotEmpty', 'CollectionFullOrLocked', 'CannotSendToDescendentOrSelf', 'ResourceAlreadyExists', 'NftAlreadyExists', 'EmptyResource', 'TooManyRecursions', 'NftIsLocked', 'CannotAcceptNonOwnedNft', 'CannotRejectNonOwnedNft', 'CannotRejectNonPendingNft', 'ResourceDoesntExist', 'ResourceNotPending', 'NonTransferable', 'CannotSendEquippedItem', 'CannotAcceptToNewOwner', 'FailedTransferHooksPreCheck', 'FailedTransferHooksPostTransfer']
  },
  /**
   * Lookup644: rmrk_traits::base::BaseInfo<sp_core::crypto::AccountId32, bounded_collections::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsBaseBaseInfo: {
    issuer: 'AccountId32',
    baseType: 'Bytes',
    symbol: 'Bytes'
  },
  /**
   * Lookup647: pallet_rmrk_equip::pallet::Error<T>
   **/
  PalletRmrkEquipError: {
    _enum: ['PermissionError', 'ItemDoesntExist', 'EquipperDoesntExist', 'NoAvailableBaseId', 'TooManyEquippables', 'NoAvailablePartId', 'MustBeDirectParent', 'PartDoesntExist', 'BaseDoesntExist', 'CantEquipFixedPart', 'NoResourceForThisBaseFoundOnNft', 'CollectionNotEquippable', 'ItemHasNoResourceToEquipThere', 'NoEquippableOnFixedPart', 'NeedsDefaultThemeFirst', 'ItemAlreadyEquipped', 'SlotAlreadyEquipped', 'SlotNotEquipped', 'UnknownError', 'ExceedsMaxPartsPerBase', 'TooManyProperties', 'ItemNotEquipped', 'UnequipperMustOwnEitherItemOrEquipper', 'UnexpectedTryFromIntError', 'UnexpectedVecConversionError']
  },
  /**
   * Lookup648: pallet_rmrk_market::types::ListInfo<sp_core::crypto::AccountId32, Balance, BlockNumber>
   **/
  PalletRmrkMarketListInfo: {
    listedBy: 'AccountId32',
    amount: 'u128',
    expires: 'Option<u32>'
  },
  /**
   * Lookup650: pallet_rmrk_market::types::Offer<sp_core::crypto::AccountId32, Balance, BlockNumber>
   **/
  PalletRmrkMarketOffer: {
    maker: 'AccountId32',
    amount: 'u128',
    expires: 'Option<u32>'
  },
  /**
   * Lookup651: pallet_rmrk_market::pallet::Error<T>
   **/
  PalletRmrkMarketError: {
    _enum: ['NoPermission', 'TokenNotForSale', 'CannotWithdrawOffer', 'CannotUnlistToken', 'CannotOfferOnOwnToken', 'CannotBuyOwnToken', 'UnknownOffer', 'CannotListNftOwnedByNft', 'TokenDoesNotExist', 'OfferTooLow', 'AlreadyOffered', 'OfferHasExpired', 'ListingHasExpired', 'PriceDiffersFromExpected', 'NonTransferable', 'MarketplaceOwnerNotSet', 'CannotListNft']
  },
  /**
   * Lookup652: pallet_phala_world::traits::PreorderInfo<sp_core::crypto::AccountId32, bounded_collections::bounded_vec::BoundedVec<T, S>>
   **/
  PalletPhalaWorldPreorderInfo: {
    owner: 'AccountId32',
    race: 'PalletPhalaWorldRaceType',
    career: 'PalletPhalaWorldCareerType',
    metadata: 'Bytes'
  },
  /**
   * Lookup654: pallet_phala_world::traits::NftSaleInfo
   **/
  PalletPhalaWorldNftSaleInfo: {
    raceCount: 'u32',
    raceForSaleCount: 'u32',
    raceGiveawayCount: 'u32',
    raceReservedCount: 'u32'
  },
  /**
   * Lookup655: pallet_phala_world::nft_sale::pallet::Error<T>
   **/
  PalletPhalaWorldNftSalePalletError: {
    _enum: ['WorldClockAlreadySet', 'SpiritClaimNotAvailable', 'RareOriginOfShellPurchaseNotAvailable', 'PrimeOriginOfShellPurchaseNotAvailable', 'PreorderOriginOfShellNotAvailable', 'PreorderClaimNotAvailable', 'SpiritAlreadyClaimed', 'InvalidSpiritClaim', 'InvalidMetadata', 'MustOwnSpiritToPurchase', 'OriginOfShellAlreadyPurchased', 'BelowMinimumBalanceThreshold', 'WhitelistVerificationFailed', 'InvalidPurchase', 'NoAvailablePreorderId', 'PreorderClaimNotDetected', 'RefundClaimNotDetected', 'PreorderIsPending', 'PreordersCorrupted', 'NotPreorderOwner', 'RaceMintMaxReached', 'OverlordNotSet', 'RequireOverlordAccount', 'InvalidStatusType', 'WrongRarityType', 'SpiritCollectionNotSet', 'SpiritCollectionIdAlreadySet', 'SpiritsMetadataNotSet', 'OriginOfShellCollectionNotSet', 'OriginOfShellCollectionIdAlreadySet', 'OriginOfShellInventoryCorrupted', 'OriginOfShellInventoryAlreadySet', 'OriginOfShellsMetadataNotSet', 'KeyTooLong', 'NoAvailableRaceGivewayLeft', 'NoAvailableRaceReservedLeft', 'WrongNftSaleType', 'NoAvailableResourceId', 'NoAvailableNftId', 'ValueNotDetected', 'PayeeNotSet', 'SignerNotSet', 'NoAvailableCollectionId']
  },
  /**
   * Lookup656: pallet_phala_world::traits::FoodInfo
   **/
  PalletPhalaWorldFoodInfo: {
    era: 'u64',
    originOfShellsFed: 'BTreeMap<(u32,u32), u8>',
    foodLeft: 'u32'
  },
  /**
   * Lookup661: pallet_phala_world::incubation::pallet::Error<T>
   **/
  PalletPhalaWorldIncubationPalletError: {
    _enum: ['StartIncubationNotAvailable', 'HatchingInProgress', 'CannotHatchOriginOfShell', 'CannotSendFoodToOriginOfShell', '_Deprecated_MaxFoodFedLimitReached', 'CannotSetOriginOfShellChosenParts', 'AlreadySentFoodTwice', '_Deprecated_NoFoodAvailable', 'NotOwner', 'NoPermission', 'WrongCollectionId', '_Deprecated_NoHatchTimeDetected', 'ShellCollectionIdAlreadySet', 'ShellCollectionIdNotSet', 'RaceNotDetected', 'CareerNotDetected', 'RarityTypeNotDetected', 'GenerationNotDetected', 'FoodInfoUpdateError', 'ShellPartsCollectionIdAlreadySet', 'ShellPartsCollectionIdNotSet', 'ChosenPartsNotDetected', 'MissingShellPartMetadata', 'NoFoodLeftToFeedOriginOfShell']
  },
  /**
   * Lookup662: pallet_phala_world::marketplace::pallet::Error<T>
   **/
  PalletPhalaWorldMarketplacePalletError: 'Null',
  /**
   * Lookup663: pallet_index::pallet::Error<T>
   **/
  PalletIndexError: {
    _enum: ['AssetNotFound', 'WorkerAlreadySet', 'WorkerNotSet', 'WorkerMismatch', 'TaskAlreadyExist', 'NotFoundInTaskQueue', 'TaskQueueEmpty', 'TransactFailed']
  },
  /**
   * Lookup665: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature'
    }
  },
  /**
   * Lookup666: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup667: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup670: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
   **/
  FrameSystemExtensionsCheckNonZeroSender: 'Null',
  /**
   * Lookup671: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup672: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup673: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup676: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup677: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup678: phala_pallets::mq::check_seq::CheckMqSequence<T>
   **/
  PhalaPalletsMqCheckSeqCheckMqSequence: 'Null',
  /**
   * Lookup679: pallet_transaction_payment::ChargeTransactionPayment<T>
   **/
  PalletTransactionPaymentChargeTransactionPayment: 'Compact<u128>',
  /**
   * Lookup680: khala_parachain_runtime::Runtime
   **/
  KhalaParachainRuntimeRuntime: 'Null'
};
