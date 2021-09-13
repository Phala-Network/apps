import {isDev, isTest} from '@phala/utils'
import React from 'react'
import styled from 'styled-components'
import ActiveOutline from './ActiveOutline'
import Link from './Link'

const Divider = styled.div`
  border-top: 1px solid #494949;
  margin: 14px 0;
`

const Links: React.FC = () => {
  return (
    <div id="navLinks" style={{position: 'relative', paddingTop: 1}}>
      <ActiveOutline />

      <Link to="/">Assets</Link>
      <Link to="/bridge/">Bridge</Link>
      {(isDev() || isTest()) && <Link to="/stakepad/">Stakepad</Link>}
      <Link to="/analytics/">Analytics</Link>
      <Divider></Divider>
      {(isDev() || isTest()) && <Link to="/console/">Console</Link>}

      {/* <Link to="/darkpool">Darkpool</Link> */}
      {/* <Link to="/tokens">Tokens</Link> */}
      {/* <Link to="/transactions">Transactions</Link> */}
      {/* <Link to="/crowdloan">KSM Crowdloan</Link> */}
    </div>
  )
}

export default Links
