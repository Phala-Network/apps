import StakePoolIcon from '@/assets/stake_pool_detailed.svg'
import CollapsedIcon from '@/components/CollapsedIcon'
import {BasePoolsConnectionQuery} from '@/lib/subsquid'
import {colors} from '@/lib/theme'
import {Collapse, Paper, Stack, Typography, useTheme} from '@mui/material'
import {FC, useState} from 'react'

const StakePoolFarmCard: FC<{
  basePool: BasePoolsConnectionQuery['basePoolsConnection']['edges'][number]['node']
}> = ({basePool}) => {
  const theme = useTheme()
  const [collapsed, setCollapsed] = useState(true)

  return (
    <Paper>
      <Stack
        onClick={() => setCollapsed((v) => !v)}
        direction="row"
        alignItems="center"
        borderRadius={`${theme.shape.borderRadius - 1}px`}
        sx={{
          background: colors.cardBackground,
          pl: 3,
          py: 3,
        }}
      >
        <StakePoolIcon width={48} color={colors.main[300]} />

        <Typography variant="num2" ml={3}>{`#${basePool.id}`}</Typography>
        <CollapsedIcon collapsed={collapsed} />
      </Stack>
      <Collapse in={!collapsed}>
        <Stack direction={{xs: 'column', md: 'row'}} p={{xs: 1, md: 2}}></Stack>
      </Collapse>
    </Paper>
  )
}

export default StakePoolFarmCard
