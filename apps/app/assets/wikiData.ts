import shareEquation from '@/assets/share_equation.png'
import {type ReactNode} from 'react'

const wikiData = {
  balance: {
    title: 'Balance',
    content:
      'Balance = PHA (Free status) + PHA (locked by governance)\nThe locked balance cannot be used for staking.',
  },
  delegation: {
    title: 'Delegation',
    content:
      'Delegation is the total value of all assets you have delegated, including the total value of delegation NFTs and the wPHA assets in your account. wPHA can be directly delegated into the pools to generate profitable delegation NFTs.',
  },

  totalValue: {
    title: 'Total Value',
    content: 'All delegated PHA across the Phala & Khala network',
  },
  stakeRatio: {
    title: 'Stake Ratio',
    content:
      'Stake Ratio = All delegated PHA across the Phala & Khala network / All circulating PHA.',
  },
  dailyRewards: {
    title: 'Daily Rewards',
    content:
      'The total amount of computation rewards distributed across the Phala & Khala network in the past day.',
  },
  avgApr: {
    title: 'Avg APR',
    content:
      'The average annual percentage rate of return for all delegations across the Phala & Khala network. (no consideration of compound interest)',
  },
  onlineWorkers: {
    title: 'Online Workers',
    content:
      'The total number of online workers across the Phala & Khala network.',
  },

  delegationValue: {
    title: 'Delegation Value',
    content:
      'The trend of your delegation value over time, with a daily snapshot taken at UTC 0:00.',
  },
  estApr: {
    title: 'Est. APR/APY',
    content:
      'APR: Estimated APR for Delegators on this pool without compound interests.\nNote: This APR is based on the pool’s real-time status, extrapolated over a year. The APR could change based on factors such as the pool’s commission, worker’s scores, and daily rewards\n\nAPY: Estimated APY for Delegators on this pool with daily compound interests.\nNote: This APY is based on the pool’s real-time status, extrapolated over a year. The APY could change based on factors such as Vault’s commission and related StakePools’ APR, which this vault delegated with.\n\nWhy does Vault use APY while StakePool uses APR to measure returns?\nThe Vault owner will generate income from the reinvested interest through manual scheduling, so the income of the Vault is closer to APY. However, the reinvestment income of StakePool is easier to reach the upper limit, so it is more accurate to use APR.',
  },
  wrappedPHA: {
    title: 'Wrapped PHA',
    content:
      'wPHA is used to contribute to StakePool or Vault to obtain Delegation NFT and earns delegation rewards. Here is the wPHA amount in your address. It can be exchanged for PHA via an on-chain pallet automatically. wPHA can be directly delegated into the Vault or StakePool.',
  },

  vault: {
    title: 'Vault',
    content:
      'Vault is a function designed for delegation proxy. Vaults are pools of funds with an associated strategy that aims to maximize returns on the assets they hold.\nDelegators can also skip Vault and delegate to StakePool directly.',
  },
  stakePool: {
    title: 'StakePool',
    content:
      'StakePool is a container for computing providers to manage their workers staking and also serves as a fund pool for collecting delegated tokens from delegators. Delegators or Vaults can delegate their tokens into StakePool. Computing providers add their workers to StakePool and stake them using the tokens delegated by users, starting to provide computing power.',
  },

  basePoolStatus: {
    title: 'Pool Status',
    content:
      "Verified\nKhala's on-chain verification function. Each user can set a nickname for their address, The address with a check mark after the nickname is the address confirmed by the Khala registrar, including its email, Twitter, and other related contacts. This does not mean that the verified address is more advanced or more credible; please note that certification does not represent any financial recommendation.\n\nFavorite\nClick the star on the left side of the pool card to add the pool to your favorites. Note that this is stored locally and will not be inherited if you change browsers or devices.\n\nDelegated\nPools where you currently hold Delegation NFTs.\n\nHide closed\nIf selected, you will not be able to see pools that have been whitelisted (if you are not on the whitelist).",
  },

  tvl: {
    title: 'TVL',
    content:
      'Total Value Locked in the pool includes the tokens already delegated by the Vault to the StakePool, as well as the liquid funds still held within the Vault.',
  },
  nftValue: {
    title: 'NFT Value',
    content:
      'The total amount of your delegation in the pool, is calculated through the NFT certificate of your share in this pool',
  },
  freeValue: {
    title: 'Pool Free',
    content: 'Liquid funds held within the Vault/StakePool.',
  },
  commission: {
    title: 'Commission',
    content:
      'The percentage of earnings collected by the pool operator from the pool.',
  },
  withdrawing: {
    title: 'Withdrawing',
    content:
      'Vault:\nThe total amount of withdrawals requested by Vault users in the withdrawal queue. The withdrawal queue is subject to changes due to new delegates and withdrawal operations. The rewards automatically reinvested into the pool will be first deposited into the Free delegation and will not be used to automatically clear the withdrawal queue. Users need to manually “reclaim” their delegation or wait for new stake and withdrawal operations to clear the withdrawal by exsiting free delegation.\n\nStakePool:\nThe total amount of withdrawals requested by by StakePool users, including user withdrawals and withdrawals from the Vault to the StakePool. The withdrawal queue is subject to changes due to new delegates and withdrawal operations. The rewards automatically reinvested into the pool are first deposited into the Free delegation and will not be used to automatically clear withdrawals.Users need to manually “reclaim” their delegation or wait for new stake and withdrawal operations to clear the withdrawal by exsiting free delegation.',
  },
  price: {
    title: 'Price',
    content:
      'Price = TVL / total shares held by users in the pool\nThe price may vary across different pools and is subject to increase with reward distribution and decrease with slashing. It will not change due to delegate or withdrawal operations.\nDetails: https://wiki.phala.network/en-us/general/applications/share/',
  },
  shares: {
    title: 'Shares',
    content:
      'The number of shares of this Delegation NFT in the corresponding pool. Rewards will be evenly distributed to each share to increase the share price.\nShare quantity X Delegation Price = Total Value of the Delegation.',
  },
  delegableBalance: {
    title: 'Delegable balance',
    content:
      'The total amount of assets available for delegation, including unlocked PHA balance and all wPHA assets held. The wPHA assets locked from voting can also be used for delegation.',
  },
  estDelegatedApr: {
    title: 'Est. delegated APY/APR',
    content:
      'The estimated annual percentage yield of the pool after you delegate the expected amount, assuming no further action by the owner. If there is significant changes in yield, it is recommended to contact the pool operator before your delegate operation.',
  },

  delegable: {
    title: 'StakePool Delegable',
    content:
      "The maximum amount of PHA that can be extra added to the pool as a delegation.\ndelegable amount = cap - total delegation + withdrawing\nIf the cap is smaller than the pool's total delegation, the pool cannot accept any more delegation regardless of the withdrawal amount.",
  },
  capacity: {
    title: 'Capacity',
    content:
      'The maximum amount of PHA that a pool can accept as delegation. If the total delegation exceeds the cap, the pool cannot accept any more delegation. This does not affect the automatic reinvestment of rewards.',
  },
  totalDelegation: {
    title: 'Total Delegation',
    content:
      'The sum of all PHA delegated to a pool, including the tokens that the StakePool has delegated to Workers and the funds that are still in the StakePool.',
  },

  sufficientStake: {
    title: 'Sufficient/Insufficient Stake',
    content:
      "If Total Withdraw < Releasing Value + Free Value, the pool is in a sufficient stake state, which means that all user withdrawals from this pool can be cleared by the pool's own liquidity or other channels, including withdrawals from the Vault to the StakePool or the StakePool stopping a worker and obtaining locked tokens within it.",
  },

  whitelist: {
    title: 'Whitelist',
    content:
      "The pool owner can shield users not on the whitelist by adding a whitelist. However, users already delegating in the pool and the compounded interest associated with that delegation will not be affected by the whitelist. In addition, the pool owner's account can stake in the pool regardless of whether it is on the whitelist. \n\nIf the pool's whitelist is empty, there are no whitelist restrictions by default.",
  },

  ownerCut: {
    title: 'Owner Cut',
    content:
      'The commission that the Vault owner manually draws from the profits generated by all delegations in the pool. Vault commissions can only take profits from funds that remain in the vault at the time of manual settlement. If you withdraw all funds before the vault owner settles, that part cannot be settled.\n\nExtracted rewards will be automatically stored in the corresponding contract account of the Vault until the Vault owner claims delegation and designates an address to receive the rewards.\n\nThe formula for calculating the cut is:\nCut = (Current share price - Last share price) x Commission x Vault TVL.',
  },
  vaultOwnerRewards: {
    title: 'Vault Owner Rewards',
    content: `The Vault owner reward refers to the portion of the commission that has already been collected from delegators but has not yet been designated for a recipient. This portion will continue to be stored in the corresponding contract account of the Vault.\n\nWhen the Vault owner uses the "claim to delegation" operation in the Vault to designate an address for the reward, the reward will be distributed to the designated account in the form of the Vault's delegation NFT. If the account wishes to withdraw the reward as PHA token, it must execute a withdrawal operation for the delegation NFT to extract a specific amount from the Vault. Note that this reward is not generated out of thin air but is extracted from the delegators in the Vault. Therefore, if there are no extra free delegations in the Vault, the owner will still be unable to immediately withdraw the reward from the Vault. Any withdrawal requests initiated will also generate a withdrawal queue for the Vault.`,
  },

  stakePoolOwnerRewards: {
    title: 'StakePool Owner Rewards',
    content: `The owner reward for the StakePool is automatically collected through the contract. Each time the contract rewards the worker providing computing power, GateKeeper will allocate the reward into three parts: Treasury, Owner, and Delegator. The proportion of Owner and Delegator portions is calculated based on the commission.\n\nThe Owner portion of the reward will automatically exist in the StakePool owner's contract reward address after distribution and will not automatically transfer to the owner's address. The owner must use the "claim reward" operation to distribute the reward to the designated recipient. After receiving the reward, the recipient will receive a specified amount of wPHA tokens that can be immediately exchanged for PHA or staked in any Vault or StakePool.`,
  },

  oneDayRewards: {
    title: '1d Rewards',
    content:
      'The delegation rewards earned by this Delegation NFT in the past day. \nThis value may be affected by the irregularity of rewards collected by the Vault owner. Please check the pool details page for the daily rewards in the recent period to get more information.',
  },

  workerState: {
    title: 'Worker State',
    content: `In the Phala App, only worker's available operations based on its current status are displayed, and the relevant lists are as follows:\nready - can be “start”\ncomputing and unresponsive - can be “stop” and “change stake”\ncooling down - no operations can be performed until countdown ends\ncountdown ends for cooling down - “reclaim” to unlock the tokens`,
  },
  reclaimWorker: {
    title: 'Reclaim Worker',
    content: `Reclaiming a worker means unlocking the staked tokens inside the worker after a 7-day coolingdown period. After a worker is reclaimed, its status will change to ready, and the unlocked tokens will be transferred to the StakePool's free delegation. If the StakePool has a withdrawal, the unlocked tokens will be used to repay the withdrawal first.`,
  },
  reclaimPool: {
    title: 'Reclaim Pool',
    content: `When there is a withdrawal queue in the pool, anyone can use the "reclaim" operation to adjust the free liquidity of the pool, that is, use the existing free liquidity to pay off the withdrawal queue.\nAt the same time, if there is a withdrawal queue in the pool for more than 7 days, and there is no delegation being released or enough free liquidity, the pool will be frozen. A full delegation withdrawal request will be initiated to all StakePools (for Vault), or a stop request will be initiated to all workers in the pool (for StakePool).`,
  },
  dailyBudgetPerShare: {
    title: 'Daily budget/share',
    content: `It's roughly equal to the daily income of a 10,000V worker before the 20% take away to the Treasury.

Daily budget per share means the reward budget for each unit of computing power per day.
    
The calculation formula is:

Daily budget per share = (Phala budget per share * Phala total share + Khala budget per share * Khala total share)  / (Phala total share + Khala total share)

- Phala budget per share = Phala budget * 24 * 60 * 60 / Phala block speed / (Phala total share/10000)
- Khala budget per share = Khala budget * 24 * 60 * 60 / Khala block speed / (Khala total share/10000)

This budget is adjusted by the budget balancer at UTC 0 o'clock every day, to ensure that the unit computing power earnings between Phala and Khala networks are as similar as possible.

The adjustment calculation logic is based on days, and the key factors for allocation are: 

- the current halving period
- the total standard budget of the entire network
- the average block speed of the previous day
- the computing power snapshot at 0 o'clock.

Here is detailed intro for Budget Balancer which includes the specific formula:

[https://docs.phala.network/v1/compute-providers/basic-info/budget-balancer](https://docs.phala.network/v1/compute-providers/basic-info/budget-balancer)

**If you find that the result on Phala/Khala are inconsistent, it's normal. Because we will use the block time of the previous day to calculate the budget allocation for the new day, this is reasonable, as the "losses" from the previous day will be compensated in the new day.**

In addition, the unit of share in the current indicator here is 10,000 real shares, which can more intuitively show the income of the workers. 

Because the calculation of machine share depends on the “real-time V value”, “worker confidence level”, and “real-time P value”. 

A worker with a full V value (30,000) has a share of 30,000-33,000 (the interval part mainly depends on the worker’s P value). Therefore, if the Daily budget/share is 10, the income of a full v worker is about 24PHA/day (excluding the commission of the treasury - 20%)

The specific formula for share is:

![](${shareEquation.src})

Here is the detailed intro for worker rewards:

[https://docs.phala.network/v1/compute-providers/basic-info/worker-rewards](https://docs.phala.network/v1/compute-providers/basic-info/worker-rewards)`,
  },
} satisfies Record<string, {title: string; content: ReactNode}>

export type WikiEntry = keyof typeof wikiData

export default wikiData
