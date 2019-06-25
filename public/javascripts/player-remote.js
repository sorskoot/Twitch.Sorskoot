(function () {
    let socket = io('http://localhost:9385');
    document.getElementById('player-remote-reload').onclick = () => socket.emit('player','reload');
    document.getElementById('player-remote-play').onclick = () => socket.emit('player','play');
    document.getElementById('player-remote-pause').onclick = () => socket.emit('player','pause');
    document.getElementById('player-remote-next').onclick = () => socket.emit('player','next');

    document.getElementById('player-remote-vol-low').onclick = () => socket.emit('player','volume', 5);
    document.getElementById('player-remote-vol-med').onclick = () => socket.emit('player','volume', 25);
    document.getElementById('player-remote-vol-high').onclick = () => socket.emit('player','volume',100);
})();