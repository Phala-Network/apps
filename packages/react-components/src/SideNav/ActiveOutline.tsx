import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  font-size: 12px;
  height: 14px;
  display: flex;
  align-items: center;
  color: transparent;
  padding: 8px 16px;
  display: block;
  border: 1px solid transparent;
  cursor: pointer;
  max-width: 120px;
  text-decoration: none;
  border: 1px solid ${(props) => props.theme.colors.phala};
  box-shadow: 4px 4px 0px ${(props) => props.theme.colors.phala};

  width: 100%;
  position: absolute;
  transition: all 0.2s linear;
  transform: translate3d(0, 0, 0);
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

  return <Wrap className="ActiveOutline" style={{ top }}></Wrap>
}

export default ActiveOutline
