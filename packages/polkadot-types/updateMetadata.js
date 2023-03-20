import {writeFileSync} from 'node:fs'
import WebSocket from 'ws'

const address = process.env.ADDRESS ?? 'wss://khala-api.phala.network/ws'
const ws = new WebSocket(address, {perMessageDeflate: false})

ws.on('open', () => {
  ws.send('{"id":1,"jsonrpc":"2.0","method":"state_getMetadata","params":[]}')
})
ws.on('message', (data) => {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  writeFileSync('metadata.json', data.toString())
  process.exit(0)
})
