import {trimAddress} from '@phala/utils'
import {Block} from 'baseui/block'
import {StyledLink} from 'baseui/link'
import {StatefulTooltip} from 'baseui/tooltip'
import {ParagraphXSmall} from 'baseui/typography'
import {FC, SyntheticEvent} from 'react'
import {CheckCircle, MinusCircle} from 'react-feather'
import styled from 'styled-components'
import {Account, IdentityLevel} from '../hooks/subsquid'

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
}> = ({account: {id, identityLevel, identityDisplay}}) => {
  const verified =
    identityLevel === IdentityLevel.Reasonable ||
    identityLevel === IdentityLevel.KnownGood

  const trimmedAddress = trimAddress(id)
  return (
    <Block display="flex" alignItems="center">
      <Block display="flex" alignItems="center">
        <StatefulTooltip content={id} placement="bottomLeft">
          <StyledLink
            onClick={(e: SyntheticEvent) => e.stopPropagation()}
            href={`https://khala.subscan.io/account/${id}`}
            target="_blank"
            rel="noreferrer"
          >
            {identityDisplay || trimmedAddress}
          </StyledLink>
        </StatefulTooltip>
        {identityDisplay && (
          <StatefulTooltip content={identityLevel}>
            {verified ? <VerifiedIcon /> : <UnVerifiedIcon />}
          </StatefulTooltip>
        )}
      </Block>
      {identityDisplay && (
        <ParagraphXSmall as="div" color="contentTertiary" marginLeft="scale100">
          …{id.slice(-4)}
        </ParagraphXSmall>
      )}
    </Block>
  )
}

export default Owner
