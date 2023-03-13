import wikiEntries from '@/assets/wikiData'
import {colors} from '@/lib/theme'
import {wikiExpandEntryAtom} from '@/store/common'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import {useAtom} from 'jotai'
import {type FC, type ReactNode} from 'react'

const Entry: FC<{
  title: ReactNode
  children?: ReactNode
  defaultExpanded?: boolean
}> = ({title, defaultExpanded = false, children}) => {
  const theme = useTheme()
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
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
        <Typography whiteSpace="pre-wrap">{children}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

const Wiki: FC<{defaultExpanded?: boolean}> = ({defaultExpanded}) => {
  const [expandEntry] = useAtom(wikiExpandEntryAtom)

  const expand = expandEntry != null ? wikiEntries[expandEntry] : undefined

  return (
    <>
      {expand != null && (
        <>
          <Typography variant="h4">{expand.title}</Typography>
          <Typography mt={2} whiteSpace="pre-wrap" variant="body1">
            {expand.content}
          </Typography>
        </>
      )}

      {expandEntry != null && (
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          mt={4}
          mb={2}
        >
          <Typography variant="subtitle1">More</Typography>
          <Button href="/wiki" target="_blank" variant="text">
            View all
          </Button>
        </Stack>
      )}
      <Stack spacing={2}>
        {Object.entries(wikiEntries).map(([entry, {title, content}]) => (
          <Entry title={title} key={entry} defaultExpanded={defaultExpanded}>
            {content}
          </Entry>
        ))}
      </Stack>
    </>
  )
}

export default Wiki