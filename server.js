const net = require('net')
const fs = require('fs')
const PORT = 3050
const clients = []
const date = (new Date()).toLocaleString('en-US');
const whispRegex = /\/w/


const server = net.createServer((client) => {
  client.name = client.remotePort
  let msg = `client ${client.name} has connected`
  let closeMsg = `client ${client.name} has left`
  
  clients.push(client)
  console.log(msg)
  addMessage(msg)
  
  client.write(`Client ${client.name} welcome to the chat!`)
  console.log(clients.length)
  
  if(clients.length > 1) {
    broadcastMessage(client)
  }

  client.on('data', (data) => {
    let stringData = data.toString()
    console.log(stringData)
    if(whispRegex.test(stringData)) {
      let whisperArr = stringData.split(' ')
      let targetClient = whisperArr[4]
      let remove = whisperArr.splice(0,5)
      let targetMsg = `/w ${client.name} : ` + whisperArr.join(' ')
      messageOneClient(data, targetClient, targetMsg)

    } else {
      messageAllClients(data, client);
    }
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

const broadcastMessage = (data, exclude) => {
  clients.forEach((client) => {
    if (client !== exclude) {
      client.write(`\n client ${client.name} has joined the chat`)
    }
  })
}

const messageAllClients = (txtmsg, exclude) => {
  clients.forEach((client) => {
    if (client !== exclude) {
      client.write(txtmsg)
      addMessage(txtmsg)
    }
  })
}


const messageOneClient = (data, include, txtmsg) => {
  clients.forEach((client) => {
    if (client.name == include) {
      client.write(txtmsg)
    }
  })
}

const addMessage = (addText)=> {
  fs.appendFile('./log.txt', `--${date}-- \n${addText}\n\n`, (err)=> {
    if(err) throw(err);
  })
}


