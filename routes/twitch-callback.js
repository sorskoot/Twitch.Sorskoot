const express = require('express');
const router = express.Router();

var socketio = require('socket.io');
let io = socketio(9385);
const fs = require('fs');

io.on('connection', function (socket) {
    console.log('an user connected');
    socket.on('emotes in chat', (emotes)=>{        
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

async function startServer(externalUrl) {

   
    twitchWebHook = new WebHook({
        clientId: process.env.TWITCH_CLIENTID,
        callbackUrl: `${externalUrl}/webhook`
    });

    twitchWebHook.topicUserFollowsSubscribe(null, 77504814).then(key => {
        console.log(key);
    }).catch(err => {
        console.log(err);
    })

    twitchWebHook.on('user_follows', function (data) {
        for (let i in data) {

            // Broadcast 
            io.emit('new follower', data[i], {
                for: 'everyone'
            });

            console.log('New Follower with id ' + data[i]['from_id'] + ' ' + data[i]['from_name']);
        }
    });
}

router.post('/', function (req, res) {
    console.log('Receiving a POST request on /webhook');
    let result = twitchWebHook.handleRequest(
        'POST',
        req.headers,
        req.query,
        req.body
    );
    res.sendStatus(result.status);
})

router.get('/', function (req, res) {
    console.log('Receiving a GET request on /webhook');
    let result = twitchWebHook.handleRequest('GET', req.headers, req.query);
    res.status(result.status).send(result.data);
})


module.exports = router;
/*
   "_id": 19571641, "name": "ninja"
   "_id": 20786541, "name": "yogscast"
   "_id": 60056333, "name": "tfue",
   "_id": 77504814, "name": "sorskoot",
*/
