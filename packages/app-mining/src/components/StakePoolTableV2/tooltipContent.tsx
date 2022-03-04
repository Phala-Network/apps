import {StyledLink} from 'baseui/link'

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
  yourWithdrawing: (
    <>
      The withdrawing amount in request. It will be unlocked after the
      corresponding miner cool down by reclaiming them on the blockchain. You
      may need to trigger it manually if you have been waiting longer than the
      cooling down period.{' '}
      <StyledLink
        target="_blank"
        rel="noopener noreferrer"
        href="https://forum.phala.network/t/topic/3073"
        $style={{color: 'inherit', ':visited': {color: 'inherit'}}}
      >
        Learn More
      </StyledLink>
    </>
  ),
  claimableReward: 'Rewards that are collectable',
}
