import {Checkbox, Input, Table} from '@phala/react-components'
import {StakePool, useIsMobile, useStakePools} from '@phala/react-hooks'
import {useTranslation} from '@phala/react-i18n'
import {abridgeString, toFixed} from '@phala/utils'
import {useCallback, useMemo, useState} from 'react'
import {Column, Row} from 'react-table'
import styled from 'styled-components'
import useFormat from '../hooks/useFormat'
import useGetARP from '../hooks/useGetAPR'
import useIdentities from '../hooks/useIdentities'
import useModalVisible from '../hooks/useModalVisible'
import ActionButton from './ActionButton'
import DelegateModal from './DelegateModal'

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
  const {t} = useTranslation()
  const isMobile = useIsMobile()
  const identities = useIdentities()
  const {getAPR, isLoading: isAPRLoading} = useGetARP()
  const [filterPid, setFilterPid] = useState<string>('')
  const [showPoolWithWorkers, setShowPoolWithWorkers] = useState<boolean>(true)
  const [showHasAPR, setShowHasAPR] = useState<boolean>(false)
  const [showHasRemaining, setShowHasRemaining] = useState<boolean>(true)
  const [showNotMaxCommission, setShowNotMaxCommission] =
    useState<boolean>(true)
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
        name: 'pid',
        Header: 'pid',
        accessor: 'pid',
      },
      {
        name: 'Owner',
        Header: 'Owner',
        accessor: ({owner}) => {
          const display = identities?.[owner]?.display || abridgeString(owner)
          const verified = identities?.[owner]?.verified || false
          return (
            <span>
              <a
                href={`https://khala.subscan.io/account/${owner}`}
                target="_blank"
                rel="noreferrer"
              >
                {display}
              </a>
              {verified && ' ✅'}
            </span>
          )
        },
      },
      {
        name: 'APR',
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
      },
      {
        name: t('delegate.remaining'),
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
      },
      // !isMobile && {
      //   name: 'Reward Proportion',
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
        name: t('delegate.commission'),
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
      },
      !isMobile && {
        name: t('delegate.delegated'),
        Header: 'Delegated',
        accessor: (stakePool) => format(stakePool.totalStake),
      },
      !isMobile && {
        name: t('delegate.free_delegation'),
        Header: 'Free Delegation',
        accessor: (stakePool) => format(stakePool.freeStake),
      },
      !isMobile && {
        name: t('delegate.releasing_stake'),
        Header: 'Releasing Stake',
        accessor: (stakePool) => format(stakePool.releasingStake),
      },
      !isMobile && {
        name: t('delegate.worker'),
        Header: 'Worker',
        accessor: (stakePool) => stakePool.workers.length,
      },
      {
        name: t('delegate.actions'),
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
              {t('delegate.delegate')}
            </ActionButton>
          </>
        ),
      },
    ]
    return columns.filter(Boolean) as Column<StakePool>[]
  }, [format, open, getAPR, isMobile, identities])

  return (
    <Wrapper>
      <Filter>
        <Input
          onChange={setFilterPid}
          placeholder={t('delegate.search_pid')}
        ></Input>
        <Checkbox
          checked={showPoolWithWorkers}
          onChange={setShowPoolWithWorkers}
        >
          {t('delegate.pool_with_workers')}
        </Checkbox>
        <Checkbox checked={showHasAPR} onChange={setShowHasAPR}>
          {'APR > 0%'}
        </Checkbox>
        <Checkbox
          checked={showNotMaxCommission}
          onChange={setShowNotMaxCommission}
        >
          {t('delegate.commission')}
          {' < 100%'}
        </Checkbox>
        <Checkbox checked={showHasRemaining} onChange={setShowHasRemaining}>
          {t('delegate.remaining')}
          {' > 0'}
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
            {id: 'pid', value: filterPid},
            {id: 'APR', value: showHasAPR},
            {id: 'Commission', value: showNotMaxCommission},
            {id: 'Remaining', value: showHasRemaining},
          ],
          [filterPid, showHasAPR, showNotMaxCommission, showHasRemaining]
        )}
        globalFilterValue={showPoolWithWorkers}
        globalFilter={useCallback(
          (
            rows: Row<StakePool>[],
            columnIds: string[],
            globalFilterValue: boolean
          ) => {
            return globalFilterValue
              ? rows.filter((row) => row.original.workers.length > 0)
              : rows
          },
          []
        )}
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
