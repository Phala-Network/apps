'use client'
/* eslint-disable @typescript-eslint/naming-convention */
import {currentTaskAtom, fromChainAtom, typeformAtom} from '@/store/core'
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
  alpha,
  type PaperProps,
} from '@mui/material'
import {useAtom} from 'jotai'
import {useMemo, type FC} from 'react'

const activeProps = {
  StepIconComponent: () => <CircularProgress size={24} />,
}

const Progress: FC<PaperProps & {solution?: any}> = ({
  sx,
  solution,
  ...props
}) => {
  const [typeform] = useAtom(typeformAtom)
  const [currentTask] = useAtom(currentTaskAtom)
  const [fromChain] = useAtom(fromChainAtom)
  // const {data: simulateResults} = useSimulateResults()

  const stepOffset = fromChain?.chainType === 'Sub' ? 2 : 1

  const activeStep = 0

  const steps = useMemo(() => {
    if (solution == null) return null
    const result: Array<{
      batch: Array<{label: string; kind: string}>
      sourceChain: string
      fee?: string
    }> = []
    for (let i = 0; i < solution.length; i++) {
      const {exe, sourceChain, destChain, from, to} = solution[i]
      const prevStep = result.at(-1)
      const isSwap = sourceChain === destChain

      const label = isSwap
        ? `${from} -> ${to} on ${exe.replaceAll('_', ' ')}`
        : `${from} -> ${to}`

      const step = {kind: isSwap ? 'swap' : 'bridge', label}
      if (prevStep != null && prevStep.sourceChain === sourceChain) {
        prevStep.batch.push(step)
      } else {
        result.push({
          sourceChain,
          batch: [step],
        })
      }
    }
    return result
  }, [solution])

  return (
    <Paper
      sx={(theme) => ({
        p: 2,
        background: alpha(theme.palette.action.hover, 0.02),
        border: 'none',
        width: 1,
        overflow: 'hidden',
      })}
      {...props}
    >
      {steps == null ? (
        <Typography textAlign="center" variant="subtitle2">
          Oops, It’s currently not been supported yet,{' '}
          <Link
            component="span"
            sx={{cursor: 'pointer'}}
            onClick={() => {
              typeform.survey.open()
            }}
          >
            tell us what you want
          </Link>
          .
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
                  sx={{textTransform: 'capitalize', width: 120}}
                  color={activeStep === 0 ? 'primary' : 'default'}
                />
              </Stack>
            </StepLabel>
          </Step>
          {fromChain?.chainType === 'Sub' && (
            <Step>
              <StepLabel>
                <Stack spacing={1} direction="row" alignItems="baseline">
                  <Chip
                    label="Claim"
                    size="small"
                    sx={{textTransform: 'capitalize', width: 120}}
                  />
                </Stack>
              </StepLabel>
            </Step>
          )}
          {steps.map((step, index) => {
            const isActive = activeStep === index + stepOffset
            return (
              <Step key={index} expanded>
                <StepLabel {...(isActive && activeProps)}>
                  <Stack spacing={1} direction="row" alignItems="baseline">
                    <Chip
                      label={step.sourceChain}
                      size="small"
                      sx={{textTransform: 'capitalize', width: 120, ml: 2}}
                      color={isActive ? 'primary' : 'default'}
                    />
                  </Stack>
                </StepLabel>
                <StepContent>
                  {step.batch.map(({kind, label}) => (
                    <Stack
                      direction="row"
                      alignItems="baseline"
                      key={label}
                      width={1}
                    >
                      <Typography
                        component="div"
                        width={55}
                        variant="caption"
                        textTransform="capitalize"
                        flex="none"
                        fontWeight="500"
                      >
                        {kind}
                      </Typography>
                      <Typography component="div" variant="caption" flex={1}>
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
                sx={{textTransform: 'capitalize', width: 120}}
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
