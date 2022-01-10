import {formatCurrency, trimAddress} from '@phala/utils'
import {StyledLink} from 'baseui/link'
import {Block} from 'baseui/block'
import Decimal from 'decimal.js'
import type {StakePools} from '../../hooks/graphql'
import {StatefulTooltip} from 'baseui/tooltip'
import {CheckCircle} from 'react-feather'
import styled from 'styled-components'

const VerifiedIcon = styled(CheckCircle)`
  margin-left: 5px;
`

export const TokenCell = ({value}: {value: string | Decimal}): JSX.Element => (
  <>{formatCurrency(value)} PHA</>
)

export const OwnerCell = ({
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
        href={`https://khala.subscan.io/account/${ownerAddress}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {identity || trimAddress(ownerAddress)}
      </StyledLink>
    </StatefulTooltip>
    {identityVerified && (
      <StatefulTooltip content="Verified">
        <VerifiedIcon size={16} />
      </StatefulTooltip>
    )}
  </Block>
)
