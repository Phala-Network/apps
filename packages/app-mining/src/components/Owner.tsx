import {StyledLink} from 'baseui/link'
import {Block} from 'baseui/block'
import type {StakePools} from '../hooks/graphql'
import {StatefulTooltip} from 'baseui/tooltip'
import {CheckCircle} from 'react-feather'
import styled from 'styled-components'
import {trimAddress} from '@phala/utils'

export const VerifiedIcon = styled(CheckCircle).attrs({size: 16})`
  margin-left: 5px;
`

const Owner = ({
  stakePool: {
    ownerAddress,
    accounts: {identityVerified, identity},
  },
}: {
  stakePool: StakePools
}): JSX.Element => (
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
    {identityVerified && (
      <StatefulTooltip content="Verified">
        <VerifiedIcon />
      </StatefulTooltip>
    )}
  </Block>
)

export default Owner
