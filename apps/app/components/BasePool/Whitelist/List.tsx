import WhitelistsIcon from '@/assets/whitelists.svg'
import Empty from '@/components/Empty'
import SectionHeader from '@/components/SectionHeader'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {subsquidClient} from '@/lib/graphql'
import {
  BasePoolCommonFragment,
  useBasePoolWhitelistsConnectionQuery,
} from '@/lib/subsquidQuery'
import {theme} from '@/lib/theme'
import {Button, Dialog, Stack, Theme, ThemeProvider} from '@mui/material'
import {DataGrid, GridColDef} from '@mui/x-data-grid'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import dynamic from 'next/dynamic'
import {FC, useCallback, useMemo, useState} from 'react'

const AddWhitelist = dynamic(() => import('./AddWhitelist'))

type RowModel = {id: string}

const columns: GridColDef<RowModel>[] = [
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
  const {data, isLoading} = useBasePoolWhitelistsConnectionQuery(
    subsquidClient,
    {orderBy: 'createTime_ASC', where: {basePool: {id_eq: basePool.id}}}
  )
  const rows = useMemo<RowModel[]>(() => {
    return (
      data?.basePoolWhitelistsConnection.edges.map(({node}) => {
        return {id: node.account.id}
      }) ?? []
    )
  }, [data])
  const removeSelected = () => {
    if (!api || !selectedAddress.length) return
    const calls = selectedAddress.map((address) => {
      return api.tx.phalaBasePool.removeStakerFromWhitelist(
        basePool.id,
        address
      )
    })
    signAndSend(
      calls.length === 1 ? calls[0] : api.tx.utility.batch(calls)
    ).then(() => {
      setSelectedAddress([])
    })
  }

  const onClose = useCallback(() => {
    setDialogOpen(false)
  }, [])

  return (
    <>
      <SectionHeader title="Whitelist" icon={<WhitelistsIcon />}>
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
              onClick={() => setDialogOpen(true)}
            >
              Add
            </Button>
          </Stack>
        )}
      </SectionHeader>
      <ThemeProvider theme={isVault ? vaultTheme : theme}>
        <DataGrid
          components={{
            NoRowsOverlay: () => <Empty />,
          }}
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
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={isOwner}
          selectionModel={selectedAddress}
          onSelectionModelChange={(selection) => {
            setSelectedAddress(selection as string[])
          }}
          autoHeight
          disableColumnMenu
          disableColumnSelector
          disableColumnFilter
          disableSelectionOnClick
        />

        <Dialog open={dialogOpen} onClose={onClose}>
          <AddWhitelist pid={basePool.id} onClose={onClose} />
        </Dialog>
      </ThemeProvider>
    </>
  )
}

export default WhitelistList
