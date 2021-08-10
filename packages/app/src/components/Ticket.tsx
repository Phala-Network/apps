import React, { ComponentProps, useEffect } from 'react'
import styled from 'styled-components'
import abridgeString from '../utils/abridgeString'

type Props = {
  no?: string
  bottomContent?: React.ReactNode
  themeColor?: string
  name?: React.ReactNode
} & ComponentProps<typeof Root>

const Root = styled.div`
  width: 56px;
  height: 200px;
  background: #202020;
  position: relative;
  color: #ececec;
  cursor: pointer;
  transition: all 0.15s;
`

const No2 = styled.div`
  font-weight: 700;
  text-align: right;
  font-size: 10px;
`

const Content = styled.div`
  align-items: flex-end;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: Lato;
  height: 56px;
  left: -72px;
  padding: 12px;
  position: absolute;
  top: 72px;
  transform-origin: center center;
  transform: rotate(-90deg);
  width: 200px;
`

const Cover = styled.div`
  width: 100%;
  height: 100%;
`

export const TicketName = styled.div`
  position: absolute;
  width: 46px;
  height: 16px;
  left: 5px;
  bottom: 5px;
  background: #878787;
  line-height: 16px;
  font-family: Orbitron;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  align-items: center;
  text-align: center;
  color: #000000;
`

const Ticket: React.FC<Props> = (props) => {
  const { no, bottomContent, name, cover, ...others } = props
  const [isActive, setIsActive] = React.useState(false)

  useEffect(() => {
    setIsActive(true)
  }, [])

  if (!isActive) {
    return null
  }

  return (
    <Root {...others}>
      <Content>
        {no ? (
          <>
            <No2> {abridgeString(no)}</No2>

            {bottomContent ? (
              <div style={{ marginTop: 4, display: 'flex' }}>
                {bottomContent}
              </div>
            ) : null}
          </>
        ) : (
          <Cover>{cover}</Cover>
        )}
      </Content>

      {name}
    </Root>
  )
}

export default Ticket

export const DefaultStatus = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const DefaultStatusIcon = styled.div`
  margin: 0 13px 0 6px;

  img {
    width: 26px;
    height: auto;
  }
`

export const DefaultStatusName = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #ececec;
`

export const TicketCurrency = styled.div`
  background: #000000;
  border-radius: 2px;
  color: #ececec;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 0 6px;
  justify-content: center;
  margin-left: 6px;
`
