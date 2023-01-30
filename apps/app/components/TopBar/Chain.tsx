import {colors, montserrat} from '@/lib/theme'
import {chainAtom, type Chain} from '@/store/common'
import {MenuItem, Select} from '@mui/material'
import {useAtom} from 'jotai'
import {type FC} from 'react'

const ChainSelect: FC = () => {
  const [chain, setChain] = useAtom(chainAtom)
  const isKhala = chain === 'khala'

  const color = `${isKhala ? '#03ffff' : colors.main[400]} !important`
  const backgroundColor = isKhala ? '#1E565E' : colors.main[700]

  return (
    <Select
      size="small"
      value={chain}
      sx={{
        textTransform: 'capitalize',
        fontFamily: montserrat.style.fontFamily,
        fontWeight: 600,
        color,
        backgroundColor,
        '& fieldset': {
          borderColor: color,
        },
      }}
      inputProps={{sx: {py: '6.5px'}}}
      onChange={(e) => {
        setChain(e.target.value as Chain)
      }}
    >
      {['khala', 'phala'].map((value) => (
        <MenuItem
          value={value}
          key={value}
          sx={{
            textTransform: 'capitalize',
            fontFamily: montserrat.style.fontFamily,
            fontWeight: 600,
            color: value === 'khala' ? '#03ffff' : colors.main[400],
          }}
        >
          {value}
        </MenuItem>
      ))}
    </Select>
  )
}

export default ChainSelect
