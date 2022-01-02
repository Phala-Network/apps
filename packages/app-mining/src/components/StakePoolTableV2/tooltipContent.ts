export const tooltipContent = {
  pid: `StakePool's ID`,
  owner: `StakePool's Owner Account`,
  apr: 'Real-time Annual Percentage Rate',
  remaining: 'The remaining allocation you can delegate to the Pool',
  commission:
    'The commission rate of the mining reward taken by the Pool owner. (0% means no pool owner reward, and all the reward goes to the delegators)',
  delegated: 'Total delegated stake in the StakePool',
  freeDelegation: 'The stake not in use',
  releasingStake:
    'The total stake that will be released in the future due to miner Cool Down. After the Cool Down period, the stake can be released by reclaiming the miners.',
  yourDelegation: 'Your delegation amount in StakePool',
  yourWithdrawing: 'The total withdrawing amount in request',
  claimableRewards: 'Rewards that are collectable',
} as const
