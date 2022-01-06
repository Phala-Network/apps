// TODO: move this component to common folder
import styled from 'styled-components'
import {StyledSpinnerNext} from 'baseui/spinner'
import {Block} from 'baseui/block'

const Overlap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const SpinnerWrapper: React.FC<{isLoading: boolean}> = ({
  isLoading,
  children,
}) => {
  return (
    <Block position="relative">
      {children}
      {isLoading && (
        <Overlap>
          <StyledSpinnerNext />
        </Overlap>
      )}
    </Block>
  )
}

export default SpinnerWrapper
