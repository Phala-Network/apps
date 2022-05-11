import {colorSchemeSettingAtom} from '@/store/common'
import {Link, MoreHoriz} from '@mui/icons-material'
import {Box, Button, ButtonGroup, Menu, MenuItem, useTheme} from '@mui/material'
import {useAtom} from 'jotai'
import {FC, MouseEvent, useState} from 'react'

const externalLinks = [
  ['Wiki', 'https://wiki.phala.network/en-us/general/subbridge/intro/'],
  ['Phala App', 'https://app.phala.network'],
]

const MoreButton: FC = () => {
  const theme = useTheme()
  const [colorSchemeSetting, setColorSchemeSetting] = useAtom(
    colorSchemeSettingAtom
  )
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        sx={{minWidth: 0, px: 1, background: theme.palette.background.paper}}
        onClick={handleClick}
      >
        <MoreHoriz />
      </Button>
      <Menu
        sx={{
          mt: 1,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {externalLinks.map(([text, href]) => (
          <MenuItem
            key={text}
            onClick={() => {
              window.open(href)
              handleClose()
            }}
          >
            <Box
              sx={{display: 'flex', justifyContent: 'space-between', width: 1}}
            >
              <span>{text}</span>
              <Link color="action" />
            </Box>
          </MenuItem>
        ))}

        <ButtonGroup size="small" sx={{mt: 1, mx: 1}}>
          {(['light', 'system', 'dark'] as const).map((value) => (
            <Button
              key={value}
              sx={{textTransform: 'capitalize'}}
              onClick={() => {
                setColorSchemeSetting(value)
              }}
              variant={colorSchemeSetting === value ? 'contained' : 'outlined'}
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </Menu>
    </>
  )
}

export default MoreButton
