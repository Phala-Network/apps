import {ASSETS} from '@/config/asset'
import {CHAINS, type Chain} from '@/config/chain'
import {assetAtom, bridgeInfoAtom, fromChainAtom} from '@/store/bridge'
import {evmAccountAtom} from '@/store/ethers'
import {
  AccessTime,
  ArrowForward,
  CheckCircleOutline,
  ErrorOutline,
} from '@mui/icons-material'
import {
  Box,
  type BoxProps,
  Divider,
  Link,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import {toCurrency, transformSs58Format} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import {formatDistanceToNowStrict} from 'date-fns'
import {useAtom} from 'jotai'
import {type FC, useMemo} from 'react'
import useSWR from 'swr'

type Resource = {
  id: string
  type: string
}

type Domain = {
  id: number
  name: 'ethereum' | 'phala' | 'khala'
  lastIndexedBlock: string
}

type Deposit = {
  txHash: string
  blockNumber: string
  depositData: string
  timestamp: string | null
  handlerResponse: string
}

type Execution = {
  txHash: string
  timestamp: string | null
  blockNumber: string
}

type Account = {
  addressStatus: string
}

type Fee = {
  id: string
  amount: string
  tokenAddress: string
  tokenSymbol: string
  resourceID: string | null
  transferId: string
}

type Transfer = {
  id: string
  depositNonce: number
  resourceID: string | null
  fromDomainId: number
  toDomainId: number | null
  destination: string | null
  amount: string | null
  status: TransferStatus
  accountId: string | null
  message: string | null
  usdValue: number | null

  resource: Resource | null
  fromDomain: Domain
  toDomain: Domain | null
  fee: Fee | null
  deposit: Deposit | null
  execution: Execution | null
  account: Account | null

  distance: string | null
}

type TransferStatus = 'pending' | 'executed' | 'failed'

const ChainLabel: FC<{chain: Chain}> = ({chain: {icon, name}}) => {
  return (
    <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
      <img
        css={{flex: 'none', width: 16, height: 16, display: 'block'}}
        src={icon}
        alt={name}
      />
      <Typography
        variant="body2"
        component="span"
        sx={{
          display: ['none', 'block'],
          ml: 1,
          lineHeight: 1,
        }}
      >
        {name}
      </Typography>
    </Box>
  )
}

const BridgeHistory: FC<BoxProps> = (props) => {
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const [evmAccount] = useAtom(evmAccountAtom)
  const [bridgeInfo] = useAtom(bridgeInfoAtom)
  const [fromChain] = useAtom(fromChainAtom)
  const [asset] = useAtom(assetAtom)

  const account = useMemo(() => {
    if (fromChain.kind === 'evm') {
      return evmAccount
    }
    if (polkadotAccount?.address != null) {
      return transformSs58Format(polkadotAccount.address, 30)
    }
    return null
  }, [fromChain, evmAccount, polkadotAccount])

  const {data} = useSWR(
    account ? ['bridgeHistory', account] : null,
    async ([_, account]) => {
      const url = new URL(
        `https://subsquid.phala.network/sygma-explorer/sender/${account}/transfers`,
      )
      url.searchParams.set('page', '1')
      url.searchParams.set('limit', '5')
      const json = (await fetch(url.toString()).then((res) =>
        res.json(),
      )) as Transfer[]

      return json.map((transfer) => {
        const timestamp = transfer.deposit?.timestamp
        const distance =
          timestamp &&
          formatDistanceToNowStrict(timestamp, {addSuffix: true, unit: 'day'})
        const amount = transfer.amount && toCurrency(transfer.amount, 12)

        return {
          ...transfer,
          distance,
          amount,
        }
      })
    },
    {refreshInterval: 3000},
  )

  if (
    bridgeInfo.kind !== 'evmSygma' &&
    bridgeInfo.kind !== 'phalaSygma' &&
    asset.id !== 'pha'
  ) {
    return null
  }

  if (data == null || data.length === 0) {
    return null
  }

  return (
    <Box {...props}>
      <Paper sx={{mx: 'auto', p: 3}}>
        {/* <Typography variant="subtitle1">Recent transactions</Typography> */}
        <Stack spacing={2} divider={<Divider flexItem />}>
          {data.map((transfer) => {
            const txHash = transfer.deposit?.txHash
            const fromChain = CHAINS[transfer.fromDomain.name]
            const toDomainName = transfer.toDomain?.name
            const toChain = toDomainName ? CHAINS[toDomainName] : null
            const explorerURL = fromChain.explorerURL
            let href = ''
            if (explorerURL != null && txHash != null) {
              href = new URL(`/tx/${txHash}`, explorerURL).toString()
            }
            const {symbol} = ASSETS.pha
            if (toChain == null) {
              return null
            }

            return (
              <Stack
                component="a"
                href={href}
                target="_blank"
                color="inherit"
                direction="row"
                alignItems="center"
                key={transfer.id}
                sx={{mb: 2, textDecoration: 'none'}}
              >
                {transfer.status === 'executed' && (
                  <CheckCircleOutline color="success" fontSize="small" />
                )}
                {transfer.status === 'failed' && (
                  <ErrorOutline color="error" fontSize="small" />
                )}
                {transfer.status === 'pending' && (
                  <AccessTime color="warning" fontSize="small" />
                )}
                <Stack direction="row" alignItems="center" flex={1} ml={1}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ChainLabel chain={fromChain} />
                    <ArrowForward
                      sx={(theme) => ({
                        color: theme.palette.text.secondary,
                        fontSize: 16,
                      })}
                    />
                    <ChainLabel chain={toChain} />
                  </Stack>
                  <Typography variant="body2" fontWeight={600} ml={2}>
                    {transfer.amount} {symbol}
                  </Typography>
                </Stack>
                <Tooltip title={transfer.deposit?.timestamp} placement="top">
                  <Typography
                    variant="body2"
                    sx={(theme) => ({color: theme.palette.text.secondary})}
                  >
                    {transfer.distance}
                  </Typography>
                </Tooltip>
              </Stack>
            )
          })}
        </Stack>
      </Paper>
    </Box>
  )
}

export default BridgeHistory
