import {Button} from 'baseui/button'
import {Checkbox} from 'baseui/checkbox'
import {Modal} from 'baseui/modal'
import {TableBuilder, TableBuilderColumn} from 'baseui/table-semantic'
import {FC, useEffect, useMemo, useState} from 'react'
import {useStakePoolWhitelist} from '../../hooks/useStakePoolWhitelist'
import Pagination from '../Pagination'
import TableSkeleton from '../TableSkeleton'
import AddWhitelistModalBody from './AddWhitelistModalBody'
import RemoveWhitelistModalBody from './RemoveWhitelistModalBody'

type WhitelistModalKey = 'add' | 'remove'

const PAGE_SIZE = 10

const StakePoolWhitelist: FC<{pid?: string}> = ({pid}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalKey, setModalKey] = useState<WhitelistModalKey | null>(null)
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([])
  const {data: whitelistData} = useStakePoolWhitelist(pid)

  const toggle = (account: string) => {
    if (selectedAddresses.includes(account)) {
      setSelectedAddresses(selectedAddresses.filter((a) => a !== account))
    } else {
      setSelectedAddresses([...selectedAddresses, account])
    }
  }

  const toggleAll = () => {
    if (!whitelistData?.length) return
    if (selectedAddresses.length) {
      setSelectedAddresses([])
    } else {
      setSelectedAddresses(whitelistData)
    }
  }

  const onClose = () => setIsModalOpen(false)

  useEffect(() => {
    if (!whitelistData || !selectedAddresses.length) return
    const filtered = selectedAddresses.filter((address) =>
      whitelistData.includes(address)
    )

    if (filtered.length !== selectedAddresses.length) {
      setSelectedAddresses(filtered)
    }
  }, [whitelistData, selectedAddresses])

  useEffect(() => {
    if (
      typeof whitelistData?.length === 'number' &&
      currentPage * PAGE_SIZE >= PAGE_SIZE + whitelistData.length
    ) {
      setCurrentPage(Math.ceil(whitelistData.length / PAGE_SIZE))
    }
  }, [whitelistData?.length, currentPage])

  const paginatedData = useMemo(() => {
    if (!whitelistData) return []
    return whitelistData.slice(
      PAGE_SIZE * (currentPage - 1),
      PAGE_SIZE * currentPage
    )
  }, [currentPage, whitelistData])

  return (
    <div>
      <Button
        size="compact"
        kind="secondary"
        onClick={() => {
          setIsModalOpen(true)
          setModalKey('add')
        }}
      >
        Add Stakers
      </Button>
      <Button
        onClick={() => {
          setIsModalOpen(true)
          setModalKey('remove')
        }}
        disabled={!selectedAddresses.length}
        size="compact"
        kind="secondary"
        overrides={{Root: {style: {marginLeft: '12px'}}}}
      >
        Remove Selected
      </Button>
      <TableBuilder
        data={paginatedData}
        isLoading={whitelistData === undefined}
        loadingMessage={<TableSkeleton />}
        emptyMessage="No Results"
        overrides={{
          Root: {
            style: {marginTop: '12px'},
          },
          TableLoadingMessage: {
            style: {
              padding: '10px 0',
            },
          },
        }}
      >
        <TableBuilderColumn
          overrides={{
            TableHeadCell: {style: {width: '1%'}},
            TableBodyCell: {style: {width: '1%'}},
          }}
          header={
            <Checkbox
              checked={Boolean(
                whitelistData?.length &&
                  selectedAddresses.length === whitelistData.length
              )}
              isIndeterminate={Boolean(
                whitelistData?.length &&
                  selectedAddresses.length &&
                  selectedAddresses.length < whitelistData.length
              )}
              onChange={toggleAll}
            />
          }
        >
          {(row: string) => (
            <Checkbox
              checked={selectedAddresses.includes(row)}
              onChange={() => {
                toggle(row)
              }}
            />
          )}
        </TableBuilderColumn>
        <TableBuilderColumn header="Staker Address">
          {(row: string) => row}
        </TableBuilderColumn>
      </TableBuilder>

      {whitelistData && (
        <Pagination
          totalCount={whitelistData.length}
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={onClose}
        overrides={{
          Dialog: {
            style: ({$theme}) => ({
              borderRadius: 0,
              borderWidth: '2px',
              borderColor: $theme.colors.accent,
              borderStyle: 'solid',
            }),
          },
        }}
      >
        {modalKey === 'add' && (
          <AddWhitelistModalBody pid={pid} onClose={onClose} />
        )}
        {modalKey === 'remove' && (
          <RemoveWhitelistModalBody
            pid={pid}
            addresses={selectedAddresses}
            onClose={onClose}
          />
        )}
      </Modal>
    </div>
  )
}

export default StakePoolWhitelist
