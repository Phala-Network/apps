import fs from 'fs'
import WebSocket from 'ws'

const address = process.env.ADDRESS || 'wss://khala-api.phala.network/ws'
const ws = new WebSocket(address, {perMessageDeflate: false})

ws.on('open', () => {
  ws.send('{"id":1,"jsonrpc":"2.0","method":"state_getMetadata","params":[]}')
})
ws.on('message', (data) => {
  fs.writeFileSync('metadata.json', data.toString())
  process.exit(0)
})
