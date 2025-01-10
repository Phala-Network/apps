import type {PaletteMode} from '@mui/material'
import {atom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'
import {fromAccountAtom} from './bridge'

export type ColorSchemeSetting = PaletteMode | 'system'

export const colorSchemeSettingAtom = atomWithStorage<ColorSchemeSetting>(
  'jotai:color_scheme_setting',
  'system',
)

export const isWalletConnectAtom = atom<boolean>((get) =>
  Boolean(get(fromAccountAtom)),
)

export const khalaSunsetAlertOpenAtom = atomWithStorage(
  'jotai:khala_sunset_alert_open',
  true,
)

export const moreButtonBadgeVersionAtom = atomWithStorage(
  'jotai:more_button_badge_version',
  0,
)
