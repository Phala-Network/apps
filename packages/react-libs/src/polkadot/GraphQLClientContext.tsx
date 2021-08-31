import {GraphQLClient} from 'graphql-request'
import {createContext, PropsWithChildren, useContext, useMemo} from 'react'

interface IGraphQLContext {
  client?: GraphQLClient
}

const GraphQLContext = createContext<IGraphQLContext>({})

export const SubstrateGraphQLProvider = ({
  children,
  endpoint,
}: PropsWithChildren<{endpoint?: string}>): JSX.Element => {
  const client = useMemo(
    () => (endpoint !== undefined ? new GraphQLClient(endpoint) : undefined),
    [endpoint]
  )

  return (
    <GraphQLContext.Provider value={{client}}>
      {children}
    </GraphQLContext.Provider>
  )
}

export const useSubstrateGraphQL = (): IGraphQLContext =>
  useContext(GraphQLContext)
