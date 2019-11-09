var express = require('express');
var router = express.Router();
var socketioClient = require('socket.io-client');

const { Wit, log } = require('node-wit');

const client = new Wit({
    accessToken: process.env.WIT_TOKEN,
    logger: new log.Logger(log.DEBUG) // optional
});

router.get('/', (req, res) => {
    res.render('speech');
});

router.get('/api/:text', async (req, res) => {
    let r = await client.message(req.params.text);
    
    if(!!r.entities.intent && r.entities.intent[0].value == 'the light'){
        console.log(`changing the light to ${r.entities.color[0].value}`);
    }else{
        console.log(`I do not understand.`);
    }
    

    res.sendStatus(200);
})

module.exports = router;
