import {solutionStringAtom} from '@/store/core'
import {Box, Link, TextField, type TextFieldProps} from '@mui/material'
import {useAtom} from 'jotai'
import {type FC} from 'react'

const SolutionInput: FC<TextFieldProps> = (props) => {
  const [value, setValue] = useAtom(solutionStringAtom)

  return (
    <Box>
      <TextField
        multiline
        rows={6.5}
        label="Solution"
        value={value}
        spellCheck={false}
        fullWidth
        onChange={(e) => {
          setValue(e.target.value)
        }}
        inputProps={{
          sx: {fontFamily: 'monospace', lineHeight: 1.2},
        }}
        {...props}
      />

      <Box
        sx={{
          mt: 1,
          height: 24,
          mb: -4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Link
          variant="caption"
          href="https://github.com/tolak/awesome-index/tree/main/solutions"
          target="_blank"
          sx={{fontWeight: 700}}
        >
          Find more solutions
        </Link>
      </Box>
    </Box>
  )
}

export default SolutionInput
