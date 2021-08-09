import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'

type Props = {
  isSorted: boolean
  isSortedDesc: boolean | undefined
}

const Styles = styled.span<{ status: string }>`
  cursor: pointer;
`

const TableSorter: React.FC<Props> = (props) => {
  const { children, isSortedDesc, isSorted } = props
  const [status, setStatus] = useState('normal')

  useEffect(() => {
    if (!isSorted) setStatus('normal')
    if (isSorted && !isSortedDesc) setStatus('down')
    if (isSorted && isSortedDesc) setStatus('up')
  }, [isSorted, isSortedDesc])

  return (
    <Styles status={status}>
      <svg
        width='6'
        height='8'
        viewBox='0 0 6 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          opacity={status === 'up' ? 1 : 0.3}
          d='M3.04056 7.20193C2.9234 7.31909 2.73345 7.31909 2.6163 7.20193L0.512132 5.09777C0.323143 4.90878 0.456993 4.58564 0.724264 4.58564H4.93259C5.19986 4.58564 5.33371 4.90878 5.14472 5.09777L3.04056 7.20193Z'
          fill='#202020'
        />
        <path
          opacity={status === 'down' ? 1 : 0.3}
          d='M3.04056 0.797581C2.9234 0.680424 2.73345 0.680424 2.6163 0.797581L0.512132 2.90174C0.323143 3.09073 0.456993 3.41388 0.724264 3.41388H4.93259C5.19986 3.41388 5.33371 3.09073 5.14472 2.90174L3.04056 0.797581Z'
          fill='#202020'
        />
      </svg>
      {children}
    </Styles>
  )
}

export default TableSorter
