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
    normal: 'Weight',
    operational: 'Weight',
    mandatory: 'Weight'
  },
  /**
   * Lookup12: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: 'Vec<SpRuntimeDigestDigestItem>'
  },
  /**
   * Lookup14: sp_runtime::generic::digest::DigestItem
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
   * Lookup17: frame_system::EventRecord<khala_parachain_runtime::RuntimeEvent, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: 'FrameSystemPhase',
    event: 'Event',
    topics: 'Vec<H256>'
  },
  /**
   * Lookup19: frame_system::pallet::Event<T>
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
   * Lookup20: frame_support::dispatch::DispatchInfo
   **/
  FrameSupportDispatchDispatchInfo: {
    weight: 'Weight',
    class: 'FrameSupportDispatchDispatchClass',
    paysFee: 'FrameSupportDispatchPays'
  },
  /**
   * Lookup21: frame_support::dispatch::DispatchClass
   **/
  FrameSupportDispatchDispatchClass: {
    _enum: ['Normal', 'Operational', 'Mandatory']
  },
  /**
   * Lookup22: frame_support::dispatch::Pays
   **/
  FrameSupportDispatchPays: {
    _enum: ['Yes', 'No']
  },
  /**
   * Lookup23: sp_runtime::DispatchError
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
      Arithmetic: 'SpRuntimeArithmeticError',
      Transactional: 'SpRuntimeTransactionalError'
    }
  },
  /**
   * Lookup24: sp_runtime::ModuleError
   **/
  SpRuntimeModuleError: {
    index: 'u8',
    error: '[u8;4]'
  },
  /**
   * Lookup25: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: ['NoFunds', 'WouldDie', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported']
  },
  /**
   * Lookup26: sp_runtime::ArithmeticError
   **/
  SpRuntimeArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero']
  },
  /**
   * Lookup27: sp_runtime::TransactionalError
   **/
  SpRuntimeTransactionalError: {
    _enum: ['LimitReached', 'NoLayer']
  },
  /**
   * Lookup28: pallet_utility::pallet::Event
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
   * Lookup31: pallet_multisig::pallet::Event<T>
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
   * Lookup32: pallet_multisig::Timepoint<BlockNumber>
   **/
  PalletMultisigTimepoint: {
    height: 'u32',
    index: 'u32'
  },
  /**
   * Lookup33: pallet_proxy::pallet::Event<T>
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
   * Lookup34: khala_parachain_runtime::ProxyType
   **/
  KhalaParachainRuntimeProxyType: {
    _enum: ['Any', 'NonTransfer', 'CancelProxy', 'Governance', 'Collator', 'StakePoolManager']
  },
  /**
   * Lookup36: pallet_vesting::pallet::Event<T>
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
   * Lookup37: pallet_scheduler::pallet::Event<T>
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
        id: 'Option<Bytes>',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      CallLookupFailed: {
        task: '(u32,u32)',
        id: 'Option<Bytes>',
        error: 'FrameSupportScheduleLookupError'
      }
    }
  },
  /**
   * Lookup40: frame_support::traits::schedule::LookupError
   **/
  FrameSupportScheduleLookupError: {
    _enum: ['Unknown', 'BadFormat']
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
        weightUsed: 'Weight',
        dmqHead: 'H256'
      }
    }
  },
  /**
   * Lookup43: cumulus_pallet_xcmp_queue::pallet::Event<T>
   **/
  CumulusPalletXcmpQueueEvent: {
    _enum: {
      Success: {
        messageHash: 'Option<H256>',
        weight: 'Weight',
      },
      Fail: {
        messageHash: 'Option<H256>',
        error: 'XcmV2TraitsError',
        weight: 'Weight',
      },
      BadVersion: {
        messageHash: 'Option<H256>',
      },
      BadFormat: {
        messageHash: 'Option<H256>',
      },
      UpwardMessageSent: {
        messageHash: 'Option<H256>',
      },
      XcmpMessageSent: {
        messageHash: 'Option<H256>',
      },
      OverweightEnqueued: {
        sender: 'u32',
        sentAt: 'u32',
        index: 'u64',
        required: 'Weight',
      },
      OverweightServiced: {
        index: 'u64',
        used: 'Weight'
      }
    }
  },
  /**
   * Lookup45: xcm::v2::traits::Error
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
   * Lookup47: cumulus_pallet_xcm::pallet::Event<T>
   **/
  CumulusPalletXcmEvent: {
    _enum: {
      InvalidFormat: '[u8;8]',
      UnsupportedVersion: '[u8;8]',
      ExecutedDownward: '([u8;8],XcmV2TraitsOutcome)'
    }
  },
  /**
   * Lookup49: xcm::v2::traits::Outcome
   **/
  XcmV2TraitsOutcome: {
    _enum: {
      Complete: 'u64',
      Incomplete: '(u64,XcmV2TraitsError)',
      Error: 'XcmV2TraitsError'
    }
  },
  /**
   * Lookup50: cumulus_pallet_dmp_queue::pallet::Event<T>
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
        outcome: 'XcmV2TraitsOutcome',
      },
      WeightExhausted: {
        messageId: '[u8;32]',
        remainingWeight: 'Weight',
        requiredWeight: 'Weight',
      },
      OverweightEnqueued: {
        messageId: '[u8;32]',
        overweightIndex: 'u64',
        requiredWeight: 'Weight',
      },
      OverweightServiced: {
        overweightIndex: 'u64',
        weightUsed: 'Weight'
      }
    }
  },
  /**
   * Lookup51: pallet_xcm::pallet::Event<T>
   **/
  PalletXcmEvent: {
    _enum: {
      Attempted: 'XcmV2TraitsOutcome',
      Sent: '(XcmV1MultiLocation,XcmV1MultiLocation,XcmV2Xcm)',
      UnexpectedResponse: '(XcmV1MultiLocation,u64)',
      ResponseReady: '(u64,XcmV2Response)',
      Notified: '(u64,u8,u8)',
      NotifyOverweight: '(u64,u8,u8,Weight,Weight)',
      NotifyDispatchError: '(u64,u8,u8)',
      NotifyDecodeFailed: '(u64,u8,u8)',
      InvalidResponder: '(XcmV1MultiLocation,u64,Option<XcmV1MultiLocation>)',
      InvalidResponderVersion: '(XcmV1MultiLocation,u64)',
      ResponseTaken: 'u64',
      AssetsTrapped: '(H256,XcmV1MultiLocation,XcmVersionedMultiAssets)',
      VersionChangeNotified: '(XcmV1MultiLocation,u32)',
      SupportedVersionChanged: '(XcmV1MultiLocation,u32)',
      NotifyTargetSendFail: '(XcmV1MultiLocation,u64,XcmV2TraitsError)',
      NotifyTargetMigrationFail: '(XcmVersionedMultiLocation,u64)'
    }
  },
  /**
   * Lookup52: xcm::v1::multilocation::MultiLocation
   **/
  XcmV1MultiLocation: {
    parents: 'u8',
    interior: 'XcmV1MultilocationJunctions'
  },
  /**
   * Lookup53: xcm::v1::multilocation::Junctions
   **/
  XcmV1MultilocationJunctions: {
    _enum: {
      Here: 'Null',
      X1: 'XcmV1Junction',
      X2: '(XcmV1Junction,XcmV1Junction)',
      X3: '(XcmV1Junction,XcmV1Junction,XcmV1Junction)',
      X4: '(XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction)',
      X5: '(XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction)',
      X6: '(XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction)',
      X7: '(XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction)',
      X8: '(XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction)'
    }
  },
  /**
   * Lookup54: xcm::v1::junction::Junction
   **/
  XcmV1Junction: {
    _enum: {
      Parachain: 'Compact<u32>',
      AccountId32: {
        network: 'XcmV0JunctionNetworkId',
        id: '[u8;32]',
      },
      AccountIndex64: {
        network: 'XcmV0JunctionNetworkId',
        index: 'Compact<u64>',
      },
      AccountKey20: {
        network: 'XcmV0JunctionNetworkId',
        key: '[u8;20]',
      },
      PalletInstance: 'u8',
      GeneralIndex: 'Compact<u128>',
      GeneralKey: 'Bytes',
      OnlyChild: 'Null',
      Plurality: {
        id: 'XcmV0JunctionBodyId',
        part: 'XcmV0JunctionBodyPart'
      }
    }
  },
  /**
   * Lookup56: xcm::v0::junction::NetworkId
   **/
  XcmV0JunctionNetworkId: {
    _enum: {
      Any: 'Null',
      Named: 'Bytes',
      Polkadot: 'Null',
      Kusama: 'Null'
    }
  },
  /**
   * Lookup61: xcm::v0::junction::BodyId
   **/
  XcmV0JunctionBodyId: {
    _enum: {
      Unit: 'Null',
      Named: 'Bytes',
      Index: 'Compact<u32>',
      Executive: 'Null',
      Technical: 'Null',
      Legislative: 'Null',
      Judicial: 'Null'
    }
  },
  /**
   * Lookup62: xcm::v0::junction::BodyPart
   **/
  XcmV0JunctionBodyPart: {
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
   * Lookup63: xcm::v2::Xcm<RuntimeCall>
   **/
  XcmV2Xcm: 'Vec<XcmV2Instruction>',
  /**
   * Lookup65: xcm::v2::Instruction<RuntimeCall>
   **/
  XcmV2Instruction: {
    _enum: {
      WithdrawAsset: 'XcmV1MultiassetMultiAssets',
      ReserveAssetDeposited: 'XcmV1MultiassetMultiAssets',
      ReceiveTeleportedAsset: 'XcmV1MultiassetMultiAssets',
      QueryResponse: {
        queryId: 'Compact<u64>',
        response: 'XcmV2Response',
        maxWeight: 'Compact<u64>',
      },
      TransferAsset: {
        assets: 'XcmV1MultiassetMultiAssets',
        beneficiary: 'XcmV1MultiLocation',
      },
      TransferReserveAsset: {
        assets: 'XcmV1MultiassetMultiAssets',
        dest: 'XcmV1MultiLocation',
        xcm: 'XcmV2Xcm',
      },
      Transact: {
        originType: 'XcmV0OriginKind',
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
      DescendOrigin: 'XcmV1MultilocationJunctions',
      ReportError: {
        queryId: 'Compact<u64>',
        dest: 'XcmV1MultiLocation',
        maxResponseWeight: 'Compact<u64>',
      },
      DepositAsset: {
        assets: 'XcmV1MultiassetMultiAssetFilter',
        maxAssets: 'Compact<u32>',
        beneficiary: 'XcmV1MultiLocation',
      },
      DepositReserveAsset: {
        assets: 'XcmV1MultiassetMultiAssetFilter',
        maxAssets: 'Compact<u32>',
        dest: 'XcmV1MultiLocation',
        xcm: 'XcmV2Xcm',
      },
      ExchangeAsset: {
        give: 'XcmV1MultiassetMultiAssetFilter',
        receive: 'XcmV1MultiassetMultiAssets',
      },
      InitiateReserveWithdraw: {
        assets: 'XcmV1MultiassetMultiAssetFilter',
        reserve: 'XcmV1MultiLocation',
        xcm: 'XcmV2Xcm',
      },
      InitiateTeleport: {
        assets: 'XcmV1MultiassetMultiAssetFilter',
        dest: 'XcmV1MultiLocation',
        xcm: 'XcmV2Xcm',
      },
      QueryHolding: {
        queryId: 'Compact<u64>',
        dest: 'XcmV1MultiLocation',
        assets: 'XcmV1MultiassetMultiAssetFilter',
        maxResponseWeight: 'Compact<u64>',
      },
      BuyExecution: {
        fees: 'XcmV1MultiAsset',
        weightLimit: 'XcmV2WeightLimit',
      },
      RefundSurplus: 'Null',
      SetErrorHandler: 'XcmV2Xcm',
      SetAppendix: 'XcmV2Xcm',
      ClearError: 'Null',
      ClaimAsset: {
        assets: 'XcmV1MultiassetMultiAssets',
        ticket: 'XcmV1MultiLocation',
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
   * Lookup66: xcm::v1::multiasset::MultiAssets
   **/
  XcmV1MultiassetMultiAssets: 'Vec<XcmV1MultiAsset>',
  /**
   * Lookup68: xcm::v1::multiasset::MultiAsset
   **/
  XcmV1MultiAsset: {
    id: 'XcmV1MultiassetAssetId',
    fun: 'XcmV1MultiassetFungibility'
  },
  /**
   * Lookup69: xcm::v1::multiasset::AssetId
   **/
  XcmV1MultiassetAssetId: {
    _enum: {
      Concrete: 'XcmV1MultiLocation',
      Abstract: 'Bytes'
    }
  },
  /**
   * Lookup70: xcm::v1::multiasset::Fungibility
   **/
  XcmV1MultiassetFungibility: {
    _enum: {
      Fungible: 'Compact<u128>',
      NonFungible: 'XcmV1MultiassetAssetInstance'
    }
  },
  /**
   * Lookup71: xcm::v1::multiasset::AssetInstance
   **/
  XcmV1MultiassetAssetInstance: {
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
   * Lookup73: xcm::v2::Response
   **/
  XcmV2Response: {
    _enum: {
      Null: 'Null',
      Assets: 'XcmV1MultiassetMultiAssets',
      ExecutionResult: 'Option<(u32,XcmV2TraitsError)>',
      Version: 'u32'
    }
  },
  /**
   * Lookup76: xcm::v0::OriginKind
   **/
  XcmV0OriginKind: {
    _enum: ['Native', 'SovereignAccount', 'Superuser', 'Xcm']
  },
  /**
   * Lookup77: xcm::double_encoded::DoubleEncoded<T>
   **/
  XcmDoubleEncoded: {
    encoded: 'Bytes'
  },
  /**
   * Lookup78: xcm::v1::multiasset::MultiAssetFilter
   **/
  XcmV1MultiassetMultiAssetFilter: {
    _enum: {
      Definite: 'XcmV1MultiassetMultiAssets',
      Wild: 'XcmV1MultiassetWildMultiAsset'
    }
  },
  /**
   * Lookup79: xcm::v1::multiasset::WildMultiAsset
   **/
  XcmV1MultiassetWildMultiAsset: {
    _enum: {
      All: 'Null',
      AllOf: {
        id: 'XcmV1MultiassetAssetId',
        fun: 'XcmV1MultiassetWildFungibility'
      }
    }
  },
  /**
   * Lookup80: xcm::v1::multiasset::WildFungibility
   **/
  XcmV1MultiassetWildFungibility: {
    _enum: ['Fungible', 'NonFungible']
  },
  /**
   * Lookup81: xcm::v2::WeightLimit
   **/
  XcmV2WeightLimit: {
    _enum: {
      Unlimited: 'Null',
      Limited: 'Compact<u64>'
    }
  },
  /**
   * Lookup83: xcm::VersionedMultiAssets
   **/
  XcmVersionedMultiAssets: {
    _enum: {
      V0: 'Vec<XcmV0MultiAsset>',
      V1: 'XcmV1MultiassetMultiAssets'
    }
  },
  /**
   * Lookup85: xcm::v0::multi_asset::MultiAsset
   **/
  XcmV0MultiAsset: {
    _enum: {
      None: 'Null',
      All: 'Null',
      AllFungible: 'Null',
      AllNonFungible: 'Null',
      AllAbstractFungible: {
        id: 'Bytes',
      },
      AllAbstractNonFungible: {
        class: 'Bytes',
      },
      AllConcreteFungible: {
        id: 'XcmV0MultiLocation',
      },
      AllConcreteNonFungible: {
        class: 'XcmV0MultiLocation',
      },
      AbstractFungible: {
        id: 'Bytes',
        amount: 'Compact<u128>',
      },
      AbstractNonFungible: {
        class: 'Bytes',
        instance: 'XcmV1MultiassetAssetInstance',
      },
      ConcreteFungible: {
        id: 'XcmV0MultiLocation',
        amount: 'Compact<u128>',
      },
      ConcreteNonFungible: {
        class: 'XcmV0MultiLocation',
        instance: 'XcmV1MultiassetAssetInstance'
      }
    }
  },
  /**
   * Lookup86: xcm::v0::multi_location::MultiLocation
   **/
  XcmV0MultiLocation: {
    _enum: {
      Null: 'Null',
      X1: 'XcmV0Junction',
      X2: '(XcmV0Junction,XcmV0Junction)',
      X3: '(XcmV0Junction,XcmV0Junction,XcmV0Junction)',
      X4: '(XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction)',
      X5: '(XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction)',
      X6: '(XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction)',
      X7: '(XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction)',
      X8: '(XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction)'
    }
  },
  /**
   * Lookup87: xcm::v0::junction::Junction
   **/
  XcmV0Junction: {
    _enum: {
      Parent: 'Null',
      Parachain: 'Compact<u32>',
      AccountId32: {
        network: 'XcmV0JunctionNetworkId',
        id: '[u8;32]',
      },
      AccountIndex64: {
        network: 'XcmV0JunctionNetworkId',
        index: 'Compact<u64>',
      },
      AccountKey20: {
        network: 'XcmV0JunctionNetworkId',
        key: '[u8;20]',
      },
      PalletInstance: 'u8',
      GeneralIndex: 'Compact<u128>',
      GeneralKey: 'Bytes',
      OnlyChild: 'Null',
      Plurality: {
        id: 'XcmV0JunctionBodyId',
        part: 'XcmV0JunctionBodyPart'
      }
    }
  },
  /**
   * Lookup88: xcm::VersionedMultiLocation
   **/
  XcmVersionedMultiLocation: {
    _enum: {
      V0: 'XcmV0MultiLocation',
      V1: 'XcmV1MultiLocation'
    }
  },
  /**
   * Lookup89: pallet_balances::pallet::Event<T, I>
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
   * Lookup90: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved']
  },
  /**
   * Lookup91: pallet_transaction_payment::pallet::Event<T>
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
   * Lookup92: pallet_collator_selection::pallet::Event<T>
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
   * Lookup94: pallet_session::pallet::Event
   **/
  PalletSessionEvent: {
    _enum: {
      NewSession: {
        sessionIndex: 'u32'
      }
    }
  },
  /**
   * Lookup95: pallet_identity::pallet::Event<T>
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
   * Lookup96: pallet_democracy::pallet::Event<T>
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
        depositors: 'Vec<AccountId32>',
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
      Executed: {
        refIndex: 'u32',
        result: 'Result<Null, SpRuntimeDispatchError>',
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
      PreimageNoted: {
        proposalHash: 'H256',
        who: 'AccountId32',
        deposit: 'u128',
      },
      PreimageUsed: {
        proposalHash: 'H256',
        provider: 'AccountId32',
        deposit: 'u128',
      },
      PreimageInvalid: {
        proposalHash: 'H256',
        refIndex: 'u32',
      },
      PreimageMissing: {
        proposalHash: 'H256',
        refIndex: 'u32',
      },
      PreimageReaped: {
        proposalHash: 'H256',
        provider: 'AccountId32',
        deposit: 'u128',
        reaper: 'AccountId32',
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
        propIndex: 'u32'
      }
    }
  },
  /**
   * Lookup97: pallet_democracy::vote_threshold::VoteThreshold
   **/
  PalletDemocracyVoteThreshold: {
    _enum: ['SuperMajorityApprove', 'SuperMajorityAgainst', 'SimpleMajority']
  },
  /**
   * Lookup98: pallet_democracy::vote::AccountVote<Balance>
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
   * Lookup100: pallet_collective::pallet::Event<T, I>
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
   * Lookup102: pallet_treasury::pallet::Event<T, I>
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
        beneficiary: 'AccountId32'
      }
    }
  },
  /**
   * Lookup103: pallet_bounties::pallet::Event<T, I>
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
   * Lookup104: pallet_lottery::pallet::Event<T>
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
   * Lookup107: pallet_membership::pallet::Event<T, I>
   **/
  PalletMembershipEvent: {
    _enum: ['MemberAdded', 'MemberRemoved', 'MembersSwapped', 'MembersReset', 'KeyChanged', 'Dummy']
  },
  /**
   * Lookup108: pallet_elections_phragmen::pallet::Event<T>
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
   * Lookup111: pallet_tips::pallet::Event<T, I>
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
   * Lookup112: pallet_child_bounties::pallet::Event<T>
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
   * Lookup113: subbridge_pallets::chainbridge::pallet::Event<T>
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
   * Lookup116: subbridge_pallets::xcmbridge::pallet::Event<T>
   **/
  SubbridgePalletsXcmbridgePalletEvent: {
    _enum: {
      AssetTransfered: {
        asset: 'XcmV1MultiAsset',
        origin: 'XcmV1MultiLocation',
        dest: 'XcmV1MultiLocation'
      }
    }
  },
  /**
   * Lookup117: subbridge_pallets::xtransfer::pallet::Event<T>
   **/
  SubbridgePalletsXtransferPalletEvent: {
    _enum: {
      Withdrawn: {
        what: 'XcmV1MultiAsset',
        who: 'XcmV1MultiLocation',
        memo: 'Bytes',
      },
      Deposited: {
        what: 'XcmV1MultiAsset',
        who: 'XcmV1MultiLocation',
        memo: 'Bytes',
      },
      Forwarded: {
        what: 'XcmV1MultiAsset',
        who: 'XcmV1MultiLocation',
        memo: 'Bytes'
      }
    }
  },
  /**
   * Lookup118: phala_pallets::registry::pallet::Event<T>
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
        confidenceLevel: 'u8',
      },
      WorkerUpdated: {
        pubkey: 'SpCoreSr25519Public',
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
      PRuntimeManagement: 'PhalaTypesMessagingPRuntimeManagementEvent'
    }
  },
  /**
   * Lookup119: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: '[u8;32]',
  /**
   * Lookup121: phala_types::messaging::PRuntimeManagementEvent
   **/
  PhalaTypesMessagingPRuntimeManagementEvent: {
    _enum: {
      RetirePRuntime: 'PhalaTypesMessagingRetireCondition',
      SetConsensusVersion: 'u32'
    }
  },
  /**
   * Lookup122: phala_types::messaging::RetireCondition
   **/
  PhalaTypesMessagingRetireCondition: {
    _enum: {
      VersionLessThan: '(u32,u32,u32)',
      VersionIs: '(u32,u32,u32)'
    }
  },
  /**
   * Lookup123: phala_pallets::mining::pallet::Event<T>
   **/
  PhalaPalletsMiningPalletEvent: {
    _enum: {
      CoolDownExpirationChanged: {
        period: 'u64',
      },
      MinerStarted: {
        miner: 'AccountId32',
        initV: 'u128',
        initP: 'u32',
      },
      MinerStopped: {
        miner: 'AccountId32',
      },
      MinerReclaimed: {
        miner: 'AccountId32',
        originalStake: 'u128',
        slashed: 'u128',
      },
      MinerBound: {
        miner: 'AccountId32',
        worker: 'SpCoreSr25519Public',
      },
      MinerUnbound: {
        miner: 'AccountId32',
        worker: 'SpCoreSr25519Public',
      },
      MinerEnterUnresponsive: {
        miner: 'AccountId32',
      },
      MinerExitUnresponsive: {
        miner: 'AccountId32',
      },
      MinerSettled: {
        miner: 'AccountId32',
        vBits: 'u128',
        payoutBits: 'u128',
      },
      InternalErrorMinerSettleFailed: {
        worker: 'SpCoreSr25519Public',
      },
      SubsidyBudgetHalved: 'Null',
      InternalErrorWrongHalvingConfigured: 'Null',
      TokenomicParametersChanged: 'Null',
      MinerSettlementDropped: {
        miner: 'AccountId32',
        v: 'u128',
        payout: 'u128',
      },
      BenchmarkUpdated: {
        miner: 'AccountId32',
        pInstant: 'u32'
      }
    }
  },
  /**
   * Lookup124: phala_pallets::stakepool::pallet::Event<T>
   **/
  PhalaPalletsStakepoolPalletEvent: {
    _enum: {
      PoolCreated: {
        owner: 'AccountId32',
        pid: 'u64',
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
        miner: 'AccountId32',
      },
      Contribution: {
        pid: 'u64',
        user: 'AccountId32',
        amount: 'u128',
        shares: 'u128',
      },
      Withdrawal: {
        pid: 'u64',
        user: 'AccountId32',
        amount: 'u128',
        shares: 'u128',
      },
      RewardsWithdrawn: {
        pid: 'u64',
        user: 'AccountId32',
        amount: 'u128',
      },
      OwnerRewardsWithdrawn: {
        pid: 'u64',
        user: 'AccountId32',
        amount: 'u128',
      },
      StakerRewardsWithdrawn: {
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
      DustRemoved: {
        user: 'AccountId32',
        amount: 'u128',
      },
      PoolWorkerRemoved: {
        pid: 'u64',
        worker: 'SpCoreSr25519Public',
      },
      WithdrawalQueued: {
        pid: 'u64',
        user: 'AccountId32',
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
        staker: 'AccountId32',
      },
      WorkerReclaimed: {
        pid: 'u64',
        worker: 'SpCoreSr25519Public',
        originalStake: 'u128',
      },
      RewardReceived: {
        pid: 'u64',
        toOwner: 'u128',
        toStakers: 'u128',
      },
      MiningStarted: {
        pid: 'u64',
        worker: 'SpCoreSr25519Public',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup125: pallet_assets::pallet::Event<T, I>
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
        totalSupply: 'u128',
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
        assetId: 'u32'
      }
    }
  },
  /**
   * Lookup126: assets_registry::pallet::Event<T>
   **/
  AssetsRegistryEvent: {
    _enum: {
      AssetRegistered: {
        assetId: 'u32',
        location: 'XcmV1MultiLocation',
      },
      AssetUnregistered: {
        assetId: 'u32',
        location: 'XcmV1MultiLocation',
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
   * Lookup127: pallet_uniques::pallet::Event<T, I>
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
   * Lookup134: pallet_rmrk_core::pallet::Event<T>
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
        nftId: 'u32',
        collectionId: 'u32',
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
      CollectionLocked: {
        issuer: 'AccountId32',
        collectionId: 'u32',
      },
      ResourceAdded: {
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
   * Lookup135: rmrk_traits::nft::AccountIdOrCollectionNftTuple<sp_core::crypto::AccountId32>
   **/
  RmrkTraitsNftAccountIdOrCollectionNftTuple: {
    _enum: {
      AccountId: 'AccountId32',
      CollectionAndNftTuple: '(u32,u32)'
    }
  },
  /**
   * Lookup136: pallet_rmrk_equip::pallet::Event<T>
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
   * Lookup137: pallet_rmrk_market::pallet::Event<T>
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
        nftId: 'u32'
      }
    }
  },
  /**
   * Lookup139: pallet_phala_world::nft_sale::pallet::Event<T>
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
        newPayee: 'AccountId32'
      }
    }
  },
  /**
   * Lookup140: pallet_phala_world::traits::RaceType
   **/
  PalletPhalaWorldRaceType: {
    _enum: ['Cyborg', 'AISpectre', 'XGene', 'Pandroid']
  },
  /**
   * Lookup141: pallet_phala_world::traits::CareerType
   **/
  PalletPhalaWorldCareerType: {
    _enum: ['HackerWizard', 'HardwareDruid', 'RoboWarrior', 'TradeNegotiator', 'Web3Monk']
  },
  /**
   * Lookup142: pallet_phala_world::traits::RarityType
   **/
  PalletPhalaWorldRarityType: {
    _enum: ['Prime', 'Magic', 'Legendary']
  },
  /**
   * Lookup143: pallet_phala_world::traits::NftSaleType
   **/
  PalletPhalaWorldNftSaleType: {
    _enum: ['ForSale', 'Giveaway', 'Reserved']
  },
  /**
   * Lookup146: pallet_phala_world::incubation::pallet::Event<T>
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
   * Lookup148: pallet_phala_world::traits::ShellParts<sp_core::bounded::bounded_vec::BoundedVec<T, S>, pallet_phala_world::traits::ShellPartInfo<sp_core::bounded::bounded_vec::BoundedVec<T, S>, sp_core::bounded::bounded_vec::BoundedVec<pallet_phala_world::traits::PartInfo<sp_core::bounded::bounded_vec::BoundedVec<T, S>>, S>>>
   **/
  PalletPhalaWorldShellParts: {
    parts: 'BTreeMap<Bytes, PalletPhalaWorldShellPartInfo>'
  },
  /**
   * Lookup149: pallet_phala_world::traits::ShellPartInfo<sp_core::bounded::bounded_vec::BoundedVec<T, S>, sp_core::bounded::bounded_vec::BoundedVec<pallet_phala_world::traits::PartInfo<sp_core::bounded::bounded_vec::BoundedVec<T, S>>, S>>
   **/
  PalletPhalaWorldShellPartInfo: {
    shellPart: 'PalletPhalaWorldPartInfo',
    subParts: 'Option<Vec<PalletPhalaWorldPartInfo>>'
  },
  /**
   * Lookup151: pallet_phala_world::traits::PartInfo<sp_core::bounded::bounded_vec::BoundedVec<T, S>>
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
   * Lookup152: pallet_phala_world::traits::PartRarityType
   **/
  PalletPhalaWorldPartRarityType: {
    _enum: ['Normal', 'Rare', 'Epic', 'Legend']
  },
  /**
   * Lookup157: pallet_phala_world::traits::PartSizeType
   **/
  PalletPhalaWorldPartSizeType: {
    _enum: ['MA', 'MB', 'XA', 'XB', 'XC', 'PA', 'PB', 'PC', 'PD', 'AA']
  },
  /**
   * Lookup165: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup168: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup170: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
      fill_block: {
        ratio: 'Perbill',
      },
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
   * Lookup175: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'Weight',
    maxBlock: 'Weight',
    perClass: 'FrameSupportDispatchPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup176: frame_support::dispatch::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportDispatchPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup177: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'Weight',
    maxExtrinsic: 'Option<Weight>',
    maxTotal: 'Option<Weight>',
    reserved: 'Option<Weight>'
  },
  /**
   * Lookup179: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportDispatchPerDispatchClassU32'
  },
  /**
   * Lookup180: frame_support::dispatch::PerDispatchClass<T>
   **/
  FrameSupportDispatchPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup181: sp_weights::RuntimeDbWeight
   **/
  SpWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup182: sp_version::RuntimeVersion
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
   * Lookup186: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered']
  },
  /**
   * Lookup187: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup189: pallet_utility::pallet::Call<T>
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
        calls: 'Vec<Call>'
      }
    }
  },
  /**
   * Lookup192: pallet_multisig::pallet::Call<T>
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
        call: 'WrapperKeepOpaque<Call>',
        storeCall: 'bool',
        maxWeight: 'Weight',
      },
      approve_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        maybeTimepoint: 'Option<PalletMultisigTimepoint>',
        callHash: '[u8;32]',
        maxWeight: 'Weight',
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
   * Lookup195: pallet_proxy::pallet::Call<T>
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
   * Lookup199: pallet_vesting::pallet::Call<T>
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
   * Lookup200: pallet_vesting::vesting_info::VestingInfo<Balance, BlockNumber>
   **/
  PalletVestingVestingInfo: {
    locked: 'u128',
    perBlock: 'u128',
    startingBlock: 'u32'
  },
  /**
   * Lookup201: pallet_scheduler::pallet::Call<T>
   **/
  PalletSchedulerCall: {
    _enum: {
      schedule: {
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed',
      },
      cancel: {
        when: 'u32',
        index: 'u32',
      },
      schedule_named: {
        id: 'Bytes',
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed',
      },
      cancel_named: {
        id: 'Bytes',
      },
      schedule_after: {
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed',
      },
      schedule_named_after: {
        id: 'Bytes',
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed'
      }
    }
  },
  /**
   * Lookup203: frame_support::traits::schedule::MaybeHashed<khala_parachain_runtime::RuntimeCall, primitive_types::H256>
   **/
  FrameSupportScheduleMaybeHashed: {
    _enum: {
      Value: 'Call',
      Hash: 'H256'
    }
  },
  /**
   * Lookup204: pallet_preimage::pallet::Call<T>
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
   * Lookup205: cumulus_pallet_parachain_system::pallet::Call<T>
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
      },
      enact_authorized_upgrade: {
        code: 'Bytes'
      }
    }
  },
  /**
   * Lookup206: cumulus_primitives_parachain_inherent::ParachainInherentData
   **/
  CumulusPrimitivesParachainInherentParachainInherentData: {
    validationData: 'PolkadotPrimitivesV2PersistedValidationData',
    relayChainState: 'SpTrieStorageProof',
    downwardMessages: 'Vec<PolkadotCorePrimitivesInboundDownwardMessage>',
    horizontalMessages: 'BTreeMap<u32, Vec<PolkadotCorePrimitivesInboundHrmpMessage>>'
  },
  /**
   * Lookup207: polkadot_primitives::v2::PersistedValidationData<primitive_types::H256, N>
   **/
  PolkadotPrimitivesV2PersistedValidationData: {
    parentHead: 'Bytes',
    relayParentNumber: 'u32',
    relayParentStorageRoot: 'H256',
    maxPovSize: 'u32'
  },
  /**
   * Lookup209: sp_trie::storage_proof::StorageProof
   **/
  SpTrieStorageProof: {
    trieNodes: 'BTreeSet<Bytes>'
  },
  /**
   * Lookup212: polkadot_core_primitives::InboundDownwardMessage<BlockNumber>
   **/
  PolkadotCorePrimitivesInboundDownwardMessage: {
    sentAt: 'u32',
    msg: 'Bytes'
  },
  /**
   * Lookup215: polkadot_core_primitives::InboundHrmpMessage<BlockNumber>
   **/
  PolkadotCorePrimitivesInboundHrmpMessage: {
    sentAt: 'u32',
    data: 'Bytes'
  },
  /**
   * Lookup218: cumulus_pallet_xcmp_queue::pallet::Call<T>
   **/
  CumulusPalletXcmpQueueCall: {
    _enum: {
      service_overweight: {
        index: 'u64',
        weightLimit: 'Weight',
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
        new_: 'Weight',
      },
      update_weight_restrict_decay: {
        _alias: {
          new_: 'new',
        },
        new_: 'Weight',
      },
      update_xcmp_max_individual_weight: {
        _alias: {
          new_: 'new',
        },
        new_: 'Weight'
      }
    }
  },
  /**
   * Lookup219: cumulus_pallet_dmp_queue::pallet::Call<T>
   **/
  CumulusPalletDmpQueueCall: {
    _enum: {
      service_overweight: {
        index: 'u64',
        weightLimit: 'Weight'
      }
    }
  },
  /**
   * Lookup220: pallet_xcm::pallet::Call<T>
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
        maxWeight: 'Weight',
      },
      force_xcm_version: {
        location: 'XcmV1MultiLocation',
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
        weightLimit: 'XcmV2WeightLimit',
      },
      limited_teleport_assets: {
        dest: 'XcmVersionedMultiLocation',
        beneficiary: 'XcmVersionedMultiLocation',
        assets: 'XcmVersionedMultiAssets',
        feeAssetItem: 'u32',
        weightLimit: 'XcmV2WeightLimit'
      }
    }
  },
  /**
   * Lookup221: xcm::VersionedXcm<RuntimeCall>
   **/
  XcmVersionedXcm: {
    _enum: {
      V0: 'XcmV0Xcm',
      V1: 'XcmV1Xcm',
      V2: 'XcmV2Xcm'
    }
  },
  /**
   * Lookup222: xcm::v0::Xcm<RuntimeCall>
   **/
  XcmV0Xcm: {
    _enum: {
      WithdrawAsset: {
        assets: 'Vec<XcmV0MultiAsset>',
        effects: 'Vec<XcmV0Order>',
      },
      ReserveAssetDeposit: {
        assets: 'Vec<XcmV0MultiAsset>',
        effects: 'Vec<XcmV0Order>',
      },
      TeleportAsset: {
        assets: 'Vec<XcmV0MultiAsset>',
        effects: 'Vec<XcmV0Order>',
      },
      QueryResponse: {
        queryId: 'Compact<u64>',
        response: 'XcmV0Response',
      },
      TransferAsset: {
        assets: 'Vec<XcmV0MultiAsset>',
        dest: 'XcmV0MultiLocation',
      },
      TransferReserveAsset: {
        assets: 'Vec<XcmV0MultiAsset>',
        dest: 'XcmV0MultiLocation',
        effects: 'Vec<XcmV0Order>',
      },
      Transact: {
        originType: 'XcmV0OriginKind',
        requireWeightAtMost: 'u64',
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
      RelayedFrom: {
        who: 'XcmV0MultiLocation',
        message: 'XcmV0Xcm'
      }
    }
  },
  /**
   * Lookup224: xcm::v0::order::Order<RuntimeCall>
   **/
  XcmV0Order: {
    _enum: {
      Null: 'Null',
      DepositAsset: {
        assets: 'Vec<XcmV0MultiAsset>',
        dest: 'XcmV0MultiLocation',
      },
      DepositReserveAsset: {
        assets: 'Vec<XcmV0MultiAsset>',
        dest: 'XcmV0MultiLocation',
        effects: 'Vec<XcmV0Order>',
      },
      ExchangeAsset: {
        give: 'Vec<XcmV0MultiAsset>',
        receive: 'Vec<XcmV0MultiAsset>',
      },
      InitiateReserveWithdraw: {
        assets: 'Vec<XcmV0MultiAsset>',
        reserve: 'XcmV0MultiLocation',
        effects: 'Vec<XcmV0Order>',
      },
      InitiateTeleport: {
        assets: 'Vec<XcmV0MultiAsset>',
        dest: 'XcmV0MultiLocation',
        effects: 'Vec<XcmV0Order>',
      },
      QueryHolding: {
        queryId: 'Compact<u64>',
        dest: 'XcmV0MultiLocation',
        assets: 'Vec<XcmV0MultiAsset>',
      },
      BuyExecution: {
        fees: 'XcmV0MultiAsset',
        weight: 'u64',
        debt: 'u64',
        haltOnError: 'bool',
        xcm: 'Vec<XcmV0Xcm>'
      }
    }
  },
  /**
   * Lookup226: xcm::v0::Response
   **/
  XcmV0Response: {
    _enum: {
      Assets: 'Vec<XcmV0MultiAsset>'
    }
  },
  /**
   * Lookup227: xcm::v1::Xcm<RuntimeCall>
   **/
  XcmV1Xcm: {
    _enum: {
      WithdrawAsset: {
        assets: 'XcmV1MultiassetMultiAssets',
        effects: 'Vec<XcmV1Order>',
      },
      ReserveAssetDeposited: {
        assets: 'XcmV1MultiassetMultiAssets',
        effects: 'Vec<XcmV1Order>',
      },
      ReceiveTeleportedAsset: {
        assets: 'XcmV1MultiassetMultiAssets',
        effects: 'Vec<XcmV1Order>',
      },
      QueryResponse: {
        queryId: 'Compact<u64>',
        response: 'XcmV1Response',
      },
      TransferAsset: {
        assets: 'XcmV1MultiassetMultiAssets',
        beneficiary: 'XcmV1MultiLocation',
      },
      TransferReserveAsset: {
        assets: 'XcmV1MultiassetMultiAssets',
        dest: 'XcmV1MultiLocation',
        effects: 'Vec<XcmV1Order>',
      },
      Transact: {
        originType: 'XcmV0OriginKind',
        requireWeightAtMost: 'u64',
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
      RelayedFrom: {
        who: 'XcmV1MultilocationJunctions',
        message: 'XcmV1Xcm',
      },
      SubscribeVersion: {
        queryId: 'Compact<u64>',
        maxResponseWeight: 'Compact<u64>',
      },
      UnsubscribeVersion: 'Null'
    }
  },
  /**
   * Lookup229: xcm::v1::order::Order<RuntimeCall>
   **/
  XcmV1Order: {
    _enum: {
      Noop: 'Null',
      DepositAsset: {
        assets: 'XcmV1MultiassetMultiAssetFilter',
        maxAssets: 'u32',
        beneficiary: 'XcmV1MultiLocation',
      },
      DepositReserveAsset: {
        assets: 'XcmV1MultiassetMultiAssetFilter',
        maxAssets: 'u32',
        dest: 'XcmV1MultiLocation',
        effects: 'Vec<XcmV1Order>',
      },
      ExchangeAsset: {
        give: 'XcmV1MultiassetMultiAssetFilter',
        receive: 'XcmV1MultiassetMultiAssets',
      },
      InitiateReserveWithdraw: {
        assets: 'XcmV1MultiassetMultiAssetFilter',
        reserve: 'XcmV1MultiLocation',
        effects: 'Vec<XcmV1Order>',
      },
      InitiateTeleport: {
        assets: 'XcmV1MultiassetMultiAssetFilter',
        dest: 'XcmV1MultiLocation',
        effects: 'Vec<XcmV1Order>',
      },
      QueryHolding: {
        queryId: 'Compact<u64>',
        dest: 'XcmV1MultiLocation',
        assets: 'XcmV1MultiassetMultiAssetFilter',
      },
      BuyExecution: {
        fees: 'XcmV1MultiAsset',
        weight: 'u64',
        debt: 'u64',
        haltOnError: 'bool',
        instructions: 'Vec<XcmV1Xcm>'
      }
    }
  },
  /**
   * Lookup231: xcm::v1::Response
   **/
  XcmV1Response: {
    _enum: {
      Assets: 'XcmV1MultiassetMultiAssets',
      Version: 'u32'
    }
  },
  /**
   * Lookup245: pallet_balances::pallet::Call<T, I>
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
   * Lookup246: pallet_authorship::pallet::Call<T>
   **/
  PalletAuthorshipCall: {
    _enum: {
      set_uncles: {
        newUncles: 'Vec<SpRuntimeHeader>'
      }
    }
  },
  /**
   * Lookup248: sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>
   **/
  SpRuntimeHeader: {
    parentHash: 'H256',
    number: 'Compact<u32>',
    stateRoot: 'H256',
    extrinsicsRoot: 'H256',
    digest: 'SpRuntimeDigest'
  },
  /**
   * Lookup249: sp_runtime::traits::BlakeTwo256
   **/
  SpRuntimeBlakeTwo256: 'Null',
  /**
   * Lookup250: pallet_collator_selection::pallet::Call<T>
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
   * Lookup251: pallet_session::pallet::Call<T>
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
   * Lookup252: khala_parachain_runtime::opaque::SessionKeys
   **/
  KhalaParachainRuntimeOpaqueSessionKeys: {
    aura: 'SpConsensusAuraSr25519AppSr25519Public'
  },
  /**
   * Lookup253: sp_consensus_aura::sr25519::app_sr25519::Public
   **/
  SpConsensusAuraSr25519AppSr25519Public: 'SpCoreSr25519Public',
  /**
   * Lookup254: pallet_identity::pallet::Call<T>
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
   * Lookup255: pallet_identity::types::IdentityInfo<FieldLimit>
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
   * Lookup291: pallet_identity::types::BitFlags<pallet_identity::types::IdentityField>
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
   * Lookup292: pallet_identity::types::IdentityField
   **/
  PalletIdentityIdentityField: {
    _enum: ['__Unused0', 'Display', 'Legal', '__Unused3', 'Web', '__Unused5', '__Unused6', '__Unused7', 'Riot', '__Unused9', '__Unused10', '__Unused11', '__Unused12', '__Unused13', '__Unused14', '__Unused15', 'Email', '__Unused17', '__Unused18', '__Unused19', '__Unused20', '__Unused21', '__Unused22', '__Unused23', '__Unused24', '__Unused25', '__Unused26', '__Unused27', '__Unused28', '__Unused29', '__Unused30', '__Unused31', 'PgpFingerprint', '__Unused33', '__Unused34', '__Unused35', '__Unused36', '__Unused37', '__Unused38', '__Unused39', '__Unused40', '__Unused41', '__Unused42', '__Unused43', '__Unused44', '__Unused45', '__Unused46', '__Unused47', '__Unused48', '__Unused49', '__Unused50', '__Unused51', '__Unused52', '__Unused53', '__Unused54', '__Unused55', '__Unused56', '__Unused57', '__Unused58', '__Unused59', '__Unused60', '__Unused61', '__Unused62', '__Unused63', 'Image', '__Unused65', '__Unused66', '__Unused67', '__Unused68', '__Unused69', '__Unused70', '__Unused71', '__Unused72', '__Unused73', '__Unused74', '__Unused75', '__Unused76', '__Unused77', '__Unused78', '__Unused79', '__Unused80', '__Unused81', '__Unused82', '__Unused83', '__Unused84', '__Unused85', '__Unused86', '__Unused87', '__Unused88', '__Unused89', '__Unused90', '__Unused91', '__Unused92', '__Unused93', '__Unused94', '__Unused95', '__Unused96', '__Unused97', '__Unused98', '__Unused99', '__Unused100', '__Unused101', '__Unused102', '__Unused103', '__Unused104', '__Unused105', '__Unused106', '__Unused107', '__Unused108', '__Unused109', '__Unused110', '__Unused111', '__Unused112', '__Unused113', '__Unused114', '__Unused115', '__Unused116', '__Unused117', '__Unused118', '__Unused119', '__Unused120', '__Unused121', '__Unused122', '__Unused123', '__Unused124', '__Unused125', '__Unused126', '__Unused127', 'Twitter']
  },
  /**
   * Lookup293: pallet_identity::types::Judgement<Balance>
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
   * Lookup294: pallet_democracy::pallet::Call<T>
   **/
  PalletDemocracyCall: {
    _enum: {
      propose: {
        proposalHash: 'H256',
        value: 'Compact<u128>',
      },
      second: {
        proposal: 'Compact<u32>',
        secondsUpperBound: 'Compact<u32>',
      },
      vote: {
        refIndex: 'Compact<u32>',
        vote: 'PalletDemocracyVoteAccountVote',
      },
      emergency_cancel: {
        refIndex: 'u32',
      },
      external_propose: {
        proposalHash: 'H256',
      },
      external_propose_majority: {
        proposalHash: 'H256',
      },
      external_propose_default: {
        proposalHash: 'H256',
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
      cancel_queued: {
        which: 'u32',
      },
      delegate: {
        to: 'MultiAddress',
        conviction: 'PalletDemocracyConviction',
        balance: 'u128',
      },
      undelegate: 'Null',
      clear_public_proposals: 'Null',
      note_preimage: {
        encodedProposal: 'Bytes',
      },
      note_preimage_operational: {
        encodedProposal: 'Bytes',
      },
      note_imminent_preimage: {
        encodedProposal: 'Bytes',
      },
      note_imminent_preimage_operational: {
        encodedProposal: 'Bytes',
      },
      reap_preimage: {
        proposalHash: 'H256',
        proposalLenUpperBound: 'Compact<u32>',
      },
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
      enact_proposal: {
        proposalHash: 'H256',
        index: 'u32',
      },
      blacklist: {
        proposalHash: 'H256',
        maybeRefIndex: 'Option<u32>',
      },
      cancel_proposal: {
        propIndex: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup295: pallet_democracy::conviction::Conviction
   **/
  PalletDemocracyConviction: {
    _enum: ['None', 'Locked1x', 'Locked2x', 'Locked3x', 'Locked4x', 'Locked5x', 'Locked6x']
  },
  /**
   * Lookup296: pallet_collective::pallet::Call<T, I>
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
      close: {
        proposalHash: 'H256',
        index: 'Compact<u32>',
        proposalWeightBound: 'Compact<Weight>',
        lengthBound: 'Compact<u32>',
      },
      disapprove_proposal: {
        proposalHash: 'H256'
      }
    }
  },
  /**
   * Lookup298: pallet_treasury::pallet::Call<T, I>
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
   * Lookup299: pallet_bounties::pallet::Call<T, I>
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
   * Lookup300: pallet_lottery::pallet::Call<T>
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
   * Lookup302: pallet_membership::pallet::Call<T, I>
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
   * Lookup303: pallet_elections_phragmen::pallet::Call<T>
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
   * Lookup304: pallet_elections_phragmen::Renouncing
   **/
  PalletElectionsPhragmenRenouncing: {
    _enum: {
      Member: 'Null',
      RunnerUp: 'Null',
      Candidate: 'Compact<u32>'
    }
  },
  /**
   * Lookup305: pallet_tips::pallet::Call<T, I>
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
   * Lookup306: pallet_child_bounties::pallet::Call<T>
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
   * Lookup307: subbridge_pallets::chainbridge::pallet::Call<T>
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
   * Lookup308: subbridge_pallets::xtransfer::pallet::Call<T>
   **/
  SubbridgePalletsXtransferPalletCall: {
    _enum: {
      transfer: {
        asset: 'XcmV1MultiAsset',
        dest: 'XcmV1MultiLocation',
        destWeight: 'Option<u64>',
      },
      transfer_generic: {
        data: 'Bytes',
        dest: 'XcmV1MultiLocation',
        destWeight: 'Option<u64>'
      }
    }
  },
  /**
   * Lookup310: phala_pallets::mq::pallet::Call<T>
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
   * Lookup311: phala_mq::types::SignedMessage
   **/
  PhalaMqSignedMessage: {
    message: 'PhalaMqMessage',
    sequence: 'u64',
    signature: 'Bytes'
  },
  /**
   * Lookup312: phala_mq::types::Message
   **/
  PhalaMqMessage: {
    sender: 'PhalaMqMessageOrigin',
    destination: 'Bytes',
    payload: 'Bytes'
  },
  /**
   * Lookup313: phala_mq::types::MessageOrigin
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
   * Lookup315: phala_pallets::registry::pallet::Call<T>
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
        attestation: 'PhalaPalletsUtilsAttestation',
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
      retire_pruntime: {
        condition: 'PhalaTypesMessagingRetireCondition',
      },
      set_pruntime_consensus_version: {
        version: 'u32'
      }
    }
  },
  /**
   * Lookup316: phala_types::WorkerRegistrationInfo<sp_core::crypto::AccountId32>
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
   * Lookup317: phala_pallets::utils::attestation::Attestation
   **/
  PhalaPalletsUtilsAttestation: {
    _enum: {
      SgxIas: {
        raReport: 'Bytes',
        signature: 'Bytes',
        rawSigningCert: 'Bytes'
      }
    }
  },
  /**
   * Lookup318: phala_types::WorkerEndpointPayload
   **/
  PhalaTypesWorkerEndpointPayload: {
    pubkey: 'SpCoreSr25519Public',
    versionedEndpoints: 'PhalaTypesVersionedWorkerEndpoints',
    signingTime: 'u64'
  },
  /**
   * Lookup319: phala_types::VersionedWorkerEndpoints
   **/
  PhalaTypesVersionedWorkerEndpoints: {
    _enum: {
      V1: 'Vec<Text>'
    }
  },
  /**
   * Lookup321: phala_pallets::mining::pallet::Call<T>
   **/
  PhalaPalletsMiningPalletCall: {
    _enum: {
      set_cool_down_expiration: {
        period: 'u64',
      },
      unbind: {
        miner: 'AccountId32',
      },
      force_heartbeat: 'Null',
      force_start_mining: {
        miner: 'AccountId32',
        stake: 'u128',
      },
      force_stop_mining: {
        miner: 'AccountId32',
      },
      update_tokenomic: {
        newParams: 'PhalaTypesMessagingTokenomicParameters'
      }
    }
  },
  /**
   * Lookup322: phala_types::messaging::TokenomicParameters
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
   * Lookup323: phala_pallets::stakepool::pallet::Call<T>
   **/
  PhalaPalletsStakepoolPalletCall: {
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
        payoutCommission: 'Permill',
      },
      add_staker_to_whitelist: {
        pid: 'u64',
        staker: 'AccountId32',
      },
      set_pool_description: {
        pid: 'u64',
        description: 'Bytes',
      },
      remove_staker_from_whitelist: {
        pid: 'u64',
        staker: 'AccountId32',
      },
      force_assign_reward: {
        rewardArr: 'Vec<(u64,u128)>',
      },
      claim_owner_rewards: {
        pid: 'u64',
        target: 'AccountId32',
      },
      claim_staker_rewards: {
        pid: 'u64',
        target: 'AccountId32',
      },
      claim_rewards: {
        pid: 'u64',
        target: 'AccountId32',
      },
      contribute: {
        pid: 'u64',
        amount: 'u128',
      },
      withdraw: {
        pid: 'u64',
        shares: 'u128',
      },
      start_mining: {
        pid: 'u64',
        worker: 'SpCoreSr25519Public',
        stake: 'u128',
      },
      stop_mining: {
        pid: 'u64',
        worker: 'SpCoreSr25519Public',
      },
      reclaim_pool_worker: {
        pid: 'u64',
        worker: 'SpCoreSr25519Public',
      },
      set_mining_enable: {
        enable: 'bool',
      },
      reconcile_withdraw_queue: {
        pid: 'u64',
        account: 'AccountId32',
      },
      restart_mining: {
        pid: 'u64',
        worker: 'SpCoreSr25519Public',
        stake: 'u128'
      }
    }
  },
  /**
   * Lookup328: pallet_assets::pallet::Call<T, I>
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
      destroy: {
        id: 'Compact<u32>',
        witness: 'PalletAssetsDestroyWitness',
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
        allowBurn: 'bool'
      }
    }
  },
  /**
   * Lookup329: pallet_assets::types::DestroyWitness
   **/
  PalletAssetsDestroyWitness: {
    accounts: 'Compact<u32>',
    sufficients: 'Compact<u32>',
    approvals: 'Compact<u32>'
  },
  /**
   * Lookup330: assets_registry::pallet::Call<T>
   **/
  AssetsRegistryCall: {
    _enum: {
      force_withdraw_fund: {
        assetId: 'Option<u32>',
        recipient: 'AccountId32',
        amount: 'u128',
      },
      force_register_asset: {
        location: 'XcmV1MultiLocation',
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
        location: 'XcmV1MultiLocation',
      },
      force_enable_chainbridge: {
        assetId: 'u32',
        chainId: 'u8',
        isMintable: 'bool',
        metadata: 'Bytes',
      },
      force_disable_chainbridge: {
        assetId: 'u32',
        chainId: 'u8'
      }
    }
  },
  /**
   * Lookup331: assets_registry::pallet::AssetProperties
   **/
  AssetsRegistryAssetProperties: {
    name: 'Bytes',
    symbol: 'Bytes',
    decimals: 'u8'
  },
  /**
   * Lookup332: pallet_uniques::pallet::Call<T, I>
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
   * Lookup333: pallet_uniques::types::DestroyWitness
   **/
  PalletUniquesDestroyWitness: {
    items: 'Compact<u32>',
    itemMetadatas: 'Compact<u32>',
    attributes: 'Compact<u32>'
  },
  /**
   * Lookup335: pallet_rmrk_core::pallet::Call<T>
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
        metadata: 'Bytes',
        max: 'Option<u32>',
        symbol: 'Bytes',
      },
      burn_nft: {
        collectionId: 'u32',
        nftId: 'u32',
        maxBurns: 'u32',
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
        collectionId: 'Compact<u32>',
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
   * Lookup339: rmrk_traits::resource::ResourceInfoMin<sp_core::bounded::bounded_vec::BoundedVec<T, S>, sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsResourceResourceInfoMin: {
    id: 'u32',
    resource: 'RmrkTraitsResourceResourceTypes'
  },
  /**
   * Lookup341: rmrk_traits::resource::ResourceTypes<sp_core::bounded::bounded_vec::BoundedVec<T, S>, sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsResourceResourceTypes: {
    _enum: {
      Basic: 'RmrkTraitsResourceBasicResource',
      Composable: 'RmrkTraitsResourceComposableResource',
      Slot: 'RmrkTraitsResourceSlotResource'
    }
  },
  /**
   * Lookup342: rmrk_traits::resource::BasicResource<sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsResourceBasicResource: {
    metadata: 'Bytes'
  },
  /**
   * Lookup343: rmrk_traits::resource::ComposableResource<sp_core::bounded::bounded_vec::BoundedVec<T, S>, sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsResourceComposableResource: {
    parts: 'Vec<u32>',
    base: 'u32',
    metadata: 'Option<Bytes>',
    slot: 'Option<(u32,u32)>'
  },
  /**
   * Lookup344: rmrk_traits::resource::SlotResource<sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsResourceSlotResource: {
    base: 'u32',
    metadata: 'Option<Bytes>',
    slot: 'u32'
  },
  /**
   * Lookup348: pallet_rmrk_equip::pallet::Call<T>
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
   * Lookup349: rmrk_traits::part::EquippableList<sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsPartEquippableList: {
    _enum: {
      All: 'Null',
      Empty: 'Null',
      Custom: 'Vec<u32>'
    }
  },
  /**
   * Lookup351: rmrk_traits::theme::Theme<sp_core::bounded::bounded_vec::BoundedVec<T, S>, sp_core::bounded::bounded_vec::BoundedVec<rmrk_traits::theme::ThemeProperty<sp_core::bounded::bounded_vec::BoundedVec<T, S>>, S>>
   **/
  RmrkTraitsTheme: {
    name: 'Bytes',
    properties: 'Vec<RmrkTraitsThemeThemeProperty>',
    inherit: 'bool'
  },
  /**
   * Lookup353: rmrk_traits::theme::ThemeProperty<sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsThemeThemeProperty: {
    key: 'Bytes',
    value: 'Bytes'
  },
  /**
   * Lookup356: rmrk_traits::part::PartType<sp_core::bounded::bounded_vec::BoundedVec<T, S>, sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsPartPartType: {
    _enum: {
      FixedPart: 'RmrkTraitsPartFixedPart',
      SlotPart: 'RmrkTraitsPartSlotPart'
    }
  },
  /**
   * Lookup357: rmrk_traits::part::FixedPart<sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsPartFixedPart: {
    id: 'u32',
    z: 'u32',
    src: 'Bytes'
  },
  /**
   * Lookup358: rmrk_traits::part::SlotPart<sp_core::bounded::bounded_vec::BoundedVec<T, S>, sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsPartSlotPart: {
    id: 'u32',
    equippable: 'RmrkTraitsPartEquippableList',
    src: 'Option<Bytes>',
    z: 'u32'
  },
  /**
   * Lookup360: pallet_rmrk_market::pallet::Call<T>
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
   * Lookup361: pallet_phala_world::nft_sale::pallet::Call<T>
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
        newPayee: 'AccountId32'
      }
    }
  },
  /**
   * Lookup362: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup364: pallet_phala_world::traits::StatusType
   **/
  PalletPhalaWorldStatusType: {
    _enum: ['ClaimSpirits', 'PurchaseRareOriginOfShells', 'PurchasePrimeOriginOfShells', 'PreorderOriginOfShells', 'LastDayOfSale']
  },
  /**
   * Lookup365: pallet_phala_world::incubation::pallet::Call<T>
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
   * Lookup366: khala_parachain_runtime::OriginCaller
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
   * Lookup367: frame_support::dispatch::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSupportDispatchRawOrigin: {
    _enum: {
      Root: 'Null',
      Signed: 'AccountId32',
      None: 'Null'
    }
  },
  /**
   * Lookup368: cumulus_pallet_xcm::pallet::Origin
   **/
  CumulusPalletXcmOrigin: {
    _enum: {
      Relay: 'Null',
      SiblingParachain: 'u32'
    }
  },
  /**
   * Lookup369: pallet_xcm::pallet::Origin
   **/
  PalletXcmOrigin: {
    _enum: {
      Xcm: 'XcmV1MultiLocation',
      Response: 'XcmV1MultiLocation'
    }
  },
  /**
   * Lookup370: pallet_collective::RawOrigin<sp_core::crypto::AccountId32, I>
   **/
  PalletCollectiveRawOrigin: {
    _enum: {
      Members: '(u32,u32)',
      Member: 'AccountId32',
      _Phantom: 'Null'
    }
  },
  /**
   * Lookup372: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup373: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls']
  },
  /**
   * Lookup375: pallet_multisig::Multisig<BlockNumber, Balance, sp_core::crypto::AccountId32>
   **/
  PalletMultisigMultisig: {
    when: 'PalletMultisigTimepoint',
    deposit: 'u128',
    depositor: 'AccountId32',
    approvals: 'Vec<AccountId32>'
  },
  /**
   * Lookup377: pallet_multisig::pallet::Error<T>
   **/
  PalletMultisigError: {
    _enum: ['MinimumThreshold', 'AlreadyApproved', 'NoApprovalsNeeded', 'TooFewSignatories', 'TooManySignatories', 'SignatoriesOutOfOrder', 'SenderInSignatories', 'NotFound', 'NotOwner', 'NoTimepoint', 'WrongTimepoint', 'UnexpectedTimepoint', 'MaxWeightTooLow', 'AlreadyStored']
  },
  /**
   * Lookup380: pallet_proxy::ProxyDefinition<sp_core::crypto::AccountId32, khala_parachain_runtime::ProxyType, BlockNumber>
   **/
  PalletProxyProxyDefinition: {
    delegate: 'AccountId32',
    proxyType: 'KhalaParachainRuntimeProxyType',
    delay: 'u32'
  },
  /**
   * Lookup384: pallet_proxy::Announcement<sp_core::crypto::AccountId32, primitive_types::H256, BlockNumber>
   **/
  PalletProxyAnnouncement: {
    real: 'AccountId32',
    callHash: 'H256',
    height: 'u32'
  },
  /**
   * Lookup386: pallet_proxy::pallet::Error<T>
   **/
  PalletProxyError: {
    _enum: ['TooMany', 'NotFound', 'NotProxy', 'Unproxyable', 'Duplicate', 'NoPermission', 'Unannounced', 'NoSelfProxy']
  },
  /**
   * Lookup389: pallet_vesting::Releases
   **/
  PalletVestingReleases: {
    _enum: ['V0', 'V1']
  },
  /**
   * Lookup390: pallet_vesting::pallet::Error<T>
   **/
  PalletVestingError: {
    _enum: ['NotVesting', 'AtMaxVestingSchedules', 'AmountLow', 'ScheduleIndexOutOfBounds', 'InvalidScheduleParams']
  },
  /**
   * Lookup393: pallet_scheduler::ScheduledV3<frame_support::traits::schedule::MaybeHashed<khala_parachain_runtime::RuntimeCall, primitive_types::H256>, BlockNumber, khala_parachain_runtime::OriginCaller, sp_core::crypto::AccountId32>
   **/
  PalletSchedulerScheduledV3: {
    maybeId: 'Option<Bytes>',
    priority: 'u8',
    call: 'FrameSupportScheduleMaybeHashed',
    maybePeriodic: 'Option<(u32,u32)>',
    origin: 'KhalaParachainRuntimeOriginCaller'
  },
  /**
   * Lookup394: pallet_scheduler::pallet::Error<T>
   **/
  PalletSchedulerError: {
    _enum: ['FailedToSchedule', 'NotFound', 'TargetBlockNumberInPast', 'RescheduleNoChange']
  },
  /**
   * Lookup395: pallet_preimage::RequestStatus<sp_core::crypto::AccountId32, Balance>
   **/
  PalletPreimageRequestStatus: {
    _enum: {
      Unrequested: 'Option<(AccountId32,u128)>',
      Requested: 'u32'
    }
  },
  /**
   * Lookup398: pallet_preimage::pallet::Error<T>
   **/
  PalletPreimageError: {
    _enum: ['TooLarge', 'AlreadyNoted', 'NotAuthorized', 'NotNoted', 'Requested', 'NotRequested']
  },
  /**
   * Lookup400: polkadot_primitives::v2::UpgradeRestriction
   **/
  PolkadotPrimitivesV2UpgradeRestriction: {
    _enum: ['Present']
  },
  /**
   * Lookup401: cumulus_pallet_parachain_system::relay_state_snapshot::MessagingStateSnapshot
   **/
  CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot: {
    dmqMqcHead: 'H256',
    relayDispatchQueueSize: '(u32,u32)',
    ingressChannels: 'Vec<(u32,PolkadotPrimitivesV2AbridgedHrmpChannel)>',
    egressChannels: 'Vec<(u32,PolkadotPrimitivesV2AbridgedHrmpChannel)>'
  },
  /**
   * Lookup404: polkadot_primitives::v2::AbridgedHrmpChannel
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
   * Lookup405: polkadot_primitives::v2::AbridgedHostConfiguration
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
   * Lookup411: polkadot_core_primitives::OutboundHrmpMessage<polkadot_parachain::primitives::Id>
   **/
  PolkadotCorePrimitivesOutboundHrmpMessage: {
    recipient: 'u32',
    data: 'Bytes'
  },
  /**
   * Lookup412: cumulus_pallet_parachain_system::pallet::Error<T>
   **/
  CumulusPalletParachainSystemError: {
    _enum: ['OverlappingUpgrades', 'ProhibitedByPolkadot', 'TooBig', 'ValidationDataNotAvailable', 'HostConfigurationNotAvailable', 'NotScheduled', 'NothingAuthorized', 'Unauthorized']
  },
  /**
   * Lookup414: cumulus_pallet_xcmp_queue::InboundChannelDetails
   **/
  CumulusPalletXcmpQueueInboundChannelDetails: {
    sender: 'u32',
    state: 'CumulusPalletXcmpQueueInboundState',
    messageMetadata: 'Vec<(u32,PolkadotParachainPrimitivesXcmpMessageFormat)>'
  },
  /**
   * Lookup415: cumulus_pallet_xcmp_queue::InboundState
   **/
  CumulusPalletXcmpQueueInboundState: {
    _enum: ['Ok', 'Suspended']
  },
  /**
   * Lookup418: polkadot_parachain::primitives::XcmpMessageFormat
   **/
  PolkadotParachainPrimitivesXcmpMessageFormat: {
    _enum: ['ConcatenatedVersionedXcm', 'ConcatenatedEncodedBlob', 'Signals']
  },
  /**
   * Lookup421: cumulus_pallet_xcmp_queue::OutboundChannelDetails
   **/
  CumulusPalletXcmpQueueOutboundChannelDetails: {
    recipient: 'u32',
    state: 'CumulusPalletXcmpQueueOutboundState',
    signalsExist: 'bool',
    firstIndex: 'u16',
    lastIndex: 'u16'
  },
  /**
   * Lookup422: cumulus_pallet_xcmp_queue::OutboundState
   **/
  CumulusPalletXcmpQueueOutboundState: {
    _enum: ['Ok', 'Suspended']
  },
  /**
   * Lookup424: cumulus_pallet_xcmp_queue::QueueConfigData
   **/
  CumulusPalletXcmpQueueQueueConfigData: {
    suspendThreshold: 'u32',
    dropThreshold: 'u32',
    resumeThreshold: 'u32',
    thresholdWeight: 'Weight',
    weightRestrictDecay: 'Weight',
    xcmpMaxIndividualWeight: 'Weight'
  },
  /**
   * Lookup426: cumulus_pallet_xcmp_queue::pallet::Error<T>
   **/
  CumulusPalletXcmpQueueError: {
    _enum: ['FailedToSend', 'BadXcmOrigin', 'BadXcm', 'BadOverweightIndex', 'WeightOverLimit']
  },
  /**
   * Lookup427: cumulus_pallet_xcm::pallet::Error<T>
   **/
  CumulusPalletXcmError: 'Null',
  /**
   * Lookup428: cumulus_pallet_dmp_queue::ConfigData
   **/
  CumulusPalletDmpQueueConfigData: {
    maxIndividual: 'Weight'
  },
  /**
   * Lookup429: cumulus_pallet_dmp_queue::PageIndexData
   **/
  CumulusPalletDmpQueuePageIndexData: {
    beginUsed: 'u32',
    endUsed: 'u32',
    overweightCount: 'u64'
  },
  /**
   * Lookup432: cumulus_pallet_dmp_queue::pallet::Error<T>
   **/
  CumulusPalletDmpQueueError: {
    _enum: ['Unknown', 'OverLimit']
  },
  /**
   * Lookup433: pallet_xcm::pallet::QueryStatus<BlockNumber>
   **/
  PalletXcmQueryStatus: {
    _enum: {
      Pending: {
        responder: 'XcmVersionedMultiLocation',
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
   * Lookup435: xcm::VersionedResponse
   **/
  XcmVersionedResponse: {
    _enum: {
      V0: 'XcmV0Response',
      V1: 'XcmV1Response',
      V2: 'XcmV2Response'
    }
  },
  /**
   * Lookup441: pallet_xcm::pallet::VersionMigrationStage
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
   * Lookup442: pallet_xcm::pallet::Error<T>
   **/
  PalletXcmError: {
    _enum: ['Unreachable', 'SendFailure', 'Filtered', 'UnweighableMessage', 'DestinationNotInvertible', 'Empty', 'CannotReanchor', 'TooManyAssets', 'InvalidOrigin', 'BadVersion', 'BadLocation', 'NoSubscription', 'AlreadySubscribed']
  },
  /**
   * Lookup444: pallet_balances::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u128',
    reasons: 'PalletBalancesReasons'
  },
  /**
   * Lookup445: pallet_balances::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup448: pallet_balances::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: '[u8;8]',
    amount: 'u128'
  },
  /**
   * Lookup450: pallet_balances::Releases
   **/
  PalletBalancesReleases: {
    _enum: ['V1_0_0', 'V2_0_0']
  },
  /**
   * Lookup451: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'KeepAlive', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves']
  },
  /**
   * Lookup453: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2']
  },
  /**
   * Lookup455: pallet_authorship::UncleEntryItem<BlockNumber, primitive_types::H256, sp_core::crypto::AccountId32>
   **/
  PalletAuthorshipUncleEntryItem: {
    _enum: {
      InclusionHeight: 'u32',
      Uncle: '(H256,Option<AccountId32>)'
    }
  },
  /**
   * Lookup457: pallet_authorship::pallet::Error<T>
   **/
  PalletAuthorshipError: {
    _enum: ['InvalidUncleParent', 'UnclesAlreadySet', 'TooManyUncles', 'GenesisUncle', 'TooHighUncle', 'UncleAlreadyIncluded', 'OldUncle']
  },
  /**
   * Lookup460: pallet_collator_selection::pallet::CandidateInfo<sp_core::crypto::AccountId32, Balance>
   **/
  PalletCollatorSelectionCandidateInfo: {
    who: 'AccountId32',
    deposit: 'u128'
  },
  /**
   * Lookup462: pallet_collator_selection::pallet::Error<T>
   **/
  PalletCollatorSelectionError: {
    _enum: ['TooManyCandidates', 'TooFewCandidates', 'Unknown', 'Permission', 'AlreadyCandidate', 'NotCandidate', 'TooManyInvulnerables', 'AlreadyInvulnerable', 'NoAssociatedValidatorId', 'ValidatorNotRegistered']
  },
  /**
   * Lookup466: sp_core::crypto::KeyTypeId
   **/
  SpCoreCryptoKeyTypeId: '[u8;4]',
  /**
   * Lookup467: pallet_session::pallet::Error<T>
   **/
  PalletSessionError: {
    _enum: ['InvalidProof', 'NoAssociatedValidatorId', 'DuplicatedKey', 'NoKeys', 'NoAccount']
  },
  /**
   * Lookup471: pallet_identity::types::Registration<Balance, MaxJudgements, MaxAdditionalFields>
   **/
  PalletIdentityRegistration: {
    judgements: 'Vec<(u32,PalletIdentityJudgement)>',
    deposit: 'u128',
    info: 'PalletIdentityIdentityInfo'
  },
  /**
   * Lookup479: pallet_identity::types::RegistrarInfo<Balance, sp_core::crypto::AccountId32>
   **/
  PalletIdentityRegistrarInfo: {
    account: 'AccountId32',
    fee: 'u128',
    fields: 'PalletIdentityBitFlags'
  },
  /**
   * Lookup481: pallet_identity::pallet::Error<T>
   **/
  PalletIdentityError: {
    _enum: ['TooManySubAccounts', 'NotFound', 'NotNamed', 'EmptyIndex', 'FeeChanged', 'NoIdentity', 'StickyJudgement', 'JudgementGiven', 'InvalidJudgement', 'InvalidIndex', 'InvalidTarget', 'TooManyFields', 'TooManyRegistrars', 'AlreadyClaimed', 'NotSub', 'NotOwned', 'JudgementForDifferentIdentity']
  },
  /**
   * Lookup485: pallet_democracy::PreimageStatus<sp_core::crypto::AccountId32, Balance, BlockNumber>
   **/
  PalletDemocracyPreimageStatus: {
    _enum: {
      Missing: 'u32',
      Available: {
        data: 'Bytes',
        provider: 'AccountId32',
        deposit: 'u128',
        since: 'u32',
        expiry: 'Option<u32>'
      }
    }
  },
  /**
   * Lookup486: pallet_democracy::types::ReferendumInfo<BlockNumber, primitive_types::H256, Balance>
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
   * Lookup487: pallet_democracy::types::ReferendumStatus<BlockNumber, primitive_types::H256, Balance>
   **/
  PalletDemocracyReferendumStatus: {
    end: 'u32',
    proposalHash: 'H256',
    threshold: 'PalletDemocracyVoteThreshold',
    delay: 'u32',
    tally: 'PalletDemocracyTally'
  },
  /**
   * Lookup488: pallet_democracy::types::Tally<Balance>
   **/
  PalletDemocracyTally: {
    ayes: 'u128',
    nays: 'u128',
    turnout: 'u128'
  },
  /**
   * Lookup489: pallet_democracy::vote::Voting<Balance, sp_core::crypto::AccountId32, BlockNumber>
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
   * Lookup492: pallet_democracy::types::Delegations<Balance>
   **/
  PalletDemocracyDelegations: {
    votes: 'u128',
    capital: 'u128'
  },
  /**
   * Lookup493: pallet_democracy::vote::PriorLock<BlockNumber, Balance>
   **/
  PalletDemocracyVotePriorLock: '(u32,u128)',
  /**
   * Lookup496: pallet_democracy::Releases
   **/
  PalletDemocracyReleases: {
    _enum: ['V1']
  },
  /**
   * Lookup497: pallet_democracy::pallet::Error<T>
   **/
  PalletDemocracyError: {
    _enum: ['ValueLow', 'ProposalMissing', 'AlreadyCanceled', 'DuplicateProposal', 'ProposalBlacklisted', 'NotSimpleMajority', 'InvalidHash', 'NoProposal', 'AlreadyVetoed', 'DuplicatePreimage', 'NotImminent', 'TooEarly', 'Imminent', 'PreimageMissing', 'ReferendumInvalid', 'PreimageInvalid', 'NoneWaiting', 'NotVoter', 'NoPermission', 'AlreadyDelegating', 'InsufficientFunds', 'NotDelegating', 'VotesExist', 'InstantNotAllowed', 'Nonsense', 'WrongUpperBound', 'MaxVotesReached', 'TooManyProposals', 'VotingPeriodLow']
  },
  /**
   * Lookup499: pallet_collective::Votes<sp_core::crypto::AccountId32, BlockNumber>
   **/
  PalletCollectiveVotes: {
    index: 'u32',
    threshold: 'u32',
    ayes: 'Vec<AccountId32>',
    nays: 'Vec<AccountId32>',
    end: 'u32'
  },
  /**
   * Lookup500: pallet_collective::pallet::Error<T, I>
   **/
  PalletCollectiveError: {
    _enum: ['NotMember', 'DuplicateProposal', 'ProposalMissing', 'WrongIndex', 'DuplicateVote', 'AlreadyInitialized', 'TooEarly', 'TooManyProposals', 'WrongProposalWeight', 'WrongProposalLength']
  },
  /**
   * Lookup501: pallet_treasury::Proposal<sp_core::crypto::AccountId32, Balance>
   **/
  PalletTreasuryProposal: {
    proposer: 'AccountId32',
    value: 'u128',
    beneficiary: 'AccountId32',
    bond: 'u128'
  },
  /**
   * Lookup503: frame_support::PalletId
   **/
  FrameSupportPalletId: '[u8;8]',
  /**
   * Lookup504: pallet_treasury::pallet::Error<T, I>
   **/
  PalletTreasuryError: {
    _enum: ['InsufficientProposersBalance', 'InvalidIndex', 'TooManyApprovals', 'InsufficientPermission', 'ProposalNotApproved']
  },
  /**
   * Lookup505: pallet_bounties::Bounty<sp_core::crypto::AccountId32, Balance, BlockNumber>
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
   * Lookup506: pallet_bounties::BountyStatus<sp_core::crypto::AccountId32, BlockNumber>
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
   * Lookup508: pallet_bounties::pallet::Error<T, I>
   **/
  PalletBountiesError: {
    _enum: ['InsufficientProposersBalance', 'InvalidIndex', 'ReasonTooBig', 'UnexpectedStatus', 'RequireCurator', 'InvalidValue', 'InvalidFee', 'PendingPayout', 'Premature', 'HasActiveChildBounty', 'TooManyQueued']
  },
  /**
   * Lookup509: pallet_lottery::LotteryConfig<BlockNumber, Balance>
   **/
  PalletLotteryLotteryConfig: {
    price: 'u128',
    start: 'u32',
    length: 'u32',
    delay: 'u32',
    repeat: 'bool'
  },
  /**
   * Lookup513: pallet_lottery::pallet::Error<T>
   **/
  PalletLotteryError: {
    _enum: ['NotConfigured', 'InProgress', 'AlreadyEnded', 'InvalidCall', 'AlreadyParticipating', 'TooManyCalls', 'EncodingFailed']
  },
  /**
   * Lookup517: pallet_membership::pallet::Error<T, I>
   **/
  PalletMembershipError: {
    _enum: ['AlreadyMember', 'NotMember', 'TooManyMembers']
  },
  /**
   * Lookup519: pallet_elections_phragmen::SeatHolder<sp_core::crypto::AccountId32, Balance>
   **/
  PalletElectionsPhragmenSeatHolder: {
    who: 'AccountId32',
    stake: 'u128',
    deposit: 'u128'
  },
  /**
   * Lookup520: pallet_elections_phragmen::Voter<sp_core::crypto::AccountId32, Balance>
   **/
  PalletElectionsPhragmenVoter: {
    votes: 'Vec<AccountId32>',
    stake: 'u128',
    deposit: 'u128'
  },
  /**
   * Lookup521: pallet_elections_phragmen::pallet::Error<T>
   **/
  PalletElectionsPhragmenError: {
    _enum: ['UnableToVote', 'NoVotes', 'TooManyVotes', 'MaximumVotesExceeded', 'LowBalance', 'UnableToPayBond', 'MustBeVoter', 'DuplicatedCandidate', 'TooManyCandidates', 'MemberSubmit', 'RunnerUpSubmit', 'InsufficientCandidateFunds', 'NotMember', 'InvalidWitnessData', 'InvalidVoteCount', 'InvalidRenouncing', 'InvalidReplacement']
  },
  /**
   * Lookup522: pallet_tips::OpenTip<sp_core::crypto::AccountId32, Balance, BlockNumber, primitive_types::H256>
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
   * Lookup524: pallet_tips::pallet::Error<T, I>
   **/
  PalletTipsError: {
    _enum: ['ReasonTooBig', 'AlreadyKnown', 'UnknownTip', 'NotFinder', 'StillOpen', 'Premature']
  },
  /**
   * Lookup525: pallet_child_bounties::ChildBounty<sp_core::crypto::AccountId32, Balance, BlockNumber>
   **/
  PalletChildBountiesChildBounty: {
    parentBounty: 'u32',
    value: 'u128',
    fee: 'u128',
    curatorDeposit: 'u128',
    status: 'PalletChildBountiesChildBountyStatus'
  },
  /**
   * Lookup526: pallet_child_bounties::ChildBountyStatus<sp_core::crypto::AccountId32, BlockNumber>
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
   * Lookup527: pallet_child_bounties::pallet::Error<T>
   **/
  PalletChildBountiesError: {
    _enum: ['ParentBountyNotActive', 'InsufficientBountyBalance', 'TooManyChildBounties']
  },
  /**
   * Lookup530: subbridge_pallets::chainbridge::pallet::ProposalVotes<sp_core::crypto::AccountId32, BlockNumber>
   **/
  SubbridgePalletsChainbridgePalletProposalVotes: {
    votesFor: 'Vec<AccountId32>',
    votesAgainst: 'Vec<AccountId32>',
    status: 'SubbridgePalletsChainbridgePalletProposalStatus',
    expiry: 'u32'
  },
  /**
   * Lookup531: subbridge_pallets::chainbridge::pallet::ProposalStatus
   **/
  SubbridgePalletsChainbridgePalletProposalStatus: {
    _enum: ['Initiated', 'Approved', 'Rejected']
  },
  /**
   * Lookup533: subbridge_pallets::chainbridge::pallet::BridgeEvent
   **/
  SubbridgePalletsChainbridgePalletBridgeEvent: {
    _enum: {
      FungibleTransfer: '(u8,u64,[u8;32],U256,Bytes)',
      NonFungibleTransfer: '(u8,u64,[u8;32],Bytes,Bytes,Bytes)',
      GenericTransfer: '(u8,u64,[u8;32],Bytes)'
    }
  },
  /**
   * Lookup535: subbridge_pallets::chainbridge::pallet::Error<T>
   **/
  SubbridgePalletsChainbridgePalletError: {
    _enum: ['_ThresholdNotSet', 'InvalidChainId', 'InvalidThreshold', 'ChainNotWhitelisted', 'ChainAlreadyWhitelisted', '_ResourceDoesNotExist', 'RelayerAlreadyExists', 'RelayerInvalid', 'MustBeRelayer', 'RelayerAlreadyVoted', 'ProposalAlreadyExists', 'ProposalDoesNotExist', 'ProposalNotComplete', 'ProposalAlreadyComplete', 'ProposalExpired', 'InvalidFeeOption', 'ExtractAssetFailed', 'ExtractDestFailed', 'CannotPayAsFee', 'TransactFailed', 'InsufficientBalance', 'FeeTooExpensive', 'CannotDetermineReservedLocation', 'DestUnrecognized', 'AssetNotRegistered', 'AssetConversionFailed', 'Unimplemented', 'CannotDepositAsset', 'BridgeEventOverflow']
  },
  /**
   * Lookup536: subbridge_pallets::xcmbridge::pallet::Error<T>
   **/
  SubbridgePalletsXcmbridgePalletError: {
    _enum: ['_UnknownError', 'CannotReanchor', 'UnweighableMessage', '_FeePaymentEmpty', 'ExecutionFailed', '_UnknownTransfer', 'AssetNotFound', '_LocationInvertFailed', 'IllegalDestination', 'CannotDepositAsset', 'UnknownTransferType', 'Unimplemented']
  },
  /**
   * Lookup537: subbridge_pallets::xtransfer::pallet::Error<T>
   **/
  SubbridgePalletsXtransferPalletError: {
    _enum: ['_TransactFailed', 'UnknownAsset', 'UnsupportedDest', 'UnhandledTransfer']
  },
  /**
   * Lookup539: phala_pallets::mq::pallet::Error<T>
   **/
  PhalaPalletsMqPalletError: {
    _enum: ['BadSender', 'BadSequence', 'BadDestination']
  },
  /**
   * Lookup541: phala_pallets::registry::pallet::WorkerInfo<sp_core::crypto::AccountId32>
   **/
  PhalaPalletsRegistryPalletWorkerInfo: {
    pubkey: 'SpCoreSr25519Public',
    ecdhPubkey: 'SpCoreSr25519Public',
    runtimeVersion: 'u32',
    lastUpdated: 'u64',
    operator: 'Option<AccountId32>',
    confidenceLevel: 'u8',
    initialScore: 'Option<u32>',
    features: 'Vec<u32>'
  },
  /**
   * Lookup542: phala_pallets::registry::pallet::Error<T>
   **/
  PhalaPalletsRegistryPalletError: {
    _enum: ['CannotHandleUnknownMessage', 'InvalidSender', 'InvalidPubKey', 'MalformedSignature', 'InvalidSignatureLength', 'InvalidSignature', 'UnknownContract', 'InvalidIASSigningCert', 'InvalidReport', 'InvalidQuoteStatus', 'BadIASReport', 'OutdatedIASReport', 'UnknownQuoteBodyFormat', 'InvalidRuntimeInfoHash', 'InvalidRuntimeInfo', 'InvalidInput', 'InvalidBenchReport', 'WorkerNotFound', 'InvalidGatekeeper', 'InvalidMasterPubkey', 'MasterKeyMismatch', 'MasterKeyUninitialized', 'GenesisBlockHashRejected', 'GenesisBlockHashAlreadyExists', 'GenesisBlockHashNotFound', 'PRuntimeRejected', 'PRuntimeAlreadyExists', 'PRuntimeNotFound', 'UnknownCluster', 'NotImplemented', 'CannotRemoveLastGatekeeper', 'MasterKeyInRotation', 'InvalidRotatedMasterPubkey', 'InvalidEndpointSigningTime']
  },
  /**
   * Lookup543: phala_pallets::mining::pallet::MinerInfo
   **/
  PhalaPalletsMiningPalletMinerInfo: {
    state: 'PhalaPalletsMiningPalletMinerState',
    ve: 'u128',
    v: 'u128',
    vUpdatedAt: 'u64',
    benchmark: 'PhalaPalletsMiningPalletBenchmark',
    coolDownStart: 'u64',
    stats: 'PhalaPalletsMiningPalletMinerStats'
  },
  /**
   * Lookup544: phala_pallets::mining::pallet::MinerState
   **/
  PhalaPalletsMiningPalletMinerState: {
    _enum: ['Ready', 'MiningIdle', '_Unused', 'MiningUnresponsive', 'MiningCoolingDown']
  },
  /**
   * Lookup545: phala_pallets::mining::pallet::Benchmark
   **/
  PhalaPalletsMiningPalletBenchmark: {
    pInit: 'u32',
    pInstant: 'u32',
    iterations: 'u64',
    miningStartTime: 'u64',
    challengeTimeLast: 'u64'
  },
  /**
   * Lookup546: phala_pallets::mining::pallet::MinerStats
   **/
  PhalaPalletsMiningPalletMinerStats: {
    totalReward: 'u128'
  },
  /**
   * Lookup547: phala_pallets::mining::pallet::Error<T>
   **/
  PhalaPalletsMiningPalletError: {
    _enum: ['BadSender', '_InvalidMessage', 'WorkerNotRegistered', '_GatekeeperNotRegistered', 'DuplicateBoundMiner', 'BenchmarkMissing', 'MinerNotFound', 'MinerNotBound', 'MinerNotReady', 'MinerNotMining', 'WorkerNotBound', 'CoolDownNotReady', 'InsufficientStake', 'TooMuchStake', 'InternalErrorBadTokenomicParameters', 'DuplicateBoundWorker', 'BenchmarkTooLow', 'InternalErrorCannotStartWithExistingStake']
  },
  /**
   * Lookup548: phala_pallets::stakepool::pallet::PoolInfo<sp_core::crypto::AccountId32, Balance>
   **/
  PhalaPalletsStakepoolPalletPoolInfo: {
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
    withdrawQueue: 'Vec<PhalaPalletsStakepoolPalletWithdrawInfo>'
  },
  /**
   * Lookup551: phala_pallets::stakepool::pallet::WithdrawInfo<sp_core::crypto::AccountId32, Balance>
   **/
  PhalaPalletsStakepoolPalletWithdrawInfo: {
    user: 'AccountId32',
    shares: 'u128',
    startTime: 'u64'
  },
  /**
   * Lookup553: phala_pallets::stakepool::pallet::UserStakeInfo<sp_core::crypto::AccountId32, Balance>
   **/
  PhalaPalletsStakepoolPalletUserStakeInfo: {
    user: 'AccountId32',
    locked: 'u128',
    shares: 'u128',
    availableRewards: 'u128',
    rewardDebt: 'u128'
  },
  /**
   * Lookup556: phala_pallets::stakepool::pallet::Error<T>
   **/
  PhalaPalletsStakepoolPalletError: {
    _enum: ['WorkerNotRegistered', 'BenchmarkMissing', 'WorkerExists', 'WorkerDoesNotExist', 'WorkerInAnotherPool', 'UnauthorizedOperator', 'UnauthorizedPoolOwner', 'InadequateCapacity', 'StakeExceedsCapacity', 'PoolDoesNotExist', '_PoolIsBusy', 'InsufficientContribution', 'InsufficientBalance', 'PoolStakeNotFound', 'InsufficientFreeStake', 'InvalidWithdrawalAmount', 'FailedToBindMinerAndWorker', 'InternalSubsidyPoolCannotWithdraw', 'PoolBankrupt', 'NoRewardToClaim', 'FeatureNotEnabled', 'WorkersExceedLimit', 'CannotRestartWithLessStake', 'InvalidForceRewardAmount', 'NotInContributeWhitelist', 'AlreadyInContributeWhitelist', 'ExceedWhitelistMaxLen', 'NoWhitelistCreated', 'ExceedMaxDescriptionLen']
  },
  /**
   * Lookup557: pallet_assets::types::AssetDetails<Balance, sp_core::crypto::AccountId32, DepositBalance>
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
    isFrozen: 'bool'
  },
  /**
   * Lookup559: pallet_assets::types::AssetAccount<Balance, DepositBalance, Extra>
   **/
  PalletAssetsAssetAccount: {
    balance: 'u128',
    isFrozen: 'bool',
    reason: 'PalletAssetsExistenceReason',
    extra: 'Null'
  },
  /**
   * Lookup560: pallet_assets::types::ExistenceReason<Balance>
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
   * Lookup562: pallet_assets::types::Approval<Balance, DepositBalance>
   **/
  PalletAssetsApproval: {
    amount: 'u128',
    deposit: 'u128'
  },
  /**
   * Lookup563: pallet_assets::types::AssetMetadata<DepositBalance, sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  PalletAssetsAssetMetadata: {
    deposit: 'u128',
    name: 'Bytes',
    symbol: 'Bytes',
    decimals: 'u8',
    isFrozen: 'bool'
  },
  /**
   * Lookup565: pallet_assets::pallet::Error<T, I>
   **/
  PalletAssetsError: {
    _enum: ['BalanceLow', 'NoAccount', 'NoPermission', 'Unknown', 'Frozen', 'InUse', 'BadWitness', 'MinBalanceZero', 'NoProvider', 'BadMetadata', 'Unapproved', 'WouldDie', 'AlreadyExists', 'NoDeposit', 'WouldBurn']
  },
  /**
   * Lookup566: assets_registry::pallet::AssetRegistryInfo
   **/
  AssetsRegistryAssetRegistryInfo: {
    location: 'XcmV1MultiLocation',
    reserveLocation: 'Option<XcmV1MultiLocation>',
    enabledBridges: 'Vec<AssetsRegistryXBridge>',
    properties: 'AssetsRegistryAssetProperties',
    executionPrice: 'Option<u128>'
  },
  /**
   * Lookup568: assets_registry::pallet::XBridge
   **/
  AssetsRegistryXBridge: {
    config: 'AssetsRegistryXBridgeConfig',
    metadata: 'Bytes'
  },
  /**
   * Lookup569: assets_registry::pallet::XBridgeConfig
   **/
  AssetsRegistryXBridgeConfig: {
    _enum: {
      Xcmp: 'Null',
      ChainBridge: {
        chainId: 'u8',
        resourceId: '[u8;32]',
        reserveAccount: '[u8;32]',
        isMintable: 'bool'
      }
    }
  },
  /**
   * Lookup570: assets_registry::pallet::Error<T>
   **/
  AssetsRegistryError: {
    _enum: ['AssetAlreadyExist', 'AssetNotRegistered', 'BridgeAlreadyEnabled', 'BridgeAlreadyDisabled', 'FailedToTransactAsset', 'DuplictedLocation', 'LocationTooLong']
  },
  /**
   * Lookup571: pallet_uniques::types::CollectionDetails<sp_core::crypto::AccountId32, DepositBalance>
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
   * Lookup574: pallet_uniques::types::ItemDetails<sp_core::crypto::AccountId32, DepositBalance>
   **/
  PalletUniquesItemDetails: {
    owner: 'AccountId32',
    approved: 'Option<AccountId32>',
    isFrozen: 'bool',
    deposit: 'u128'
  },
  /**
   * Lookup575: pallet_uniques::types::CollectionMetadata<DepositBalance, StringLimit>
   **/
  PalletUniquesCollectionMetadata: {
    deposit: 'u128',
    data: 'Bytes',
    isFrozen: 'bool'
  },
  /**
   * Lookup576: pallet_uniques::types::ItemMetadata<DepositBalance, StringLimit>
   **/
  PalletUniquesItemMetadata: {
    deposit: 'u128',
    data: 'Bytes',
    isFrozen: 'bool'
  },
  /**
   * Lookup580: pallet_uniques::pallet::Error<T, I>
   **/
  PalletUniquesError: {
    _enum: ['NoPermission', 'UnknownCollection', 'AlreadyExists', 'WrongOwner', 'BadWitness', 'InUse', 'Frozen', 'WrongDelegate', 'NoDelegate', 'Unapproved', 'Unaccepted', 'Locked', 'MaxSupplyReached', 'MaxSupplyAlreadySet', 'MaxSupplyTooSmall', 'UnknownItem', 'NotForSale', 'BidTooLow']
  },
  /**
   * Lookup581: rmrk_traits::collection::CollectionInfo<sp_core::bounded::bounded_vec::BoundedVec<T, S>, sp_core::bounded::bounded_vec::BoundedVec<T, S>, sp_core::crypto::AccountId32>
   **/
  RmrkTraitsCollectionCollectionInfo: {
    issuer: 'AccountId32',
    metadata: 'Bytes',
    max: 'Option<u32>',
    symbol: 'Bytes',
    nftsCount: 'u32'
  },
  /**
   * Lookup582: rmrk_traits::nft::NftInfo<sp_core::crypto::AccountId32, sp_arithmetic::per_things::Permill, sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsNftNftInfo: {
    owner: 'RmrkTraitsNftAccountIdOrCollectionNftTuple',
    royalty: 'Option<RmrkTraitsNftRoyaltyInfo>',
    metadata: 'Bytes',
    equipped: 'bool',
    pending: 'bool',
    transferable: 'bool'
  },
  /**
   * Lookup584: rmrk_traits::nft::RoyaltyInfo<sp_core::crypto::AccountId32, sp_arithmetic::per_things::Permill>
   **/
  RmrkTraitsNftRoyaltyInfo: {
    recipient: 'AccountId32',
    amount: 'Permill'
  },
  /**
   * Lookup587: rmrk_traits::resource::ResourceInfo<sp_core::bounded::bounded_vec::BoundedVec<T, S>, sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsResourceResourceInfo: {
    id: 'u32',
    resource: 'RmrkTraitsResourceResourceTypes',
    pending: 'bool',
    pendingRemoval: 'bool'
  },
  /**
   * Lookup590: rmrk_traits::nft::NftChild
   **/
  RmrkTraitsNftNftChild: {
    collectionId: 'u32',
    nftId: 'u32'
  },
  /**
   * Lookup591: PhantomType::phantom_type<rmrk_traits::property::PropertyInfo<sp_core::bounded::bounded_vec::BoundedVec<T, S>, sp_core::bounded::bounded_vec::BoundedVec<T, S>>>
   **/
  PhantomType: '[Lookup592;0]',
  /**
   * Lookup592: rmrk_traits::property::PropertyInfo<sp_core::bounded::bounded_vec::BoundedVec<T, S>, sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsPropertyPropertyInfo: {
    key: 'Bytes',
    value: 'Bytes'
  },
  /**
   * Lookup594: pallet_rmrk_core::pallet::Error<T>
   **/
  PalletRmrkCoreError: {
    _enum: ['NoneValue', 'StorageOverflow', 'TooLong', 'NoAvailableCollectionId', 'NoAvailableResourceId', 'MetadataNotSet', 'RecipientNotSet', 'NoAvailableNftId', 'NotInRange', 'RoyaltyNotSet', 'CollectionUnknown', 'NoPermission', 'NoWitness', 'CollectionNotEmpty', 'CollectionFullOrLocked', 'CannotSendToDescendentOrSelf', 'ResourceAlreadyExists', 'NftAlreadyExists', 'EmptyResource', 'TooManyRecursions', 'NftIsLocked', 'CannotAcceptNonOwnedNft', 'CannotRejectNonOwnedNft', 'CannotRejectNonPendingNft', 'ResourceDoesntExist', 'ResourceNotPending', 'NonTransferable', 'CannotSendEquippedItem', 'CannotAcceptToNewOwner']
  },
  /**
   * Lookup595: rmrk_traits::base::BaseInfo<sp_core::crypto::AccountId32, sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  RmrkTraitsBaseBaseInfo: {
    issuer: 'AccountId32',
    baseType: 'Bytes',
    symbol: 'Bytes'
  },
  /**
   * Lookup598: pallet_rmrk_equip::pallet::Error<T>
   **/
  PalletRmrkEquipError: {
    _enum: ['PermissionError', 'ItemDoesntExist', 'EquipperDoesntExist', 'NoAvailableBaseId', 'NoAvailablePartId', 'MustBeDirectParent', 'PartDoesntExist', 'BaseDoesntExist', 'CantEquipFixedPart', 'NoResourceForThisBaseFoundOnNft', 'CollectionNotEquippable', 'ItemHasNoResourceToEquipThere', 'NoEquippableOnFixedPart', 'NeedsDefaultThemeFirst', 'ItemAlreadyEquipped', 'SlotAlreadyEquipped', 'SlotNotEquipped', 'UnknownError', 'ExceedsMaxPartsPerBase', 'TooManyProperties', 'ItemNotEquipped', 'UnequipperMustOwnEitherItemOrEquipper']
  },
  /**
   * Lookup599: pallet_rmrk_market::types::ListInfo<sp_core::crypto::AccountId32, Balance, BlockNumber>
   **/
  PalletRmrkMarketListInfo: {
    listedBy: 'AccountId32',
    amount: 'u128',
    expires: 'Option<u32>'
  },
  /**
   * Lookup601: pallet_rmrk_market::types::Offer<sp_core::crypto::AccountId32, Balance, BlockNumber>
   **/
  PalletRmrkMarketOffer: {
    maker: 'AccountId32',
    amount: 'u128',
    expires: 'Option<u32>'
  },
  /**
   * Lookup602: pallet_rmrk_market::pallet::Error<T>
   **/
  PalletRmrkMarketError: {
    _enum: ['NoPermission', 'TokenNotForSale', 'CannotWithdrawOffer', 'CannotUnlistToken', 'CannotOfferOnOwnToken', 'CannotBuyOwnToken', 'UnknownOffer', 'CannotListNftOwnedByNft', 'TokenDoesNotExist', 'OfferTooLow', 'AlreadyOffered', 'OfferHasExpired', 'ListingHasExpired', 'PriceDiffersFromExpected', 'NonTransferable']
  },
  /**
   * Lookup603: pallet_phala_world::traits::PreorderInfo<sp_core::crypto::AccountId32, sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  PalletPhalaWorldPreorderInfo: {
    owner: 'AccountId32',
    race: 'PalletPhalaWorldRaceType',
    career: 'PalletPhalaWorldCareerType',
    metadata: 'Bytes'
  },
  /**
   * Lookup605: pallet_phala_world::traits::NftSaleInfo
   **/
  PalletPhalaWorldNftSaleInfo: {
    raceCount: 'u32',
    raceForSaleCount: 'u32',
    raceGiveawayCount: 'u32',
    raceReservedCount: 'u32'
  },
  /**
   * Lookup606: pallet_phala_world::nft_sale::pallet::Error<T>
   **/
  PalletPhalaWorldNftSalePalletError: {
    _enum: ['WorldClockAlreadySet', 'SpiritClaimNotAvailable', 'RareOriginOfShellPurchaseNotAvailable', 'PrimeOriginOfShellPurchaseNotAvailable', 'PreorderOriginOfShellNotAvailable', 'PreorderClaimNotAvailable', 'SpiritAlreadyClaimed', 'InvalidSpiritClaim', 'InvalidMetadata', 'MustOwnSpiritToPurchase', 'OriginOfShellAlreadyPurchased', 'BelowMinimumBalanceThreshold', 'WhitelistVerificationFailed', 'InvalidPurchase', 'NoAvailablePreorderId', 'PreorderClaimNotDetected', 'RefundClaimNotDetected', 'PreorderIsPending', 'PreordersCorrupted', 'NotPreorderOwner', 'RaceMintMaxReached', 'OverlordNotSet', 'RequireOverlordAccount', 'InvalidStatusType', 'WrongRarityType', 'SpiritCollectionNotSet', 'SpiritCollectionIdAlreadySet', 'SpiritsMetadataNotSet', 'OriginOfShellCollectionNotSet', 'OriginOfShellCollectionIdAlreadySet', 'OriginOfShellInventoryCorrupted', 'OriginOfShellInventoryAlreadySet', 'OriginOfShellsMetadataNotSet', 'KeyTooLong', 'NoAvailableRaceGivewayLeft', 'NoAvailableRaceReservedLeft', 'WrongNftSaleType', 'NoAvailableResourceId', 'NoAvailableNftId', 'ValueNotDetected', 'PayeeNotSet']
  },
  /**
   * Lookup607: pallet_phala_world::traits::FoodInfo<sp_core::bounded::bounded_vec::BoundedVec<T, S>>
   **/
  PalletPhalaWorldFoodInfo: {
    era: 'u64',
    originOfShellsFed: 'Vec<(u32,u32)>'
  },
  /**
   * Lookup610: pallet_phala_world::incubation::pallet::Error<T>
   **/
  PalletPhalaWorldIncubationPalletError: {
    _enum: ['StartIncubationNotAvailable', 'HatchingInProgress', 'CannotHatchOriginOfShell', 'CannotSendFoodToOriginOfShell', '_Deprecated_MaxFoodFedLimitReached', 'CannotSetOriginOfShellChosenParts', 'AlreadySentFoodTwice', '_Deprecated_NoFoodAvailable', 'NotOwner', 'NoPermission', 'WrongCollectionId', '_Deprecated_NoHatchTimeDetected', 'ShellCollectionIdAlreadySet', 'ShellCollectionIdNotSet', 'RaceNotDetected', 'CareerNotDetected', 'RarityTypeNotDetected', 'GenerationNotDetected', 'FoodInfoUpdateError', 'ShellPartsCollectionIdAlreadySet', 'ShellPartsCollectionIdNotSet', 'ChosenPartsNotDetected', 'MissingShellPartMetadata']
  },
  /**
   * Lookup612: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature'
    }
  },
  /**
   * Lookup613: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup614: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup617: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
   **/
  FrameSystemExtensionsCheckNonZeroSender: 'Null',
  /**
   * Lookup618: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup619: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup620: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup623: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup624: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup625: phala_pallets::mq::check_seq::CheckMqSequence<T>
   **/
  PhalaPalletsMqCheckSeqCheckMqSequence: 'Null',
  /**
   * Lookup626: pallet_transaction_payment::ChargeTransactionPayment<T>
   **/
  PalletTransactionPaymentChargeTransactionPayment: 'Compact<u128>',
  /**
   * Lookup627: khala_parachain_runtime::Runtime
   **/
  KhalaParachainRuntimeRuntime: 'Null'
};
