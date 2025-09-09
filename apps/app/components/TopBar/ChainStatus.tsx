import {PHALA_ENDPOINTS, subsquidClient} from '@/config'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import {useGlobalStateQuery} from '@/lib/subsquidQuery'
import {selectedEndpointAtom} from '@/store/common'
import CircleIcon from '@mui/icons-material/Circle'
import {Button, ButtonGroup, Tooltip} from '@mui/material'
import {toCurrency} from '@phala/lib'
import {useQuery} from '@tanstack/react-query'
import {useAtom} from 'jotai'
import {type FC, useMemo} from 'react'
import Property from '../Property'

const ChainStatus: FC = () => {
  const api = usePolkadotApi()
  const [selectedEndpoint, setSelectedEndpoint] = useAtom(selectedEndpointAtom)

  const {data: globalStateData} = useGlobalStateQuery(
    subsquidClient,
    undefined,
    {select: (data) => data.globalStateById},
  )
  const subsquidHeight = globalStateData?.height
  const blockTime = globalStateData?.averageBlockTime
  const apiConnected = api?.isConnected
  const {data: chainHeight} = useQuery({
    queryKey: ['chainHeight'],
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

  const handleEndpointSelect = (endpoint: string) => {
    setSelectedEndpoint(endpoint)
  }

  const getEndpointDisplayName = (endpoint: string) => {
    if (endpoint.includes('dwellir.com')) return 'Dwellir'
    if (endpoint.includes('api.phala.network')) return 'Phala'
    if (endpoint.includes('onfinality.io')) return 'OnFinality'
    return endpoint
  }

  return (
    <>
      <Tooltip
        slotProps={{
          popper: {
            sx: {minWidth: 200},
            onClick: (e) => {
              e.stopPropagation()
            },
          },
        }}
        title={
          <>
            <Property label="API status" size="small" fullWidth>
              {apiConnected === true ? 'Connected' : 'Disconnected'}
            </Property>
            <Property label="Backend height" size="small" fullWidth>
              {subsquidHeight == null ? '-' : toCurrency(subsquidHeight)}
            </Property>
            <Property label="Chain height" size="small" fullWidth>
              {chainHeight == null ? '-' : toCurrency(chainHeight)}
            </Property>
            <Property label="Block time" size="small" fullWidth>
              {blockTime == null ? '-' : `${blockTime / 1000}s`}
            </Property>

            <ButtonGroup size="small" variant="outlined" sx={{py: 1}}>
              {PHALA_ENDPOINTS.map((endpoint) => (
                <Button
                  key={endpoint}
                  onClick={() => handleEndpointSelect(endpoint)}
                  variant={
                    endpoint === selectedEndpoint ? 'contained' : 'outlined'
                  }
                  sx={{
                    textTransform: 'none',
                    fontSize: '0.75rem',
                    px: 1,
                    // flex: 1,
                  }}
                >
                  {getEndpointDisplayName(endpoint)}
                </Button>
              ))}
            </ButtonGroup>
          </>
        }
      >
        <CircleIcon color={status} sx={{width: 10}} />
      </Tooltip>
    </>
  )
}

export default ChainStatus
