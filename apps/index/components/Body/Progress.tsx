/* eslint-disable @typescript-eslint/naming-convention */
import {assets} from '@/config/common'
import useCurrentTask from '@/hooks/useTaskStatus'
import {currentTaskAtom, solutionAtom} from '@/store/core'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  Chip,
  CircularProgress,
  Link,
  Paper,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
  type PaperProps,
} from '@mui/material'
import {useAtom} from 'jotai'
import {useMemo, type FC} from 'react'

const getUrl = (chain: string, hash: string): string => {
  const map: Record<string, string> = {
    Moonbeam: 'https://moonbeam.moonscan.io',
    Phala: 'https://phala.subscan.io',
    Ethereum: 'https://etherscan.io',
    Goerli: 'https://goerli.etherscan.io',
    Astar: 'https://astar.subscan.io',
    AstarEvm: 'https://astar.subscan.io',
  }

  return `${map[chain]}/tx/${hash}`
}

const ExplorerLink: FC<{chain?: string; hash?: string}> = ({chain, hash}) => {
  if (hash == null || chain == null) return null
  return (
    <Link
      target="_blank"
      href={getUrl(chain, hash)}
      fontSize="caption.fontSize"
    >
      <Stack direction="row" alignItems="center" gap={0.5}>
        <span>View</span>
        <OpenInNewIcon fontSize="inherit" />
      </Stack>
    </Link>
  )
}

const activeProps = {
  StepIconComponent: () => <CircularProgress size={24} />,
}

const Progress: FC<PaperProps> = ({sx, ...props}) => {
  const theme = useTheme()
  const [solution] = useAtom(solutionAtom)
  const [currentTask] = useAtom(currentTaskAtom)
  const {data: taskStatus} = useCurrentTask()

  const activeStep = useMemo(() => {
    let value = 0
    if (taskStatus != null) {
      value = taskStatus.executeIndex + 1
      if ('completed' in taskStatus.status) {
        value += 2
      }
    }
    return value
  }, [taskStatus])

  const steps = useMemo(() => {
    if (solution == null) return null
    const result: Array<{
      batch: Array<{label: string; kind: string}>
      sourceChain: string
    }> = []
    for (let i = 0; i < solution.length; i++) {
      const {
        exe_type,
        exe,
        source_chain,
        dest_chain,
        spend_asset,
        receive_asset,
      } = solution[i]
      const prevStep = result.at(-1)

      let label = ''
      const getSymbol = (chain: string, location: string): string =>
        assets.find((x) => x.chainId === chain && x.location === location)
          ?.symbol ?? ''

      const spendSymbol = getSymbol(source_chain, spend_asset)
      const receiveSymbol = getSymbol(dest_chain, receive_asset)
      if (exe_type === 'bridge') {
        label = `${spendSymbol} -> ${dest_chain} ${receiveSymbol}`
      } else if (exe_type === 'swap') {
        label = `${spendSymbol} -> ${receiveSymbol} on ${exe.replaceAll(
          '_',
          ' ',
        )}`
      }

      const step = {kind: exe_type, label}
      if (prevStep != null && prevStep.sourceChain === source_chain) {
        prevStep.batch.push(step)
      } else {
        result.push({
          sourceChain: source_chain,
          batch: [step],
        })
      }
    }
    return result
  }, [solution])

  return (
    <Paper
      sx={[
        {
          p: 2,
          background: theme.palette.action.hover,
          border: 'none',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {steps == null ? (
        <Typography textAlign="center" variant="subtitle2">
          Solution is invalid
        </Typography>
      ) : (
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel
              {...(activeStep === 0 && currentTask != null && activeProps)}
            >
              <Stack spacing={1} direction="row" alignItems="baseline">
                <Chip
                  label="Initialize"
                  size="small"
                  sx={{textTransform: 'capitalize', width: 90}}
                  color={activeStep === 0 ? 'primary' : 'default'}
                />
                <ExplorerLink
                  chain={currentTask?.fromChainId}
                  hash={currentTask?.hash}
                />
              </Stack>
            </StepLabel>
          </Step>
          {steps.map((step, index) => {
            const isActive = activeStep === index + 1
            return (
              <Step key={index} expanded>
                <StepLabel {...(isActive && activeProps)}>
                  <Stack spacing={1} direction="row" alignItems="baseline">
                    <Chip
                      label={step.sourceChain}
                      size="small"
                      sx={{textTransform: 'capitalize', width: 90}}
                      color={isActive ? 'primary' : 'default'}
                    />

                    <ExplorerLink
                      chain={step.sourceChain}
                      hash={taskStatus?.executeTxs[index]}
                    />
                  </Stack>
                </StepLabel>
                <StepContent>
                  {step.batch.map(({kind, label}) => (
                    <Stack direction="row" alignItems="baseline" key={label}>
                      <Typography
                        width={55}
                        variant="subtitle2"
                        textTransform="capitalize"
                      >
                        {kind}
                      </Typography>
                      <Typography variant="caption" whiteSpace="pre">
                        {label}
                      </Typography>
                    </Stack>
                  ))}
                </StepContent>
              </Step>
            )
          })}
          <Step>
            <StepLabel>
              <Chip
                label="Completed"
                size="small"
                sx={{textTransform: 'capitalize', width: 90}}
                color={activeStep > steps.length ? 'primary' : 'default'}
              />
            </StepLabel>
          </Step>
        </Stepper>
      )}
    </Paper>
  )
}

export default Progress
