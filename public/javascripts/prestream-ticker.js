(function () {
    let messages = [
        "Almost ready to go live...",
        "Getting ready to write some code...",
        "Grabbing some coffee...",
        "Sorting my bubbles...",
        "We don't code bugs; only random features.",
        "Hey! It compiles! Ship it!",
        "Type !command for a list of commands.",
        "!merch - 15% off when using GLOB15",
        "We also have a !discord...",
        "Follow me on !twitter...",
        "// do not remove this comment.",
        "I � Unicode!"        
    ];

    let ticker = document.querySelector('.ticker-text');
    let lastindex = -1;

    setInterval(() => {
        let index;
        do {
            index = ~~(Math.random() * messages.length);
        } while (index === lastindex);

        ticker.innerText = messages[index];
        lastindex = index;
    }, 5000);

})();