const net = require('net')
const fs = require('fs')
const PORT = 3000
const clients = []
const date = (new Date()).toLocaleString('en-US');



const server = net.createServer((client) => {
  let name = client.remotePort
  let msg = `client ${name} has connected`
  let closeMsg = `client ${name} has left`

  clients.push(client)
  console.log(msg)
  addMessage(msg)
  
  client.write(`Client ${name} welcome to the chat!`)

  client.on('data', (data) => {
    console.log(data.toString())
    messageAllClients(data, client);
  })

  client.on('close', ()=> {
    console.log(closeMsg)
    messageAllClients(closeMsg)
  })
  
})

server.on('error', (err) => {
  throw err
})

server.listen(PORT, () => {
  let serverMsg = `Server is listening on port ${PORT}`
  console.log(serverMsg)
  addMessage(serverMsg)
})

const messageAllClients = (txtmsg, exclude) => {
  clients.forEach((client, index) => {
    if (index !== exclude) {
      client.write(txtmsg)
      addMessage(txtmsg)
    }
  })
}

const addMessage = (addText)=> {
  fs.appendFile('./chat.log.txt', `--${date}-- \n${addText}\n\n`, (err)=> {
    if(err) throw(err);
  })
}