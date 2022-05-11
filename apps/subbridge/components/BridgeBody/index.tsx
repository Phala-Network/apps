import {ALL_FROM_CHAINS, BRIDGES} from '@/config/bridge'
import {ChainId} from '@/config/chain'
import {
  amountAtom,
  destinationAccountAtom,
  fromChainAtom,
  toChainAtom,
} from '@/store/bridge'
import {ArrowDownward, ArrowForward} from '@mui/icons-material'
import {Box, Collapse, IconButton, Paper, Stack, useTheme} from '@mui/material'
import {BoxProps} from '@mui/system'
import {useAtom, useAtomValue} from 'jotai'
import {FC, useEffect, useRef, useState} from 'react'
import Action from './Action'
import AmountInput from './AmountInput'
import ChainSelect from './ChainSelect'
import DestinationAccountInput from './DestinationAccountInput'
import ExtraInfo from './Extra'

const getToChainIds = (fromChainId: ChainId): ChainId[] =>
  BRIDGES.filter((bridge) => bridge.fromChain === fromChainId).map(
    (bridge) => bridge.toChain
  )

const BridgeBody: FC<BoxProps> = (props) => {
  const theme = useTheme()
  const [amount, setAmount] = useAtom(amountAtom)
  const [fromChain, setFromChain] = useAtom(fromChainAtom)
  const [toChain, setToChain] = useAtom(toChainAtom)
  const [toChainIds, setToChainIds] = useState<ChainId[]>(
    getToChainIds(fromChain.id)
  )
  const prevFromChainId = useRef<ChainId>(fromChain.id)
  const prevToChainId = useRef<ChainId>(toChain.id)
  const destinationAccount = useAtomValue(destinationAccountAtom)

  useEffect(() => {
    setAmount('')
    const newToChainIds = getToChainIds(fromChain.id)
    setToChainIds(newToChainIds)
    if (!newToChainIds.includes(prevToChainId.current)) {
      if (
        fromChain.id === prevToChainId.current &&
        newToChainIds.includes(prevFromChainId.current)
      ) {
        setToChain(prevFromChainId.current)
      } else {
        setToChain(newToChainIds[0])
      }
    }
  }, [setToChain, fromChain.id, setAmount])

  // Mare sure ref update is at last
  useEffect(() => {
    prevFromChainId.current = fromChain.id
  }, [fromChain.id])
  useEffect(() => {
    prevToChainId.current = toChain.id
  }, [toChain.id])

  const handleSwitchChain = () => {
    setFromChain(toChain.id)
  }

  return (
    <Box {...props}>
      <Paper
        sx={{
          mx: 'auto',
          p: 3,
          pt: 4,
        }}
      >
        <Stack direction="column" spacing={6}>
          <Stack
            direction={{xs: 'column', sm: 'row'}}
            spacing={1}
            sx={{width: 1, alignItems: 'center'}}
          >
            <ChainSelect
              fullWidth
              label="From"
              value={fromChain.id}
              chainIds={ALL_FROM_CHAINS}
              onChange={(e) => {
                setFromChain(e.target.value as ChainId)
              }}
            />

            <IconButton onClick={handleSwitchChain}>
              <ArrowForward
                sx={{[theme.breakpoints.down('sm')]: {display: 'none'}}}
              />
              <ArrowDownward
                sx={{[theme.breakpoints.up('sm')]: {display: 'none'}}}
              />
            </IconButton>

            <ChainSelect
              fullWidth
              label="To"
              chainIds={toChainIds}
              value={toChain.id}
              onChange={(e) => {
                setToChain(e.target.value as ChainId)
              }}
            />
          </Stack>

          <AmountInput />

          <DestinationAccountInput />

          <Box sx={{width: 1}}>
            <Collapse in={Boolean(amount) && Boolean(destinationAccount)}>
              <ExtraInfo sx={{mb: 3}} />
            </Collapse>
            <Action />
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}

export default BridgeBody
