'use client'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import {Box, Stack, Typography, useTheme} from '@mui/material'
import {type BoxProps} from '@mui/system'
import {useEffect, useState, type FC, type ReactNode} from 'react'

const Info: FC<{label: ReactNode; children: ReactNode} & BoxProps> = ({
  label,
  children,
  ...boxProps
}) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      {...boxProps}
    >
      {typeof label === 'string' ? (
        <Typography
          variant="body2"
          component="span"
          sx={{
            flex: 'none',
            mr: 2,
            color: theme.palette.text.secondary,
          }}
        >
          {label}
        </Typography>
      ) : (
        label
      )}

      {children}
    </Box>
  )
}

const Detail: FC<
  BoxProps & {
    kind: 'From' | 'To'
    chain: string
    account?: string | null
    asset: string
    amount?: string
  }
> = ({kind, chain, account, asset, amount, ...props}) => {
  const [chainIconSrc, setChainIconSrc] = useState('')
  const [assetIconSrc, setAssetIconSrc] = useState('')

  const chainName = chain.toLowerCase()
  const assetName = asset.toLowerCase()

  useEffect(() => {
    setChainIconSrc('')
    void import(`@phala/ui/icons/chain/${chainName}.png`)
      .then((module) => {
        // setChainIconSrc(module.default.src)
      })
      .catch(() => {})
  }, [chainName])

  useEffect(() => {
    setAssetIconSrc('')
    void import(`@phala/ui/icons/asset/${assetName}.png`)
      .then((module) => {
        // setAssetIconSrc(module.default.src)
      })
      .catch(() => {})
  }, [assetName])

  return (
    <Box
      flex={['none', 'none', 'none', 1]}
      width={[1, 1, 1, 'auto']}
      {...props}
    >
      <Stack spacing={2}>
        <Info label={kind}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            {chainIconSrc !== '' && (
              <img style={{width: 16, height: 16}} src={chainIconSrc} alt="" />
            )}
            <Typography variant="body2" component="span" sx={{ml: 1}}>
              {chain}
            </Typography>
          </Box>
        </Info>
        {account != null && (
          <Info label="Account">
            <Typography
              variant="caption"
              sx={{
                maxWidth: 200,
                wordBreak: 'break-all',
                textAlign: 'right',
                lineHeight: 1.2,
              }}
            >
              {account}
            </Typography>
          </Info>
        )}
        <Info label="Asset">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
            }}
          >
            {amount != null && (
              <Typography variant="body2" sx={{fontWeight: 600}}>
                {amount}
              </Typography>
            )}
            <Box sx={{display: 'flex', alignItems: 'center', ml: 1}}>
              {assetIconSrc !== '' && (
                <img
                  style={{width: 16, height: 16}}
                  src={assetIconSrc}
                  alt=""
                />
              )}
              <Typography variant="body2" sx={{ml: 1}}>
                {asset}
              </Typography>
            </Box>
          </Box>
        </Info>
      </Stack>
    </Box>
  )
}

const Confirmation: FC<
  BoxProps & {
    fromChain?: string
    fromAccount?: string
    fromAmount?: string
    fromAsset?: string
    toChain?: string
    toAsset?: string
    destinationAccount?: string
  }
> = ({
  fromChain,
  fromAccount,
  fromAmount,
  fromAsset,
  toChain,
  toAsset,
  destinationAccount,
  ...props
}) => {
  if (
    fromChain == null ||
    fromAsset == null ||
    toChain == null ||
    toAsset == null
  )
    return null

  return (
    <Box {...props}>
      <Stack
        width={1}
        alignItems="center"
        direction={['column', 'column', 'column', 'row']}
      >
        <Detail
          kind="From"
          chain={fromChain}
          account={fromAccount}
          amount={fromAmount}
          asset={fromAsset}
        />
        <ArrowDownward
          color="action"
          sx={{m: 3, transform: [null, null, null, 'rotate(-90deg)']}}
        />
        <Detail
          kind="To"
          chain={toChain}
          account={destinationAccount}
          asset={toAsset}
        />
      </Stack>
    </Box>
  )
}

export default Confirmation
