import styled from 'styled-components'

export const Root = styled.div`
  /* inner */
  display: grid;
  grid-template-columns: 20px 1fr;
  grid-gap: 8px;
  align-items: center;
  padding: 0 20px;

  /* position */
  position: fixed;
  height: 51px;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 10000;

  /* style */
  background: rgba(0, 0, 0, 0.88);
  border-radius: 32px;
  color: white;
`

export const Text = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: white;
`
