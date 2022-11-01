import {
  ControlContainer,
  Label,
  LabelContainer,
} from 'baseui/form-control/styled-components'
import {FC, ReactNode} from 'react'

const FormDisplay: FC<{label: string; children: ReactNode}> = ({
  label,
  children,
}) => {
  return (
    <ControlContainer>
      <LabelContainer>
        <Label>{label}</Label>
      </LabelContainer>
      {children}
    </ControlContainer>
  )
}

export default FormDisplay
