/* eslint-disable @typescript-eslint/naming-convention */
import {assets} from '@/config/common'
import useSolution from '@/hooks/useSolution'
import useCurrentTask from '@/hooks/useTaskStatus'
import {
  Box,
  Chip,
  CircularProgress,
  Link,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
  type PaperProps,
} from '@mui/material'
import {useMemo, type FC} from 'react'

const getUrl = (chain: string, hash: string): string => {
  let url = ''
  if (chain === 'Moonbeam') {
    url = 'https://moonbeam.moonscan.io/'
  } else if (chain === 'Phala') {
    url = 'https://phala.subscan.io/'
  } else if (chain === 'Astar' || chain === 'AstarEvm') {
    url = 'https://astar.subscan.io/'
  }
  return `${url}tx/${hash}`
}

const Solution: FC<PaperProps> = ({sx, ...props}) => {
  const theme = useTheme()
  const {data: solution, isLoading} = useSolution()
  const {data: taskStatus} = useCurrentTask()

  const activeStep = taskStatus?.executeIndex ?? 0

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
        label = `${source_chain} ${spendSymbol} -> ${dest_chain} ${receiveSymbol}`
      } else if (exe_type === 'swap') {
        label = `${spendSymbol} -> ${receiveSymbol} on ${exe}`
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
        isLoading ? (
          <CircularProgress sx={{mx: 'auto', display: 'block'}} />
        ) : (
          <Typography textAlign="center" variant="subtitle2">
            No solutions found
          </Typography>
        )
      ) : (
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>
                <Stack gap={1}>
                  {step.batch.map(({kind, label}) => (
                    <Stack direction="row" alignItems="center" key={label}>
                      <Chip
                        label={kind}
                        size="small"
                        sx={{mr: 1.5, textTransform: 'capitalize', width: 90}}
                        color={activeStep === index ? 'primary' : 'default'}
                      />
                      <Box whiteSpace="pre">{label}</Box>
                    </Stack>
                  ))}
                  {taskStatus?.executeTxs[index] != null && (
                    <Link
                      target="_blank"
                      href={getUrl(
                        step.sourceChain,
                        taskStatus.executeTxs[index],
                      )}
                    >
                      View on explorer
                    </Link>
                  )}
                </Stack>
              </StepLabel>
            </Step>
          ))}
          <Step>
            <StepLabel>
              <Chip
                label="Completed"
                size="small"
                sx={{mr: 1.5, textTransform: 'capitalize', width: 90}}
                color={activeStep === steps.length ? 'primary' : 'default'}
              />
            </StepLabel>
          </Step>
        </Stepper>
      )}
    </Paper>
  )
}

export default Solution
