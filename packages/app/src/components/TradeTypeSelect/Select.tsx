import React, { useState } from 'react'
import { down } from 'styled-breakpoints'
import styled from 'styled-components'
import scrollbar from '../../style/scrollbar'
import Backdrop from '../Backdrop'
import SelectIcon from './SelectIcon'

const SelectBodyWrap = styled.div`
  grid-gap: 20px;
  top: -8px;
  position: absolute;
  background-color: white;
  height: 392px;
  width: 168px;
  padding: 8px;
  z-index: 10000;
  animation: boxShadowKeyframes 0.15s forwards;

  @keyframes boxShadowKeyframes {
    to {
      box-shadow: 16px 16px 0px rgba(0, 0, 0, 0.3);
    }
  }
`

const SelectBody = styled.div`
  overflow-y: auto;
  height: 100%;
  display: grid;
  grid-gap: 20px;

  ${scrollbar}
`

const Value = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 120px;
  position: relative;
  text-transform: capitalize;

  ${down('sm')} {
    & {
      width: auto;
    }
  }
`

const SelectItem = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 8px;
  cursor: pointer;
  padding: 0 8px;

  &:hover {
    background-color: ${(props) => props.theme.colors.phala};
  }
`

const SelectWrap = styled.div`
  position: relative;
`

type Props = {
  onChange?: (value: any) => void
  disable: boolean
  selectItems?: string[]
  value: string
  icon?: React.ReactNode
  color?: string
}

const Select: React.FC<Props> = (props) => {
  const { color, icon, onChange, selectItems = [], value, disable } = props
  const [visible, setVisible] = useState(false)

  return (
    <SelectWrap>
      <Value style={{ color }} onClick={() => !disable && setVisible(true)}>
        {icon}
        <span>{value || 'Select'}</span>
        {!disable && <SelectIcon></SelectIcon>}
      </Value>

      <Backdrop onClick={() => setVisible(false)} visible={visible}></Backdrop>

      {visible && (
        <SelectBodyWrap>
          <SelectBody>
            {selectItems.map((item) => {
              return (
                <SelectItem
                  onClick={() => {
                    onChange?.(item)
                    setVisible(false)
                  }}
                  key={item}>
                  {item}
                </SelectItem>
              )
            })}
          </SelectBody>
        </SelectBodyWrap>
      )}
    </SelectWrap>
  )
}

export default Select
