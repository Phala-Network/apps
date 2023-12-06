'use client'
import {typeformAtom} from '@/store/core'
import {ArrowUpward, PlayArrow, Replay} from '@mui/icons-material'
import {LoadingButton} from '@mui/lab'
import {
  Box,
  Button,
  Fade,
  Link,
  List,
  ListItemButton,
  Paper,
  Slide,
  Stack,
  TextField,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material'
import {useAtom} from 'jotai'
import {useEffect, useState, type FC} from 'react'
import useSWRMutation from 'swr/mutation'
import wretch from 'wretch'
import Confirmation from './Confirmation'
import Progress from './Progress'

const track = (input: string, source: 'preset' | 'custom'): void => {
  if (window.dataLayer == null) return
  window.dataLayer.push({
    event: 'submit_intent',
    intentValue: input,
    intentSource: source,
  })
}

const api = wretch('https://index-gpt-server.vercel.app', {mode: 'cors'})
  .errorType('json')
  .resolve(async (r) => await r.json())

const tips: string[] = [
  'Swap 10 ETH from Ethereum to SOL on Solana',
  'Bridge 1 MATIC from Polygon back to Ethereum',
  'Swap 1 ETH from Ethereum to DOT on Polkadot',
  'Send 100 PHA from Khala to Phala',
]

async function apiFetcher(
  url: string,
  {arg}: {arg: string},
): Promise<{
  call: 'cross_chain_swap' | 'staking'
  params: {
    sourceChain: string
    destChain: string
    spendAsset: string
    receiveAsset: string
    amount: string
    recipient: string
  }
  solution: any[]
}> {
  const res = await api.url(url).post({message: arg})
  return res as any
}

const HomeDemo: FC = () => {
  const [typefrom] = useAtom(typeformAtom)
  const [fromChain, setFromChain] = useState<string>()
  const [toChain, setToChain] = useState<string>()
  const [fromAmount, setFromAmount] = useState<string>()
  const [fromAsset, setFromAsset] = useState<string>()
  const [toAsset, setToAsset] = useState<string>()
  const [message, setMessage] = useState('')
  // const [destinationAccount, setDestinationAccount] = useState()
  const {data, trigger, isMutating, reset} = useSWRMutation(
    '/api/extract-params',
    apiFetcher,
  )
  useEffect(() => {
    if (data != null && data.call === 'cross_chain_swap') {
      const {params} = data
      setFromChain(params.sourceChain)
      setToChain(params.destChain)
      setFromAsset(`${params.sourceChain}-${params.spendAsset}`)
      setToAsset(`${params.destChain}-${params.receiveAsset}`)
      setFromAmount(params.amount)
    }
  }, [data])

  return (
    <Stack alignItems="center" height={1}>
      <Box flex={1} width={1} overflow="auto">
        <Fade in={data == null && !isMutating} unmountOnExit>
          <Stack height={1}>
            <Stack flex={1}>
              <Typography variant="h5" sx={{mt: 'auto', mb: 2, ml: 1.5}}>
                Start with a recommendation
              </Typography>
            </Stack>
            <List>
              {tips.map((text, index) => (
                <ListItemButton
                  key={index}
                  sx={(theme) => ({
                    py: 2,
                    mt: 2,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.action.hover, 0.02),
                  })}
                  onClick={() => {
                    setMessage(text)
                    void trigger(text)
                    track(text, 'preset')
                  }}
                >
                  {text}
                </ListItemButton>
              ))}
            </List>
          </Stack>
        </Fade>
        <Slide
          direction="up"
          exit={false}
          in={data != null}
          unmountOnExit
          mountOnEnter
        >
          <Stack alignItems="center" spacing={3}>
            {data?.call === 'cross_chain_swap' && (
              <Paper sx={{p: 2, width: 1}}>
                <Confirmation
                  fromChain={fromChain}
                  fromAmount={fromAmount}
                  fromAsset={fromAsset}
                  toChain={toChain}
                  toAsset={toAsset}
                  sx={{w: 1}}
                ></Confirmation>
              </Paper>
            )}
            <Progress solution={data?.solution} />
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              justifyContent="center"
              mt={3}
            >
              <Tooltip title="Currently in closed beta, will be available soon">
                <span>
                  <Button disabled startIcon={<PlayArrow />}>
                    Execute
                  </Button>
                </span>
              </Tooltip>
              <Button
                onClick={() => {
                  setMessage('')
                  reset()
                }}
                startIcon={<Replay />}
              >
                Try another
              </Button>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {`Share your thoughts on inDEX by `}
              <Link
                color="inherit"
                component="span"
                sx={{cursor: 'pointer'}}
                onClick={() => {
                  typefrom.survey.open()
                }}
              >
                taking a quick survey
              </Link>
              .
            </Typography>
          </Stack>
        </Slide>
      </Box>

      <TextField
        sx={{mt: 3}}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            void trigger(message)
            track(message, 'custom')
          }
        }}
        multiline
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)
          if (e.target.value === '') {
            reset()
          }
        }}
        disabled={isMutating}
        name="message"
        placeholder="Or type your intent here"
        fullWidth
        helperText="Tips: try Ethereum, Solana, Cosmos, Avalanche, BNBChain, Near, Arbitrum, Polygon, Gnosis, and Starknet."
        InputProps={{
          endAdornment: (
            <LoadingButton
              onClick={() => {
                void trigger(message)
                track(message, 'custom')
              }}
              variant="text"
              type="submit"
              disabled={isMutating || message === ''}
              loading={isMutating}
              sx={{p: 0, minWidth: 0}}
            >
              <ArrowUpward />
            </LoadingButton>
          ),
        }}
      ></TextField>
    </Stack>
  )
}

export default HomeDemo
