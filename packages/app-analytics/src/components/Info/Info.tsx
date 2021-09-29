import {FC, useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'
import {Item} from './Item'

const Root = styled.div`
  background: #ffffff;
  display: flex;
  padding: 30px;
  gap: 60px;
  width: fit-content;
`

export const Info: FC = () => {
  const [cpu, setCpu] = useState(0)
  const [workers, setWorkers] = useState(0)

  const getData = useCallback(
    async function getData() {
      const response = await fetch(
        'https://app-analytics-data.netlify.app/latest/daily.json'
      )
      const data = await response.json()

      setCpu(data.vCPU)
      setWorkers(data.workers)
    },
    [setCpu, setWorkers]
  )

  // date: "2021-09-29"
  // onlineWorkers: 5161
  // reward: 486178.03000000044
  // vCPU: 317702.1533333333
  // workers: 10555
  useEffect(() => {
    getData()
  }, [getData])

  const data = [
    {
      value: workers.toFixed(0),
      name: 'Workers',
    },
    {
      value: cpu.toFixed(0),
      name: 'vCPU',
    },
    // {
    //   value: '123',
    //   name: 'Country',
    // },
  ]

  return (
    <Root>
      {data.map((props) => {
        return <Item key={props.name} {...props} />
      })}
    </Root>
  )
}
