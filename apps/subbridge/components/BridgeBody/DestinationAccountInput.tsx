import {
  destinationAccountAtom,
  fromChainAtom,
  toChainAtom,
} from '@/store/bridge'
import {isWalletConnectAtom} from '@/store/common'
import {evmAccountAtom} from '@/store/ethers'
import {HighlightOff} from '@mui/icons-material'
import {Box, BoxProps, IconButton, Link, TextField} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {trimAddress} from '@phala/utils'
import {encodeAddress} from '@polkadot/util-crypto'
import {useAtom} from 'jotai'
import {RESET} from 'jotai/utils'
import {FC, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'

const DestinationAccountInput: FC<BoxProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>()
  const [manually, setManually] = useState(false)
  const [fromChain] = useAtom(fromChainAtom)
  const [toChain] = useAtom(toChainAtom)
  const [evmAccount] = useAtom(evmAccountAtom)
  const [destinationAccount, setDestinationAccount] = useAtom(
    destinationAccountAtom
  )
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const [isWalletConnected] = useAtom(isWalletConnectAtom)
  const useSameAccountAvailable =
    isWalletConnected && fromChain.kind === toChain.kind
  const useSameAccountEnabled = useSameAccountAvailable && !manually

  useLayoutEffect(() => {
    if (useSameAccountEnabled) {
      if (fromChain.kind === 'evm' && evmAccount) {
        setDestinationAccount(evmAccount)
      } else if (fromChain.kind === 'polkadot' && polkadotAccount?.address) {
        setDestinationAccount(polkadotAccount.address)
      }
    } else {
      setDestinationAccount(RESET)
    }
  }, [
    useSameAccountEnabled,
    fromChain.kind,
    evmAccount,
    polkadotAccount?.address,
    setDestinationAccount,
  ])

  useEffect(() => {
    if (manually) {
      inputRef.current?.focus()
    }
  }, [manually])

  const displayValue = useMemo(() => {
    if (
      toChain.kind === 'polkadot' &&
      useSameAccountEnabled &&
      polkadotAccount &&
      polkadotAccount.address === destinationAccount
    ) {
      const {name, address} = polkadotAccount

      return `${name} (${trimAddress(
        encodeAddress(address, toChain.ss58Format)
      )})`
    }
    return destinationAccount
  }, [toChain, destinationAccount, polkadotAccount, useSameAccountEnabled])

  return (
    <Box {...props}>
      <TextField
        disabled={useSameAccountEnabled && Boolean(destinationAccount)}
        label="Destination Account"
        fullWidth
        spellCheck={false}
        value={displayValue}
        inputRef={inputRef}
        inputProps={{
          pattern: '^[0-9a-zA-Z]*$',
          sx: {
            textOverflow: 'ellipsis',
          },
        }}
        InputProps={{
          endAdornment: !useSameAccountEnabled &&
            Boolean(destinationAccount) && (
              <IconButton
                onClick={() => {
                  setDestinationAccount(RESET)
                  inputRef.current?.focus()
                }}
              >
                <HighlightOff fontSize="small" />
              </IconButton>
            ),
        }}
        onChange={(e) => {
          if (!e.target.validity.patternMismatch) {
            setDestinationAccount(e.target.value)
          }
        }}
      />
      {useSameAccountAvailable && (
        <Box
          sx={{
            mt: 1,
            height: 24,
            mb: -4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Link
            variant="caption"
            sx={{fontWeight: 700, cursor: 'pointer'}}
            onClick={() => {
              setManually(!manually)
            }}
          >
            {manually ? 'Use same account' : 'Edit manually'}
          </Link>
        </Box>
      )}
    </Box>
  )
}

export default DestinationAccountInput
