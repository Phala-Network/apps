import {useMemo, useState} from 'react'
import type {Column, Row} from 'react-table'
import styled from 'styled-components'
import {Input, Table, Checkbox} from '@phala/react-components'
import {useIsMobile} from '@phala/react-hooks'
import {toFixed} from '@phala/utils'
import DelegateModal from '../DelegateModal'
import ActionButton from '../ActionButton'
import useFormat from '../../hooks/useFormat'
import useModalVisible from '../../hooks/useModalVisible'
import useStakePools, {StakePool} from '../../hooks/useStakePools'
import useGetARP from '../../hooks/useGetAPR'
import useIdentities from '../../hooks/useIdentities'
import {trimAddress} from '@phala/utils'

const Wrapper = styled.div`
  tbody {
    a {
      color: inherit;
      text-decoration: underline;
    }

    td:not(:last-child) {
      font-family: PT Mono, monospace;
    }
  }
`
const Filter = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  margin-right: -20px;
  margin-top: -20px;

  & > *:first-child {
    width: 300px;
    flex-shrink: 1;
  }

  & > * {
    margin-right: 20px;
    margin-top: 20px;
  }
`

const MainTable = (): JSX.Element => {
  const isMobile = useIsMobile()
  const identities = useIdentities()
  const {getAPR, isLoading: isAPRLoading} = useGetARP()
  const [searchText, setSearchText] = useState<string>('')
  const [showHasAPR, setShowHasAPR] = useState<boolean>(false)
  const [showHasRemaining, setShowHasRemaining] = useState<boolean>(true)
  const [showNotMaxCommission, setShowNotMaxCommission] =
    useState<boolean>(true)
  const [showHasWorkers, setShowHasWorkers] = useState<boolean>(true)
  const [pid, setPid] = useState<number | null>(null)
  const format = useFormat()
  const {data, isLoading, refetch} = useStakePools()
  const {modalVisible, open, close} = useModalVisible()
  const activeStakePool = useMemo<StakePool | null>(
    () =>
      (data && typeof pid === 'number' && data.find((v) => v.pid === pid)) ||
      null,
    [data, pid]
  )

  const columns = useMemo<Column<StakePool>[]>(() => {
    const columns: (Column<StakePool> | boolean)[] = [
      {
        Header: 'pid',
        accessor: 'pid',
      },
      {
        Header: 'Owner',
        accessor: ({owner}) => identities?.[owner]?.display || owner,
        Cell: ({
          value,
          row: {
            original: {owner},
          },
        }: {
          value: string
          row: {original: StakePool}
        }) => {
          const verified = identities?.[owner]?.verified || false
          const hasIdentity = Boolean(identities?.[owner])

          return (
            <span>
              <a
                href={`https://khala.subscan.io/account/${owner}`}
                target="_blank"
                rel="noreferrer"
              >
                {hasIdentity ? value : trimAddress(value)}
              </a>
              {verified && ' ✅'}
            </span>
          )
        },
      },
      {
        Header: 'APR',
        accessor: (stakePool) => {
          const APR = getAPR(stakePool)
          return APR ? `${toFixed(APR.mul(100), 2)}%` : '-'
        },
        filter: (
          rows: Row<StakePool>[],
          columnIds: string[],
          filterValue: boolean
        ) => {
          return filterValue
            ? rows.filter(
                (row) => row.values.APR !== '0%' && row.values.APR !== '-'
              )
            : rows
        },
        disableGlobalFilter: true,
      },
      {
        Header: 'Remaining',
        accessor: (stakePool) =>
          stakePool.cap === null
            ? '∞'
            : format(stakePool.cap.sub(stakePool.totalStake)),
        filter: (
          rows: Row<StakePool>[],
          columnIds: string[],
          filterValue: boolean
        ) => {
          return filterValue
            ? rows.filter(
                (row) =>
                  row.values.Remaining !== '0 PHA' &&
                  row.values.Remaining !== '-'
              )
            : rows
        },
        disableGlobalFilter: true,
      },
      // !isMobile && {
      //   Header: 'Reward Proportion',
      //   accessor: (stakePool) => {
      //     const proportion = getProportion(stakePool)
      //     if (proportion) {
      //       return `${toFixed(proportion.mul(100), 2)}%`
      //     }
      //     return '-'
      //   },
      // },
      {
        Header: 'Commission',
        accessor: (stakePool) =>
          `${toFixed(stakePool.payoutCommission.div(10 ** 4), 2)}%`,
        filter: (
          rows: Row<StakePool>[],
          columnIds: string[],
          filterValue: boolean
        ) => {
          return filterValue
            ? rows.filter((row) => row.values.Commission !== '100%')
            : rows
        },
        disableGlobalFilter: true,
      },
      !isMobile && {
        Header: 'Delegated',
        accessor: (stakePool) => format(stakePool.totalStake),
        disableGlobalFilter: true,
      },
      !isMobile && {
        Header: 'Free Delegation',
        accessor: (stakePool) => format(stakePool.freeStake),
        disableGlobalFilter: true,
      },
      !isMobile && {
        Header: 'Releasing Stake',
        accessor: (stakePool) => format(stakePool.releasingStake),
        disableGlobalFilter: true,
      },
      !isMobile && {
        Header: 'Worker',
        accessor: (stakePool) => stakePool.workers.length,
        disableGlobalFilter: true,
        filter: (
          rows: Row<StakePool>[],
          columnIds: string[],
          filterValue: boolean
        ) => {
          return filterValue
            ? rows.filter((row) => row.original.workers.length)
            : rows
        },
      },
      {
        Header: 'Actions',
        disableSortBy: true,
        accessor: (stakePool) => (
          <>
            <ActionButton
              size="small"
              onClick={() => {
                setPid(stakePool.pid)
                open('delegate')
              }}
            >
              Delegate
            </ActionButton>
          </>
        ),
        disableGlobalFilter: true,
      },
    ]
    return columns.filter(Boolean) as Column<StakePool>[]
  }, [format, open, getAPR, isMobile, identities])

  return (
    <Wrapper>
      <Filter>
        <Input onChange={setSearchText} placeholder="Search"></Input>
        <Checkbox checked={showHasWorkers} onChange={setShowHasWorkers}>
          Pool with workers
        </Checkbox>
        <Checkbox checked={showHasAPR} onChange={setShowHasAPR}>
          {'APR > 0%'}
        </Checkbox>
        <Checkbox
          checked={showNotMaxCommission}
          onChange={setShowNotMaxCommission}
        >
          {'Commission < 100%'}
        </Checkbox>
        <Checkbox checked={showHasRemaining} onChange={setShowHasRemaining}>
          {'Remaining > 0'}
        </Checkbox>
      </Filter>

      <Table
        autoResetSortBy={false}
        autoResetFilters={false}
        autoResetGlobalFilter={false}
        initialState={{pageSize: 20}}
        data={data || []}
        autoResetPage={false}
        isLoading={isLoading || (showHasAPR && isAPRLoading)}
        columns={columns}
        filters={useMemo(
          () => [
            {id: 'APR', value: showHasAPR},
            {id: 'Commission', value: showNotMaxCommission},
            {id: 'Remaining', value: showHasRemaining},
            {id: 'Worker', value: showHasWorkers},
          ],
          [showHasAPR, showNotMaxCommission, showHasRemaining, showHasWorkers]
        )}
        globalFilterValue={searchText}
      ></Table>

      {modalVisible.delegate && activeStakePool && (
        <DelegateModal
          stakePool={activeStakePool}
          onClose={() => {
            close('delegate')
            refetch()
          }}
        ></DelegateModal>
      )}
    </Wrapper>
  )
}

export default MainTable
