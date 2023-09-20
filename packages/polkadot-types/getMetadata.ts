const address =
  process.env.ADDRESS ?? 'https://phala.api.onfinality.io/public-ws'

void fetch(address, {
  method: 'POST',
  headers: {'content-type': 'application/json'},
  body: JSON.stringify({
    id: 1,
    jsonrpc: '2.0',
    method: 'state_getMetadata',
    params: [],
  }),
})
  .then(async (res) => await res.text())
  .then(async (data) => await Bun.write('metadata.json', data))
