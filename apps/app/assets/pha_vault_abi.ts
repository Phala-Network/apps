const abi = [{"type":"function","name":"allowance","inputs":[{"name":"owner","type":"address","internalType":"address"},{"name":"spender","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"approve","inputs":[{"name":"spender","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"asset","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"balanceOf","inputs":[{"name":"account","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"cancelUnlockRequest","inputs":[{"name":"index","type":"uint256","internalType":"uint256"},{"name":"receiver","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"checkpointTime","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"checkpointTotalAssets","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"checkpointTreasuryAssets","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"claim","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"claimTreasury","inputs":[{"name":"receiver","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"convertToAssets","inputs":[{"name":"shares","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"convertToShares","inputs":[{"name":"assets","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"decimals","inputs":[],"outputs":[{"name":"","type":"uint8","internalType":"uint8"}],"stateMutability":"view"},{"type":"function","name":"deposit","inputs":[{"name":"assets","type":"uint256","internalType":"uint256"},{"name":"receiver","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"initialize","inputs":[{"name":"asset","type":"address","internalType":"contract IERC20"},{"name":"owner","type":"address","internalType":"address"},{"name":"initialRewardRate","type":"uint256","internalType":"uint256"},{"name":"initialUnlockPeriod","type":"uint256","internalType":"uint256"},{"name":"initialMaxUnlockRequests","type":"uint256","internalType":"uint256"},{"name":"initialTreasuryRatio","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"maxDeposit","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"maxMint","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"maxRedeem","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"maxUnlockRequests","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"maxWithdraw","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"mint","inputs":[{"name":"shares","type":"uint256","internalType":"uint256"},{"name":"receiver","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"pause","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"paused","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"previewDeposit","inputs":[{"name":"assets","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"previewMint","inputs":[{"name":"shares","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"previewRedeem","inputs":[{"name":"shares","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"previewWithdraw","inputs":[{"name":"assets","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"redeem","inputs":[{"name":"shares","type":"uint256","internalType":"uint256"},{"name":"receiver","type":"address","internalType":"address"},{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"rewardRate","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"setMaxUnlockRequests","inputs":[{"name":"newMaxUnlockRequests","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setRewardRate","inputs":[{"name":"newRewardRate","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setTreasuryRatio","inputs":[{"name":"newTreasuryRatio","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setUnlockPeriod","inputs":[{"name":"newUnlockPeriod","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"supportsInterface","inputs":[{"name":"interfaceId","type":"bytes4","internalType":"bytes4"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"totalAssets","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"transfer","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"transferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"treasuryAssets","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"treasuryRatio","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"unlockPeriod","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"unlockRequests","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"tuple[]","internalType":"struct Vault.UnlockRequest[]","components":[{"name":"receiver","type":"address","internalType":"address"},{"name":"assets","type":"uint256","internalType":"uint256"},{"name":"unlockTime","type":"uint256","internalType":"uint256"}]}],"stateMutability":"view"},{"type":"function","name":"unpause","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"withdraw","inputs":[{"name":"assets","type":"uint256","internalType":"uint256"},{"name":"receiver","type":"address","internalType":"address"},{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"event","name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"spender","type":"address","indexed":true,"internalType":"address"},{"name":"value","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Claimed","inputs":[{"name":"caller","type":"address","indexed":true,"internalType":"address"},{"name":"receiver","type":"address","indexed":true,"internalType":"address"},{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"assets","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Deposit","inputs":[{"name":"sender","type":"address","indexed":true,"internalType":"address"},{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"assets","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"shares","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Initialized","inputs":[{"name":"version","type":"uint64","indexed":false,"internalType":"uint64"}],"anonymous":false},{"type":"event","name":"MaxUnlockRequestsUpdated","inputs":[{"name":"oldMaxUnlockRequests","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"newMaxUnlockRequests","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"Paused","inputs":[{"name":"account","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"RewardRateUpdated","inputs":[{"name":"oldRewardRate","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"newRewardRate","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"RewardsSettled","inputs":[{"name":"checkpointTime","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"rewards","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"totalAssets","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"value","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"TreasuryAssetsClaimed","inputs":[{"name":"receiver","type":"address","indexed":true,"internalType":"address"},{"name":"assets","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"TreasuryRatioUpdated","inputs":[{"name":"oldTreasuryRatio","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"newTreasuryRatio","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"TreasurySettled","inputs":[{"name":"checkpointTime","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"treasuryRewards","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"treasuryAssets","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"UnlockPeriodUpdated","inputs":[{"name":"oldUnlockPeriod","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"newUnlockPeriod","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Unpaused","inputs":[{"name":"account","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"name":"sender","type":"address","indexed":true,"internalType":"address"},{"name":"receiver","type":"address","indexed":true,"internalType":"address"},{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"assets","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"shares","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"ERC20InsufficientAllowance","inputs":[{"name":"spender","type":"address","internalType":"address"},{"name":"allowance","type":"uint256","internalType":"uint256"},{"name":"needed","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC20InsufficientBalance","inputs":[{"name":"sender","type":"address","internalType":"address"},{"name":"balance","type":"uint256","internalType":"uint256"},{"name":"needed","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC20InvalidApprover","inputs":[{"name":"approver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC20InvalidReceiver","inputs":[{"name":"receiver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC20InvalidSender","inputs":[{"name":"sender","type":"address","internalType":"address"}]},{"type":"error","name":"ERC20InvalidSpender","inputs":[{"name":"spender","type":"address","internalType":"address"}]},{"type":"error","name":"ERC4626ExceededMaxDeposit","inputs":[{"name":"receiver","type":"address","internalType":"address"},{"name":"assets","type":"uint256","internalType":"uint256"},{"name":"max","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC4626ExceededMaxMint","inputs":[{"name":"receiver","type":"address","internalType":"address"},{"name":"shares","type":"uint256","internalType":"uint256"},{"name":"max","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC4626ExceededMaxRedeem","inputs":[{"name":"owner","type":"address","internalType":"address"},{"name":"shares","type":"uint256","internalType":"uint256"},{"name":"max","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC4626ExceededMaxWithdraw","inputs":[{"name":"owner","type":"address","internalType":"address"},{"name":"assets","type":"uint256","internalType":"uint256"},{"name":"max","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"EnforcedPause","inputs":[]},{"type":"error","name":"ExceedMaxUnlockRequests","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"ExpectedPause","inputs":[]},{"type":"error","name":"InvalidInitialization","inputs":[]},{"type":"error","name":"InvalidMaxUnlockRequests","inputs":[]},{"type":"error","name":"InvalidReceiver","inputs":[{"name":"receiver","type":"address","internalType":"address"}]},{"type":"error","name":"InvalidTreasuryRatio","inputs":[]},{"type":"error","name":"InvalidUnlockRequestIndex","inputs":[]},{"type":"error","name":"MaxUnlockRequestsUnchanged","inputs":[]},{"type":"error","name":"NoClaimableAssets","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"NoTreasuryAssets","inputs":[]},{"type":"error","name":"NotInitializing","inputs":[]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]},{"type":"error","name":"RewardRateUnchanged","inputs":[]},{"type":"error","name":"SafeERC20FailedOperation","inputs":[{"name":"token","type":"address","internalType":"address"}]},{"type":"error","name":"TreasuryRatioUnchanged","inputs":[]},{"type":"error","name":"UnlockPeriodUnchanged","inputs":[]}] as const

export default abi
