let voice = 'Kendra';//'Joanna'; //Zhiyu
//let text = 'hello! What is up! I am Rosie and I am a chat bot.';
//let text = 'Please welcome our fellow coder, theMichaelJolley!'
//let text = 'Sorry Sorskoot, I don\'t understand that command.';




async function initialize() {
  
}

let socket = io('http://localhost:9385');

socket.on('speak', function (msg, param) {
    console.log(param);
    LoadAndPlayText(param);
});

async function LoadAndPlayText(text) {
    let ctx = new AudioContext();
    let carrier = await loadBuffer(ctx, '/lib/saw.wav');
    loadBuffer(ctx,
        `https://api.streamelements.com/kappa/v2/speech?voice=${voice}&text=${text}`)
        .then(d => vocoder(ctx, carrier, d));
}

