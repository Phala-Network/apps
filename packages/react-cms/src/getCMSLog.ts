import {gql, request} from 'graphql-request'

const query = gql`
  {
    log(where: {id: "cksrc9kjkbsna0b398xe591ap"}) {
      dt
    }
  }
`

const url =
  'https://api-ap-northeast-1.graphcms.com/v2/cksrbhgal3r6b01xnhj9dexrv/master'

export function getCMSLog() {
  return request(url, query)
}
