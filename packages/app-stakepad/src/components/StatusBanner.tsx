import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  background: #fff;
  height: 38px;
  align-items: center;
  padding: 0 15px;
`

const Label = styled.div`
  font-weight: bold;
`

const Value = styled.div``

const StatusBanner = () => {
  return <Wrapper>APY</Wrapper>
}

export default StatusBanner
