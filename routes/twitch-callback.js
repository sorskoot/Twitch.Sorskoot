const express = require('express');
const router = express.Router();
const fs = require('fs');
const request = require('request');

var socketio = require('socket.io');
var socketioClient = require('socket.io-client');

let io = socketio(9385);

io.on('connection', function (socket) {
    console.log('an user connected');
    socket.on('emotes in chat', (emotes) => {
        io.emit('render emotes', emotes, {
            for: 'everyone'
        });
    })
});



const {
    WebHook,
    PubSub
} = require('twitch-toolkit');

let twitchWebHook;
let pubsub;

//startServer('https://rosiebot.localtunnel.me');
const socketToken = process.env.STREAMLABS_SOCKET_TOKEN;
const streamlabs = socketioClient(`https://sockets.streamlabs.com?token=${socketToken}`,
    { transports: ['websocket'] });

const azureFunctionStoreURL = `https://twitchsorskoot.azurewebsites.net/api/twitchSorskoot?code=${process.env.FUNCTIONCODE}`

//Perform Action on event
streamlabs.on('event', (eventData) => {
    if (!eventData.for && eventData.type === 'donation') {
        //code to handle donation events
        console.log(eventData.message);
    }
    if (eventData.for === 'twitch_account') {
        switch (eventData.type) {
            case 'follow':
                io.emit('new follower', { name: eventData.message[0].name }, {
                    for: 'everyone'
                });
                break;
            case 'subscription':
                io.emit('new sub', { name: eventData.message[0].name }, {
                    for: 'everyone'
                });
                break;
            default:
                //default case
                console.log(eventData.message);
        }

        let twitchEvent = eventData.message[0];
        twitchEvent.type = eventData.type;
        twitchEvent.PartitionKey = "TwitchEvent";
        // {
        //     "name":eventData.message[0].name,
        //     "type": eventData.type,
        //     "id":eventData.message[0]._id,
        //     "isTest":eventData.message[0].isTest
        // }
        postDataToAzure(twitchEvent);

    }
});

function postDataToAzure(data) {
    request.post(azureFunctionStoreURL, {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }, function (error, response, body) {
        if (error) {
            console.log(error.message);
        }
        if (response.statusCode != 200) {
            console.log(response.body);
        }
    })
}


module.exports = router;
/*
   "_id": 19571641, "name": "ninja"
   "_id": 20786541, "name": "yogscast"
   "_id": 60056333, "name": "tfue",
   "_id": 77504814, "name": "sorskoot",
*/
