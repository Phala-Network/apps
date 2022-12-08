import WorkerIcon from '@/assets/worker.svg'
import PromiseButton from '@/components/PromiseButton'
import Property from '@/components/Property'
import {WorkerState} from '@/lib/subsquidQuery'
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import {toCurrency, toFixed} from '@phala/util'
import {addDays, formatDuration, intervalToDuration, isAfter} from 'date-fns'
import {FC, ReactNode, useMemo} from 'react'
import {OnAction, Worker} from './List'

const workerStateColors: Record<WorkerState, string> = {
  Ready: '#5988FF',
  WorkerIdle: '#7EFF85',
  WorkerUnresponsive: '#FC5464',
  WorkerCoolingDown: '#FFDF64',
}

const workerStateLabels: Record<WorkerState, string> = {
  Ready: 'Ready',
  WorkerIdle: 'Computing',
  WorkerUnresponsive: 'Unresponsive',
  WorkerCoolingDown: 'CoolingDown',
}

const WorkerCard: FC<{
  worker: Worker
  isOwner: boolean
  onAction: OnAction
}> = ({worker, isOwner, onAction}) => {
  const theme = useTheme()
  const session = worker.session
  const entries = useMemo<[string, ReactNode][]>(() => {
    if (!session) return []
    return [
      ['Stake', `${toCurrency(session.stake)} PHA`],
      ['Reward', `${toCurrency(session.totalReward)} PHA`],
      ['V', toFixed(session.v, 2)],
      ['Ve', toFixed(session.ve, 2)],
      ['P Instant', session.pInstant],
      ['P Initial', session.pInit],
    ]
  }, [session])
  const groups = 3
  const count = Math.ceil(entries.length / groups)

  const reclaimCountdown = useMemo(() => {
    if (!worker.session?.coolingDownStartTime) return
    const start = new Date()
    const end = addDays(new Date(worker.session.coolingDownStartTime), 7)
    if (isAfter(start, end)) return
    return formatDuration(intervalToDuration({start, end}), {
      format: ['d', 'h', 'm'],
    })
  }, [worker.session?.coolingDownStartTime])

  return (
    <Paper>
      <Stack direction="row" alignItems="center" p={2} spacing={2}>
        <Box color={theme.palette.text.secondary} width={48} flexShrink="0">
          <WorkerIcon css={{display: 'block'}} />
        </Box>
        <Box>
          <Typography
            color={theme.palette.primary.main}
            sx={{wordBreak: 'break-all'}}
          >
            {worker.id}
          </Typography>
          <Stack
            width={580}
            direction={{xs: 'column', sm: 'row'}}
            mt={1}
            spacing={{xs: 0.5, sm: 3}}
          >
            {Array.from({length: groups}).map((_, i) => (
              <Stack flex="1 0" spacing={0.5} key={i}>
                {entries
                  .slice(i * count, (i + 1) * count)
                  .map(([label, value]: [string, ReactNode]) => (
                    <Property
                      label={label}
                      size="small"
                      key={label}
                      sx={{justifyContent: 'space-between'}}
                    >
                      {value}
                    </Property>
                  ))}
              </Stack>
            ))}
          </Stack>
        </Box>
        <Stack
          alignItems="flex-end"
          justifyContent="space-between"
          alignSelf="stretch"
          flex="1 0"
        >
          {session && (
            <Chip
              size="small"
              label={workerStateLabels[session.state]}
              sx={{color: workerStateColors[session.state]}}
            />
          )}
          {isOwner && session && (
            <Stack direction="row">
              {session.state === 'Ready' && (
                <>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => onAction(worker, 'start')}
                  >
                    Start
                  </Button>
                  <PromiseButton
                    variant="text"
                    size="small"
                    onClick={() => onAction(worker, 'remove')}
                  >
                    Remove
                  </PromiseButton>
                </>
              )}
              {(session.state === 'WorkerIdle' ||
                session.state === 'WorkerUnresponsive') && (
                <>
                  <PromiseButton
                    variant="text"
                    size="small"
                    onClick={() => onAction(worker, 'stop')}
                  >
                    Stop
                  </PromiseButton>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => onAction(worker, 'changeStake')}
                  >
                    Change Stake
                  </Button>
                </>
              )}
              {session.state === 'WorkerCoolingDown' && (
                <PromiseButton
                  disabled={Boolean(reclaimCountdown)}
                  variant="text"
                  size="small"
                  onClick={() => onAction(worker, 'reclaim')}
                >
                  {reclaimCountdown || 'Reclaim'}
                </PromiseButton>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default WorkerCard
