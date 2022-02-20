const net = require('net')
const PORT = 3000

let id = null

const client = net.Socket()

client.connect({port: PORT})

client.on('connect', () => {
  console.log('connected')
})

client.on('close', () => {
  client.write(`disconnected: ${id}`)

  console.log('client disconnected')
})

client.on('data', (data) => {
  const msg = data.toString()
  console.log(msg)

  console.log(client.id)
})

client.on('error', (err) => {
  console.log(err.toString())
})