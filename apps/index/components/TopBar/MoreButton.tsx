'use client'
import {colorSchemeSettingAtom} from '@/store/common'
import Link from '@mui/icons-material/Link'
import MoreHoriz from '@mui/icons-material/MoreHoriz'
import {Box, Button, ButtonGroup, Menu, MenuItem} from '@mui/material'
import {useAtom} from 'jotai'
import {useState, type FC, type MouseEvent} from 'react'

const externalLinks = [['Discord', 'https://discord.com/invite/phala']]

const MoreButton: FC = () => {
  const [colorSchemeSetting, setColorSchemeSetting] = useAtom(
    colorSchemeSettingAtom,
  )

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button sx={{minWidth: 0, px: 1}} onClick={handleClick}>
        <MoreHoriz />
      </Button>
      <Menu
        sx={{mt: 1}}
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
