const express = require('express');
const router = express.Router();

const {
    WebHook,
    PubSub
} = require('twitch-toolkit');
const ngrok = require('ngrok');

let twitchWebHook;
let pubsub;

ngrok
    .connect(process.env.PORT || 3000)
    .then(URL => {
        console.log('Connected to ngrok at ' + URL);
        startServer(URL);
    })
    .catch(err => {
        throw err;
    });

function startServer(externalUrl) {     

    twitchWebHook = new WebHook({
        clientId: process.env.TWITCH_CLIENTID,
        callbackUrl: `${externalUrl}/webhook`
    });
   

    twitchWebHook.topicUserFollowsSubscribe(null, 77504814);

    twitchWebHook.on('user_follows', function (data) {
        for (let i in data) {
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
   "display_name": "Ninja", "_id": 19571641,
    "_id": 20786541, "name": "yogscast"
     "_id": 60056333, "name": "tfue",
         "_id": 58948896,
    "name": "ramblinggeek"
{
    "display_name": "sorskoot",
    "_id": 77504814,
    "name": "sorskoot",
    "type": "user",
    "bio": "JavaScript ⍟ C# ⍟ Web ⍟ Desktop ⍟ Games ⍟ Unity3D ⍟ Cordova ⍟ Microsoft MVP Development Tools ⍟ Speaker ⍟ Blogger ⍟ Live Coder",
    "created_at": "2014-12-19T15:13:18Z",
    "updated_at": "2019-04-25T19:33:26Z",
    "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/958a22b1-e9e5-4390-8843-98d9def72a35-profile_image-300x300.png",
    "_links": {
        "self": "https://api.twitch.tv/kraken/users/sorskoot"
    }
}

*/