import React from 'react'
import {isTest, isDev} from '@phala/utils'
import ActiveOutline from './ActiveOutline'
import Link from './Link'

const Links: React.FC = () => {
  return (
    <div id="navLinks" style={{position: 'relative', paddingTop: 1}}>
      <ActiveOutline />

      <Link to="/">Assets</Link>
      <Link to="/bridge/">Bridge</Link>
      {(isDev() || isTest()) && <Link to="/console/">Console</Link>}
      {isDev() && <Link to="/stakepad/">Stakepad</Link>}

      {/* <Link to="/darkpool">Darkpool</Link> */}
      {/* <Link to="/tokens">Tokens</Link> */}
      {/* <Link to="/transactions">Transactions</Link> */}
      {/* <Link to="/crowdloan">KSM Crowdloan</Link> */}
    </div>
  )
}

export default Links
