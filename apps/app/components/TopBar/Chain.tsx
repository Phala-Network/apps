import {colors, montserrat} from '@/lib/theme'
import {Chain, chainAtom} from '@/store/polkadot'
import {MenuItem, Select} from '@mui/material'
import {useAtom} from 'jotai'
import {FC} from 'react'

const Chain: FC = () => {
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
      onChange={(e) => setChain(e.target.value as Chain)}
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

export default Chain
