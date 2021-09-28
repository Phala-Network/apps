export default {
  side: {
    about: '关于',
    feedback: '反馈',
    discord: '讨论',
    forum: '论坛',
    wiki: '维基',

    assets: '资产',
    bridge: '跨链桥',
    delegate: '委托抵押',
    console: '控制台',
    analytics: '数据统计',
    mining: '挖矿',
  },

  // feedback
  feedback: {
    title: '反馈',
    description: '如果有什么问题可以给我们留言',
    name_placeholder: '名称',
    name_invalid: '名称不能为空',
    email_placeholder: '邮箱',
    email_invalid: '请输入正确的邮箱地址',
    comments_placeholder: '发生了什么事情？',
    comments_invalid: '请输入内容',
    success: '发送成功',
    close: '关闭',
    submit: '提交',
  },

  // account
  account: {
    alert: '警告',
    select: '选择地址',
    select_cancel: '取消',
  },

  polkadot: {
    link: '连接 Polkadot{.js}',
    install_extension: '没有找到 polkadot{.js} 钱包，请先安装',
    install: '安装',
    allow_access: '请先在 polkadot{.js} 插件钱包授权',
    no_account_found: '没有找到地址，请先在插件中添加地址，或解锁',
  },

  metamask: {
    link: '连接 MetaMask',
    wrong_network_title: '网络错误',
    wrong_network_description: 'MetaMask 当前不在 Ethereum 网络上',
    allow_access: '请授权访问 MetaMask 扩展',
    no_account_found:
      '没有找到地址，请先在插件中添加地址，或确保在使用正确的钱包地址',
    install_extension: '安装 MetaMask 扩展',
    install: '安装',
  },

  assets: {
    total: '总共',
    parachain_assets: '平行链资产',
    bridge_assets: '桥资产',
    coming_soon: 'Coming Soon',
    claim: '认领',
    cancel: '取消',
    confirm: '确认',
    confirming: '确认中',
    claim_pha: '认领 $PHA',
    sorry: '抱歉，认领功能在Khala开启转账前将无法使用',
    unlocked:
      '你已经解锁 {{vestedClaimable}} $PHA ，仍有 {{vestingLocked}} 个 $PHA 未解锁',
  },

  bridge: {
    from: '从',
    to: '到',
    max: '全部',
    my_address: '我的地址',
    next: '下一步',
    balance: '余额',
    destination_address: '目的地地址',
    amount: '数量 （$PHA）',
    need_enter_amount: '需要输入数量',
    need_enter_recipient: '请输入正确的Khala地址',
    need_login: '需要登录',
    need_insufficient_balance: '余额不足',
    transactions_panel: '跨链记录',
    done: '好的',
    approve: '授权',
    approve_pha: '授权合约操作 $PHA',
    approve_description:
      '为了让桥将你的 ERC20 代币转移到 Khala Network，首先需要你的批准。每个 ERC20 代币只需要一次授权！',
    reject: '拒绝',
    confirm: '确认',
    bridge_information: '跨链信息',
    transaction_send: '交易已发出',
    relayer_confirmed: 'Relayer 已确认',
    ethereum_confirmed: '以太坊已确认',
    khala_confirmed: 'Khala 已确认',
  },
}
