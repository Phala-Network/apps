import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

const Wrap = styled.div<{top: number}>`
  height: 40px;
  border: 1px solid transparent;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.phala};
  box-shadow: 4px 4px 0px ${(props) => props.theme.colors.phala};

  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.2s linear;
  transform: translate3d(0, ${(props) => `${props.top}px`}, 0);
`

const ActiveOutline: React.FC = () => {
  const [top, setTop] = useState(9)

  function change() {
    const dom = document.getElementById('navLinks')

    if (!dom) return

    const domTop = dom?.getBoundingClientRect().top

    const activeDom = dom?.getElementsByClassName('active')

    if (!activeDom?.[0]) return

    const activeDomTop = activeDom?.[0].getBoundingClientRect().top

    setTop(activeDomTop - domTop)
  }

  // @limichange: I know this is stupid, but this look works for now.
  useEffect(() => {
    const id = setInterval(() => change(), 100)

    return () => clearInterval(id)
  }, [])

  return <Wrap className="ActiveOutline" top={top}></Wrap>
}

export default ActiveOutline
