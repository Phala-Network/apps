import {useBalance} from '@/hooks/useBalance'
import {
  destinationAccountAtom,
  fromAmountAtom,
  fromAssetAtom,
  fromChainAtom,
  solutionStringAtom,
  toAssetAtom,
  toChainAtom,
} from '@/store/core'
import {evmAccountAtom} from '@/store/ethers'
import Send from '@mui/icons-material/Send'
import {LoadingButton} from '@mui/lab'
import {
  Box,
  Button,
  Collapse,
  Unstable_Grid2 as Grid,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {toCurrency} from '@phala/util'
import {useAtom} from 'jotai'
import {useCallback, useEffect, useState, type FC} from 'react'
import useSWRMutation from 'swr/mutation'
import wretch from 'wretch'
import Action from './Body/Action'
import Confirmation from './Confirmation'
import Progress from './Progress'

const api = wretch('https://index-gpt-server.vercel.app', {mode: 'cors'})
  .errorType('json')
  .resolve(async (r) => await r.json())

const tips: string[] = [
  'Send 100 PHA from Khala to Phala',
  'Swap 0.1 ETH on Ethereum to GLMR and send it to AstarEvm',
  'Send 10 GLMR from Moonbeam to AstarEvm',
]

async function apiFetcher(
  url: string,
  {arg}: {arg: string},
): Promise<{
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

const GPT: FC = () => {
  const [fromChain, setFromChain] = useAtom(fromChainAtom)
  const [toChain, setToChain] = useAtom(toChainAtom)
  const [, setFromAmount] = useAtom(fromAmountAtom)
  const [fromAsset, setFromAsset] = useAtom(fromAssetAtom)
  const [, setToAsset] = useAtom(toAssetAtom)
  const [, setSolutionString] = useAtom(solutionStringAtom)
  const [message, setMessage] = useState('')
  const [evmAccount] = useAtom(evmAccountAtom)
  const [, setDestinationAccount] = useAtom(destinationAccountAtom)
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const {data, trigger, isMutating, reset} = useSWRMutation(
    '/api/extract-params',
    apiFetcher,
  )

  const balance = useBalance()

  const resetStore = useCallback(() => {
    setFromChain('')
    setToChain('')
    setFromAsset('')
    setToAsset('')
    setFromAmount('')
    setSolutionString('')
  }, [
    setFromAmount,
    setFromAsset,
    setFromChain,
    setSolutionString,
    setToAsset,
    setToChain,
  ])

  useEffect(() => {
    resetStore()
  }, [resetStore])

  useEffect(() => {
    if (data?.solution == null) {
      setSolutionString('')
    } else {
      const x = []
      for (const {from, to, ...rest} of data.solution) {
        x.push({...rest})
      }
      setSolutionString(JSON.stringify(x))
    }
  }, [data, setSolutionString])

  const fromNativeChain =
    fromChain?.chainType === 'Sub' &&
    fromChain?.nativeAsset === fromAsset?.location

  useEffect(() => {
    if (data != null) {
      const {params} = data
      setFromChain(params.sourceChain)
      setToChain(params.destChain)
      setFromAsset(`${params.sourceChain}-${params.spendAsset}`)
      setToAsset(`${params.destChain}-${params.receiveAsset}`)
      setFromAmount(params.amount)
    }
  }, [data, setFromChain, setFromAmount, setFromAsset, setToChain, setToAsset])

  useEffect(() => {
    if (
      data != null &&
      fromChain != null &&
      toChain != null &&
      fromChain.chainType === toChain.chainType
    ) {
      if (data.params.recipient != null) {
        setDestinationAccount(data.params.recipient)
      } else if (fromChain.chainType === 'Evm' && evmAccount != null) {
        setDestinationAccount(evmAccount)
      } else if (fromChain.chainType === 'Sub' && polkadotAccount != null) {
        setDestinationAccount(polkadotAccount.address)
      }
    }
  }, [
    data,
    evmAccount,
    fromChain,
    polkadotAccount,
    setDestinationAccount,
    toChain,
  ])

  return (
    <Stack alignItems="center" mt={4}>
      <TextField
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            void trigger(message)
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
        autoFocus
        placeholder="What can I do for you?"
        variant="standard"
        sx={{width: '100%'}}
        InputProps={{
          disableUnderline: false,
          endAdornment: (
            <LoadingButton
              onClick={() => {
                void trigger(message)
              }}
              variant="text"
              type="submit"
              disabled={isMutating || message === ''}
              loading={isMutating}
            >
              <Send />
            </LoadingButton>
          ),
        }}
        inputProps={{
          sx: {textAlign: 'center', fontSize: '2em', lineHeight: 1.5},
        }}
      ></TextField>

      {data == null && !isMutating && (
        <Grid container spacing={1.5} color="#555" mt={3} width={1}>
          {tips.map((text, index) => (
            <Grid xs={12} md={6} key={index}>
              <Button
                fullWidth
                color="inherit"
                size="small"
                sx={{py: 1}}
                onClick={() => {
                  setMessage(text)
                }}
              >
                {text}
              </Button>
            </Grid>
          ))}
        </Grid>
      )}

      <Collapse sx={{width: '100%', mt: 6}} in={data != null}>
        <Stack
          direction={{sm: 'column', md: 'row'}}
          alignItems={{sm: 'center', md: 'flex-start'}}
          spacing={3}
        >
          <Paper sx={{p: 3, flex: 1, width: {sm: '100%'}}}>
            <Confirmation></Confirmation>
            <Typography
              variant="caption"
              textAlign="right"
              fontWeight="500"
              mt={2}
              component="div"
            >
              {fromNativeChain ? 'Transferrable' : 'Balance'}:{' '}
              {balance != null ? (
                `${toCurrency(balance)} ${fromAsset?.symbol}`
              ) : (
                <Skeleton sx={{display: 'inline-block'}} width={64} />
              )}
            </Typography>

            <Box mt={2}>
              <Action />
            </Box>
          </Paper>
          <Progress sx={{flex: 1, width: {sm: '100%'}}} />
        </Stack>
      </Collapse>
    </Stack>
  )
}

export default GPT
