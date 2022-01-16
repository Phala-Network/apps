import styled from 'styled-components'

export const Spacer = styled.div`
  margin-top: 20px;
`

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
`

export const InputWrapper = styled.div`
  padding: 12px 20px;
  background-color: #eee;
`

export const BalanceText = styled.div`
  background-color: #eee;
  display: flex;
  justify-content: flex-end;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #8c8c8c;
  padding-top: 10px;
  padding-bottom: 2px;
`

export const MaxButton = styled.span`
  display: inline-block;
  border-bottom: '1px solid #8C8C8C';
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  background: #ffffff;
  border-radius: 14px;
  padding: 6px 18px;

  :hover {
    background-color: #d1ff52;
  }
`

export const inputStyle = {
  Root: {
    style: () => ({
      borderLeftColor: '#eee',
      borderRightColor: '#eee',
      borderTopColor: '#eee',
      borderBottomColor: '#eee',
      paddingRight: 0,
    }),
  },
  InputContainer: {
    style: () => ({
      backgroundColor: '#eee',
      borderBottom: '1px solid #8C8C8C',
    }),
  },
  Input: {
    style: () => ({
      paddingLeft: 0,
      paddingBottom: '16px',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '16px',
      color: '#111111',
    }),
  },
}
