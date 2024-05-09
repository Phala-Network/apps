import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import type {DelegationCommonFragment} from '@/lib/subsquidQuery'
import {chainAtom} from '@/store/common'
import MoreVert from '@mui/icons-material/MoreVert'
import {
  IconButton,
  Menu,
  MenuItem,
  type SxProps,
  type Theme,
} from '@mui/material'
import {useAtom} from 'jotai'
import {type FC, useRef, useState} from 'react'
import type {OnAction} from './List'

const DelegationMenu: FC<{
  onAction?: OnAction
  delegation: DelegationCommonFragment
  sx?: SxProps<Theme>
}> = ({delegation, onAction, sx}) => {
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const {basePool} = delegation
  const [chain] = useAtom(chainAtom)
  const [menuOpen, setMenuOpen] = useState(false)
  const moreRef = useRef(null)
  const poolHasWithdrawal = delegation.basePool.withdrawingShares !== '0'
  const isVault = basePool.kind === 'Vault'
  const reclaim = async (): Promise<void> => {
    if (api == null) return
    await signAndSend(
      isVault
        ? api.tx.phalaVault.checkAndMaybeForceWithdraw(basePool.id)
        : api.tx.phalaStakePoolv2.checkAndMaybeForceWithdraw(basePool.id),
    )
  }

  return (
    <>
      <IconButton
        ref={moreRef}
        onClick={() => {
          setMenuOpen(true)
        }}
        sx={sx}
      >
        <MoreVert />
      </IconButton>
      <Menu
        open={menuOpen}
        anchorEl={moreRef.current}
        onClose={() => {
          setMenuOpen(false)
        }}
      >
        <MenuItem
          onClick={() => {
            onAction?.(delegation, 'withdraw')
            setMenuOpen(false)
          }}
        >
          Withdraw
        </MenuItem>
        <MenuItem
          disabled={!poolHasWithdrawal}
          onClick={() => {
            void reclaim()
            setMenuOpen(false)
          }}
        >
          Reclaim
        </MenuItem>
        <MenuItem
          onClick={() => {
            location.href = `/api/${chain}/snapshots/delegation/${delegation.id}`
            setMenuOpen(false)
          }}
        >
          Download historical data
        </MenuItem>
      </Menu>
    </>
  )
}

export default DelegationMenu
