import express from 'express'
import enableWs from 'express-ws'

const app = express()
enableWs(app)

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/index.html")
})

let allSockets = []
let socketCounter = 1

app.ws('/chatSocket', (ws, res) => {
    let mySocketNum = socketCounter
    // added code
    allSockets[mySocketNum] = {
        socket: ws,
        name: mySocketNum
    };
    console.log("user " + mySocketNum + " connected")
    socketCounter++

    ws.on('message', msg => {
        // parse the json string that we sent from the client side
        const msgJson = JSON.parse(msg);
        if(msgJson.action == "sendChat") {
            const myName = allSockets[mySocketNum].name;
            // We want to broadcast the message to all our active websockets so we can use this handy for loop -> of Object.entries()
            // Key: socketNum Value: socketInfo
            for (const [socketNum, socketInfo] of Object.entries(allSockets)) {
                // broadcast that message to all active websockets
                socketInfo.socket.send(myName + ": " + msgJson.value);
            }
        } else if(msgJson.action == "updateName") {
            // update the name
            allSockets[mySocketNum].name = msgJson.value
        }
    })

    ws.on('close', () => {
        delete allSockets[socketCounter]; // remove person from array
        console.log("user " + mySocketNum + " disconnected.")
    })
})

app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000")
})