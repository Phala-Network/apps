export default {
  side: {
    about: 'About',
    feedback: 'Feedback',
    discord: 'Discord',
    forum: 'Forum',
    wiki: 'Wiki',
    assets: 'Assets',
    bridge: 'Safe Bridge',
    delegate: 'Delegate',
    console: 'Console',
    analytics: 'Analytics',
    mining: 'Mining',
  },

  // feedback
  feedback: {
    title: 'Feedback',
    description:
      "The feedback's response is not timely, if you have an urgent question, you can report it on discord",
    name_placeholder: 'Name',
    name_invalid: 'Please input your name',
    email_placeholder: 'Email',
    email_invalid: 'Please check your email format',
    comments_placeholder: 'What Happened?',
    message_invalid: 'Please input your comments',
    success: 'Success: send feedback',
    close: 'Close',
    submit: 'Submit',
  },

  // account
  account: {
    alert: 'Alert',
    select: 'Select An Account',
    select_cancel: 'Cancel',
  },

  polkadot: {
    link: 'Connect Polkadot{.js}',
    install_extension:
      'No Polkadot{.js} extension found, please install it first.',
    install: 'Install',
    allow_access: 'Please allow access in the Polkadot extension.',
    no_account_found:
      'No account found, please add account in your wallet extension or unlock it.',
  },

  metamask: {
    link: 'Connect METAMASK',
    wrong_network_title: 'Wrong Network',
    wrong_network_description: 'Please connect to the Ethereum Mainnet.',
    allow_access: 'Please allow access in the MetaMask extension.',
    no_account_found:
      'No account found, please add account in your wallet or make sure that the correct wallet is used.',
    install_extension: 'No metamask extension found, please install it first.',
  },

  assets: {
    total: 'Total',
    parachain_assets: 'Parachain Assets',
    bridge_assets: 'Bridge Assets',
    coming_soon: 'Coming Soon',
    claim: 'Claim',
    cancel: 'Cancel',
    confirm: 'Confirm',
    confirming: 'Confirming',
    claim_pha: 'Claim $PHA',
    sorry:
      'Sorry, the claim module is disabled until Khala enables transfer function.',
    unlocked:
      'You have unlocked {{vestedClaimable}} $PHA, you still have {{vestingLocked}} $PHA to be unlocked.',
  },

  // bridge
  bridge: {
    from: 'From',
    to: 'To',
    max: 'Max',
    my_address: 'MY ADDRESS',
    next: 'Next',
    balance: 'Balance',
    destination_address: 'Destination Address',
    amount: 'Amount ($PHA)',
    need_enter_amount: 'Need enter amount',
    need_enter_recipient: 'Need enter recipient',
    need_login: 'Need login',
    need_insufficient_balance: 'Insufficient balance',
    transactions_panel: 'Transactions Panel',
    done: 'Done',
    approve: 'Approve',
    approve_pha: 'Approve $PHA',
    approve_description:
      'In order for the bridge to move your ERC20 tokens to Khala Network, it first needs your approval. This is only required once per ERC20 token!',
    reject: 'Reject',
    confirm: 'Confirm',
    bridge_information: 'Bridge Information',
    transaction_send: 'Transaction Send',
    relayer_confirmed: 'Relayer Confirmed',
    ethereum_confirmed: 'Ethereum Confirmed',
    khala_confirmed: 'Khala Confirmed',
  },
}
