import {Button} from '@phala/react-components'
import Decimal from 'decimal.js'
import {Link} from 'gatsby'
import {useMemo} from 'react'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import useFormat from '../../hooks/useFormat'
import useStakePools from '../../hooks/useStakePools'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  align-items: center;
  padding: 10px;
  padding-left: 30px;
`

const Content = styled.div`
  font-size: 24px;
  font-weight: bold;

  ${down('sm')} {
    font-size: 18px;
  }

  span {
    font-family: PT Mono, monospace;
  }
`

const Banner = (): JSX.Element => {
  const {data: stakePools} = useStakePools()
  const format = useFormat()
  const locked = useMemo<string>(() => {
    if (!stakePools) return '-'
    const value = stakePools.reduce(
      (acc, stakePool) => acc.add(stakePool.totalStake),
      new Decimal(0)
    )

    return format(value)
  }, [stakePools, format])

  return (
    <Wrapper>
      <Content>
        Total Delegated: <span>{locked}</span>
      </Content>
      <Link to="/v1/delegate/my-delegate/">
        <Button size="small">My Delegate</Button>
      </Link>
    </Wrapper>
  )
}

export default Banner
