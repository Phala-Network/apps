import {FC} from 'react'
import styled from 'styled-components'
import {Item} from './Item'

const Root = styled.div`
  background: #ffffff;
  display: flex;
  padding: 30px;
  gap: 60px;
  width: fit-content;
`

const data = [
  {
    value: '15.3%',
    name: 'Workers',
  },
  {
    value: '2988.12',
    name: 'vCPU',
  },
  {
    value: '123',
    name: 'Country',
  },
]

export const Info: FC = () => {
  return (
    <Root>
      {data.map((props) => {
        return <Item key={props.name} {...props} />
      })}
    </Root>
  )
}
