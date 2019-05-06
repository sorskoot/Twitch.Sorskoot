(function () {
    let socket = io('http://localhost:9385');
    let emotes = document.querySelector("#emotes");

    socket.on('render emotes', function (msg) {
        for (emote in msg) {
            for(let i = 0 ; i<msg[emote].length;i++){
                let img = document.createElement('img');
                img.style.position = "absolute";
                img.style.left = ~~(Math.random()*800)+'px';
                const y = ~~(Math.random() * 300);
                img.style.top = y +'px';
                img.setAttribute('src', `https://static-cdn.jtvnw.net/emoticons/v1/${emote}/2.0`);
                emotes.appendChild(img);
                var $element = $(img);
                explode($element, y, ~~(Math.random()*20)*20);
            }
        }
    });

    function explode($target, y, delay) {
        $target.explodeRestore();
        setTimeout(function () {
            $target.explode({
                maxWidth: 15,
                minWidth: 5,
                radius: 231,
                release: true,
                fadeTime:4,
                recycle: false,
                explodeTime: 1280,
                canvas: true,
                round: false,
                maxAngle: 360,
                gravity: 5,
                groundDistance: 500-y,
            });
        }, 200+delay)
    }
    


})();

// https://static-cdn.jtvnw.net/emoticons/v1/794388/1.0 1x,
// https://static-cdn.jtvnw.net/emoticons/v1/794388/2.0 2x,
// https://static-cdn.jtvnw.net/emoticons/v1/794388/3.0 4x
