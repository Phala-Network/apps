import {useMemo} from 'react'
import {Helmet} from 'react-helmet'
import styled from 'styled-components'
import {up} from 'styled-breakpoints'
import useWorkers from '../hooks/useWorkers'
import StakePoolTable from '../components/StakePoolTable'
import WorkerTable from '../components/WorkerTable'
import useSelfStakePools from '../hooks/useSelfStakePools'

const Wrapper = styled.div`
  flex: 1;
  overflow-x: auto;
  padding: 48px 30px;
  width: 100%;
  box-sizing: border-box;
  ${up('md')} {
    margin: 0 auto;
    max-width: 1760px;
  }
`

const Block = styled.div`
  background-color: #fff;
  padding: 16px 32px;

  & + & {
    margin-top: 16px;
  }
`

export const Mining: React.FC = () => {
  const selfStakePools = useSelfStakePools()
  const {data: stakePoolsData} = selfStakePools
  const workersPidMap = useMemo<Record<string, number>>(() => {
    if (stakePoolsData?.length) {
      return Object.fromEntries(
        stakePoolsData
          .map(({workers, pid}) => workers.map((pubkey) => [pubkey, pid]))
          .flat()
      )
    }
    return {}
  }, [stakePoolsData])

  const workers = useWorkers(Object.keys(workersPidMap))

  return (
    <Wrapper>
      <Helmet>
        <title>Mining</title>
      </Helmet>
      <Block>
        <StakePoolTable workers={workers} selfStakePools={selfStakePools} />
      </Block>

      <Block>
        <WorkerTable workers={workers} workersPidMap={workersPidMap} />
      </Block>
    </Wrapper>
  )
}
