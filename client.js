const net = require('net')
const fs = require('fs')
const PORT = 3050

const client = net.Socket()

client.connect({port: PORT})

client.on('connect', () => {
  console.log('connected')
})



client.on('close', () => {
  console.log('client disconnected')
  addMessage(serverMsg)
})

client.on('data', (data) => {
  const msg = data.toString()
  console.log(msg)
})

client.on('error', (err) => {
  console.log(err.toString())
})

client.on('end', ()=> {
  addMessage(closeMsg)
  process.exit()
})

let input = process.stdin;
input.on('data', (value)=> {
    let inputValue = (String)(value).trim(); //if you don't string the value this value is referenced as an object
    
    if(inputValue == 'quit') {
        client.end()
    } else {
      client.write(`client ${value}`)
    }
})