import {StyledLink} from 'baseui/link'

export const tooltipContent = {
  pid: `StakePool's ID`,
  owner: `StakePool's Owner Account. “Unknown” means the account has identity but has not been judged. “Verified” means the registrar has certified that the information is correct.`,
  apr: 'Real-time Annual Percentage Rate',
  delegable: 'The amount you can delegate to the Pool',
  commission:
    'The commission rate of the mining reward taken by the Pool owner. (0% means no pool owner reward, and all the reward goes to the delegators)',
  delegated: 'Total delegated stake in the StakePool',
  freeDelegation: 'The stake not in use',
  releasingStake:
    'The total stake that will be   released in the future due to miner Cool Down. After the Cool Down period, the stake can be released by reclaiming the miners.',
  yourDelegation: 'Your delegation amount in StakePool',
  yourWithdrawing: (
    <>
      The withdrawing amount in request. It will be unlocked after the
      corresponding miner cool down by reclaiming them on the blockchain. You
      may need to trigger it manually if you have been waiting longer than the
      cooling down period.{' '}
      <StyledLink
        target="_blank"
        rel="noreferrer"
        href="https://forum.phala.network/t/topic/3073"
        $style={{color: 'inherit', ':visited': {color: 'inherit'}}}
      >
        Learn More
      </StyledLink>
    </>
  ),
  claimableReward: 'Rewards that are collectable',
  commissionWarning:
    'This StakePool has lowered its commission in the past 3 days, and there is a risk of callback in the future, resulting in lower returns than the current APR. You can click to enter the details page to view the commission chart.',
}
