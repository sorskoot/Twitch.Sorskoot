const request = require('request');
const express = require('express');
const router = express.Router();

require('dotenv').config();

const azureFunctionStoreURL = `https://twitchsorskoot.azurewebsites.net/api/twitchSorskoot?code=${process.env.FUNCTIONCODE}`

router.get('/', async function (req, res, next) {

    let twitchEvents = await getTwitchEvents();
    let allUserinfo = await getUsers(twitchEvents.map(x => x.name));

    let credits = {};

    credits.followers = twitchEvents.filter(x => x.type === 'follow').map(x => allUserinfo.find( a => a.display_name == x.name))
    credits.subscribers = twitchEvents.filter(x => x.type === 'subscription').map(x => allUserinfo.find( a => a.display_name == x.name))
    credits.hosts = twitchEvents.filter(x => x.type === 'host').map(x => allUserinfo.find( a => a.display_name == x.name))
    credits.raids = twitchEvents.filter(x => x.type === 'raid').map(x => allUserinfo.find( a => a.display_name == x.name))
    credits.donations = twitchEvents.filter(x => x.type === 'donation').map(x => allUserinfo.find( a => a.display_name == x.name));
    credits.bits = twitchEvents.filter(x => x.type === 'bits').map(x => allUserinfo.find( a => a.display_name == x.name))

    if (!credits.followers.length &&
        !credits.subscribers.length &&
        !credits.hosts.length &&
        !credits.bits.length &&
        !credits.donations.length) {
        credits.nothing = true;
    }

    res.render('endstream-credits', credits);
});

module.exports = router;

function getUsers(users) {
    if (!users || !users.length) return;

    var querystring = users.map(u => `login=${u}`).join('&');
    //GET https://api.twitch.tv/helix/users?id=<user ID>&id=<user ID>
    return new Promise((res, rej) => {
        request.get(`https://api.twitch.tv/helix/users?${querystring}`, {
            headers: {
                'client-id': process.env.TWITCH_CLIENTID
            }
        }, function (error, response, body) {
            if (!!error) {
                rej(error);
            }
            if (response.statusCode != 200) {
                rej(`statuscode: ${response.statusCode}`);
            }
            res(JSON.parse(body).data);
        });
    });
}

function getTwitchEvents() {
    return new Promise((res, rej) => {
        request.get(azureFunctionStoreURL, (result, body) => {
            let twitchEvents = JSON.parse(body.body);
            res(twitchEvents);
        });
    });
}