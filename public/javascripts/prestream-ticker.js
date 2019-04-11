(function(){
    let messages = [
        "Almost ready to go live",
        "Getting ready to write some code",
        "Grabbing some coffee"
    ];

    let ticker = document.querySelector('.ticker-text');
    let currentMessage = 0;

    setInterval(() => {
        ticker.innerText = messages[currentMessage];
        currentMessage = (currentMessage+1) % messages.length;
    }, 5000);   

})();