
let voice = 'Kendra';//'Joanna'; //Zhiyu

var ctx = new AudioContext();
let b1, b2;
async function load() {
    b1 = await loadBuffer(ctx, 
        `https://api.streamelements.com/kappa/v2/speech?voice=${voice}&text=hello! What is up! I am Rosie and I am a chat bot.`);
    b2 = await loadBuffer(ctx, '/lib/saw2.wav');
};

load().then(d => {
    vocoder(ctx, b2, b1);
}
);
