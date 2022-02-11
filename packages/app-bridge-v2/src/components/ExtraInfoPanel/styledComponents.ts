import styled from 'styled-components'

export const Root = styled.div`
  padding: 20px 24px;
  /* Gn 003 */
  background: #f3ffd3;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ItemTitle = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  /* identical to box height, or 100% */
  display: flex;
  align-items: center;
  /* Bk 001 */
  color: #111111;
  mix-blend-mode: normal;
`

export const ItemValue = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  /* identical to box height, or 100% */

  text-align: right;

  /* Bk 001 */
  color: #111111;
`
