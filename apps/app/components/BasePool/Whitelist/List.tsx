import WhitelistsIcon from '@/assets/whitelists.svg'
import Empty from '@/components/Empty'
import SectionHeader from '@/components/SectionHeader'
import WikiButton from '@/components/Wiki/Button'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {
  type BasePoolCommonFragment,
  useBasePoolWhitelistsConnectionQuery,
} from '@/lib/subsquidQuery'
import {theme} from '@/lib/theme'
import {subsquidClientAtom} from '@/store/common'
import {Button, Dialog, Stack, type Theme, ThemeProvider} from '@mui/material'
import {DataGrid, type GridColDef} from '@mui/x-data-grid'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import {type FC, useCallback, useMemo, useState} from 'react'
import AddWhitelist from './AddWhitelist'

interface RowModel {
  id: string
}

const columns: Array<GridColDef<RowModel>> = [
  {
    field: 'id',
    headerName: 'Address',
    flex: 1,
    sortable: false,
  },
]

const vaultTheme: Theme = {
  ...theme,
  palette: {...theme.palette, primary: theme.palette.secondary},
}

const WhitelistList: FC<{basePool: BasePoolCommonFragment}> = ({basePool}) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [account] = useAtom(polkadotAccountAtom)
  const isOwner = account?.address === basePool.owner.id
  const isVault = basePool.kind === 'Vault'
  const color = isVault ? 'secondary' : 'primary'
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const [selectedAddress, setSelectedAddress] = useState<string[]>([])
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data, isLoading} = useBasePoolWhitelistsConnectionQuery(
    subsquidClient,
    {orderBy: 'createTime_ASC', where: {basePool: {id_eq: basePool.id}}},
  )
  const rows = useMemo<RowModel[]>(() => {
    return (
      data?.basePoolWhitelistsConnection.edges.map(({node}) => {
        return {id: node.account.id}
      }) ?? []
    )
  }, [data])
  const removeSelected = (): void => {
    if (api == null || selectedAddress.length === 0) return
    const calls = selectedAddress.map((address) => {
      return api.tx.phalaBasePool.removeStakerFromWhitelist(
        basePool.id,
        address,
      )
    })
    void signAndSend(
      calls.length === 1 ? calls[0] : api.tx.utility.batch(calls),
    ).then(() => {
      setSelectedAddress([])
    })
  }

  const onClose = useCallback(() => {
    setDialogOpen(false)
  }, [])

  return (
    <>
      <SectionHeader
        title={<WikiButton entry="whitelist">Whitelist</WikiButton>}
        icon={<WhitelistsIcon />}
      >
        {isOwner && (
          <Stack direction="row" ml="auto" spacing={2}>
            {selectedAddress.length > 0 && (
              <Button color={color} onClick={removeSelected}>
                Remove
              </Button>
            )}
            <Button
              color={color}
              variant="contained"
              onClick={() => {
                setDialogOpen(true)
              }}
            >
              Add
            </Button>
          </Stack>
        )}
      </SectionHeader>
      <ThemeProvider theme={isVault ? vaultTheme : theme}>
        <DataGrid
          slots={{noRowsOverlay: () => <Empty />}}
          sx={{
            '&,.MuiDataGrid-columnHeaders,.MuiDataGrid-cell,.MuiDataGrid-footerContainer':
              {borderColor: theme.palette.divider},
            '.MuiDataGrid-cell,.MuiDataGrid-columnHeader': {
              outline: 'none!important',
            },
            '.MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator':
              {display: 'none'},
          }}
          loading={isLoading}
          rows={rows}
          initialState={{pagination: {paginationModel: {pageSize: 5}}}}
          columns={columns}
          pageSizeOptions={[5]}
          checkboxSelection={isOwner}
          rowSelectionModel={selectedAddress}
          onRowSelectionModelChange={(selection) => {
            setSelectedAddress(selection as string[])
          }}
          autoHeight
          disableColumnMenu
          disableColumnSelector
          disableColumnFilter
          disableRowSelectionOnClick
        />

        <Dialog open={dialogOpen} onClose={onClose}>
          <AddWhitelist pid={basePool.id} onClose={onClose} />
        </Dialog>
      </ThemeProvider>
    </>
  )
}

export default WhitelistList
