import {trimAddress} from '@phala/utils'
import {Block} from 'baseui/block'
import {StyledLink} from 'baseui/link'
import {StatefulTooltip} from 'baseui/tooltip'
import {VFC} from 'react'
import {CheckCircle, MinusCircle} from 'react-feather'
import styled from 'styled-components'
import type {StakePools} from '../hooks/graphql'

export const VerifiedIcon = styled(CheckCircle).attrs({size: 16})`
  margin-left: 5px;
`

export const UnVerifiedIcon = styled(MinusCircle).attrs({
  size: 16,
  color: 'rgb(112,112,112)',
})`
  margin-left: 5px;
`

const Owner: VFC<{
  stakePool: Pick<StakePools, 'ownerAddress'> & {
    accounts: Pick<StakePools['accounts'], 'identity' | 'identityVerified'>
  }
}> = ({
  stakePool: {
    ownerAddress,
    accounts: {identityVerified, identity},
  },
}) => (
  <Block display="flex" alignItems="center">
    <StatefulTooltip content={ownerAddress} placement="bottomLeft">
      <StyledLink
        onClick={(e) => e.stopPropagation()}
        href={`https://khala.subscan.io/account/${ownerAddress}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {identity || trimAddress(ownerAddress)}
      </StyledLink>
    </StatefulTooltip>
    {identityVerified ? (
      <StatefulTooltip content="Verified">
        <VerifiedIcon />
      </StatefulTooltip>
    ) : (
      <StatefulTooltip content="UnVerified">
        <UnVerifiedIcon />
      </StatefulTooltip>
    )}
  </Block>
)

export default Owner
