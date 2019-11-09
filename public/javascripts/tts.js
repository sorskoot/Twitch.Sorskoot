let voice = 'Kendra';//'Joanna'; //Zhiyu
//let text = 'hello! What is up! I am Rosie and I am a chat bot.';
//let text = 'Please welcome our fellow coder, theMichaelJolley!'
//let text = 'Sorry Sorskoot, I don\'t understand that command.';

let ctx = new AudioContext();
let vocoderInstance;

async function initialize() {
    let carrier = await loadBuffer(ctx, '/lib/saw.wav');
    vocoderInstance = vocoder();
    vocoderInstance.init(ctx,carrier);
}

let socket = io('http://localhost:9385');

socket.on('speak', function (msg, param) {
    console.log(param);
    LoadAndPlayText(param);
});

initialize();

function LoadAndPlayText(text) {
    loadBuffer(ctx,
        `https://api.streamelements.com/kappa/v2/speech?voice=${voice}&text=${text}`)
        .then(d => vocoderInstance.vocode(d));
}

