import useSolutions from '@/hooks/useSolutions'
import {toAmountAtom, toAssetAtom} from '@/store/core'
import {
  Chip,
  CircularProgress,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
  type PaperProps,
} from '@mui/material'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useEffect, useMemo, useState, type FC} from 'react'

const Solutions: FC<PaperProps> = ({sx, ...props}) => {
  const theme = useTheme()
  const {data, error} = useSolutions()
  const [, setToAmount] = useAtom(toAmountAtom)
  const [toAsset] = useAtom(toAssetAtom)
  const [activeStep] = useState(0)
  // const fromChain = useAtomValue(fromChainAtom)
  // const polkadotApi = useCurrentPolkadotApi()
  // const estimatedGas = useEstimatedGasFee()
  // const asset = useAtomValue(toAssetAtom)
  // const destChainTransactionFee = useAtomValue(destChainTransactionFeeAtom)
  // const {estimatedTime} = useAtomValue(infoAtom)

  const steps = useMemo(() => {
    if (data?.raw == null) return null
    return data.raw.map(
      ({
        from,
        to,
        type,
        sourceChain,
        destChain,
        spendAsset,
        receiveAsset,
        tag,
      }) => {
        let label = ''
        if (type === 'bridge') {
          label = `${sourceChain ?? ''} ${spendAsset ?? ''} -> ${
            destChain ?? ''
          } ${receiveAsset ?? ''}`
        } else if (type === 'dex') {
          label = `${spendAsset ?? ''} -> ${receiveAsset ?? ''} on ${tag ?? ''}`
        } else if (type === 'transfer') {
          label = `${spendAsset ?? ''}`
        }

        return {
          label,
          key: `${from}-${to}-${type ?? ''}`,
          kind:
            from === 'SOURCE'
              ? 'init'
              : to === 'SINK'
              ? 'completed'
              : type === 'dex'
              ? 'swap'
              : type,
        }
      },
    )
  }, [data])

  useEffect(() => {
    const receiveMin = data?.raw?.at(-2)?.receiveMin
    if (receiveMin == null) {
      setToAmount('')
    } else {
      setToAmount(
        new Decimal(receiveMin)
          .div(Decimal.pow(10, toAsset.decimals))
          .toString(),
      )
    }
  }, [data, setToAmount, toAsset.decimals])

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
        error == null ? (
          <CircularProgress sx={{mx: 'auto', display: 'block'}} />
        ) : (
          <Typography textAlign="center" variant="subtitle2">
            No solutions found
          </Typography>
        )
      ) : (
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.key}>
              <StepLabel>
                {step.kind != null && (
                  <Chip
                    label={step.kind}
                    size="small"
                    sx={{mr: 1.5, textTransform: 'capitalize', width: 90}}
                    color={activeStep === index ? 'primary' : 'default'}
                  />
                )}
                {step.label}
              </StepLabel>
              {/* <StepContent>
                <Typography>{step.description}</Typography>
              </StepContent> */}
            </Step>
          ))}
        </Stepper>
      )}
    </Paper>
  )
}

export default Solutions
