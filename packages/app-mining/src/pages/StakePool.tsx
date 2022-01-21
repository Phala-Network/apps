import {Block} from 'baseui/block'
import {PageProps} from 'gatsby'
import Helmet from 'react-helmet'
import {useStakePoolQuery} from '../hooks/graphql'
import {client} from '../utils/GraphQLClient'

export const StakePool = ({params: {pid}}: PageProps) => {
  const {data} = useStakePoolQuery(client, {
    where: {
      pid: Number(pid),
    },
  })

  const {cap} = data?.findUniqueStakePools || {}

  return (
    <>
      <Helmet>
        <title>{`Stake Pool ${pid}`}</title>
      </Helmet>
      {pid}
      <Block>{cap}</Block>
    </>
  )
}
