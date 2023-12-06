'use client'
/* eslint-disable @typescript-eslint/naming-convention */
import {typeformAtom} from '@/store/core'
import {
  Chip,
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
import {forwardRef, useMemo, type FC} from 'react'

const Progress: FC<PaperProps & {solution?: any}> = forwardRef(
  ({sx, solution, ...props}, ref) => {
    const [typeform] = useAtom(typeformAtom)

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
        ref={ref}
        sx={(theme) => ({
          p: 2,
          background: alpha(theme.palette.action.hover, 0.02),
          border: 'none',
          width: 1,
        })}
        {...props}
      >
        {steps == null ? (
          <Typography textAlign="center" variant="subtitle2">
            {`Oops, It's currently not been supported yet, `}
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
          <Stepper activeStep={0} orientation="vertical">
            <Step>
              <StepLabel>
                <Stack spacing={1} direction="row" alignItems="baseline">
                  <Chip
                    label="Initialize"
                    size="small"
                    sx={{textTransform: 'capitalize', width: 120}}
                    color="primary"
                  />
                </Stack>
              </StepLabel>
            </Step>
            {steps.map((step, index) => {
              return (
                <Step key={index} expanded>
                  <StepLabel>
                    <Stack spacing={1} direction="row" alignItems="baseline">
                      <Chip
                        label={step.sourceChain}
                        size="small"
                        sx={{textTransform: 'capitalize', width: 120, ml: 2}}
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
                />
              </StepLabel>
            </Step>
          </Stepper>
        )}
      </Paper>
    )
  },
)

Progress.displayName = 'Progress'

export default Progress
