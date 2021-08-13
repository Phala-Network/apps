import { FC, useRef } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export const Provider: FC = (props) => {
  const client = useRef(new QueryClient())

  return (
    <QueryClientProvider contextSharing={true} client={client.current}>
      {props.children}
    </QueryClientProvider>
  )
}
