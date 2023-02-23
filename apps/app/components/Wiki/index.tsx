import {colors} from '@/lib/theme'
import {wikiExpandAtom} from '@/store/common'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import {useAtom} from 'jotai'
import {type FC, type ReactNode} from 'react'

const entries = ['APR', 'APY', 'Delegable balance', 'Withdrawal queue']

const Entry: FC<{title: ReactNode; children?: ReactNode}> = ({
  title,
  children,
}) => {
  const theme = useTheme()
  return (
    <Accordion
      square
      disableGutters
      TransitionProps={{mountOnEnter: true, unmountOnExit: true}}
      sx={{
        '&:before': {display: 'none'},
        borderRadius: `${theme.shape.borderRadius}px`,
      }}
    >
      <AccordionSummary
        sx={{
          background: colors.cardBackground,
          borderRadius: `${theme.shape.borderRadius - 1}px`,
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        {typeof title === 'string' ? (
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        ) : (
          title
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

const Wiki: FC = () => {
  const [expand] = useAtom(wikiExpandAtom)
  return (
    <>
      {expand === 'wrapped' && (
        <Paper sx={{p: 2, background: colors.cardBackground}}>
          <Typography variant="h6">Wrapped</Typography>
          <Typography mt={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </Paper>
      )}

      {expand != null && (
        <Stack justifyContent="space-between" direction="row" mt={4} mb={2}>
          <Typography variant="subtitle1">Related</Typography>
          <Button href="/wiki" target="_blank" variant="text">
            View all
          </Button>
        </Stack>
      )}
      <Stack spacing={2}>
        {entries.map((entry) => (
          <Entry title={entry} key={entry}></Entry>
        ))}
      </Stack>
    </>
  )
}

export default Wiki
