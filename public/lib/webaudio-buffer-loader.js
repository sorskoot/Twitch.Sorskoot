function loadBuffer(context, path) {
    return new Promise((res, rej) => {
        var request = new XMLHttpRequest();
        request.open('GET', path, true);
        request.responseType = 'arraybuffer';

        request.onload = function () {
            context.decodeAudioData(request.response, function (theBuffer) {
                res(theBuffer);
            }, function (err) {
                rej(err);
            });
        }
        request.send();
    });
}
