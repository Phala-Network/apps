import { down } from 'styled-breakpoints'
import styled from 'styled-components'
import { StepProps } from './BridgeProcess'

type Props = StepProps

const Root = styled.div<{ layout: 'block' | 'flex' | undefined }>`
  display: ${(props) => props.layout};

  ${down('lg')} {
    display: block;
  }
`

const FormLayout: React.FC<Props> = (props) => {
  const { layout = 'flex' } = props

  return <Root layout={layout}>{props.children}</Root>
}

export default FormLayout
