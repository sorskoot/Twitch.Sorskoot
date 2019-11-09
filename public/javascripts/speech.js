var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const grammar = '#JSGF V1.0; grammar rosie; public <rosie> = Hey | Rosie;'
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

const wakeUpcommand = /^\s*(hey|hi) rosie$/i;

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

// recognition.onaudioend= (e)=>console.log(e);
// recognition.onaudiostart= (e)=>console.log(e);
recognition.onerror = function (event) {
    console.log(event.error);
};;
// recognition.onsoundend = (e) => console.log(e);
// recognition.onsoundstart = (e) => console.log(e);
// recognition.onspeechend = (e) => console.log(e);
// recognition.onspeechstart = (e) => console.log(e);
// recognition.onstart = (e) => console.log(e);
// recognition.continuous = (e) => console.log(e);

let listening = false;

recognition.onresult = (e) => {
    const text = e.results[e.results.length - 1];
    if (text.isFinal) {
        if (text[0].transcript.match(wakeUpcommand)) {
            fetch('https://twitch.c0dr.nl:9384/webhook/tts-send/Yes%3F');
            listening = true;
        } else {
            if (listening) {
                console.log(text.isFinal, text[0].transcript);
                fetch(`/speech/api/${encodeURIComponent(text[0].transcript)}`);
                listening = false;
            }
        }
    }
 
}

recognition.onend = function () {
    recognition.start();
};

recognition.start();
