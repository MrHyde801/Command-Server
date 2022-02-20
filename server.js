const net = require('net')
const PORT = 3000

const clients = []
let clientID = 1

const messageAllClients = (msg, exclude) => {
  clients.forEach((client, index) => {
    if (index !== exclude) {
      client.write(msg)
    }
  })
}

const server = net.createServer((client) => {

  client.id = clientID
  clients.push(client)

  const msg = `client ${clientID} has connected\n`
  messageAllClients(msg, clientID)

  console.log(msg)
  
  clientID++
 
  client.on('data', (data) => {
    console.log(data.toString())
  })


  
})

server.on('error', (err) => {
  throw err
})

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})