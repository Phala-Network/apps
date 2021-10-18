import {useApiPromise} from '@phala/react-libs'
import {useQuery} from 'react-query'

const hexToUtf8 = (hex: string): string => {
  if (hex.startsWith('0x')) {
    hex = hex.slice(2)
  }

  return decodeURIComponent(hex.replace(/[0-9a-f]{2}/g, '%$&'))
}

type Value = {judgements: any[]; info: {display: {raw: string}}}

const useIdentities = () => {
  const {api, endpoint} = useApiPromise()
  return useQuery(
    ['identities', endpoint],
    () =>
      api?.query.identity.identityOf.entries().then((entries) =>
        Object.fromEntries(
          entries.map(([key, value]) => {
            const data = value.toJSON() as Value

            return [
              key.toHuman(),
              {
                display: hexToUtf8(data.info.display.raw),
                verified:
                  data.judgements[0]?.[1].knownGood === null ||
                  data.judgements[0]?.[1].reasonable === null,
              },
            ]
          })
        )
      ),
    {refetchOnMount: false}
  ).data
}

export default useIdentities
