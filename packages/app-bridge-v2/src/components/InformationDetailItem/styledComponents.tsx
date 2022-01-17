import styled from 'styled-components'

export const Root = styled.div`
  margin: 0;
`

export const Body = styled.div`
  /* Gy 001 */
  background: #eeeeee;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Label = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 20px;
  height: 30px;
  margin-top: 20px;

  /* Bk 001 */
  color: #111111;
`

export const Network = styled.div`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  /* Bk 001 */
  color: #111111;
  padding-left: 20px;
`

export const Amount = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  /* Bk 001 */
  color: #111111;
`

export const Address = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  /* Bk 001 */
  color: #111111;
  padding-right: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Line = styled.div`
  opacity: 0.5;
  /* Gy 003 */
  border-top: 1px solid #8c8c8c;
`

export const Type = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  /* Bk 001 */
  color: #111111;
  margin-bottom: -2px;
  padding-right: 20px;
  padding-left: 9px;
`
