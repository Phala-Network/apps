import React from 'react'
import {TableBuilder, TableBuilderColumn} from 'baseui/table-semantic'
import {useBreakpoint} from 'styled-breakpoints/react-styled'
import {down} from 'styled-breakpoints'
import AssetCell from './AssetCell'
import BalanceCell from './BalanceCell'
import ButtonCell from './ButtonCell'
import ValueCell from './ValueCell'

export type DataType = {
  name: string
  icon: string
  balance: string
  value: string
  isKPHA?: boolean
  transferrable?: string
  crowdloanVesting?: string
  delegate?: string
}

const ROW: DataType[] = [
  {
    name: 'K-PHA',
    icon: '/images/Phala.svg',
    balance: '36666.2333 PHA',
    transferrable: '36666.2333 PHA',
    crowdloanVesting: '36666.2333 PHA',
    delegate: '36666.2333 PHA',
    value: '$ 22',
    isKPHA: true,
  },
  {
    name: 'K-PHA',
    icon: '/images/Phala.svg',
    balance: '36666.2333 PHA',
    value: '$ 22',
  },
  {
    name: 'K-PHA',
    icon: '/images/Phala.svg',
    balance: '36666.2333 PHA',
    value: '$ 23',
  },
]

const Table: React.FC = () => {
  const isMobile = useBreakpoint(down('sm'))

  return (
    <TableBuilder
      data={ROW}
      overrides={{
        Root: {
          style: () => ({
            boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.1)',
          }),
        },
        TableHeadCell: {
          style: ({$theme}) => ({
            border: 'none',
            backgroundColor: '#D1FF52',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '20px',
            color: '#111111',
            paddingTop: '18px',
            paddingBottom: '18px',
            paddingLeft: '40px',
            paddingRight: 0,
            [$theme.mediaQuery.small]: {
              fontSize: '16px',
              lineHeight: '16px',
              paddingTop: '20px',
              paddingBottom: '20px',
              ':first-of-type': {
                paddingLeft: '10px',
              },
            },
          }),
        },
        TableBodyCell: {
          style: ({$theme}) => ({
            paddingTop: '16px',
            paddingBottom: '16px',
            paddingLeft: '40px',
            paddingRight: 0,
            [$theme.mediaQuery.small]: {
              paddingTop: '20px',
              paddingBottom: '20px',
              ':first-of-type': {
                paddingLeft: '10px',
              },
            },
          }),
        },
      }}
    >
      <TableBuilderColumn header="Asset">
        {(row) => (
          <AssetCell name={row.name} icon={row.icon} isKPHA={row.isKPHA} />
        )}
      </TableBuilderColumn>
      <TableBuilderColumn header="Balance">
        {(row) => (
          <BalanceCell
            balance={row.balance}
            transferrable={row.transferrable}
            crowdloanVesting={row.crowdloanVesting}
            delegate={row.delegate}
          />
        )}
      </TableBuilderColumn>
      {isMobile ? null : (
        <TableBuilderColumn header="Value">
          {(row) => <ValueCell value={row.value} />}
        </TableBuilderColumn>
      )}

      <TableBuilderColumn>
        {(row) => <ButtonCell row={row} />}
      </TableBuilderColumn>
    </TableBuilder>
  )
}

export default Table
