import usePolkadotApi from '@/hooks/usePolkadotApi'
import {useGlobalStateQuery} from '@/lib/subsquidQuery'
import {colors, montserrat} from '@/lib/theme'
import {type Chain, chainAtom, subsquidClientAtom} from '@/store/common'
import CircleIcon from '@mui/icons-material/Circle'
import {MenuItem, Select, Stack, Tooltip} from '@mui/material'
import {toCurrency} from '@phala/lib'
import {useQuery} from '@tanstack/react-query'
import {useAtom} from 'jotai'
import {type FC, useMemo} from 'react'
import Property from '../Property'

const ChainSelect: FC = () => {
  const api = usePolkadotApi()
  const [chain] = useAtom(chainAtom)
  const isKhala = chain === 'khala'

  const color = `${isKhala ? '#03ffff' : colors.main[400]} !important`
  const backgroundColor = isKhala ? '#1E565E' : colors.main[700]

  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data: globalStateData} = useGlobalStateQuery(
    subsquidClient,
    undefined,
    {select: (data) => data.globalStateById},
  )
  const subsquidHeight = globalStateData?.height
  const blockTime = globalStateData?.averageBlockTime
  const apiConnected = api?.isConnected
  const {data: chainHeight} = useQuery({
    queryKey: ['chainHeight', chain],
    queryFn: async () => {
      if (api == null) return null
      const lastHeader = await api.rpc.chain.getHeader()
      return lastHeader.number.toNumber()
    },
    refetchInterval: 3000,
  })
  const status: 'success' | 'warning' | 'error' = useMemo(() => {
    if (apiConnected === true) {
      if (
        subsquidHeight != null &&
        chainHeight != null &&
        chainHeight - subsquidHeight < 10
      ) {
        return 'success'
      }
      return 'warning'
    }

    return 'error'
  }, [apiConnected, chainHeight, subsquidHeight])

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
        const nextValue = e.target.value as Chain
        location.replace(`/${nextValue}`)
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
            {value === chain && (
              <Tooltip
                PopperProps={{
                  sx: {minWidth: 200},
                  onClick: (e) => {
                    e.stopPropagation()
                  },
                }}
                title={
                  <>
                    <Property label="API status" size="small" fullWidth>
                      {apiConnected === true ? 'Connected' : 'Disconnected'}
                    </Property>
                    <Property label="Backend height" size="small" fullWidth>
                      {subsquidHeight == null
                        ? '-'
                        : toCurrency(subsquidHeight)}
                    </Property>
                    <Property label="Chain height" size="small" fullWidth>
                      {chainHeight == null ? '-' : toCurrency(chainHeight)}
                    </Property>
                    <Property label="Block time" size="small" fullWidth>
                      {blockTime == null ? '-' : `${blockTime / 1000}s`}
                    </Property>
                  </>
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
