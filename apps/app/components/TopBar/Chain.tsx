import usePolkadotApi from '@/hooks/usePolkadotApi'
import {subsquidClient} from '@/lib/graphql'
import {useGlobalStateQuery} from '@/lib/subsquidQuery'
import {colors, montserrat} from '@/lib/theme'
import {chainAtom, type Chain} from '@/store/common'
import CircleIcon from '@mui/icons-material/Circle'
import {MenuItem, Select, Stack, Tooltip, Typography} from '@mui/material'
import {type VoidFn} from '@polkadot/api/types'
import {useAtom} from 'jotai'
import {useEffect, useMemo, useState, type FC} from 'react'

const ChainSelect: FC = () => {
  const api = usePolkadotApi()
  const [chain, setChain] = useAtom(chainAtom)
  const isKhala = chain === 'khala'
  const [currentHeight, setCurrentHeight] = useState<number>()

  const color = `${isKhala ? '#03ffff' : colors.main[400]} !important`
  const backgroundColor = isKhala ? '#1E565E' : colors.main[700]

  const {data: globalStateData} = useGlobalStateQuery(subsquidClient)
  const subsquidHeight = globalStateData?.squidStatus?.height
  const apiConnected = api?.isConnected

  useEffect(() => {
    if (api == null) {
      return
    }
    let unsubscribe: VoidFn

    void api.rpc.chain
      .subscribeNewHeads((header) => {
        setCurrentHeight(header.number.toNumber())
      })
      .then((_unsubscribe) => {
        unsubscribe = _unsubscribe
      })

    return () => {
      unsubscribe?.()
    }
  }, [api])

  const status: 'success' | 'warning' | 'error' = useMemo(() => {
    if (apiConnected === true) {
      if (
        subsquidHeight != null &&
        currentHeight != null &&
        currentHeight - subsquidHeight < 10
      ) {
        return 'success'
      }
      return 'warning'
    }

    return 'error'
  }, [apiConnected, subsquidHeight, currentHeight])

  return (
    <Select
      size="small"
      value={chain}
      sx={{
        textTransform: 'capitalize',
        fontFamily: montserrat.style.fontFamily,
        fontWeight: 600,
        color,
        backgroundColor,
        '& fieldset': {
          borderColor: color,
        },
      }}
      inputProps={{sx: {py: '6.5px'}}}
      onChange={(e) => {
        setChain(e.target.value as Chain)
      }}
    >
      {['khala', 'phala'].map((value) => (
        <MenuItem
          value={value}
          key={value}
          sx={{
            textTransform: 'capitalize',
            fontFamily: montserrat.style.fontFamily,
            fontWeight: 600,
            color: value === 'khala' ? '#03ffff' : colors.main[400],
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            {value === 'khala' && chain === 'khala' && (
              <Tooltip
                PopperProps={{
                  sx: {fontSize: '1rem!important'},
                  onClick: (e) => {
                    e.stopPropagation()
                  },
                }}
                title={
                  <Typography variant="body2" fontWeight="500" component="div">
                    API status:{' '}
                    {apiConnected === true ? 'Connected' : 'Disconnected'}
                    <br />
                    Indexer height: {subsquidHeight ?? '-'}
                    <br />
                    Blockchain height: {currentHeight ?? '-'}
                  </Typography>
                }
              >
                <CircleIcon color={status} sx={{width: 10}} />
              </Tooltip>
            )}
            <span>{value}</span>
          </Stack>
        </MenuItem>
      ))}
    </Select>
  )
}

export default ChainSelect
