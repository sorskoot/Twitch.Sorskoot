var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var grammar = '#JSGF V1.0; grammar rosie; public <rosie> = Hey | Rosie;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;

recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var synth = window.speechSynthesis;

// recognition.onaudioend= (e)=>console.log(e);
// recognition.onaudiostart= (e)=>console.log(e);
 recognition.onerror = function(event) {
    console.log(event.error);
};;
// recognition.onsoundend = (e)=>console.log(e);
// recognition.onsoundstart = (e)=>console.log(e);
// recognition.onspeechend = (e)=>console.log(e);
// recognition.onspeechstart = (e)=>console.log(e);
// recognition.onstart = (e)=>console.log(e);
// recognition.continuous = (e)=>console.log(e);

recognition.onresult = (e)=>{
    console.log(speechSynthesis.getVoices());
    let s = new SpeechSynthesisUtterance();
    s.text='Yes, how can I help?'
    s.voice = speechSynthesis.getVoices()[1];
    s.pitch = 2;
    s.rate = 1.2;
    synth.speak(s);
    console.log(e.results[0][0].transcript);
}


recognition.onend = function () {
    recognition.start();
};

recognition.start();
