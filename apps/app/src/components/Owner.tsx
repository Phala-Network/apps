import {trimAddress} from '@phala/utils'
import {Block} from 'baseui/block'
import {StyledLink} from 'baseui/link'
import {StatefulTooltip} from 'baseui/tooltip'
import {FC, SyntheticEvent} from 'react'
import {CheckCircle, MinusCircle} from 'react-feather'
import styled from 'styled-components'
import {Account} from '../hooks/subsquid'

export const VerifiedIcon = styled(CheckCircle).attrs({size: 16})`
  margin-left: 5px;
`

export const UnVerifiedIcon = styled(MinusCircle).attrs({
  size: 16,
  color: 'rgb(112,112,112)',
})`
  margin-left: 5px;
`

const Owner: FC<{
  account: Account
}> = ({account: {id}}) => {
  const identity = null
  const identityVerified = false
  return (
    <Block display="flex" alignItems="center">
      <StatefulTooltip content={id} placement="bottomLeft">
        <StyledLink
          onClick={(e: SyntheticEvent) => e.stopPropagation()}
          href={`https://khala.subscan.io/account/${id}`}
          target="_blank"
          rel="noreferrer"
        >
          {identity || trimAddress(id)}
        </StyledLink>
      </StatefulTooltip>
      {identity && identityVerified ? (
        <StatefulTooltip content="Verified">
          <VerifiedIcon />
        </StatefulTooltip>
      ) : null}
      {identity && !identityVerified ? (
        <StatefulTooltip content="Unknown">
          <UnVerifiedIcon />
        </StatefulTooltip>
      ) : null}
    </Block>
  )
}

export default Owner
