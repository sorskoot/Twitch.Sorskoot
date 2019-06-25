var express = require('express');
var router = express.Router();

var fs = require('fs');

let files = [];
fs.readdir(process.env.MUSIC_PATH, (err,f)=>{
    if(!err){
        files = f.filter(x=>!!~x.toLowerCase().indexOf('.mp3'));
    }
})

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

router.get('/next-song',function(req, res, next) {
    const song = files[~~(Math.random() * files.length)];
    // TODO:
    //
    let filePath = `${process.env.MUSIC_PATH}\\${song}`
    console.log('\x1b[35m',`Now playing:\n\t${song}`);
    //console.log(`Now playing:\n\t${song}`);
    
    // var stat = fs.statSync(filePath);

    // res.writeHead(200, {
    //     'Content-Type': 'audio/mpeg',
    //     'Content-Length': stat.size
    // });

    // var readStream = fs.createReadStream(filePath);
    // // We replaced all the event handlers with a simple call to readStream.pipe()
    // readStream.pipe(res);
    var contents = fs.readFileSync(filePath);
    res.setHeader('Content-Length', contents.length);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Name', filePath);
    res.end(contents);
    //res.json({song:'url',files});
});

router.get('/', function(req, res, next) {
    res.render('player');
});

router.get('/remote', function(req, res, next) {
    res.render('player-remote');
});

module.exports = router;
