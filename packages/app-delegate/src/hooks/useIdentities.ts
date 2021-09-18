import {useApiPromise} from '@phala/react-libs'
import {useQuery} from 'react-query'

const hexToUtf8 = (hex: string): string => {
  if (hex.startsWith('0x')) {
    hex = hex.slice(2)
  }

  return decodeURIComponent(hex.replace(/[0-9a-f]{2}/g, '%$&'))
}

const useIdentities = () => {
  const {api, endpoint} = useApiPromise()
  return useQuery(
    ['identities', endpoint],
    () =>
      api?.query.identity.identityOf
        .entries()
        .then((entries) =>
          Object.fromEntries(
            entries.map(([key, value]) => [
              key.toHuman(),
              hexToUtf8(
                (value.toJSON() as {info: {display: {raw: string}}}).info
                  .display.raw
              ),
            ])
          )
        ),
    {refetchOnMount: false}
  ).data
}

export default useIdentities
