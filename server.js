const net = require('net')
const PORT = 3000

const clients = []



const server = net.createServer((client) => {
  let name = client.remotePort
  let msg = `client ${name} has connected`

  clients.push(client)
  console.log(msg)
  
  client.write(`Client ${name} welcome to the chat!`)

  client.on('data', (data) => {
    console.log(data.toString())
    messageAllClients(data, client);
  })

  client.on('close', ()=> {
    console.log(`client ${name} has left`)
  })
  
})

server.on('error', (err) => {
  throw err
})

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

const messageAllClients = (msg, exclude) => {
  clients.forEach((client, index) => {
    if (index !== exclude) {
      client.write(msg)
    }
  })
}