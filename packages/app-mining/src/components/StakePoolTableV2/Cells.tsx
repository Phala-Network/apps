import {formatCurrency, toFixed, trimAddress} from '@phala/utils'
import {styled} from 'baseui'
import {StyledLink} from 'baseui/link'
import Decimal from 'decimal.js'

const AddressLink = styled(StyledLink, {
  fontFamily: 'PT Mono',
})

export const PercentCell = ({value}: {value: string}): JSX.Element => (
  <>{toFixed(new Decimal(value).times(100), 2)}%</>
)

export const TokenCell = ({value}: {value: string | Decimal}): JSX.Element => (
  <>{formatCurrency(value)} PHA</>
)

export const AddressCell = ({
  value,
  label,
}: {
  value: string
  label?: string
}): JSX.Element => (
  <AddressLink
    href={`https://khala.subscan.io/account/${value}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {label ?? trimAddress(value)}
  </AddressLink>
)
