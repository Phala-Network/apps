import {solutionStringAtom} from '@/store/core'
import {TextField, type TextFieldProps} from '@mui/material'
import {useAtom} from 'jotai'
import {type FC} from 'react'

const SolutionInput: FC<TextFieldProps> = (props) => {
  const [value, setValue] = useAtom(solutionStringAtom)

  return (
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
  )
}

export default SolutionInput
