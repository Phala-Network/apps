import {MenuItem, Select} from '@mui/material'
import {FC} from 'react'

const DelegatorSelect: FC = () => {
  const vaults = ['Vault 1', 'Vault 2', 'Vault 3']
  return (
    <Select size="small" disabled={!vaults.length}>
      <MenuItem></MenuItem>
    </Select>
  )
}

export default DelegatorSelect
