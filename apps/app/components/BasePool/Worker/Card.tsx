import WorkerIcon from '@/assets/worker.svg'
import PromiseButton from '@/components/PromiseButton'
import Property from '@/components/Property'
import WikiButton from '@/components/Wiki/Button'
import type {WorkerState} from '@/lib/subsquidQuery'
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import {toCurrency, toFixed} from '@phala/lib'
import {addDays, formatDuration, intervalToDuration, isAfter} from 'date-fns'
import {useSnackbar} from 'notistack'
import {type FC, type ReactNode, useMemo} from 'react'
import type {OnAction, Worker} from './List'

const workerStateColors = {
  Ready: '#5988FF',
  WorkerIdle: '#7EFF85',
  WorkerUnresponsive: '#FC5464',
  WorkerCoolingDown: '#FFDF64',
} satisfies Record<WorkerState, string>

const workerStateLabels = {
  Ready: 'Ready',
  WorkerIdle: 'Computing',
  WorkerUnresponsive: 'Unresponsive',
  WorkerCoolingDown: 'CoolingDown',
} satisfies Record<WorkerState, string>

const WorkerCard: FC<{
  worker: Worker
  isOwner: boolean
  onAction: OnAction
}> = ({worker, isOwner, onAction}) => {
  const theme = useTheme()
  const {enqueueSnackbar} = useSnackbar()
  const session = worker.session
  const entries = useMemo<Array<[string, ReactNode]>>(() => {
    if (session == null) return []
    return [
      ['Stake', `${toCurrency(session.stake)} PHA`],
      ['Cumulative rewards', `${toCurrency(session.totalReward)} PHA`],
      ['V', toFixed(session.v, 2)],
      ['Ve', toFixed(session.ve, 2)],
      ['P Instant', session.pInstant],
      ['P Initial', session.pInit],
    ]
  }, [session])
  const groups = 3
  const count = Math.ceil(entries.length / groups)

  const reclaimCountdown = useMemo(() => {
    if (worker.session?.coolingDownStartTime == null) return
    const start = new Date()
    const end = addDays(new Date(worker.session.coolingDownStartTime), 7)
    if (isAfter(start, end)) return
    return formatDuration(intervalToDuration({start, end}), {
      format: ['days', 'hours', 'minutes'],
    })
  }, [worker.session?.coolingDownStartTime])

  return (
    <Paper>
      <Stack direction="row" alignItems="center" p={2} spacing={2}>
        <Box color={theme.palette.text.secondary} width={48} flexShrink="0">
          <WorkerIcon css={{display: 'block'}} />
        </Box>
        <Box flex="1">
          <Typography
            color={theme.palette.primary.main}
            sx={{wordBreak: 'break-all', cursor: 'pointer'}}
            onClick={() => {
              void navigator.clipboard.writeText(worker.id)
              enqueueSnackbar('Copied to clipboard')
            }}
          >
            {worker.id}
          </Typography>
          <Stack
            maxWidth={580}
            direction={{xs: 'column', sm: 'row'}}
            mt={1}
            spacing={{xs: 0.5, sm: 3}}
          >
            {Array.from({length: groups}).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              <Stack flex={i > 0 ? 1 : 2} spacing={0.5} key={i}>
                {entries
                  .slice(i * count, (i + 1) * count)
                  .map(([label, value]: [string, ReactNode]) => (
                    <Property label={label} size="small" key={label} fullWidth>
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
        >
          {session != null && (
            <WikiButton entry="workerState">
              <Chip
                size="small"
                label={workerStateLabels[session.state]}
                sx={{color: workerStateColors[session.state]}}
              />
            </WikiButton>
          )}
          {session != null && (
            <Stack direction="row">
              {isOwner && session.state === 'Ready' && (
                <>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => {
                      void onAction(worker, 'start')
                    }}
                  >
                    Start
                  </Button>
                  <PromiseButton
                    variant="text"
                    size="small"
                    onClick={async () => {
                      await onAction(worker, 'remove')
                    }}
                  >
                    Remove
                  </PromiseButton>
                </>
              )}
              {isOwner &&
                (session.state === 'WorkerIdle' ||
                  session.state === 'WorkerUnresponsive') && (
                  <>
                    <PromiseButton
                      variant="text"
                      size="small"
                      onClick={async () => {
                        await onAction(worker, 'stop')
                      }}
                    >
                      Stop
                    </PromiseButton>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => {
                        void onAction(worker, 'changeStake')
                      }}
                    >
                      Change Stake
                    </Button>
                  </>
                )}
              {session.state === 'WorkerCoolingDown' && (
                <WikiButton entry="reclaimWorker">
                  <PromiseButton
                    disabled={Boolean(reclaimCountdown)}
                    variant="text"
                    size="small"
                    onClick={async () => {
                      await onAction(worker, 'reclaim')
                    }}
                  >
                    {reclaimCountdown ?? 'Reclaim'}
                  </PromiseButton>
                </WikiButton>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default WorkerCard
